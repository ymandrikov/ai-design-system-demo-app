import { and, asc, desc, eq, getColumns, sql } from "drizzle-orm";
import { withDeploymentState } from "../deployments";
import { getProgress } from "../deployments/simulation";
import { deployments, serviceEnvironments, services, serviceVersions, type Environment } from "./schema";

function selectServices(
  db: Parameters<Parameters<typeof withDeploymentState>[0]>[0],
  environment: Environment,
  slug?: string,
) {
  return db
    .select({
      id: services.id,
      name: services.name,
      slug: services.slug,
      state: serviceEnvironments.state,
      currentVersion: serviceVersions.version,
      lastResult: deployments.result,
      lastDeploymentId: deployments.id,
      lastCompletedAt: deployments.completedAt,
    })
    .from(services)
    .leftJoin(
      serviceEnvironments,
      and(eq(serviceEnvironments.serviceId, services.id), eq(serviceEnvironments.environment, environment)),
    )
    .leftJoin(serviceVersions, eq(serviceVersions.id, serviceEnvironments.currentVersionId))
    .leftJoin(
      deployments,
      eq(
        deployments.id,
        sql`(
      select id from deployments
      where service_id = ${services.id} and environment = ${environment} and result is not null
      order by completed_at desc, id desc limit 1
    )`,
      ),
    )
    .where(slug === undefined ? undefined : eq(services.slug, slug))
    .orderBy(asc(services.slug))
    .all();
}

export function listServices(environment: Environment) {
  return withDeploymentState((tx) => selectServices(tx, environment));
}

export function getServiceDetails(slug: string, environment: Environment) {
  return withDeploymentState((db, now) => {
    const service = selectServices(db, environment, slug)[0];
    if (!service) return undefined;

    const history = db
      .select({
        ...getColumns(deployments),
        version: serviceVersions.version,
        commit: serviceVersions.commit,
      })
      .from(deployments)
      .innerJoin(serviceVersions, eq(serviceVersions.id, deployments.versionId))
      .where(and(eq(deployments.serviceId, service.id), eq(deployments.environment, environment)))
      .orderBy(desc(deployments.startedAt), desc(deployments.id))
      .all();

    return {
      ...service,
      history: history.map((deployment) => ({ ...deployment, progress: getProgress(deployment, now) })),
    };
  });
}
