import type { AriaAttributes, ReactNode } from "react";

export function PageContainer({ children, width = "wide", "aria-busy": busy }: {
  children: ReactNode;
  width?: "wide" | "narrow";
  "aria-busy"?: AriaAttributes["aria-busy"];
}) {
  return (
    <main
      className={`mx-auto w-full ${width === "narrow" ? "max-w-2xl" : "max-w-6xl"} px-5 py-10 sm:px-10 sm:py-16`}
      aria-busy={busy}
    >
      {children}
    </main>
  );
}
