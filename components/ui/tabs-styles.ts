import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-m p-s text-muted-foreground group-data-horizontal/tabs:min-h-control-m group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-s bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const tabsTriggerClassName = cn(
  "relative inline-flex h-full flex-1 items-center justify-center gap-m rounded-m group-data-[variant=default]/tabs-list:rounded-[max(0px,calc(var(--radius-m)-var(--spacing-s)))] border-(length:--border-width) border-transparent px-m py-xs text-s font-medium whitespace-nowrap text-foreground/(--alpha-strong) transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/(--alpha-half) focus-visible:outline-(length:--focus-outline-thin) focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-(--opacity-disabled) has-data-[icon=inline-end]:pr-s has-data-[icon=inline-start]:pl-s aria-disabled:pointer-events-none aria-disabled:opacity-(--opacity-disabled) dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-s group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon-l",
  "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
  "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/(--alpha-muted) dark:data-active:text-foreground",
  "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[calc(-1*(var(--spacing-s)+var(--border-width)))] group-data-horizontal/tabs:after:h-(--indicator-thickness) group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-s group-data-vertical/tabs:after:w-(--indicator-thickness) group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
);
