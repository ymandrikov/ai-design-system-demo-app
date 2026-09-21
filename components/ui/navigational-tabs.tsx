import Link from "next/link";
import { cn } from "@/lib/utils";
import { tabsListVariants, tabsTriggerClassName } from "./tabs-styles";

export function NavigationalTabs({
  label,
  items,
  currentHref,
}: {
  label: string;
  items: readonly { href: string; label: string }[];
  currentHref: string;
}) {
  return (
    <nav aria-label={label} data-horizontal="" className="group/tabs flex max-w-full overflow-x-auto">
      <div data-variant="default" className={cn(tabsListVariants(), "shrink-0")}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            aria-current={item.href === currentHref ? "page" : undefined}
            data-active={item.href === currentHref ? "" : undefined}
            className={tabsTriggerClassName}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
