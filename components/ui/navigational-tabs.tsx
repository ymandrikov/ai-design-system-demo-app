import Link from "next/link";

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
    <nav aria-label={label} className="flex max-w-full overflow-x-auto">
      <div className="inline-flex min-h-control w-fit shrink-0 items-center justify-center rounded-md bg-container-muted p-sm">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            aria-current={item.href === currentHref ? "page" : undefined}
            data-active={item.href === currentHref ? "" : undefined}
            className="inline-flex h-full flex-1 items-center justify-center rounded-[max(0px,calc(var(--radius-md)-var(--spacing-sm)))] border border-transparent px-md py-xs text-sm font-medium whitespace-nowrap text-content-tab transition-all hover:text-content-hover focus-visible:border-border-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-border-focus-ring focus-visible:outline-(length:--focus-outline-thin) focus-visible:outline-border-focus data-[active]:shadow-sm data-[active]:border-border-tab-selected data-[active]:bg-container-tab-selected data-[active]:text-content"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
