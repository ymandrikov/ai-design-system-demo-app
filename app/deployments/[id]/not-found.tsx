import { textLinkClassName } from "@/components/ui/text-link-styles";
import { PageContainer } from "@/components/layouts/page-container";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

export default function NotFound() {
  return (
    <PageContainer>
      <PageHeader
        title="Deployment not found"
        description="This deployment does not exist. Open a deployment from service history."
      />
      <Link href="/" className={`mt-6 inline-block ${textLinkClassName}`}>
        Services
      </Link>
    </PageContainer>
  );
}
