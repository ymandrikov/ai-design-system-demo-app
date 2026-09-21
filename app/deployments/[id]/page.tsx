import { StatusSummaryLayout } from "@/components/layouts/status-summary-layout";
import { PageContent } from "@/components/layouts/page-content";
import { AppIdentity } from "@/components/ui/app-identity";
import { TextLink } from "@/components/ui/text-link";
import { Time } from "@/components/ui/time";
import { DescriptionItem } from "@/components/ui/description-item";
import { PageContainer } from "@/components/layouts/page-container";
import { notFound } from "next/navigation";
import { RefreshActiveDeployment } from "@/components/deployments/refresh-active-deployment";
import { CommitHash } from "@/components/deployments/commit-hash";
import { VersionLabel } from "@/components/deployments/version-label";
import { DeploymentResult } from "@/components/deployments/deployment-result";
import { PageHeader } from "@/components/ui/page-header";
import { getDeploymentDetails, getDeploymentForm } from "@/lib/deployments";
import { deploymentKindLabels, environmentLabels } from "@/lib/deployments/presentation";
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
      <div className="mb-5xl">
        <AppIdentity />
      </div>
      <nav aria-label="Back to service" className="mb-2xl text-s">
        <TextLink href={serviceHref}>
          ← {service.name} · {environmentLabels[deployment.environment]}
        </TextLink>
      </nav>
      <PageContent>
        <PageHeader
          title={`Deployment #${deployment.id}`}
          description={`${service.name} · ${environmentLabels[deployment.environment]} · ${deploymentKindLabels[deployment.kind]}`}
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
            <StatusSummaryLayout
              primary={
                <>
                  <DescriptionItem label="Deployment status" aria-live="polite">
                    {deployment.result ? (
                      <DeploymentResult result={deployment.result} />
                    ) : (
                      <DescriptionItem.Emphasised>{stage}</DescriptionItem.Emphasised>
                    )}
                  </DescriptionItem>
                  <DescriptionItem label="Version">
                    <VersionLabel version={version.version} />
                  </DescriptionItem>
                </>
              }
            >
              <div className="space-y-xl">
                <dl className="flex flex-wrap gap-4xl">
                  <DescriptionItem label="Commit">
                    {version.commit == null ? (
                      <DescriptionItem.Empty>Not recorded</DescriptionItem.Empty>
                    ) : (
                      <CommitHash hash={version.commit} />
                    )}
                  </DescriptionItem>
                  <DescriptionItem label="Duration">
                    {elapsed}s{!deployment.result && " elapsed"}
                  </DescriptionItem>
                  <DescriptionItem label="Started">
                    <Time value={deployment.startedAt} format="dateTime" />
                  </DescriptionItem>
                  {deployment.completedAt && (
                    <DescriptionItem label="Completed">
                      <Time value={deployment.completedAt} format="dateTime" />
                    </DescriptionItem>
                  )}
                </dl>
                <div>
                  <p>{version.description}</p>
                  {deployment.sourceDeploymentId && (
                    <p>
                      Source:{" "}
                      <TextLink href={`/deployments/${deployment.sourceDeploymentId}`}>
                        Deployment #{deployment.sourceDeploymentId}
                      </TextLink>
                    </p>
                  )}
                  {deployment.result && (
                    <p className="text-muted-foreground">
                      {deployment.result === "failed"
                        ? "Deployment failed. This attempt did not change the environment's current version."
                        : "Deployment succeeded. The environment version was updated when this run completed."}
                    </p>
                  )}
                </div>
              </div>
            </StatusSummaryLayout>
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
            <ol className="grid gap-xl sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li
                  key={step.name}
                  aria-current={step.status === "active" ? "step" : undefined}
                  className="rounded-m border bg-card p-xl text-card-foreground"
                >
                  <h3 className="font-medium">{step.name}</h3>
                  <p
                    className={`mt-m text-s ${step.status === "failed" ? "text-destructive-foreground" : "text-muted-foreground"}`}
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
                Logs <span className="text-s font-normal text-muted-foreground">(UTC)</span>
              </>
            }
          />
          <PageContent.SectionContent>
            <ol className="space-y-m rounded-m border bg-card p-xl font-mono text-s text-card-foreground">
              {logs.map((log, index) => (
                <li key={index} className="flex flex-wrap gap-x-xl gap-y-s">
                  <Time value={log.at} format="time" showTimeZone={false} />
                  <span className={`min-w-0 break-words ${log.level === "error" ? "text-destructive-foreground" : ""}`}>
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
