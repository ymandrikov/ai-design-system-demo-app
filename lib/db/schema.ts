import { sql } from "drizzle-orm";
import { check, foreignKey, index, integer, primaryKey, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const environments = ["production", "staging"] as const;
export type Environment = (typeof environments)[number];

export const serviceVersions = sqliteTable("service_versions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serviceId: integer("service_id").notNull().references(() => services.id),
  version: text("version").notNull(),
  commit: text("commit"),
}, (table) => [
  unique().on(table.serviceId, table.version),
  unique().on(table.serviceId, table.id),
]);

export const serviceEnvironments = sqliteTable("service_environments", {
  serviceId: integer("service_id").notNull().references(() => services.id),
  environment: text("environment", { enum: environments }).notNull(),
  state: text("state", { enum: ["healthy", "unavailable", "not_deployed"] }).notNull(),
  currentVersionId: integer("current_version_id"),
}, (table) => [
  primaryKey({ columns: [table.serviceId, table.environment] }),
  foreignKey({ columns: [table.serviceId, table.currentVersionId], foreignColumns: [serviceVersions.serviceId, serviceVersions.id] }),
  check("valid_environment", sql`${table.environment} in ('production', 'staging')`),
  check("valid_service_state", sql`${table.state} in ('healthy', 'unavailable', 'not_deployed')`),
]);

// Only completed history is modelled; simulation comes later.
export const deployments = sqliteTable("deployments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serviceId: integer("service_id").notNull(),
  environment: text("environment", { enum: environments }).notNull(),
  versionId: integer("version_id").notNull(),
  result: text("result", { enum: ["succeeded", "failed"] }).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }).notNull(),
}, (table) => [
  foreignKey({ columns: [table.serviceId, table.environment], foreignColumns: [serviceEnvironments.serviceId, serviceEnvironments.environment] }),
  foreignKey({ columns: [table.serviceId, table.versionId], foreignColumns: [serviceVersions.serviceId, serviceVersions.id] }),
  check("valid_deployment_result", sql`${table.result} in ('succeeded', 'failed')`),
  index("deployment_history").on(table.serviceId, table.environment, table.completedAt, table.id),
]);
