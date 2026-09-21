"use server";

import { revalidatePath } from "next/cache";
import { deleteService } from "@/lib/db/delete-service";

export async function removeService(id: number) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return { error: "Choose a valid service." };
  }
  try {
    deleteService(id);
  } catch (error) {
    console.error("Service deletion failed", error);
    return { error: "Could not delete the service. Try again." };
  }
  revalidatePath("/", "layout");
  return { error: "" };
}
