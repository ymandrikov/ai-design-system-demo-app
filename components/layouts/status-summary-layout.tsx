import type { ReactNode } from "react";

export function StatusSummaryLayout({ primary, children }: { primary: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-m border-(length:--border-width) bg-card text-card-foreground">
      <dl className="flex flex-wrap gap-4xl p-xl">{primary}</dl>
      <div className="border-t-(length:--border-width) p-xl text-s">{children}</div>
    </div>
  );
}
