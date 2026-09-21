import type { ReactNode } from "react";

export function BorderedCard({ children }: { children: ReactNode }) {
  return <div className="rounded-m border bg-card text-card-foreground">{children}</div>;
}
