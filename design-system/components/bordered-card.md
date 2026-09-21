---
sourcesHash: cbcaea4d5c4d2f463409738a5749088cc1455f64febc6f5641eb522f3f00d8df
id: bordered-card
description: Group one subject's related content in a neutral bordered surface with padded content sections while the consumer owns content and ordering.
status: discoverable
sources:
  - components/ui/bordered-card.tsx
  - lib/with-design-system-exception.tsx
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
Neither part exposes events, methods or native-attribute forwarding. The root has no
styling overrides. Section accepts `designSystemException` with a required meaningful
`reason: string` and optional `className: string` and `style: CSSProperties` through
[withDesignSystemException](../../lib/with-design-system-exception.tsx). Top-level
`className` and `style` are not public props. Omitting the exception preserves defaults.
Exception classes merge after defaults using `cn`; inline styles take normal CSS
precedence. The helper adds no DOM wrapper and does not forward the exception object
or reason to the DOM. The reason is type-required, without runtime validation.

Use only for authorised local styling deviations, preserving semantics, reading
order and accessibility. Each use requires a meaningful reason and an entry in the
[exception journal](../gaps.md), linked by an adjacent source comment. Deployment
supporting typography uses this escape hatch to apply `text-sm` directly to Section.

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
