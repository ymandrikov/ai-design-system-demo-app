import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "../db";
import { deployments, serviceEnvironments, services, serviceVersions, type Environment } from "../db/schema";
import { durationMs, getProgress } from "./simulation";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
type Deployment = typeof deployments.$inferSelect;

export class DeploymentError extends Error {}

// Each request settles due work and reads/mutates one consistent snapshot.
// IMMEDIATE serializes competing starts and completion across SQLite connections.
export function withDeploymentState<T>(read: (tx: Transaction, now: Date) => T): T {
  const outcome = db.transaction(
    (tx) => {
      const now = new Date();
      const active = tx.select().from(deployments).where(isNull(deployments.result)).all();
      for (const deployment of active) {
        const completedAt = new Date(deployment.startedAt.getTime() + durationMs);
        if (completedAt > now) {
          continue;
        }
        const result = deployment.scenario === "success" ? "succeeded" : "failed";
        tx.update(deployments)
          .set({ result, completedAt })
          .where(and(eq(deployments.id, deployment.id), isNull(deployments.result)))
          .run();
        if (result === "succeeded") {
          tx.update(serviceEnvironments)
            .set({ currentVersionId: deployment.versionId, state: "healthy" })
            .where(
              and(
                eq(serviceEnvironments.serviceId, deployment.serviceId),
                eq(serviceEnvironments.environment, deployment.environment),
              ),
            )
            .run();
        }
      }
      try {
        return { value: read(tx, now) };
      } catch (error) {
        // Expected validation failures must not undo completion that was already due.
        if (error instanceof DeploymentError) {
          return { error };
        }
        throw error;
      }
    },
    { behavior: "immediate" },
  );
  if ("error" in outcome) {
    throw outcome.error;
  }
  return outcome.value;
}

function pair(deployment: Pick<Deployment, "serviceId" | "environment">) {
  return and(eq(deployments.serviceId, deployment.serviceId), eq(deployments.environment, deployment.environment));
}

function actions(tx: Transaction, deployment: Deployment) {
  const active = tx
    .select()
    .from(deployments)
    .where(and(pair(deployment), isNull(deployments.result)))
    .get();
  const successes = tx
    .select()
    .from(deployments)
    .where(and(pair(deployment), eq(deployments.result, "succeeded")))
    .orderBy(desc(deployments.completedAt), desc(deployments.id))
    .all();
  const environment = tx
    .select()
    .from(serviceEnvironments)
    .where(
      and(
        eq(serviceEnvironments.serviceId, deployment.serviceId),
        eq(serviceEnvironments.environment, deployment.environment),
      ),
    )
    .get();
  const previous = successes.find((item) => item.versionId !== deployment.versionId);
  return {
    canRetry: !active && deployment.result === "failed",
    rollbackVersionId:
      !active &&
      deployment.result === "succeeded" &&
      successes[0]?.id === deployment.id &&
      environment?.currentVersionId === deployment.versionId
        ? (previous?.versionId ?? null)
        : null,
  };
}

