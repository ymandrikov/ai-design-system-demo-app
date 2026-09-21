"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-badge-height w-fit shrink-0 items-center justify-center gap-s overflow-hidden rounded-full border border-transparent px-m py-xs text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/(--alpha-half) has-data-[icon=inline-end]:pr-m has-data-[icon=inline-start]:pl-m aria-invalid:border-border-destructive aria-invalid:ring-destructive-ring [&>svg]:pointer-events-none [&>svg]:size-icon-s!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-badge-secondary-hover",
        destructive:
          "bg-destructive-surface text-destructive-foreground focus-visible:ring-destructive-ring [a]:hover:bg-badge-destructive-hover",
        outline: "border-border text-foreground [a]:hover:bg-badge-outline-hover [a]:hover:text-muted-foreground-hover",
        ghost: "hover:bg-ghost-hover hover:text-muted-foreground-hover",
        link: "text-primary underline-offset-(--link-underline-offset) hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
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
