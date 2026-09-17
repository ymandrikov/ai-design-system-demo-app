"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export function RefreshActiveDeployment({ active }: { active: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    if (!active || pending) return;
    const timer = setTimeout(() => startTransition(() => router.refresh()), 1000);
    return () => clearTimeout(timer);
  }, [active, pending, router]);
  return null;
}
