import { db } from "./index";
import { demoVersions } from "./demo-versions";
import { environments, serviceEnvironments, services, serviceVersions } from "./schema";

export function createService(name: string) {
  return db.transaction((tx) => {
    const service = tx
      .insert(services)
      .values({ name, slug: name.toLowerCase() })
      .onConflictDoNothing({ target: services.slug })
      .returning()
      .get();
    if (!service) {
      return undefined;
    }
    tx.insert(serviceEnvironments)
      .values(
        environments.map((environment) => ({ serviceId: service.id, environment, state: "not_deployed" as const })),
      )
      .run();
    tx.insert(serviceVersions)
      .values(demoVersions.map((version) => ({ ...version, serviceId: service.id })))
      .run();
    return service;
  });
}
