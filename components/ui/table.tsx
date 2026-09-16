import type { ReactNode } from "react";

export function Table({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    // A scroll region must be reachable to scroll overflowing columns by keyboard.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <section aria-label={caption} tabIndex={0} className="overflow-x-auto rounded-lg border bg-card text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
      <table className="w-full text-left text-sm [&_th]:px-6 [&_th]:py-4 [&_th]:font-medium [&_td]:px-6 [&_td]:py-5 [&_td]:align-middle [&_thead]:border-b [&_thead]:bg-muted [&_thead]:text-muted-foreground [&_tbody_tr:not(:last-child)]:border-b">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </section>
  );
}
