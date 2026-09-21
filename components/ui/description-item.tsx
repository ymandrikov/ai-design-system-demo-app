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
      <dt className="text-sm text-content-subtle">{label}</dt>
      <dd className="mt-sm" aria-live={ariaLive}>
        {children}
      </dd>
    </div>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <span className="text-content-subtle">{children}</span>;
}

function Emphasised({ children }: { children: ReactNode }) {
  return <span className="text-md font-semibold">{children}</span>;
}

export const DescriptionItem = Object.assign(DescriptionItemRoot, { Empty, Emphasised });
