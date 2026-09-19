import { PageContent } from "@/components/layouts/page-content";
import { AppIdentity } from "@/components/ui/app-identity";
import { TextLink } from "@/components/ui/text-link";
import { DescriptionItem } from "@/components/ui/description-item";
import { PageContainer } from "@/components/layouts/page-container";
import { notFound } from "next/navigation";
import { RefreshActiveDeployment } from "@/components/deployments/refresh-active-deployment";
import { VersionLabel } from "@/components/deployments/version-label";
import { DeploymentResult } from "@/components/deployments/deployment-result";
import { PageHeader } from "@/components/ui/page-header";
import { getDeploymentDetails, getDeploymentForm } from "@/lib/deployments";
import { dateFormat } from "@/lib/deployments/presentation";
import { DeploymentActions } from "./deployment-actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Deployment | Deploy Board" };

export default async function DeploymentPage({ params }: PageProps<"/deployments/[id]">) {
  const { id } = await params;
  if (!/^[1-9]\d*$/.test(id)) notFound();
  const data = getDeploymentDetails(Number(id));
  if (!data) notFound();
  const { deployment, service, version, actions, steps, logs, stage, percent } = data;
  const serviceHref = `/services/${encodeURIComponent(service.slug)}?environment=${deployment.environment}`;
  const rollbackVersion =
    actions.rollbackVersionId === null
      ? null
      : (getDeploymentForm(service.slug, deployment.environment)?.versions.find(
          (item) => item.id === actions.rollbackVersionId,
        )?.version ?? null);
  const elapsed = Math.max(
    0,
    Math.floor(((deployment.completedAt ?? new Date()).getTime() - deployment.startedAt.getTime()) / 1000),
  );
  const stepLabels: Record<string, string> = {
    pending: "Waiting",
    active: "In progress",
    succeeded: "Succeeded",
    failed: "Failed",
  };

  return (
    <PageContainer>
      <div className="mb-12">
        <AppIdentity />
      </div>
      <nav aria-label="Back to service" className="mb-6 text-sm">
        <TextLink href={serviceHref}>
          ← {service.name} · {deployment.environment}
        </TextLink>
      </nav>
      <PageContent>
        <PageHeader
          title={`Deployment #${deployment.id}`}
          description={`${service.name} · ${deployment.environment} · ${deployment.kind}`}
          controls={
            actions.canRetry || rollbackVersion ? (
              <DeploymentActions
                key={`actions-${deployment.id}`}
                id={deployment.id}
                environment={deployment.environment}
                currentVersion={version.version}
                canRetry={actions.canRetry}
                rollbackVersion={rollbackVersion}
                serviceName={service.name}
              />
            ) : undefined
          }
        />
        <RefreshActiveDeployment key={`refresh-${deployment.id}`} active={!deployment.result} />
        <PageContent.Section aria-label="Deployment summary">
          <PageContent.SectionContent>
            <div className="rounded-lg border bg-card p-6 text-card-foreground">
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <DescriptionItem label="Version">
                  <VersionLabel version={version.version} />
                </DescriptionItem>
                <DescriptionItem label="Commit">
                  <code className="break-all">{version.commit ?? "Not recorded"}</code>
                </DescriptionItem>
                <DescriptionItem label="Deployment status" aria-live="polite">
                  {deployment.result ? (
                    <DeploymentResult result={deployment.result} />
                  ) : (
                    <span className="font-medium">{stage}</span>
                  )}
                </DescriptionItem>
                <DescriptionItem label="Duration">
                  <span className="font-medium">
                    {elapsed}s{!deployment.result && " elapsed"}
                  </span>
                </DescriptionItem>
              </dl>
              <p className="mt-6 text-sm">{version.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Started{" "}
                <time dateTime={deployment.startedAt.toISOString()}>{dateFormat.format(deployment.startedAt)} UTC</time>
                {deployment.completedAt && (
                  <>
                    {" "}
                    · Completed{" "}
                    <time dateTime={deployment.completedAt.toISOString()}>
                      {dateFormat.format(deployment.completedAt)} UTC
                    </time>
                  </>
                )}
              </p>
              {deployment.sourceDeploymentId && (
                <p className="mt-2 text-sm">
                  Source:{" "}
                  <TextLink href={`/deployments/${deployment.sourceDeploymentId}`}>
                    Deployment #{deployment.sourceDeploymentId}
                  </TextLink>
                </p>
              )}
              {deployment.result && (
                <p className="mt-4 text-sm">
                  {deployment.result === "failed"
                    ? "Deployment failed. The previous working version was preserved."
                    : "Deployment succeeded. The environment version was updated when this run completed."}
                </p>
              )}
            </div>
          </PageContent.SectionContent>
        </PageContent.Section>
        <PageContent.Section aria-labelledby="stages-heading">
          <PageContent.SectionHeader
            id="stages-heading"
            title="Deployment stages"
            description={
              <>
                {percent}% processed{!deployment.result && " · Updates every second"}
              </>
            }
          />
          <PageContent.SectionContent>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li
                  key={step.name}
                  aria-current={step.status === "active" ? "step" : undefined}
                  className="rounded-lg border bg-card p-4 text-card-foreground"
                >
                  <h3 className="font-medium">{step.name}</h3>
                  <p
                    className={`mt-2 text-sm ${step.status === "failed" ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {stepLabels[step.status]}
                  </p>
                </li>
              ))}
            </ol>
          </PageContent.SectionContent>
        </PageContent.Section>
        <PageContent.Section aria-labelledby="logs-heading">
          <PageContent.SectionHeader
            id="logs-heading"
            title={
              <>
                Logs <span className="text-sm font-normal text-muted-foreground">(UTC)</span>
              </>
            }
          />
          <PageContent.SectionContent>
            <ol className="space-y-2 rounded-lg border bg-card p-4 font-mono text-sm text-card-foreground">
              {logs.map((log, index) => (
                <li key={index} className="flex flex-wrap gap-x-4 gap-y-1">
                  <time dateTime={log.at.toISOString()} className="text-muted-foreground">
                    {log.at.toISOString().slice(11, 19)}
                  </time>
                  <span className={`min-w-0 break-words ${log.level === "error" ? "text-destructive" : ""}`}>
                    {log.level.toUpperCase()} · {log.message}
                  </span>
                </li>
              ))}
            </ol>
          </PageContent.SectionContent>
        </PageContent.Section>
      </PageContent>
    </PageContainer>
  );
}
