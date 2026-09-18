"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
    <PageHeader title="Could not load deployment" description="Deployment state is stored on the server. Try loading it again." />
    <div className="mt-6"><Button type="button" onClick={() => retry()}>Try again</Button></div>
  </main>;
}
