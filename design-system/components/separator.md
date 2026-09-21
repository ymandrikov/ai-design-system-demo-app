---
sourcesHash: 9781b2621c7e7f96d17b4d3a4fd205d3c5b0316018744975cb4c75a58358ba85
id: separator
description: Mark a visual or semantic boundary between adjacent content groups without adding a container or spacing.
status: discoverable
sources:
  - components/ui/separator.tsx
  - lib/with-design-system-exception.tsx
---

# Separator

## When to use

All criteria must hold:

- Adjacent content groups need an explicit boundary within their shared context.
- The boundary is static, without resizing or another interaction.

## When not to use

- A subject needs an enclosing surface: use [BorderedCard](bordered-card.md).
- Groups only need distance: use [Stack](../layouts/stack.md) spacing.
- A draggable boundary changes panel sizes: Separator has no such behaviour.

## Public API

### React

Import `Separator` from `@/components/ui/separator`.

```tsx
<Separator aria-hidden="true" />
```

Locally installed from [shadcn Base UI Separator](https://ui.shadcn.com/docs/components/base/separator).
Accepts Base UI `Separator.Props` except top-level `className` and `style`.
`orientation` defaults to `"horizontal"` for
stacked groups; use `"vertical"` between side-by-side groups. Horizontal separators
span the container width; vertical separators stretch across a flex container's
cross axis. The parent must provide a height for a vertical boundary.

Native attributes and refs are forwarded. `aria-hidden="true"` makes a purely
visual boundary decorative, as required by [Status summary](../patterns/status-summary.md).
Omit it when a separator should be exposed to assistive technology. No Radix
`decorative` prop is supported. `render` is forwarded by Base UI but must preserve
separator semantics and must not bypass the styling exception boundary.
No component-specific events or methods; leave the separator empty
and non-interactive.

For an authorised local styling deviation, pass `designSystemException` with a
required meaningful `reason: string` and optional `className: string` and
`style: CSSProperties`, using the shared
[withDesignSystemException helper](../../lib/with-design-system-exception.tsx).
Exception classes merge after defaults; inline styles have normal CSS precedence.
State callback forms of className and style are not supported by this escape hatch.
The exception permits local styling changes but must preserve orientation,
accessibility semantics and the non-interactive boundary between groups.
Its object and reason are not forwarded to the DOM; TypeScript requires the reason,
without runtime validation. Each actual use requires an entry in the
[exception journal](../gaps.md), linked by an adjacent source comment.
Omitting the exception preserves default styling. Both status-summary consumers
use defaults and need no migration; no actual exception is introduced here.

## Behaviour and states

Uses the semantic border colour and `--border-width` thickness in both themes.
The local source adapts shadcn's pixel thickness to the system token and uses the
project's configured `cn`. Orientation controls the line direction. It does not
shrink, add margins, pad content or infer where boundaries belong.

## Accessibility

### Provided by the component

Base UI renders a div with separator role and matching `aria-orientation`.
No focus target, keyboard behaviour or live region is added.

### Required of consumers

Place the line between meaningful groups. Hide purely decorative lines from the
accessibility tree with `aria-hidden="true"`; keep headings and lists meaningful
without a visual line. Do not add focus or interactive handlers.
