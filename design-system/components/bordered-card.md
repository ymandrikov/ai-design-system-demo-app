---
sourcesHash: 6624eda07e74cc8e765dddd742b41f39b22036fa46907eb6ac4985ffbf41809d
id: bordered-card
description: Group one subject's related content in a neutral bordered surface while the consumer owns its internal composition.
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
  <p className="p-xl">Subject details</p>
</BorderedCard>
```

Required `children: ReactNode` supplies the content. Consumers own semantic groups,
padding and internal arrangement, following the consuming pattern. The card owns
`rounded-md border bg-canvas-card text-content-card` in both themes.
No variants, events, methods, native-attribute forwarding or styling overrides.

## Behaviour and states

Static neutral surface with no padding, shadow, clipping, status colouring or state.
It neither infers content status nor loads data. Empty content retains the surface;
the consumer decides whether to show explicit empty content or omit the card.

## Accessibility

### Provided by the component

A neutral div adds no landmark, accessible name, focus target or interaction.
Contents retain their native semantics and source order.

### Required of consumers

Supply semantic headings/lists and a named enclosing section when required by the
pattern. Keep status explicit in text and do not rely on the border for meaning.
