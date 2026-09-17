import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "./index";
import { deployments, serviceEnvironments, services, serviceVersions, type Environment } from "./schema";

export function listServices(environment: Environment, slug?: string) {
  return db.select({
    id: services.id,
    name: services.name,
    slug: services.slug,
    state: serviceEnvironments.state,
    currentVersion: serviceVersions.version,
    lastResult: deployments.result,
    lastCompletedAt: deployments.completedAt,
  }).from(services)
    .leftJoin(serviceEnvironments, and(eq(serviceEnvironments.serviceId, services.id), eq(serviceEnvironments.environment, environment)))
    .leftJoin(serviceVersions, eq(serviceVersions.id, serviceEnvironments.currentVersionId))
    .leftJoin(deployments, eq(deployments.id, sql`(
      select id from deployments
      where service_id = ${services.id} and environment = ${environment}
      order by completed_at desc, id desc limit 1
    )`))
    .where(slug === undefined ? undefined : eq(services.slug, slug))
    .orderBy(asc(services.slug)).all();
}

export function getServiceDetails(slug: string, environment: Environment) {
  const service = listServices(environment, slug)[0];
  if (!service) return undefined;

  const history = db.select({
    id: deployments.id,
    version: serviceVersions.version,
    commit: serviceVersions.commit,
    result: deployments.result,
    completedAt: deployments.completedAt,
  }).from(deployments)
    .innerJoin(serviceVersions, eq(serviceVersions.id, deployments.versionId))
    .where(and(eq(deployments.serviceId, service.id), eq(deployments.environment, environment)))
    .orderBy(desc(deployments.completedAt), desc(deployments.id)).all();

  return { ...service, history };
}
