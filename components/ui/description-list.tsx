import type { ReactNode } from "react";

export function DescriptionList({ children }: { children: ReactNode }) {
  return <dl className="flex flex-wrap gap-4xl">{children}</dl>;
}
