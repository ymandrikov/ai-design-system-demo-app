---
sourcesHash: 1a17f0fc1e0c8724d2dbd8d8c6de683823ee68cd44b2f484477dca64beb5178b
id: stack
description: Arrange related content groups vertically in reading order without added inter-group spacing.
status: discoverable
sources:
  - components/layouts/stack.tsx
---

# Stack

## When to use

All criteria must hold:

- Related content groups form a vertical sequence, retaining their source order at every width.
- The sequence is inside a content region, rather than the page heading and named page sections governed by PageContent.
- The parent composition determines each group's semantics and contents.

## When not to use

- Page headings and named page sections need their prescribed hierarchy: use [PageContent](page-content.md).
- Fields need horizontal wrapping or a comparison grid: use the parent pattern's row or grid composition.

## Public API

### React

Import `Stack` from `@/components/layouts/stack`.

```tsx
<Stack>
  <p>First group</p>
  <p>Second group</p>
</Stack>
```

`children: ReactNode` supplies groups. Each group must render one direct element;
fragments may group sibling elements but do not establish a section boundary.
There is no spacing prop: the two application consumers compose adjoining groups
that own their insets. The unused spacing variants were removed.
No events, methods, native-attribute forwarding, `className` or `style` overrides.

## Composition

### Required

Stack owns vertical order and adds no inter-group spacing.
Consumers own widths, group padding, typography and semantic elements. Stack adds
no item wrappers, borders or perimeter padding.
Conditional groups should render nothing when absent, rather than hidden elements.
Do not reorder groups with CSS or use Stack's div directly inside a native dl.

### Recommendations

Compose [Separator](../components/separator.md) explicitly between groups when a
visual boundary is needed between adjoining padded sections.

### Exceptions

None. Groups own their padding; Stack adds no gap.

## Accessibility

### Provided by the component

Source order is reading order. No separator role, live region, focus target or
interaction is added.

### Required of consumers

Provide meaningful grouping, native lists where appropriate and accessible names
on enclosing sections. Keep focus and long content visible inside groups.
