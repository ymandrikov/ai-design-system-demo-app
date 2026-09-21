"use client";

import { DescriptionItem } from "@/components/ui/description-item";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { VersionLabel } from "@/components/deployments/version-label";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { restart } from "./actions";

export function DeploymentActions({
  id,
  environment,
  currentVersion,
  canRetry,
  rollbackVersion,
  serviceName,
}: {
  id: number;
  environment: string;
  currentVersion: string;
  canRetry: boolean;
  rollbackVersion: string | null;
  serviceName: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function run(kind: "retry" | "rollback") {
    if (pending) return;
    setPending(true);
    setError("");
    try {
      const result = await restart(id, kind);
      if (result.error) {
        setError(result.error);
        setPending(false);
      } else if (result.id) {
        router.push(`/deployments/${result.id}`);
      }
    } catch {
      setError("Could not confirm the action. Check service history before trying again.");
      setPending(false);
    }
  }

  if (!canRetry && !rollbackVersion) return null;

  return (
    <div className="flex flex-col gap-l">
      <div className="flex flex-wrap items-center gap-xl">
        {canRetry && (
          <Button type="button" disabled={pending} onClick={() => run("retry")}>
            Retry deployment
          </Button>
        )}
        {rollbackVersion && (
          <ConfirmationDialog
            open={confirming}
            onOpenChange={(open) => {
              setConfirming(open);
              if (open) setError("");
            }}
            intent="destructive"
            triggerLabel="Roll back"
            title={`Roll back ${serviceName} in ${environment}?`}
            description="A successful rollback replaces the current version with the target version. This creates a new deployment and preserves history."
            confirmLabel="Roll back"
            onConfirm={() => run("rollback")}
            pending={pending}
            pendingLabel="Starting deployment…"
            error={error}
          >
            <dl className="grid gap-xl sm:grid-cols-2">
              <DescriptionItem label="Current version">
                <VersionLabel version={currentVersion} />
              </DescriptionItem>
              <DescriptionItem label="Target version">
                <VersionLabel version={rollbackVersion} />
              </DescriptionItem>
            </dl>
          </ConfirmationDialog>
        )}
      </div>
      {!rollbackVersion && (
        <div aria-live="polite" className={pending || error ? undefined : "sr-only"}>
          {pending && <p className="text-s text-muted-foreground">Starting deployment…</p>}
          {error && (
            <p role="alert" className="text-s text-destructive">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
