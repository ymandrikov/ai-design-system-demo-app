import { PageHeader } from "@/components/ui/page-header";

export default function Loading() {
  return <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16" aria-busy="true">
    <PageHeader title="Deployment" />
    <output className="mt-6 block text-muted-foreground">Loading deployment details…</output>
  </main>;
}
