import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const spacingClasses = {
  "0": "gap-0",
  xs: "gap-xs",
  s: "gap-s",
  m: "gap-m",
  l: "gap-l",
  xl: "gap-xl",
  "2xl": "gap-2xl",
  "3xl": "gap-3xl",
  "4xl": "gap-4xl",
  "5xl": "gap-5xl",
  "6xl": "gap-6xl",
};

export function Stack({ children, spacing = "0" }: { children: ReactNode; spacing?: keyof typeof spacingClasses }) {
  return <div className={cn("flex flex-col", spacingClasses[spacing])}>{children}</div>;
}
