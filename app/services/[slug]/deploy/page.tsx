import { AppIdentity } from "@/components/ui/app-identity";
import { PageContainer } from "@/components/layouts/page-container";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { getDeploymentForm } from "@/lib/deployments";
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
      <div className="mb-8">
        <PageHeader
          title={`Deploy ${data.service.name}`}
          description={`Service: ${data.service.name} · Environment: ${environment}`}
        />
      </div>
      <DeployForm
        slug={data.service.slug}
        environment={environment}
        versions={data.versions}
        currentVersion={data.currentVersion}
      />
    </PageContainer>
  );
}
