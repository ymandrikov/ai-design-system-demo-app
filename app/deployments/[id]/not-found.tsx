import { TextLink } from "@/components/ui/text-link";
import { PageContainer } from "@/components/layouts/page-container";
import { PageHeader } from "@/components/ui/page-header";

export default function NotFound() {
  return (
    <PageContainer>
      <PageHeader
        title="Deployment not found"
        description="This deployment does not exist. Open a deployment from service history."
      />
      <div className="mt-2xl">
        <TextLink href="/">Services</TextLink>
      </div>
    </PageContainer>
  );
}
