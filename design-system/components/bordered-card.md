---
sourcesHash: fb02ef9169299fd4969885c65a26bfb4ae4ccd66bdbcfc5b89bb72995ef46054
id: bordered-card
description: Group one subject's related content in a neutral bordered surface with padded content sections while the consumer owns content and ordering.
status: discoverable
sources:
  - components/ui/bordered-card.tsx
---

# BorderedCard

## When to use

All criteria must hold:

- Content describes one subject and needs a shared visual boundary separating it from surrounding content.
- The container itself is non-interactive; any actions are separately labelled children.

## When not to use

- Comparing records across shared columns: use [Table](table.md).
- A whole container must act as a link or button: use native navigation/action semantics instead.
- Content needs no shared boundary: retain native content or [Stack](../layouts/stack.md).

## Public API

### React

Import `BorderedCard` from `@/components/ui/bordered-card`.

```tsx
<BorderedCard>
  <BorderedCard.Section>
    <p>Subject details</p>
  </BorderedCard.Section>
</BorderedCard>
```

Both `BorderedCard` and `BorderedCard.Section` require `children: ReactNode`.
The root owns the border, radius, surface and vertical order, with no padding or gap.
Use Section for a content region: it owns spacing-xl (16px) padding on every side
and a vertical spacing-xl gap between its direct children. A single child adds no gap.
Separate adjoining sections with an explicit [Separator](separator.md) outside them;
its line reaches the card edges without negative margins. Do not add section margins,
repeat the padding on children, or nest sections to create extra insets.

Use [DescriptionList](description-list.md) for wrapping read-only properties and
[Stack](../layouts/stack.md) for related explanatory blocks inside a section.
Consumers retain content, order, conditions, semantic groups and typography. A
content-inheriting typography wrapper may surround a section; it must add no spacing.
Neither part exposes events, methods, native-attribute forwarding or styling overrides.

## Behaviour and states

Static neutral surface with no root padding, shadow, clipping, status colouring or state.
Section owns its inset and child gap. Empty/omitted conditional children create no
reserved slot; consumers should omit a whole empty section.
It neither infers content status nor loads data. Empty content retains the surface;
the consumer decides whether to show explicit empty content or omit the card.

## Accessibility

### Provided by the component

A neutral div adds no landmark, accessible name, focus target or interaction.
Contents retain their native semantics and source order.

### Required of consumers

Supply semantic headings/lists and a named enclosing section when required by the
pattern. Keep status explicit in text and do not rely on the border for meaning.
