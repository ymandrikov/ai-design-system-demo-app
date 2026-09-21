---
sourcesHash: fce929ec9caaeb2de02ed01b6608615f553cf197da4d3059ce15c735ab098d33
id: description-list
description: Group read-only named properties in a native description list with shared spacing and wrapping in reading order.
status: discoverable
sources:
  - components/ui/description-list.tsx
---

# DescriptionList

## When to use

All criteria must hold:

- A reader inspects multiple named properties of one subject.
- Each name sits above its value, using DescriptionItem.
- Properties flow horizontally and wrap in source order as space becomes limited.

## When not to use

- Comparing many records across columns: use [Table](table.md).
- A form needs a fixed responsive column grid or vertical list: keep its native dl and layout.
- A label and several values form one inline sentence, such as the service's last deployment: keep that native inline dl.
- Content is an explanatory paragraph rather than a named property: use ordinary text within [Stack](../layouts/stack.md).

## Public API

Import `DescriptionList` from `@/components/ui/description-list`.

```tsx
<DescriptionList>
  <DescriptionItem label="Commit">
    <CommitHash hash="abc1234" />
  </DescriptionItem>
  <DescriptionItem label="Duration">20s</DescriptionItem>
</DescriptionList>
```

Required `children: ReactNode` supplies [DescriptionItem](description-item.md) elements
in reading order. Each renders its own dt/dd group directly inside the native dl.
Do not wrap the group in Stack, another dl, or an extra DOM element. Fragments are
allowed because they do not create an element. The consumer supplies labels, values,
formatting, conditional presence and the intended live region on an individual item.
There are no other props, styling overrides, variants, events or methods.

The list owns `flex flex-wrap gap-4xl`: 40px between items on both axes. It has no
padding, external margins, surface or typography. A parent such as
[BorderedCard.Section](bordered-card.md) owns its inset and separation from other blocks.
DescriptionItem owns the 4px gap inside each pair. Consumers must not add item margins.

## Behaviour and states

Items wrap in source order. Missing conditional items leave no reserved cell or gap;
a single item has no inter-item gap. Empty children render an empty dl; omit the
list when no properties are available. Values remain visible, without truncation.
There is no fetching, sorting, formatting, selection, loading or interaction logic.

## Accessibility

### Provided by the component

A native dl preserves name/value relationships through its DescriptionItem children.
No landmark, live region, role or focus stop is added. DOM order stays reading order.

### Required of consumers

Provide meaningful labels and matching values, preserve dt/dd grouping, and use
semantically appropriate value components. Keep any live announcement on the changing
property rather than the whole list. Check long values at narrow widths.
