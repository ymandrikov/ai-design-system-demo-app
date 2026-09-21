"use client";

import { useState, useTransition } from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { removeService } from "./delete-service-action";

export function DeleteServiceDialog({ id, name }: { id: number; name: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        setError("");
      }}
      intent="destructive"
      triggerLabel={`Delete service ${name}`}
      triggerIcon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6" />
        </svg>
      }
      fallbackFocus={() => document.getElementById("add-service-trigger")}
      title={`Delete service “${name}”?`}
      description="This permanently deletes the service from production and staging, including all versions and deployment history. Active deployments are also deleted. This cannot be undone."
      confirmLabel="Delete service"
      pending={pending}
      pendingLabel="Deleting service…"
      error={error}
      onConfirm={() => {
        if (pending) {
          return;
        }
        setError("");
        startTransition(async () => {
          try {
            const result = await removeService(id);
            if (result.error) {
              setError(result.error);
            } else {
              setOpen(false);
            }
          } catch {
            setError("Could not confirm deletion. Check your connection and try again.");
          }
        });
      }}
    />
  );
}
