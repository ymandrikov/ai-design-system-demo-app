import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-border-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-border-focus-ring active:not-aria-[haspopup]:translate-y-(--press-offset) disabled:pointer-events-none disabled:opacity-(--opacity-disabled) aria-invalid:border-border-invalid aria-invalid:ring-(length:--focus-ring-width) aria-invalid:ring-border-destructive-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon",
  {
    variants: {
      variant: {
        default: "bg-container-emphasis text-content-inverted hover:bg-container-emphasis-hover",
        outline:
          "border-border-outline bg-container-outline hover:bg-container-outline-hover hover:text-content-hover aria-expanded:bg-container-outline-expanded aria-expanded:hover:bg-container-outline-hover aria-expanded:text-content",
        destructive:
          "bg-container-destructive text-content-destructive hover:bg-container-destructive-hover focus-visible:border-border-destructive-focus focus-visible:ring-border-destructive-ring",
      },
      size: {
        default: "h-control gap-md px-lg has-data-[icon=inline-end]:pr-md has-data-[icon=inline-start]:pl-md",
        icon: "size-control",
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
