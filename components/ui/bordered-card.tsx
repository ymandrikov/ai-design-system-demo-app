import type { ReactNode } from "react";

export function BorderedCard({ children }: { children: ReactNode }) {
  return <div className="rounded-md border bg-canvas-card text-content-card">{children}</div>;
}
