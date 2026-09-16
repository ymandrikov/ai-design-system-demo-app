import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "./index";
import { deployments, serviceEnvironments, services, serviceVersions, type Environment } from "./schema";

export function listServices(environment: Environment) {
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
    .orderBy(asc(services.slug)).all();
}
