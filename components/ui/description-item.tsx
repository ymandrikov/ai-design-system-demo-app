import type { AriaAttributes, ReactNode } from "react";

function DescriptionItemRoot({
  label,
  children,
  "aria-live": ariaLive,
}: {
  label: string;
  children: ReactNode;
  "aria-live"?: AriaAttributes["aria-live"];
}) {
  return (
    <div>
      <dt className="text-s text-muted-foreground">{label}</dt>
      <dd className="mt-s" aria-live={ariaLive}>
        {children}
      </dd>
    </div>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}

function Emphasised({ children }: { children: ReactNode }) {
  return <span className="text-l font-semibold">{children}</span>;
}

export const DescriptionItem = Object.assign(DescriptionItemRoot, { Empty, Emphasised });
