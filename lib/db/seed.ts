import { and, eq, isNull } from "drizzle-orm";
import { db } from "./index";
import { deployments, environments, serviceEnvironments, services, serviceVersions } from "./schema";

// One transaction keeps demo state and its history consistent if seeding fails.
db.transaction((tx) => {
  for (const slug of ["api", "web", "worker"]) {
    tx.insert(services).values({ slug, name: slug }).onConflictDoNothing().run();
    const service = tx.select().from(services).where(eq(services.slug, slug)).get()!;
    // Illustrative commits for the predefined demo versions, not a real repository.
    for (const [version, commit] of [["1.0.0", "a1b2c3d"], ["1.1.0", "e4f5a6b"]]) {
      tx.insert(serviceVersions).values({ serviceId: service.id, version, commit }).onConflictDoNothing().run();
      tx.update(serviceVersions).set({ commit }).where(and(
        eq(serviceVersions.serviceId, service.id), eq(serviceVersions.version, version), isNull(serviceVersions.commit),
      )).run();
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
        result: "succeeded", completedAt: new Date("2026-09-15T10:00:00Z"),
      }).run();
      if (failed) tx.insert(deployments).values({
        serviceId: service.id, environment, versionId: newVersion,
        result: "failed", completedAt: new Date("2026-09-16T08:30:00Z"),
      }).run();
    }
  }
});

console.log("Seeded services, environment versions, and deployment history.");
