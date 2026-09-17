import { and, eq, isNull } from "drizzle-orm";
import { db } from "./index";
import { deployments, environments, serviceEnvironments, services, serviceVersions } from "./schema";

// One transaction keeps demo state and its history consistent if seeding fails.
db.transaction((tx) => {
  for (const slug of ["api", "web", "worker"]) {
    tx.insert(services).values({ slug, name: slug }).onConflictDoNothing().run();
    const service = tx.select().from(services).where(eq(services.slug, slug)).get()!;
    // Illustrative commits for the predefined demo versions, not a real repository.
    for (const [version, commit, description, scenario] of [
      ["1.0.0", "a1b2c3d", "Initial stable release.", "success"],
      ["1.1.0", "e4f5a6b", "Performance improvements.", "success"],
      ["1.2.0", "b7c8d9e", "Demo failure: health check will fail; the working version is preserved.", "health_check_failure"],
    ] as const) {
      tx.insert(serviceVersions).values({ serviceId: service.id, version, commit, description, scenario }).onConflictDoNothing().run();
      tx.update(serviceVersions).set({ commit }).where(and(
        eq(serviceVersions.serviceId, service.id), eq(serviceVersions.version, version), isNull(serviceVersions.commit),
      )).run();
      tx.update(serviceVersions).set({ description, scenario }).where(and(eq(serviceVersions.serviceId, service.id), eq(serviceVersions.version, version))).run();
    }
    const versions = tx.select().from(serviceVersions).where(eq(serviceVersions.serviceId, service.id)).all();
    const oldVersion = versions.find((version) => version.version === "1.0.0")!.id;
    const newVersion = versions.find((version) => version.version === "1.1.0")!.id;
    for (const environment of environments) {
      const empty = slug === "worker" && environment === "staging";
      const failed = slug === "api" && environment === "production";
      const currentVersionId = environment === "production" ? oldVersion : newVersion;
      const inserted = tx.insert(serviceEnvironments).values({
        serviceId: service.id, environment,
        state: empty ? "not_deployed" : "healthy",
        currentVersionId: empty ? null : currentVersionId,
      }).onConflictDoNothing().returning().all();
      // Re-running the seed preserves existing environment state and history.
      if (!inserted.length || empty) continue;
      tx.insert(deployments).values({
        serviceId: service.id, environment, versionId: currentVersionId,
        startedAt: new Date("2026-09-15T09:59:40Z"), result: "succeeded", completedAt: new Date("2026-09-15T10:00:00Z"),
      }).run();
      if (failed) tx.insert(deployments).values({
        serviceId: service.id, environment, versionId: newVersion,
        startedAt: new Date("2026-09-16T08:29:40Z"), scenario: "health_check_failure", result: "failed", completedAt: new Date("2026-09-16T08:30:00Z"),
      }).run();
    }
  }
});

console.log("Seeded services, environment versions, and deployment history.");
