"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/page-header";

function BackToServices() {
  const params = useSearchParams();
  const values = params.getAll("environment");
  const environment = values.length === 1 && values[0] === "staging" ? "staging" : "production";
  return <Link href={`/?environment=${environment}`} className="text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">← Services</Link>;
}

export default function ServiceNotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
      <PageHeader title="Service not found" description="This service does not exist in Deploy Board." />
      <nav aria-label="Back to services" className="mt-6 text-sm"><Suspense><BackToServices /></Suspense></nav>
    </main>
  );
}
