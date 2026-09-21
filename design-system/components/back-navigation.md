---
sourcesHash: 4cc6d10c8643580c162666c9da96000e1a690e8cc0720588cc3a28e68206a076
id: back-navigation
description: Identify a named navigation region containing one return link to a parent context.
status: discoverable
sources:
  - components/ui/back-navigation.tsx
---

# BackNavigation

## When to use

All criteria must hold:

- The user can return to a parent context through one destination link.
- The return link forms its own navigation region, separate from prose or form actions.

## When not to use

- The link is an inline reference or form Cancel: use [TextLink](text-link.md) directly.
- Users choose among peer destinations: use [NavigationalTabs](navigational-tabs.md).
- The action traverses browser history rather than linking to a known parent: retain the action's own composition.

## Public API

### React

Import `BackNavigation` from `@/components/ui/back-navigation`.

```tsx
<div className="mb-2xl">
  <BackNavigation label="Back to services">
    <TextLink href="/?environment=staging">← Services</TextLink>
  </BackNavigation>
</div>
```

Required `label: string` supplies a meaningful nonempty accessible name for the
return region. Required `children: ReactNode` supplies one ordinary [TextLink](text-link.md),
directly or through a component/Suspense boundary. During suspension the link may
be absent; keep BackNavigation outside that boundary so the region stays mounted.
Do not supply multiple destinations, nested navigation or action buttons.

The owner approved SEM-01 on 2026-09-21: the component owns native nav semantics,
its accessible name and text-sm typography using [semantic tokens](../tokens/semantic.css).
Consumers own placement and outer spacing: existing detail pages retain mb-2xl on
an outer container; the service fallback retains mt-2xl. Consumers supply the link,
its arrow and visible label, destination and environment. TextLink owns focus and
hover styling. No variants, defaults, extra attributes, styling overrides, events
or methods are exposed. The component supports server and client composition.

## Behaviour and states

Renders its supplied content without routing, data loading, state or history
handling. Text wraps normally. There is no disabled or pending state; children
retain native link behaviour and any existing Suspense handling.

## Accessibility

### Provided by the component

A named native navigation landmark; no added tab stop or focus handling.

### Required of consumers

Supply a descriptive region name and a meaningful TextLink destination and label.
Keep environment context in URLs where required. Preserve focus visibility and
check long labels at narrow widths. Do not nest the component inside another nav.