function insertDeployment(
  tx: Transaction,
  now: Date,
  input: {
    slug: string;
    environment: string;
    versionId: number;
    kind?: Deployment["kind"];
    sourceDeploymentId?: number;
  },
) {
  if (input.environment !== "production" && input.environment !== "staging") {
    throw new DeploymentError("Choose a valid environment.");
  }
  if (!Number.isSafeInteger(input.versionId) || input.versionId <= 0) {
    throw new DeploymentError("Choose a valid version.");
  }
  const service = tx.select().from(services).where(eq(services.slug, input.slug)).get();
  if (!service) {
    throw new DeploymentError("Service not found.");
  }
  const environment = tx
    .select()
    .from(serviceEnvironments)
    .where(and(eq(serviceEnvironments.serviceId, service.id), eq(serviceEnvironments.environment, input.environment)))
    .get();
  if (!environment) {
    throw new DeploymentError("This environment is not configured for the service.");
  }
  const version = tx
    .select()
    .from(serviceVersions)
    .where(and(eq(serviceVersions.id, input.versionId), eq(serviceVersions.serviceId, service.id)))
    .get();
  if (!version) {
    throw new DeploymentError("Choose a version belonging to this service.");
  }
  const active = tx
    .select()
    .from(deployments)
    .where(and(pair({ serviceId: service.id, environment: input.environment }), isNull(deployments.result)))
    .get();
  if (active) {
    throw new DeploymentError(
      `Deployment #${active.id} is already active in ${input.environment}. Wait for it to finish.`,
    );
  }
  return tx
    .insert(deployments)
    .values({
      serviceId: service.id,
      environment: input.environment,
      versionId: version.id,
      scenario: version.scenario,
      startedAt: now,
      kind: input.kind ?? "deploy",
      sourceDeploymentId: input.sourceDeploymentId,
    })
    .returning()
    .get()!;
}

export function startDeployment(input: { slug: string; environment: string; versionId: number }) {
  return withDeploymentState((tx, now) => insertDeployment(tx, now, input));
}

function restartDeployment(id: number, kind: "retry" | "rollback") {
  return withDeploymentState((tx, now) => {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new DeploymentError("Invalid deployment.");
    }
    const deployment = tx.select().from(deployments).where(eq(deployments.id, id)).get();
    if (!deployment) {
      throw new DeploymentError("Deployment not found.");
    }
    const available = actions(tx, deployment);
    const versionId =
      kind === "retry" ? (available.canRetry ? deployment.versionId : null) : available.rollbackVersionId;
    if (!versionId) {
      throw new DeploymentError(`${kind === "retry" ? "Retry" : "Rollback"} is not available for this deployment.`);
    }
    const service = tx.select().from(services).where(eq(services.id, deployment.serviceId)).get()!;
    return insertDeployment(tx, now, {
      slug: service.slug,
      environment: deployment.environment,
      versionId,
      kind,
      sourceDeploymentId: id,
    });
  });
}

export function retryDeployment(id: number) {
  return restartDeployment(id, "retry");
}
export function rollbackDeployment(id: number) {
  return restartDeployment(id, "rollback");
}

export function getDeploymentDetails(id: number) {
  return withDeploymentState((tx, now) => {
    if (!Number.isSafeInteger(id) || id <= 0) {
      return undefined;
    }
    const row = tx
      .select({ deployment: deployments, service: services, version: serviceVersions })
      .from(deployments)
      .innerJoin(services, eq(services.id, deployments.serviceId))
      .innerJoin(serviceVersions, eq(serviceVersions.id, deployments.versionId))
      .where(eq(deployments.id, id))
      .get();
    if (!row) {
      return undefined;
    }
    const available = actions(tx, row.deployment);
    const rollbackVersion =
      available.rollbackVersionId === null
        ? null
        : (tx
            .select({ version: serviceVersions.version })
            .from(serviceVersions)
            .where(eq(serviceVersions.id, available.rollbackVersionId))
            .get()?.version ?? null);
    return { ...row, ...getProgress(row.deployment, now), actions: available, rollbackVersion };
  });
}

export function getDeploymentForm(slug: string, environment: Environment) {
  return withDeploymentState((tx) => {
    const service = tx.select().from(services).where(eq(services.slug, slug)).get();
    if (!service) {
      return undefined;
    }
    const configured = tx
      .select()
      .from(serviceEnvironments)
      .where(and(eq(serviceEnvironments.serviceId, service.id), eq(serviceEnvironments.environment, environment)))
      .get();
    const versions = tx
      .select()
      .from(serviceVersions)
      .where(eq(serviceVersions.serviceId, service.id))
      .orderBy(desc(serviceVersions.id))
      .all();
    return {
      service,
      configured: !!configured,
      versions,
      currentVersion: versions.find((version) => version.id === configured?.currentVersionId)?.version ?? null,
    };
  });
}
