import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  controls,
}: {
  title: string;
  description?: string;
  controls?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-6">
      <div className="min-w-0 max-w-full wrap-anywhere">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </div>
      {controls != null && <div className="min-w-0 max-w-full">{controls}</div>}
    </header>
  );
}
