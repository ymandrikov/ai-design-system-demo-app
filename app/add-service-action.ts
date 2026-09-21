"use server";

import { revalidatePath } from "next/cache";
import { createService } from "@/lib/db/create-service";

export async function addService(formData: FormData) {
  const input = formData.get("name");
  const environment = formData.get("environment");
  const name = typeof input === "string" ? input.trim() : "";
  if (!/^[a-zA-Z0-9-]{1,64}$/.test(name)) {
    return { error: "Use 1–64 characters: Latin letters, numbers or hyphens." };
  }
  if (environment !== "production" && environment !== "staging") {
    return { error: "Choose a valid environment and try again." };
  }

  let service;
  try {
    service = createService(name);
  } catch (error) {
    console.error("Service creation failed", error);
    return { error: "Could not create the service. Try again." };
  }
  if (!service) {
    return { error: "A service with this name already exists. Choose another name." };
  }
  revalidatePath("/");
  return { href: `/services/${encodeURIComponent(service.slug)}?environment=${environment}` };
}
