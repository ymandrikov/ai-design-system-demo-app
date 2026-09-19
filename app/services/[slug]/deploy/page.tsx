import { PageContent } from "@/components/layouts/page-content";
import { AppIdentity } from "@/components/ui/app-identity";
import { PageContainer } from "@/components/layouts/page-container";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { getDeploymentForm } from "@/lib/deployments";
import { environmentLabels } from "@/lib/deployments/presentation";
import { DeployForm } from "./deploy-form";

export const metadata = { title: "Deploy | Deploy Board" };

export default async function DeployPage({ params, searchParams }: PageProps<"/services/[slug]/deploy">) {
  const { slug } = await params;
  const query = await searchParams;
  const environment = query.environment === "staging" ? "staging" : "production";
  const data = getDeploymentForm(slug, environment);
  if (!data || !data.configured) notFound();
  return (
    <PageContainer width="narrow">
      <div className="mb-12">
        <AppIdentity />
      </div>
      <PageContent>
        <PageHeader
          title={`Deploy ${data.service.name}`}
          description={`Service: ${data.service.name} · Environment: ${environmentLabels[environment]}`}
        />
        <PageContent.Section aria-label="Deployment form">
          <PageContent.SectionContent>
            <DeployForm
              slug={data.service.slug}
              environment={environment}
              versions={data.versions}
              currentVersion={data.currentVersion}
            />
          </PageContent.SectionContent>
        </PageContent.Section>
      </PageContent>
    </PageContainer>
  );
}
