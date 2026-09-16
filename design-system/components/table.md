---
sourcesHash: 7a5d47bc424aade8f8d5fb077523166ba164792e98fb017a70426b49d281eab0
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

Import `Table` from `@/components/ui/table`.

```tsx
<Table caption="Storage usage by volume">
  <thead><tr><th scope="col">Volume</th><th scope="col">Used</th></tr></thead>
  <tbody><tr><th scope="row">Assets</th><td>24 GB</td></tr></tbody>
</Table>
```

Required `caption` is a nonempty descriptive string naming the dataset and active filter, supplied by the consumer. It labels both the table and its scroll region; the caption is visually hidden. Required `children` contains native `thead` and `tbody` with valid rows and cells. Consumers supply headers, row identity, content, formatting and empty-state text. No additional caption is allowed.

No variants, events, methods, native-attribute forwarding or styling overrides are supported. The component owns cell padding, type size, surface, borders and scrolling using the existing card, muted, border and foreground tokens in [global CSS](../../app/globals.css). Consumers own surrounding spacing and inline content semantics; they must not override table geometry or cell styles.

## Behaviour and states

Static data is supplied by the consumer; no fetching, sorting or pagination is provided. At narrow widths the named region scrolls horizontally, keeping native table relationships. It is keyboard focusable with a visible outline. Long text wraps naturally; consumers may keep indivisible identifiers together. An empty dataset can be replaced by a page-level empty state or one body cell spanning all columns. No selection or click behaviour is implied by a row.

## Accessibility

### Provided by the component

Native table semantics, a caption, a named keyboard-scrollable region and a visible focus outline. The component does not use colour to encode data meaning.

### Required of consumers

Supply accurate text, column headers with `scope="col"` and row headers with `scope="row"` where rows have an identifying field. Keep cell order aligned with the headers. Express statuses in text, label any embedded controls, and supply correct `colSpan` for empty rows. Use the native structure shown above, not div-based rows or grid roles.
