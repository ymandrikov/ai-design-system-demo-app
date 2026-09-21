import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Stack({ children, spacing = "0" }: { children: ReactNode; spacing?: "0" | "md" }) {
  return <div className={cn("flex flex-col", spacing === "md" && "gap-md")}>{children}</div>;
}
