import type { ReactNode } from "react";

function BorderedCardRoot({ children }: { children: ReactNode }) {
  return <div className="flex flex-col rounded-md border bg-canvas-card text-content-card">{children}</div>;
}

function Section({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-xl p-xl">{children}</div>;
}

export const BorderedCard = Object.assign(BorderedCardRoot, { Section });
