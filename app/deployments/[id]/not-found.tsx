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
      <Link
        href="/"
        className="mt-6 inline-block text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Services
      </Link>
    </PageContainer>
  );
}
