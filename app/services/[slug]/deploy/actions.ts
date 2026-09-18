"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DeploymentError, startDeployment } from "@/lib/deployments";

export async function deploy(_previous: { error: string }, formData: FormData) {
  const slug = formData.get("slug");
  const environment = formData.get("environment");
  const version = formData.get("versionId");
  if (
    typeof slug !== "string" ||
    !slug ||
    (environment !== "production" && environment !== "staging") ||
    typeof version !== "string" ||
    !/^[1-9]\d*$/.test(version)
  ) {
    return { error: "Choose a valid service, environment and version." };
  }
  let deployment;
  try {
    deployment = startDeployment({ slug, environment, versionId: Number(version) });
  } catch (error) {
    if (error instanceof DeploymentError) return { error: error.message };
    console.error("Deployment start failed", error);
    return { error: "Could not start deployment. Reload the service history before trying again." };
  }
  revalidatePath("/");
  revalidatePath(`/services/${encodeURIComponent(slug)}`);
  redirect(`/deployments/${deployment.id}`);
}
