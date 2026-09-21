---
sourcesHash: 56eb2ff9c7faf0362067c11e71705055b66acec34af4e12a87ebfe5e9e4f65f3
id: description-item
description: Present one named read-only property and its value within a description list, with consistent label styling and spacing.
status: discoverable
sources:
  - components/ui/description-item.tsx
---

# DescriptionItem

## When to use

All criteria must hold:

- The user reads a named property of a subject, with its value directly associated with that name.
- The property belongs to a description list rather than a table comparing records across common columns.
- The value is read-only information rather than an editable control or standalone process message.

## When not to use

- The user enters or selects a value: use a labelled form control instead.
- The content is a table field: retain the native relationships supplied by [Table](table.md).
- The text explains a page, action or process without naming a property: retain its paragraph or existing owning component.

## Public API

### React

Import `DescriptionItem` from `@/components/ui/description-item`.

```tsx
<dl>
  <DescriptionItem label="Deployment status" aria-live="polite">
    <DeploymentResult result="succeeded" />
  </DescriptionItem>
</dl>
```

Required `label: string` names the property with meaningful nonempty text.
Required `children: ReactNode` supplies its read-only value, including explicit text
when data is missing. Use [VersionLabel](version-label.md) for recorded versions,
[DeploymentResult](deployment-result.md) for completed deployment outcomes, [CommitHash](commit-hash.md)
for commit identifiers, and ordinary text for other values.

Value styling is composed with children:

- Plain children inherit surrounding text styling and are the default. Use ordinary
  text or components such as VersionLabel and DeploymentResult directly.
- `DescriptionItem.Emphasised` renders a span with `text-md font-semibold`. Wrap a
  plain primary summary value, such as service health or an active deployment stage.
- `DescriptionItem.Empty` renders a span with `text-content-subtle`. Wrap explicit
  placeholder text when data is absent, including missing primary values.

Both subcomponents require `children: ReactNode` and expose no other props.
Use them inside DescriptionItem's value; do not nest them in each other or wrap
components that own their typography. They do not infer missing data or supply text.

```tsx
<DescriptionItem label="Service state">
  <DescriptionItem.Emphasised>Healthy</DescriptionItem.Emphasised>
</DescriptionItem>
<DescriptionItem label="Current version">
  <DescriptionItem.Empty>No version</DescriptionItem.Empty>
</DescriptionItem>
```

Optional `aria-live: "off" | "polite" | "assertive"` is forwarded only to dd.
Omit it for ordinary static properties. Use polite for the active deployment status
whose updates should be announced; assertive is reserved for urgently required
interruptions, not routine progress. The component does not initiate announcements.
No other native attributes, styling overrides, events or methods are exposed.

The component owns the div/dt/dd pair, small muted label typography and spacing-sm
between label and value, preserving the current shared interval. There are no density variants.
Colours use [global semantic tokens](../tokens/semantic.css).

Render as a direct child of dl. The consumer owns that list, columns, responsive
layout, surrounding surface and field order. Use spacing-4xl between pairs on both
axes (gap-4xl for flex/grid lists, space-y-4xl for vertical block lists), including
wrapped rows. This applies to summaries, form metadata and confirmation details;
the label/value interval within each pair remains spacing-sm. Consumers also
own value composition: use CommitHash for commit identifiers and Emphasised or
Empty for plain-value emphasis or missing data. Do not use
value children to override the label or shared spacing, or bypass nested components'
contracts. The component has no client directive or state and supports both server
and client compositions.

## Behaviour and states

Renders the name followed by its supplied value in source order. Values may be
text or composed read-only content; changed props update them. No data loading,
formatting, empty-state inference, polling, focus handling or interaction is added.
Text uses normal wrapping; the consumer handles long unbroken identifiers. There
is no truncation, tooltip, loading or disabled treatment.

## Accessibility

### Provided by the component

Native dt and dd inside a grouping div preserve the name/value relationship when
placed in dl. Optional aria-live targets the value. No roles or tab stops are added.

### Required of consumers

Supply the containing dl, meaningful property names and readable values. Preserve
service health versus deployment outcome distinctions and explicit missing-data
text. Keep live announcements limited to properties requiring them; the surrounding
application owns updates. Check composed values at narrow widths and zoom.
