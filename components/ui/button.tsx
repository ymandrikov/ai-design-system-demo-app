import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-m border-(length:--border-width) border-transparent bg-clip-padding text-s font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/(--alpha-half) active:not-aria-[haspopup]:translate-y-(--press-offset) disabled:pointer-events-none disabled:opacity-(--opacity-disabled) aria-invalid:border-border-invalid aria-invalid:ring-(length:--focus-ring-width) aria-invalid:ring-destructive-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon-l",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border-border-outline bg-outline hover:bg-outline-hover hover:text-foreground-hover aria-expanded:bg-outline-expanded aria-expanded:hover:bg-outline-hover aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_var(--alpha-secondary-hover))] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-ghost-hover hover:text-foreground-hover aria-expanded:hover:bg-ghost-hover aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive-surface text-destructive-foreground hover:bg-destructive-hover focus-visible:border-border-destructive-focus focus-visible:ring-destructive-ring",
        link: "text-primary underline-offset-(--link-underline-offset) hover:underline",
      },
      size: {
        default: "h-control-m gap-m px-l has-data-[icon=inline-end]:pr-m has-data-[icon=inline-start]:pl-m",
        xs: "h-control-xs gap-s rounded-m px-m text-xs in-data-[slot=button-group]:rounded-m has-data-[icon=inline-end]:pr-m has-data-[icon=inline-start]:pl-m [&_svg:not([class*='size-'])]:size-icon-s",
        sm: "h-control-s gap-s rounded-m px-l text-xs in-data-[slot=button-group]:rounded-m has-data-[icon=inline-end]:pr-m has-data-[icon=inline-start]:pl-m [&_svg:not([class*='size-'])]:size-icon-m",
        lg: "h-control-l gap-m px-l has-data-[icon=inline-end]:pr-m has-data-[icon=inline-start]:pl-m",
        icon: "size-control-m",
        "icon-xs":
          "size-control-xs rounded-m in-data-[slot=button-group]:rounded-m [&_svg:not([class*='size-'])]:size-icon-s",
        "icon-sm": "size-control-s rounded-m in-data-[slot=button-group]:rounded-m",
        "icon-lg": "size-control-l",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
