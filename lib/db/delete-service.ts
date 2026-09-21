import { eq } from "drizzle-orm";
import { withDeploymentState } from "../deployments";
import { deployments, serviceEnvironments, services, serviceVersions } from "./schema";

export function deleteService(id: number) {
  withDeploymentState((tx) => {
    tx.delete(deployments).where(eq(deployments.serviceId, id)).run();
    tx.delete(serviceEnvironments).where(eq(serviceEnvironments.serviceId, id)).run();
    tx.delete(serviceVersions).where(eq(serviceVersions.serviceId, id)).run();
    tx.delete(services).where(eq(services.id, id)).run();
  });
}
