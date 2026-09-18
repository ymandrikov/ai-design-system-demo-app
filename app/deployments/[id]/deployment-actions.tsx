"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { VersionLabel } from "@/components/deployments/version-label";
import { restart } from "./actions";

export function DeploymentActions({ id, environment, currentVersion, canRetry, rollbackVersion, serviceHref, active }: {
  id: number; environment: string; currentVersion: string; canRetry: boolean;
  rollbackVersion: string | null; serviceHref: string; active: boolean;
}) {
  const router = useRouter();
  const rollbackButton = useRef<HTMLButtonElement>(null);
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

  return <section aria-labelledby="actions-heading" aria-busy={pending}>
    <h2 id="actions-heading" className="mb-4 text-lg font-semibold">Next steps</h2>
    {active && <p className="mb-4 text-sm text-muted-foreground">Wait for this deployment to finish. You can return to the service and come back at any time.</p>}
    <div className="flex flex-wrap items-center gap-4">
      {canRetry && <Button type="button" disabled={pending} onClick={() => run("retry")}>Retry deployment</Button>}
      {rollbackVersion && <Button type="button" disabled={pending} ref={rollbackButton} aria-expanded={confirming} aria-controls="rollback-confirmation" onClick={() => setConfirming(!confirming)}>Roll back</Button>}
      <Link href={serviceHref} className={buttonVariants({ variant: "link" })}>Back to service</Link>
    </div>
    {confirming && rollbackVersion && <div id="rollback-confirmation" className="mt-6 space-y-4 rounded-lg border bg-card p-6 text-card-foreground">
      <h3 className="font-semibold">Confirm rollback in {environment}</h3>
      <p className="text-sm">A successful rollback replaces the current version with the target version. This creates a new deployment and preserves history.</p>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div><dt className="mb-2 text-sm text-muted-foreground">Current version</dt><dd><VersionLabel version={currentVersion} /></dd></div>
        <div><dt className="mb-2 text-sm text-muted-foreground">Target version</dt><dd><VersionLabel version={rollbackVersion} /></dd></div>
      </dl>
      <div className="flex flex-wrap gap-4">
        <Button type="button" disabled={pending} onClick={() => run("rollback")}>Confirm rollback</Button>
        <Button type="button" disabled={pending} onClick={() => { setConfirming(false); rollbackButton.current?.focus(); }}>Cancel</Button>
      </div>
    </div>}
    <div className="mt-4" aria-live="polite">
      {pending && <p className="text-sm text-muted-foreground">Starting deployment…</p>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  </section>;
}
