import { PageContainer } from "@/components/layouts/page-container";
import { PageHeader } from "@/components/ui/page-header";

export default function Loading() {
  return (
    <PageContainer aria-busy="true">
      <PageHeader title="Deployment" />
      <output className="mt-2xl block text-muted-foreground">Loading deployment details…</output>
    </PageContainer>
  );
}
