import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "cn";
import { withDesignSystemException } from "@/lib/with-design-system-exception";

const variants = {
  default: "text-inherit underline-offset-4 hover:underline",
  title: "font-semibold text-foreground hover:text-primary",
};

function TextLinkBase({
  variant = "default",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: "default" | "title" }) {
  return (
    <Link
      {...props}
      className={cn(
        "no-underline focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4",
        variants[variant],
        className,
      )}
    />
  );
}

export const TextLink = withDesignSystemException(TextLinkBase);
