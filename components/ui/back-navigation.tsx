import type { ReactNode } from "react";

export function BackNavigation({ label, children }: { label: string; children: ReactNode }) {
  return (
    <nav aria-label={label} className="text-s">
      {children}
    </nav>
  );
}
