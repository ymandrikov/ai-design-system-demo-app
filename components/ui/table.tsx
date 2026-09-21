import type * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table"> & { "aria-label": string }) {
  return (
    // Keep the horizontal scroll region reachable by keyboard.
    <section
      aria-label={props["aria-label"]}
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-md border bg-canvas-card text-content-card focus-visible:outline-(length:--focus-outline-width) focus-visible:outline-offset-(--focus-offset) focus-visible:outline-content"
    >
      <table
        data-slot="table"
        className={cn("w-full min-w-table table-fixed caption-bottom text-sm", className)}
        {...props}
      />
    </section>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("border-b transition-colors hover:bg-table-row-hover", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-table-header px-md text-left align-middle font-medium whitespace-normal break-words text-content [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-md align-middle whitespace-normal break-words [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn("mt-xl text-sm text-content-subtle", className)} {...props} />
  );
}

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption };
