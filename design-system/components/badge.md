---
sourcesHash: 1a9cad37d7c8754a9f3cf2aa3c391a24b42c8270620e91046bfae823193c0fbb
id: badge
description: Display a short status or metadata label with a compact shared treatment, preserving the semantics of its content or link.
status: discoverable
sources:
  - components/ui/badge.tsx
---

# Badge

## When to use

All criteria must hold:

- Short status or metadata text annotates another item and needs a compact, visually distinct treatment.

## When not to use

- Displaying a service version: use [VersionLabel](version-label.md), which owns the prefix and code semantics.
- Displaying a completed deployment outcome: use [DeploymentResult](deployment-result.md), which owns labels and outcome mapping.
- Triggering an action or choosing a value: use [Button](button.md) or a form control. Badge does not implement interaction.
- Explaining an error or warning in detail: use descriptive text; Badge is only a short annotation.

## Public API

Import `Badge` from `@/components/ui/badge`. The locally installed
[shadcn Badge](https://ui.shadcn.com/docs/components/base/badge) uses Base UI's
`useRender`. It is a client component that can be rendered by server components.

```tsx
<Badge variant="secondary">Preview</Badge>
<Badge variant="secondary" render={<code />}>v1.2.0</Badge>
```

`children` supplies content; native span attributes and `ref` are forwarded.
`render` replaces the default span with an element or Base UI render callback.
Use a native code element for code content, or an anchor with a real `href` for
metadata navigation. Callbacks and event handlers require a client consumer.

The owner requested the upstream Badge treatment for existing badges. This adoption
uses `secondary` for neutral metadata and successful deployment outcomes, and
`destructive` for failed outcomes, retaining explicit status text and existing tokens.
The default `default` variant provides primary emphasis. `outline` provides a border
without a filled surface; `ghost` omits that border; `link` gives link styling.
These upstream alternatives remain available for explicitly requested treatments;
they do not establish additional product-wide status mappings.

Badge owns its pill radius, height, padding, typography, border and theme colours.
Consumers own placement, grouping and outer spacing; restrict `className` to layout
and do not bypass the shared treatment with `style`. There is no size prop.
Icons can use `data-icon="inline-start"` or `data-icon="inline-end"` for spacing.
`badgeVariants` is also exported as a styling helper; it supplies the same variants
without semantics or behaviour and must be called within a client module.

## Behaviour and states

The default span is non-interactive and adds no focus stop or live announcement.
Badge owns no loading, selection or disabled state. Content changes follow props.
Text stays on one line; keep labels short and let surrounding rows wrap or scroll.
Native links retain their own keyboard and navigation behaviour; Badge supplies
hover and focus styles. `aria-invalid` has an error treatment but does not validate.

## Accessibility

### Provided by the component

Visible text and the semantics of the rendered host element. No implicit button,
status or alert role is added. Theme colours use the existing semantic tokens.

### Required of consumers

Keep meaning in text, associate the label with its item, and distinguish service
health from deployment outcome. Do not make a span clickable. Give links clear
names and real destinations; avoid nested interactive elements. Consumers own any
necessary live announcements and must keep content readable at narrow widths.
