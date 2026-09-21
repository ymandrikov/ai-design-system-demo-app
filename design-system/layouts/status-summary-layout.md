---
sourcesHash: 2e8fb97ec049ae7567cf9cb6d1172cddc6484fb4663e68d4ccfb94570a8adff1
id: status-summary-layout
description: Arrange a read-only status and version above supporting metadata in one neutral surface with a separated lower region.
status: discoverable
sources:
  - components/layouts/status-summary-layout.tsx
---

# StatusSummaryLayout

## When to use

All criteria must hold:

- The user reads one subject's status and version before its supporting metadata.
- The summary needs two regions, with primary properties above supporting context.
- Content follows the [Status summary pattern](../patterns/status-summary.md).

## When not to use

- Comparing records across shared fields: use [Table](../components/table.md).
- Selecting a target version or confirming a change: retain the form or [modal confirmation](../patterns/modal-confirmation.md).
- Arranging page headings and sections: use [PageContent](page-content.md).
- A generic card, log or stage list without this two-level hierarchy: retain local composition.

## Public API

Import `StatusSummaryLayout` from `@/components/layouts/status-summary-layout`.

Required `primary: ReactNode` supplies status first and version second as
[DescriptionItem](../components/description-item.md) siblings, optionally grouped
in a React fragment. The layout supplies their native dl; do not pass another dl
or a DOM wrapper around all primary items.

Required `children: ReactNode` supplies supporting metadata and optional consequences.
Consumers own semantic lists, links, conditional fields and spacing inside this region.
For example, a service supplies an inline last-deployment list; a deployment supplies
a description list followed by its description and consequence text.

There are no defaults, variants, events, native-attribute forwarding or styling
overrides. The layout has no client directive, state or data access.

## Composition

### Required

- Place inside a named PageContent.SectionContent composition, with the accessible
  name on its parent PageContent.Section. The layout adds no section or main landmark.
- The layout owns the neutral `rounded-m border bg-card text-card-foreground`
  surface, upper dl with `flex flex-wrap gap-4xl p-xl`, and lower div with
  `border-t p-xl text-s`. Primary content precedes supporting content in DOM order.
  Spacing between primary fields is spacing-4xl on both axes.
- Consumers own field labels and values, status interpretation, empty text, data,
  links, value emphasis, live regions and all arrangement inside the lower region.
  Preserve the service's `space-y-m` and deployment's `space-y-xl` on inner wrappers;
  these are content-group intervals, not layout variants or permission to override its inset.
- Keep DescriptionItem label/value spacing and nested value components' typography.
  Supporting lists retain their own dl. Keep page-level actions in PageHeader.
- Both regions are required. Represent absent data explicitly in the appropriate
  field; do not hide the entire primary or supporting region to imply a loaded value.

### Recommendations

Reuse [VersionLabel](../components/version-label.md),
[DeploymentResult](../components/deployment-result.md) and
[TextLink](../components/text-link.md) according to Status summary.

### Exceptions

None. Forms and dialogs retain their own composition; this is not a universal card.

## Accessibility

### Provided by the component

The primary native dl preserves name/value semantics and source order. The layout
adds no focus target, live region, truncation or interaction. Primary fields wrap
as available width decreases; consumers remain responsible for long value content.

### Required of consumers

Consumers supply a named parent section, meaningful labels and explicit missing
values. Keep the polite live region only on deployment status, not the whole summary
or ticking duration. Retain native time/link semantics and wrap long commits.
Check both themes, narrow widths, missing history/version and active/completed states.
