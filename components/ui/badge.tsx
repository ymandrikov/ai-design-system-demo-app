"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-badge w-fit shrink-0 items-center justify-center gap-sm overflow-hidden rounded-full border border-transparent px-md py-xs text-xs font-medium whitespace-nowrap transition-all focus-visible:border-border-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-border-focus-ring has-data-[icon=inline-end]:pr-md has-data-[icon=inline-start]:pl-md aria-invalid:border-border-destructive aria-invalid:ring-border-destructive-ring",
  {
    variants: {
      variant: {
        secondary: "bg-container text-content-secondary",
        destructive: "bg-container-destructive text-content-destructive focus-visible:ring-border-destructive-ring",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

function Badge({
  className,
  variant = "secondary",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
