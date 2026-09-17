"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { VersionLabel } from "@/components/deployments/version-label";
import { deploy } from "./actions";

export function DeployForm({ slug, environment, currentVersion, versions }: {
  slug: string;
  environment: "production" | "staging";
  currentVersion: string | null;
  versions: { id: number; version: string; commit: string | null; description: string }[];
}) {
  const [selectedId, setSelectedId] = useState(versions[0]?.id);
  const [state, action, pending] = useActionState(deploy, { error: "" });
  const selected = versions.find((version) => version.id === selectedId);

  return (
    <form action={action} className="space-y-6" aria-busy={pending}>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="environment" value={environment} />
      <fieldset disabled={pending} className="space-y-2">
        <legend className="mb-2 font-medium">Target version (required)</legend>
        {versions.map((version) => (
          <label key={version.id} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border bg-background px-4 py-3 text-foreground">
            <input type="radio" name="versionId" value={version.id} checked={selectedId === version.id} onChange={() => setSelectedId(version.id)} required aria-describedby={state.error ? "deploy-error" : undefined} className="accent-primary focus-visible:outline-2 focus-visible:outline-offset-4" />
            <span>v{version.version}</span>
          </label>
        ))}
      </fieldset>
      {selected && <>
        <dl className="space-y-4">
          <div><dt className="text-sm text-muted-foreground">Commit</dt><dd className="mt-1 break-all"><code>{selected.commit ?? "Not recorded"}</code></dd></div>
          <div><dt className="text-sm text-muted-foreground">Description</dt><dd className="mt-1">{selected.description}</dd></div>
        </dl>
        <div className="rounded-md bg-muted p-4">
          <p className="mb-2 text-sm text-muted-foreground">Current version → Target version</p>
          <p>{currentVersion ? <VersionLabel version={currentVersion} /> : "No version"} <span aria-hidden="true"> → </span> <VersionLabel version={selected.version} /></p>
        </div>
      </>}
      {environment === "production" && <p className="rounded-md border p-4 text-sm"><strong>Production warning.</strong> A successful deployment replaces the current production version. This is a local simulation.</p>}
      <div aria-live="polite" aria-atomic="true">
        {state.error && <p id="deploy-error" role="alert" className="text-sm text-destructive">{state.error}</p>}
        {pending && <p className="text-sm text-muted-foreground">Starting deployment…</p>}
      </div>
      {!versions.length && <p>No versions are available for this service.</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending || !versions.length} className="min-h-12 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50">{pending ? "Starting…" : "Deploy"}</button>
        <Link href={`/services/${encodeURIComponent(slug)}?environment=${environment}`} className="inline-flex min-h-12 items-center text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Cancel</Link>
      </div>
    </form>
  );
}
