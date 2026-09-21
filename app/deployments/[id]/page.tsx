import { Separator } from "@/components/ui/separator";
import { Stack } from "@/components/layouts/stack";
import { BorderedCard } from "@/components/ui/bordered-card";
import { PageContent } from "@/components/layouts/page-content";
import { AppIdentity } from "@/components/ui/app-identity";
import { BackNavigation } from "@/components/ui/back-navigation";
import { TextLink } from "@/components/ui/text-link";
import { Time } from "@/components/ui/time";
import { DescriptionList } from "@/components/ui/description-list";
import { DescriptionItem } from "@/components/ui/description-item";
import { PageContainer } from "@/components/layouts/page-container";
import { notFound } from "next/navigation";
import { RefreshActiveDeployment } from "@/components/deployments/refresh-active-deployment";
import { CommitHash } from "@/components/deployments/commit-hash";
import { VersionLabel } from "@/components/deployments/version-label";
import { DeploymentResult } from "@/components/deployments/deployment-result";
import { PageHeader } from "@/components/ui/page-header";
import { getDeploymentDetails } from "@/lib/deployments";
import { deploymentKindLabels, environmentLabels } from "@/lib/deployments/presentation";
import { DeploymentActions } from "./deployment-actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Deployment | Deploy Board" };

export default async function DeploymentPage({ params }: PageProps<"/deployments/[id]">) {
  const { id } = await params;
  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }
  const data = getDeploymentDetails(Number(id));
  if (!data) {
    notFound();
  }
  const { deployment, service, version, actions, steps, logs, stage, percent, rollbackVersion, elapsedSeconds } = data;
  const serviceHref = `/services/${encodeURIComponent(service.slug)}?environment=${deployment.environment}`;
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
      <div className="mb-2xl">
        <BackNavigation label="Back to service">
          <TextLink href={serviceHref}>
            ← {service.name} · {environmentLabels[deployment.environment]}
          </TextLink>
        </BackNavigation>
      </div>
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
            <BorderedCard>
              <BorderedCard.Section>
                <DescriptionList>
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
                </DescriptionList>
              </BorderedCard.Section>
              <Separator />
              {/* Design-system exception: design-system/gaps.md#e-01-deployment-supporting-typography */}
              <BorderedCard.Section
                designSystemException={{
                  reason: "Keep deployment metadata and explanations at 14px without a typography-only wrapper.",
                  className: "text-sm",
                }}
              >
                <DescriptionList>
                  <DescriptionItem label="Commit">
                    {version.commit == null ? (
                      <DescriptionItem.Empty>Not recorded</DescriptionItem.Empty>
                    ) : (
                      <CommitHash hash={version.commit} />
                    )}
                  </DescriptionItem>
                  <DescriptionItem label="Duration">
                    {elapsedSeconds}s{!deployment.result && " elapsed"}
                  </DescriptionItem>
                  <DescriptionItem label="Started">
                    <Time value={deployment.startedAt} format="dateTime" />
                  </DescriptionItem>
                  {deployment.completedAt && (
                    <DescriptionItem label="Completed">
                      <Time value={deployment.completedAt} format="dateTime" />
                    </DescriptionItem>
                  )}
                </DescriptionList>
                <Stack spacing="md">
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
                    // oxlint-disable-next-line design/no-raw-color -- design-system/gaps.md#g-01-deployment-outcome-text-uses-a-raw-colour
                    <p className="text-[#777]">
                      {deployment.result === "failed"
                        ? "Deployment failed. This attempt did not change the environment's current version."
                        : "Deployment succeeded. The environment version was updated when this run completed."}
                    </p>
                  )}
                </Stack>
              </BorderedCard.Section>
            </BorderedCard>
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
                  className="rounded-md border bg-canvas-card p-xl text-content-card"
                >
                  <h3 className="font-medium">{step.name}</h3>
                  <p
                    className={`mt-md text-sm ${step.status === "failed" ? "text-content-destructive" : "text-content-subtle"}`}
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
                Logs <span className="text-sm font-normal text-content-subtle">(UTC)</span>
              </>
            }
          />
          <PageContent.SectionContent>
            <ol className="space-y-md rounded-md border bg-canvas-card p-xl font-mono text-sm text-content-card">
              {logs.map((log, index) => (
                <li key={index} className="flex flex-wrap gap-x-xl gap-y-sm">
                  <Time value={log.at} format="time" showTimeZone={false} />
                  <span className={`min-w-0 break-words ${log.level === "error" ? "text-content-destructive" : ""}`}>
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
