"use client";

import { TextLink } from "@/components/ui/text-link";
import { PageContainer } from "@/components/layouts/page-container";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/page-header";

function BackToServices() {
  const params = useSearchParams();
  const values = params.getAll("environment");
  const environment = values.length === 1 && values[0] === "staging" ? "staging" : "production";
  return <TextLink href={`/?environment=${environment}`}>← Services</TextLink>;
}

export default function ServiceNotFound() {
  return (
    <PageContainer>
      <PageHeader title="Service not found" description="This service does not exist in Deploy Board." />
      <nav aria-label="Back to services" className="mt-2xl text-s">
        <Suspense>
          <BackToServices />
        </Suspense>
      </nav>
    </PageContainer>
  );
}
