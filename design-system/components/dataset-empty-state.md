---
sourcesHash: 16a693eba018ef7539ec6952c16b9bfb83f245a43e8455e4d7661908faa34455
id: dataset-empty-state
description: Explain an empty dataset in place of its table with a heading and contextual description.
status: discoverable
sources:
  - components/ui/dataset-empty-state.tsx
examples:
  - app/page.tsx
---

# DatasetEmptyState

## When to use

All criteria must hold:

- A loaded dataset has no records and its table is replaced by explanatory content.
- A heading and paragraph fully explain the absence of records without controls.

## When not to use

- The route failed, is loading or was not found: keep the route's own fallback.
- Only a field is missing within a record: use inline missing-value text.
- The empty message belongs inside a retained table: use a TableCell spanning its columns.
- Recovery requires an action or richer content: use a page-owned composition.

## Public API

### React

Import `DatasetEmptyState` from `@/components/ui/dataset-empty-state`.

```tsx
<DatasetEmptyState
  headingLevel="h2"
  title="No services yet"
  description="Services will appear here when they are added."
/>
```

- Required `title: string` supplies a meaningful, nonempty empty-dataset heading.
- Required `description: string` explains the absence of records in context.
- Required `headingLevel: "h2" | "h3"` follows the surrounding heading hierarchy:
  use h2 directly under the page's h1, or h3 beneath an existing h2 section heading.
  There is no default; consumers choose the semantic level, not a visual variant.

The component owns the existing A-02 treatment: rounded border, card surface paired
with card foreground, spacing-6 horizontal and spacing-16 vertical padding, centered
text, an lg semibold heading and a small muted paragraph separated by spacing-2.
The owner's A-02 implementation request authorizes sharing this existing treatment.
Tokens resolve through [global CSS](../../app/globals.css) in light and dark themes.
Consumers own outer spacing, placement, copy and the empty-data condition.
No children, actions, styling overrides, native-attribute forwarding, events or methods
are exposed. The component supports server rendering without client state.

## Behaviour and states

Renders a section with a heading followed by a paragraph. Text uses normal wrapping
without truncation. Both heading levels have identical styling. The component does
not fetch or inspect data and has no loading, error, retry or interactive states.

## Accessibility

### Provided by the component

A native h2 or h3 and paragraph preserve semantic reading order. No focus handling,
live announcements or tab stops are introduced. The explanation is visible text.

### Required of consumers

Render only for a loaded empty dataset, outside table markup. Supply descriptive
copy and select the heading level that preserves the surrounding hierarchy. Keep
the page's h1 and any parent h2 outside this component.
