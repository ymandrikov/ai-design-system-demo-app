"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import type { Environment } from "@/lib/db/schema";

export function EnvironmentTabs({ environment, children }: {
  environment: Environment;
  children: ReactNode;
}) {
  const router = useRouter();

  // Local URL-sync exception: design-system/gaps.md#environment-tabs-url-synchronisation
  return <Tabs value={environment} onValueChange={(value) => {
    if ((value === "production" || value === "staging") && value !== environment) {
      router.push(`/?environment=${value}`, { scroll: false });
    }
  }}>{children}</Tabs>;
}
