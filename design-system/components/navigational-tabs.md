---
sourcesHash: 052789e5b2bfced821affdd43dd58f6cccbeb48a7447ab9117c1978312a90772
id: navigational-tabs
description: Navigate between related page destinations through a horizontal group of links styled like Tabs, with a current-page marker and native link behaviour.
status: discoverable
sources:
  - design-system/tokens/semantic.css
  - components/ui/navigational-tabs.tsx
  - components/ui/tabs-styles.ts
---

# NavigationalTabs

## When to use

All criteria must hold:

- Users move between related destinations within one area of the application, each
  represented by a URL, including destinations distinguished by query parameters.
- The destination group belongs together as a horizontal navigation strip with a
  current-page marker when the current destination belongs to the group; the
  requested treatment matches the default Tabs.

## When not to use

- Selection only reveals content within the current view without navigation: use
  [Tabs](tabs.md), which owns panel selection and its keyboard interaction.
- Options set a saved form value: use native radio buttons or a select.
- Links are unrelated inline references rather than a peer destination group:
  use ordinary links in the surrounding content.

## Public API

### React

Import `NavigationalTabs` from `@/components/ui/navigational-tabs`.

```tsx
<NavigationalTabs
  label="Project sections"
  currentHref="/project/activity"
  items={[
    { href: "/project/activity", label: "Activity" },
    { href: "/project/settings", label: "Settings" },
  ]}
/>
```

Required `label` is a nonempty accessible name for the navigation region. Required
`items` provides the ordered peer destinations with unique, trusted, application-local
`href` strings and nonempty visible `label` strings. Derive them from application
routes; do not pass untrusted schemes or arbitrary user-provided URLs. Include query
parameters when they distinguish destinations. There are no disabled items: omit
destinations that are unavailable under the application's rules.

Required `currentHref` is the canonical destination selected by the page's routing
and validation logic, not necessarily the raw browser URL. Exactly matching `href`
gets `aria-current="page"`; at most one item may match. Supply a matching destination
when viewing one of the group; an unmatched string is valid when none is current.
An empty item list renders an empty named region; consumers should omit the component
when no destinations exist. The component does not infer routes or compare URL objects.

The component renders `next/link` links with `scroll={false}` to preserve scroll
position while changing related destinations. Next.js owns routing, prefetching and
browser history; the page owns destination content, data loading and active-route
derivation. Native link operations such as opening in a new tab remain available.
There are no custom events, methods, children slots, attribute forwarding or styling
overrides. This server-compatible component has no local selection state.

The owner requested the horizontal `default` appearance of [Tabs](tabs.md): muted
rounded group, foreground active link, background active surface and focus ring.
It reuses the exact Tabs list and trigger styling from `components/ui/tabs-styles.ts`,
with existing [semantic tokens](../tokens/semantic.css) in both themes. This one
treatment is the standard; line, vertical and density variants are not supplied.
The component owns typography, padding, state styling and horizontal overflow.
Consumers own placement and surrounding spacing and must let its container shrink.

For the filled group, the inner radius equals the outer radius minus the group
inset, clamped to zero: radius-m minus spacing-s (8px − 4px = 4px at the default
root size). The inset is equal on all sides. The group has a control-m minimum
height and grows to fit trigger text, borders and padding without squeezing that inset.

## Behaviour and states

Activating a link navigates to its destination. The current marker follows the
page-supplied `currentHref` after navigation; it remains on the current destination
while the router is loading another page. No optimistic marker or custom loading
state is supplied. Reload and Back/Forward follow the route and its canonical value.

Tab and Shift+Tab move between links; Enter follows the focused link. Arrow keys
do not implement tab-panel selection. Long labels stay on one line and the strip
scrolls horizontally when constrained; focused links remain reachable. Current,
hover and keyboard-focus treatments are distinct. Rendering produces navigation
and anchors, with no tablist, tab or tabpanel roles and no owned content panels.

## Accessibility

### Provided by the component

A named navigation landmark, descriptive native links, one `aria-current="page"`
marker when a destination matches, visible keyboard focus and native link keyboard
behaviour. Navigation works as ordinary links before client hydration.

### Required of consumers

Provide accurate, nonempty navigation and destination labels, distinct hrefs and the
validated current destination. Keep destination content outside this component and
give each page its own meaningful heading/title. Verify navigation placement and
scrolling in the actual page at narrow widths and zoom.
