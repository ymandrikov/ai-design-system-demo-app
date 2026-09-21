---
sourcesHash: 723fd2f9382f6f876fbcb10c22ff25f36daf6c04147a32ebd4c594a9fbb5b184
id: button
description: Invoke an action with a styled native button, or present a standalone navigation action as a native link using the same shared button styles.
status: discoverable
sources:
  - design-system/tokens/semantic.css
  - components/ui/button.tsx
---

# Button

## When to use

All criteria must hold:

- The control invokes one action, submits a form, or navigates to one destination.
- The action needs a standalone control treatment, such as a page action or a form's submit/cancel row.

## When not to use

- Navigation is an object title, contextual reference, back link or form Cancel: use [Text link](text-link.md).
- Links switch between peer page contexts: use [NavigationalTabs](navigational-tabs.md).
- A control selects a saved value or switches local panels: use a native form control or [Tabs](tabs.md), respectively.
- Content only reports an outcome: use [DeploymentResult](deployment-result.md).

## Public API

### React

Import `Button` and `buttonVariants` from `@/components/ui/button`.
This is the locally installed shadcn `base-nova` source, backed by Base UI.
The owner requested adoption of the shadcn Button treatment and migration of
screen actions. Public variants and size names are retained; their styling now uses
[the two-level token system](../tokens/README.md), including the approved spacing,
typography and radius normalization.
See [shadcn Button](https://ui.shadcn.com/docs/components/base/button).

```tsx
<Button type="submit" disabled={pending}>
  {pending ? "Starting…" : "Deploy"}
</Button>
<Link href="/services/api/deploy?environment=staging" className={buttonVariants()}>
  Deploy
</Link>
```

`Button` accepts Base UI button props, including native `type`, `disabled`, `onClick`,
`children`, accessible attributes and `ref`. Set `type="submit"` for form submission;
use `type="button"` for other actions. The underlying primitive defaults to button.
Handlers require a client boundary; `buttonVariants` can be called on the server.

For navigation, use `buttonVariants` on Next.js `Link` or a native anchor with a real
`href`. Do not render an anchor through `Button`: Base UI adds button semantics.
The helper supplies styles only, without events, roles, routing or disabled behaviour.

Both exports accept `variant` and `size`; omitted values select `default`.
Use the defaults for Deploy. Form Cancel uses [Text link](text-link.md), not
`buttonVariants({ variant: "link" })`; modal Cancel remains a button. The retained
upstream `link` variant is a button treatment, not the ordinary text-link style.
Other available upstream variants are `outline`, `secondary`, `ghost`, and `destructive`.
They are available for explicitly requested treatments; this adoption does not establish
additional application-wide rules choosing between outline, secondary and ghost.
Use destructive only for destructive actions, never merely to indicate a failed result.

Text sizes are `xs`, `sm`, `default`, and `lg`, using semantic control sizes
`xs`, `s`, `m`, and `l` respectively (24, 28, 32, and 36px at the default root size). Icon-only sizes are `icon-xs`, `icon-sm`, `icon`, and
`icon-lg`, with matching square dimensions. Use the default unless a compact or
large treatment is explicitly required; use an icon size only for icon-only content.
Icons may use `data-icon="inline-start"` or `data-icon="inline-end"` for built-in spacing.

The component owns colours, typography, padding, radii, borders and interaction styles,
using the project's semantic tokens in light and dark themes. Consumers own placement,
outer spacing and grouping. Limit `className` to layout; do not override shared visual
styles or use `style` to bypass them. The helper is the public styling API for links.

## Behaviour and states

A native button activates with pointer, Enter or Space. `disabled` blocks activation
and normally removes it from the tab order; Base UI's `focusableWhenDisabled` can retain
focusability when specifically needed. Disabled controls are visually dimmed.
Hover, keyboard focus and press have built-in treatments; `aria-invalid` adds error styling.

There is no loading prop or owned request state. Consumers set `disabled` while pending,
change the label, and provide any live announcement and validation message. Links retain
native link behaviour, including Enter and opening in a new tab. They cannot be disabled
by passing button classes; omit unavailable navigation or supply separate explanatory text.
Text stays on one line; consumers must allow action rows to wrap and keep labels concise.

## Accessibility

### Provided by the component

Native button semantics and keyboard activation, disabled behaviour through Base UI,
and a visible focus ring. The styling helper preserves the semantics of its host element.

### Required of consumers

Provide a clear visible action label, or an accessible name for icon-only controls.
Preserve link semantics for navigation and choose the correct button type in forms.
Do not nest interactive elements inside a button or anchor. Express pending/errors in
text and associate validation feedback with the relevant field or form. Keep controls
reachable and action rows usable at narrow widths and zoom.
