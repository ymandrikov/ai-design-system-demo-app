import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { withDesignSystemException } from "@/lib/with-design-system-exception";

const variants = {
  default: "text-inherit underline-offset-(--link-underline-offset) hover:underline",
  title: "font-semibold text-content hover:text-content-emphasis-hover",
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
        "no-underline focus-visible:outline-(length:--focus-outline-width) focus-visible:outline-current focus-visible:outline-offset-(--focus-offset)",
        variants[variant],
        className,
      )}
    />
  );
}

export const TextLink = withDesignSystemException(TextLinkBase);
