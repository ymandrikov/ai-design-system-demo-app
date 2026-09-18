import type { ReactNode } from "react";

function PageContentRoot({ children }: { children: ReactNode }) {
  return <div className="flex flex-col [&>header+section]:mt-8 [&>section+section]:mt-10">{children}</div>;
}

function Section({
  children,
  "aria-label": label,
  "aria-labelledby": labelledBy,
}: {
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section aria-label={label} aria-labelledby={labelledBy} className="flex flex-col gap-4">
      {children}
    </section>
  );
}

function SectionHeader({ id, title, description }: { id: string; title: ReactNode; description?: ReactNode }) {
  return (
    <header className="flex flex-col gap-2">
      <h2 id={id} className="text-lg font-semibold">
        {title}
      </h2>
      {description != null && <p className="text-sm text-muted-foreground">{description}</p>}
    </header>
  );
}

function SectionContent({ children }: { children: ReactNode }) {
  return <div className="min-w-0">{children}</div>;
}

export const PageContent = Object.assign(PageContentRoot, { Section, SectionHeader, SectionContent });
