"use client";

import { PageContainer } from "@/components/layouts/page-container";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <PageContainer>
      <PageHeader
        title="Could not load deployment"
        description="Deployment state is stored on the server. Try loading it again."
      />
      <div className="mt-2xl">
        <Button type="button" onClick={() => retry()}>
          Try again
        </Button>
      </div>
    </PageContainer>
  );
}
