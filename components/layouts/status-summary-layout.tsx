import type { ReactNode } from "react";

export function StatusSummaryLayout({ primary, children }: { primary: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      <dl className="flex flex-wrap gap-x-8 gap-y-4 p-4">{primary}</dl>
      <div className="border-t p-4 text-sm">{children}</div>
    </div>
  );
}
