"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-badge-height w-fit shrink-0 items-center justify-center gap-s overflow-hidden rounded-full border-(length:--border-width) border-transparent px-m py-xs text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/(--alpha-half) has-data-[icon=inline-end]:pr-m has-data-[icon=inline-start]:pl-m aria-invalid:border-destructive aria-invalid:ring-destructive/(--alpha-subtle) dark:aria-invalid:ring-destructive/(--alpha-medium) [&>svg]:pointer-events-none [&>svg]:size-icon-s!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/(--alpha-hover)",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/(--alpha-hover)",
        destructive:
          "bg-destructive/(--alpha-faint) text-destructive focus-visible:ring-destructive/(--alpha-subtle) dark:bg-destructive/(--alpha-subtle) dark:focus-visible:ring-destructive/(--alpha-medium) [a]:hover:bg-destructive/(--alpha-subtle)",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/(--alpha-half)",
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
