import type { AriaAttributes, ReactNode } from "react";

export function DescriptionItem({
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
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-2" aria-live={ariaLive}>
        {children}
      </dd>
    </div>
  );
}
