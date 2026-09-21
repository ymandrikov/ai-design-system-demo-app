"use server";

import { revalidatePath } from "next/cache";
import { DeploymentError, retryDeployment, rollbackDeployment } from "@/lib/deployments";

export async function restart(id: number, kind: "retry" | "rollback") {
  if (!Number.isSafeInteger(id) || id <= 0 || (kind !== "retry" && kind !== "rollback")) {
    return { error: "Choose a valid deployment action." };
  }
  try {
    const deployment = kind === "retry" ? retryDeployment(id) : rollbackDeployment(id);
    revalidatePath("/", "layout");
    return { id: deployment.id };
  } catch (error) {
    if (error instanceof DeploymentError) {
      return { error: error.message };
    }
    console.error("Deployment action failed", error);
    return { error: "Could not start deployment. Reload the service history before trying again." };
  }
}
