---
sourcesHash: 73288428161774241bddd584d4c4023ceb26f9d1d70a138232c0b74139e04ac1
id: tabs
description: Switch between related content panels within one view, displaying one panel at a time without owning URL navigation or a saved form value.
status: discoverable
sources:
  - components/ui/tabs.tsx
---

# Tabs

## When to use

All criteria must hold:

- Users inspect related sections of one subject in a shared content area, with one section visible at a time.
- Selecting a section changes the displayed panel within the view; the task is neither choosing a saved field value nor navigating to another URL.

## When not to use

- Sections are destinations requiring links, browser history or reload persistence: use native links and page-owned navigation, as specified for environment switching in [DESIGN.md](../../DESIGN.md).
- The selection represents a form value rather than the content currently displayed: use native radio buttons or a select.
- Users need to read or compare sections simultaneously: use ordinary headings and sections; for records with shared fields, consider [Table](table.md).

## Public API

### React

Import the four parts from `@/components/ui/tabs`:

```tsx
<Tabs defaultValue="details">
  <TabsList aria-label="Package information">
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="contents">Contents</TabsTrigger>
  </TabsList>
  <TabsContent value="details">Package description.</TabsContent>
  <TabsContent value="contents">Included items.</TabsContent>
</Tabs>
```

`Tabs` contains a `TabsList` and matching `TabsContent` panels. Every
`TabsTrigger` belongs inside that list. Give triggers distinct stable `value`s
derived from section identity; use the same value on the corresponding panel.
Consumers supply labels and panel content, including any data loading and empty states.

- `Tabs.defaultValue` sets the initial uncontrolled section. Supply an enabled
  trigger's value explicitly for predictable server rendering. The primitive's
  omitted default is `0`, with an enabled-tab fallback after registration;
  `null` deliberately selects no section.
- `Tabs.value` and `onValueChange(value, eventDetails)` provide controlled selection
  when parent state must coordinate the panel. Use either controlled state or
  `defaultValue`; update controlled state in the callback. The callback reports
  changes, including automatic fallback reasons, and does not save data or navigate.
- `Tabs.orientation` defaults to `horizontal` for a list above the panel; use
  `vertical` when the composition places the list beside it. Orientation also
  determines arrow-key navigation. It does not change automatically with width.
- `TabsList.variant` defaults to `default`, the filled shadcn treatment; `line`
  provides the upstream underline treatment. These are presentation alternatives
  supplied by the requested shadcn component, with no product-specific semantic
  distinction. Select the treatment for the composition and keep comparable uses
  consistent.
- `TabsList.activateOnFocus` defaults to `false`: arrow keys move focus and
  Enter/Space activates. Use `true` only when switching panels on focus is intended
  and content is available without noticeable latency.
- `TabsList.loopFocus` defaults to `true`; set `false` when keyboard focus should
  stop at the first and last trigger instead of wrapping.
- `TabsTrigger.disabled` defaults to `false`; use it for an unavailable section.
  Its label still identifies the unavailable content.
- `TabsContent.keepMounted` defaults to `false`; use `true` to preserve a panel's
  local state while it is inactive. Preserving state across page reloads remains
  a consumer responsibility.

The parts forward the corresponding [Base UI Tabs props](https://base-ui.com/react/components/tabs)
(`Root`, `List`, `Tab`, `Panel`), including refs, native attributes and handlers.
Keep native button triggers and the provided tab semantics. Do not override roles,
selection attributes, panel relationships, keyboard handling or internal `data-*`
state attributes. There are no component-specific imperative methods.

The component owns typography, padding, focus treatment and active/disabled styling
from the installed [shadcn Tabs](https://ui.shadcn.com/docs/components/base/tabs),
using the semantic tokens in [global CSS](../../app/globals.css). Consumers own
surrounding placement, width and spacing. `className` may adjust that layout, not
replace component colours, typography or state styling. `tabsListVariants` is an
exported styling helper, not a separate component or a substitute for `TabsList`.

## Behaviour and states

Activating an enabled trigger selects its matching panel. Inactive panels are
unmounted by default; `keepMounted` retains them hidden. Disabled triggers cannot
be activated, but remain reachable by arrow-key focus. Uncontrolled selection falls
back to an enabled trigger if the selected trigger is removed or disabled, or to `null` if none remains. Controlled
consumers own a valid selection when their available sections change.

Focus and selection are distinct with the default manual activation. Horizontal
lists use Left/Right; vertical lists use Up/Down. Home/End target the first/last
trigger, including disabled triggers. Focus wraps by default. The component provides
neither routing, fetching, loading indicators nor persistence.

Lists do not supply automatic wrapping, overflow navigation or responsive orientation.
Consumers must provide enough space for their labels and verify narrow layouts.
The owner explicitly admitted Tabs on 2026-09-16 despite the known
[invisible panel focus](../gaps.md#tabs-panel-focus-is-invisible) defect and incomplete
runtime verification. Discoverability does not establish that these checks passed.
See [adoption progress](../adoption.md) for verification results and remaining checks.

## Accessibility

### Provided by the component

Base UI supplies tablist, tab and tabpanel semantics, selection and panel relationships,
roving keyboard focus, orientation and disabled behaviour. Triggers have visible
focus styling. Keyboard focus must remain visible when moving into the active panel.
The implementation currently violates this requirement: panels use `outline-none`
without a replacement indicator. This [open defect](../gaps.md#tabs-panel-focus-is-invisible)
remains open after owner-authorised admission; consumers must not compensate with
ad hoc styling overrides.

### Required of consumers

Name each list with `aria-label` or `aria-labelledby`. Supply descriptive trigger
text, matching section values and semantically structured panel content. Label
controls inside panels and keep them out of triggers. Decorative icons must be
hidden from assistive technology; icon-only triggers require an accessible name.
Preserve the supplied semantics and keyboard behaviour. Ensure the chosen layout
keeps all labels and controls reachable at narrow widths and zoom, and that automatic
activation does not introduce loading delays.
