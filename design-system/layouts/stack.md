---
sourcesHash: bc0e0bccfa87a0217d8f849ce5a244392cb2a59b686cea74f94f5f4983d25f8e
id: stack
description: Arrange related content groups vertically in reading order with spacing restricted to the design-system scale.
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
<Stack spacing="xl">
  <p>First group</p>
  <p>Second group</p>
</Stack>
```

`children: ReactNode` supplies groups. Each group must render one direct element;
fragments may group sibling elements but do not establish a section boundary.
`spacing` accepts only `"0"`, `"xs"`, `"s"`, `"m"`, `"l"`, `"xl"`, `"2xl"`,
`"3xl"`, `"4xl"`, `"5xl"`, `"6xl"` from the [spacing scale](../tokens/semantic.css).
It defaults to `"0"` for adjoining groups that own their insets. Follow the consuming
pattern's spacing rule; outside a prescribed pattern, consumers may select any of
these tokens for the interval between groups. No arbitrary sizes are supported.
No events, methods, native-attribute forwarding, `className` or `style` overrides.

## Composition

### Required

Stack owns vertical order and inter-group spacing.
Consumers own widths, group padding, typography and semantic elements. Stack adds
no item wrappers, borders or perimeter padding.
Conditional groups should render nothing when absent, rather than hidden elements.
Do not reorder groups with CSS or use Stack's div directly inside a native dl.

### Recommendations

Compose [Separator](../components/separator.md) explicitly between groups when a
visual boundary is needed. Stack spacing applies on both sides of that child; use
`spacing="0"` for adjoining padded sections. Nest stacks when
inner groups need their own independent spacing.

### Exceptions

None. Spacing stays within the system scale.

## Accessibility

### Provided by the component

Source order is reading order. No separator role, live region, focus target or
interaction is added.

### Required of consumers

Provide meaningful grouping, native lists where appropriate and accessible names
on enclosing sections. Keep focus and long content visible inside groups.
