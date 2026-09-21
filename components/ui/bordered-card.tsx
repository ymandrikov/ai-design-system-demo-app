import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { withDesignSystemException } from "@/lib/with-design-system-exception";

function BorderedCardRoot({ children }: { children: ReactNode }) {
  return <div className="flex flex-col rounded-md border bg-canvas-card text-content-card">{children}</div>;
}

function Section({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("flex flex-col gap-xl p-xl", className)} style={style}>
      {children}
    </div>
  );
}

export const BorderedCard = Object.assign(BorderedCardRoot, { Section: withDesignSystemException(Section) });
