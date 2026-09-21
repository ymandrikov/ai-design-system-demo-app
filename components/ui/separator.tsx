"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { withDesignSystemException } from "@/lib/with-design-system-exception";

type SeparatorProps = Omit<SeparatorPrimitive.Props, "className" | "style"> & {
  className?: string;
  style?: CSSProperties;
};

function SeparatorBase({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      aria-hidden="true"
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-(--border-width) data-horizontal:w-full data-vertical:w-(--border-width) data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export const Separator = withDesignSystemException(SeparatorBase);
