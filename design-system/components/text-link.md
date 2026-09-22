---
sourcesHash: 06e4951d767fdbd154103efcaa9a7b8f001fd7c49a0d176b71aa3e4520de57c4
id: text-link
description: Style title links to object details and ordinary text navigation with distinct hover treatments and visible keyboard focus, preserving native link semantics.
status: discoverable
sources:
  - design-system/tokens/semantic.css
  - components/ui/text-link.tsx
  - lib/with-design-system-exception.tsx
---

# Text link

## When to use

All criteria must hold:

- The control navigates to a destination using a native text link.
- The link is an object title, contextual reference, return navigation or form Cancel navigation.

## When not to use

- Navigation needs button treatment, such as Deploy: use [Button's styling helper](button.md).
- Links switch between peer page contexts: use [NavigationalTabs](navigational-tabs.md).
- The control performs an action without navigating, including dismissing a dialog: use [Button](button.md).

## Public API

### React

Import `TextLink` from `@/components/ui/text-link`.
It wraps Next.js `Link` and accepts its props except top-level `className` and
`style`, including required `href`,
`children`, anchor attributes, `ref`, routing options and event handlers.
These are forwarded unchanged; native and Next.js defaults remain in force.
Handlers require a client consumer. There are no additional events or methods.

`variant` selects the text-link role:

- `"default"` (also used when omitted): ordinary text navigation, including back
  links, contextual references to another deployment and form Cancel. Referencing
  an object alone does not make a link a title link.
- `"title"`: a **title link** names an object and serves as its
  main entry to details within a list, table or card. Use it for service names and
  deployment numbers in tables. Multiple title links may coexist on a page;
  the term does not require a heading element.

```tsx
<TextLink href="/services/api?environment=staging" variant="title">
  API service
</TextLink>
<TextLink href="/?environment=staging">← Services</TextLink>
```

The component owns the anchor and its colour, decoration and keyboard-focus
styling, using [global tokens](../tokens/semantic.css). Title links also own
semibold weight; ordinary links inherit surrounding weight and colour.
Consumers own the destination, meaningful label/content, routing options,
query parameters, navigation landmarks and surrounding layout. Put external
spacing on a parent container. Do not replace link semantics through `role` or
nest interactive content inside the link.

For an authorised local styling deviation, pass `designSystemException` with
required `reason: string` and optional `className: string` and `style: CSSProperties`.
Omitting it preserves standard styling. Exception classes are merged after base
and variant classes, so conflicting Tailwind utilities override those defaults;
state-specific utilities such as `hover:*` must be overridden explicitly.
Inline styles are forwarded to the anchor with normal CSS precedence.
The escape hatch cannot supply navigation props or handlers.

The shared [withDesignSystemException helper](../../lib/with-design-system-exception.tsx)
removes ordinary styling props from the public TypeScript API and forwards only
the exception's styling to the private component. `reason` is required only by
TypeScript; there is no runtime validation or CSS analysis, and the exception
object and reason are not forwarded to the DOM. Each actual use needs an
explanation and an entry in the [exception journal](../gaps.md), linked by an
adjacent source comment naming the entry. No current consumer needs an exception.

The former class-string helpers are removed; all text-link consumers use `TextLink`.

## Behaviour and states

Without a design-system exception, neither kind is underlined at rest. Title links use `content` and semibold
weight; on hover their colour becomes `content-emphasis-hover` (the shared blue emphasis colour) without an underline.
Ordinary links inherit colour and weight; hover adds an underline with the 4px link-underline-offset token
without changing colour. Visited links retain the same treatment.
Keyboard-visible focus adds a current-colour 2px focus outline with a 4px focus offset for both kinds.
These rules apply in light and dark themes and replace the previous always-underlined,
primary-coloured treatment. Button treatments and navigation tabs are outside this rule.

The component preserves Next.js Link navigation, keyboard activation and browser
operations. It adds no click handler, role, disabled state, loading state or focus
management, and does not override prefetch defaults. Wrapping follows the host context.

## Accessibility

### Provided by the component

Visible keyboard-focus outlines without changed semantics or extra tab stops.
Title links have typographic emphasis; ordinary links gain an underline on hover.

### Required of consumers

Provide a meaningful destination and label. Keep navigation as links rather
than clickable spans or button roles.
Preserve context in URLs and appropriate navigation landmarks. Since ordinary
links inherit text styling, make their purpose apparent through wording and
placement, including on touch devices; do not rely on hover to explain the action.
Ensure containers do not clip focus indicators and inherited colours remain
legible against their surfaces. Verify links in their actual contexts.
