"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { withDesignSystemException } from "@/lib/with-design-system-exception";

type SeparatorProps = Omit<SeparatorPrimitive.Props, "className" | "style" | "orientation"> & {
  className?: string;
  style?: CSSProperties;
};

function SeparatorBase({ className, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      aria-hidden="true"
      data-slot="separator"
      orientation="horizontal"
      className={cn("h-(--border-width) w-full shrink-0 bg-border", className)}
      {...props}
    />
  );
}

export const Separator = withDesignSystemException(SeparatorBase);
