---
sourcesHash: cf023914d2d41aa2f71ff4249f1902bae05a84c0290fb0af0f86eda200e2f12d
id: stack
description: Arrange related content groups vertically in reading order with adjoining or closely spaced children.
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
<Stack spacing="md">
  <p>First group</p>
  <p>Second group</p>
</Stack>
```

`children: ReactNode` supplies groups. Each group must render one direct element;
fragments may group sibling elements but do not establish a section boundary.
Optional `spacing: "0" | "md"` defaults to `"0"`, preserving adjoining groups.
Use `"md"` for related explanatory blocks: the parent supplies an 8px gap between
rendered direct children, with no leading or trailing gap. The approved use is the
summary's description, source link and outcome explanation. Only these two modes
are supported; numeric or arbitrary spacing is not accepted.
No events, methods, native-attribute forwarding, `className` or `style` overrides.

## Composition

### Required

Stack owns vertical order and the selected gap between its direct children.
Children must not add external margins to recreate that gap.
Consumers own widths, group padding, typography and semantic elements. Stack adds
no item wrappers, borders or perimeter padding.
Conditional groups should render nothing when absent, rather than hidden elements.
Do not reorder groups with CSS or use Stack's div directly inside a native dl.

### Recommendations

Compose [Separator](../components/separator.md) explicitly between groups when a
visual boundary is needed between adjoining padded sections.

### Exceptions

None. Groups own their padding; Stack owns their separation.

## Accessibility

### Provided by the component

Source order is reading order. No separator role, live region, focus target or
interaction is added.

### Required of consumers

Provide meaningful grouping, native lists where appropriate and accessible names
on enclosing sections. Keep focus and long content visible inside groups.
