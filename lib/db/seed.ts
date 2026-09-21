import { and, eq, isNull } from "drizzle-orm";
import { db } from "./index";
import { demoVersions } from "./demo-versions";
import { deployments, environments, serviceEnvironments, services, serviceVersions } from "./schema";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

function seedVersions(tx: Transaction, serviceId: number) {
  for (const { version, commit, description, scenario } of demoVersions) {
    tx.insert(serviceVersions)
      .values({ serviceId, version, commit, description, scenario })
      .onConflictDoNothing()
      .run();
    tx.update(serviceVersions)
      .set({ commit })
      .where(
        and(
          eq(serviceVersions.serviceId, serviceId),
          eq(serviceVersions.version, version),
          isNull(serviceVersions.commit),
        ),
      )
      .run();
    tx.update(serviceVersions)
      .set({ description, scenario })
      .where(and(eq(serviceVersions.serviceId, serviceId), eq(serviceVersions.version, version)))
      .run();
  }
}

function seedService(tx: Transaction, slug: string) {
  tx.insert(services).values({ slug, name: slug }).onConflictDoNothing().run();
  const service = tx.select().from(services).where(eq(services.slug, slug)).get()!;
  seedVersions(tx, service.id);
  const versions = tx.select().from(serviceVersions).where(eq(serviceVersions.serviceId, service.id)).all();
  const oldVersion = versions.find((version) => version.version === "1.0.0")!.id;
  const newVersion = versions.find((version) => version.version === "1.1.0")!.id;
  for (const environment of environments) {
    const empty = slug === "worker" && environment === "staging";
    const failed = slug === "api" && environment === "production";
    const currentVersionId = environment === "production" ? oldVersion : newVersion;
    const inserted = tx
      .insert(serviceEnvironments)
      .values({
        serviceId: service.id,
        environment,
        state: empty ? "not_deployed" : "healthy",
        currentVersionId: empty ? null : currentVersionId,
      })
      .onConflictDoNothing()
      .returning()
      .all();
    // Re-running the seed preserves existing environment state and history.
    if (!inserted.length || empty) {
      continue;
    }
    tx.insert(deployments)
      .values({
        serviceId: service.id,
        environment,
        versionId: currentVersionId,
        startedAt: new Date("2026-09-15T09:59:40Z"),
        result: "succeeded",
        completedAt: new Date("2026-09-15T10:00:00Z"),
      })
      .run();
    if (failed) {
      tx.insert(deployments)
        .values({
          serviceId: service.id,
          environment,
          versionId: newVersion,
          startedAt: new Date("2026-09-16T08:29:40Z"),
          scenario: "health_check_failure",
          result: "failed",
          completedAt: new Date("2026-09-16T08:30:00Z"),
        })
        .run();
    }
  }
}

// One transaction keeps demo state and its history consistent if seeding fails.
db.transaction((tx) => {
  for (const slug of ["api", "web", "worker"]) {
    seedService(tx, slug);
  }
});

console.log("Seeded services, environment versions, and deployment history.");
