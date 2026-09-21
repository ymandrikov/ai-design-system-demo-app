---
sourcesHash: 6517d55a04f57578b357f52c8f9b1dfb2d97c1ee27a269a87f7baee765b0f208
id: table
description: Compare records across shared fields in a read-only semantic table, with horizontal scrolling when the columns exceed available width.
status: discoverable
sources:
  - components/ui/table.tsx
---

# Table

## When to use

All criteria must hold:

- Users compare multiple records with the same fields, where column and row relationships convey meaning.
- The task is reading data; native table content is sufficient without spreadsheet cell navigation or editing.

## When not to use

- A sequence of independent summaries without common fields: use a native list.
- Users need spreadsheet selection, editing or arrow-key cell navigation: this component has no grid interaction model.
- The table would only position unrelated page regions: use page layout markup.

## Public API

### React

The local source is based on [shadcn Table (base-nova)](https://ui.shadcn.com/docs/components/base/table), with the existing named, keyboard-focusable scroll region and card surface retained. It has no client-only behaviour.

Import the compound parts from `@/components/ui/table`.

```tsx
<Table aria-label="Storage usage by volume">
  <TableCaption className="sr-only">Storage usage by volume</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Volume</TableHead>
      <TableHead scope="col">Used</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableHead scope="row">Assets</TableHead>
      <TableCell>24 GB</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

`Table` requires a nonempty `aria-label` naming the dataset and active filter; it labels both the table and its scroll region. Supply one matching `TableCaption` as the first child. Use `className="sr-only"` when the surrounding page already visibly identifies the dataset; otherwise the caption is visible below the table.

`TableHeader`, `TableBody` and optional `TableFooter` contain `TableRow` children. Use the footer for aggregate or summary rows. Rows contain `TableHead` (native th) or `TableCell` (native td). Use `TableHead scope="col"` for column headers and `TableHead scope="row"` for row identities, including in the body. Consumers own content, ordering, formatting and empty-state text.

All parts forward native attributes, including refs and events, to their corresponding native element. There are no custom events, methods or variants. Native attributes supply semantics and content relationships; do not replace table roles or introduce row click/selection behaviour. `data-slot` identifies each part. The scroll section's focusability and label remain component-owned.

The component owns shadcn cell spacing, typography, borders and hover treatment, using existing semantic tokens in [global CSS](../tokens/semantic.css). It retains the project's rounded card surface. Consumer `className` may set layout widths/alignment or hide the caption; do not override colours, typography or cell padding. Consumers own surrounding spacing and inline content semantics.

## Behaviour and states

Static data is supplied by the consumer; no fetching, sorting or pagination is provided. At narrow widths the named region scrolls horizontally, keeping native table relationships. It is keyboard focusable with a visible outline. The table uses fixed layout with equal-width columns by default and a minimum width of 56rem, keeping column widths independent of environment data. Consumers may set column widths on first-row headers when fields need different proportions; those widths must remain the same across environment filters. Long cell text wraps within its column. The minimum width preserves room for the application’s five columns; narrower viewports scroll inside the region. An empty dataset can be replaced by a page-level empty state or one body cell spanning all columns. No selection or click behaviour is implied by a row.

## Accessibility

### Provided by the component

Native table semantics, a caption component, a named keyboard-scrollable region and a visible focus outline. The component does not use colour to encode data meaning.

### Required of consumers

Supply a descriptive aria-label and matching TableCaption, accurate text, column headers with `scope="col"` and row headers with `scope="row"` where rows have an identifying field. Keep cell order aligned with the headers. Express statuses in text, label any embedded controls, and supply correct `colSpan` for empty rows. Use the compound structure shown above, not div-based rows or grid roles.
