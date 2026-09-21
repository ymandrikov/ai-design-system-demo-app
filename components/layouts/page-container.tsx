import type { AriaAttributes, ReactNode } from "react";

export function PageContainer({
  children,
  width = "wide",
  "aria-busy": busy,
}: {
  children: ReactNode;
  width?: "wide" | "narrow";
  "aria-busy"?: AriaAttributes["aria-busy"];
}) {
  return (
    <main
      className={`mx-auto w-full ${width === "narrow" ? "max-w-page-narrow" : "max-w-page-wide"} px-2xl py-4xl sm:px-4xl sm:py-6xl`}
      aria-busy={busy}
    >
      {children}
    </main>
  );
}
