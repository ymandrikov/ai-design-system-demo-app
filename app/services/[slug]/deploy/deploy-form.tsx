"use client";

import { DescriptionItem } from "@/components/ui/description-item";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { VersionLabel } from "@/components/deployments/version-label";
import { deploy } from "./actions";

export function DeployForm({
  slug,
  environment,
  currentVersion,
  versions,
}: {
  slug: string;
  environment: "production" | "staging";
  currentVersion: string | null;
  versions: { id: number; version: string; commit: string | null; description: string }[];
}) {
  const [selectedId, setSelectedId] = useState(versions[0]?.id);
  const [state, action, pending] = useActionState(deploy, { error: "" });
  const selected = versions.find((version) => version.id === selectedId);

  return (
    <form action={action} className="space-y-2xl" aria-busy={pending}>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="environment" value={environment} />
      <fieldset disabled={pending} className="space-y-m">
        <legend className="mb-m font-medium">Target version (required)</legend>
        {versions.map((version) => (
          <label
            key={version.id}
            className="flex min-h-option-min-height cursor-pointer items-center gap-l rounded-m border-(length:--border-width) bg-background px-xl py-l text-foreground"
          >
            <input
              type="radio"
              name="versionId"
              value={version.id}
              checked={selectedId === version.id}
              onChange={() => setSelectedId(version.id)}
              required
              aria-describedby={state.error ? "deploy-error" : undefined}
              className="accent-primary focus-visible:outline-(length:--focus-outline-width) focus-visible:outline-offset-(--focus-offset)"
            />
            <span>v{version.version}</span>
          </label>
        ))}
      </fieldset>
      {selected && (
        <>
          <dl className="space-y-xl">
            <DescriptionItem label="Commit">
              <code className="break-all">{selected.commit ?? "Not recorded"}</code>
            </DescriptionItem>
            <DescriptionItem label="Description">{selected.description}</DescriptionItem>
          </dl>
          <div className="rounded-m bg-card p-xl text-card-foreground">
            <p className="mb-m text-s text-muted-foreground">Current version → Target version</p>
            <p>
              {currentVersion ? <VersionLabel version={currentVersion} /> : "No version"}{" "}
              <span aria-hidden="true"> → </span> <VersionLabel version={selected.version} />
            </p>
          </div>
        </>
      )}
      {environment === "production" && (
        <p className="rounded-m border-(length:--border-width) p-xl text-s">
          <strong>Production warning.</strong> A successful deployment replaces the current production version. This is
          a local simulation.
        </p>
      )}
      <div aria-live="polite" aria-atomic="true">
        {state.error && (
          <p id="deploy-error" role="alert" className="text-s text-destructive">
            {state.error}
          </p>
        )}
        {pending && <p className="text-s text-muted-foreground">Starting deployment…</p>}
      </div>
      {!versions.length && <p>No versions are available for this service.</p>}
      <div className="flex flex-wrap items-center gap-xl">
        <Button type="submit" disabled={pending || !versions.length}>
          {pending ? "Starting…" : "Deploy"}
        </Button>
        <TextLink href={`/services/${encodeURIComponent(slug)}?environment=${environment}`}>Cancel</TextLink>
      </div>
    </form>
  );
}
