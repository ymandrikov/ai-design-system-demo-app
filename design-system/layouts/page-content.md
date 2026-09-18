---
sourcesHash: b64b2d3a3b4b38ec752290e8c6d80d1537e3297ac14a1d21b20e9ccb4085fb55
id: page-content
description: Arrange a page heading and named top-level content sections with consistent vertical spacing and optional section headings and descriptions.
status: discoverable
sources:
  - components/layouts/page-content.tsx
---

# PageContent

## When to use

All criteria must hold:

- A page presents its main heading followed by one or more top-level content sections.
- The sections follow a single vertical reading order rather than a nested section hierarchy.

## When not to use

- The task is setting the route's width, edge padding or main landmark: use [PageContainer](page-container.md).
- The content belongs inside a section, card or dialog rather than the page body: retain its local composition.
- The route only presents a loading, error or not-found message: retain its existing fallback composition.

## Public API

### React

Import `PageContent` from `@/components/layouts/page-content`.

```tsx
<PageContent>
  <PageHeader title="Service" />
  <PageContent.Section aria-labelledby="history-heading">
    <PageContent.SectionHeader id="history-heading" title="Deployment history" />
    <PageContent.SectionContent>{/* Table or empty state */}</PageContent.SectionContent>
  </PageContent.Section>
</PageContent>
```

Root and SectionContent take required `children: ReactNode`. Section takes required
children and optional `aria-label` / `aria-labelledby`, forwarded to its native section.
Supply exactly one meaningful name: aria-labelledby referring to its SectionHeader
when present, otherwise aria-label describing the section without a visible heading.

SectionHeader requires a unique `id: string` for its h2 and `title: ReactNode` with
meaningful non-interactive heading content. Optional `description: ReactNode` provides
inline explanatory content in a paragraph; omit it when unnecessary. ReactNode permits
inline annotations such as the existing Logs (UTC) label and dynamic progress text;
it does not provide an action slot or permit block elements inside h2/p.

No other attributes, className/style overrides, variants, events or methods are
exposed. These components have no state, context or client directive. Compound members
are ordinary components and can be composed in server or client views.

## Composition

### Required

- Place PageContent inside PageContainer after AppIdentity and any back navigation.
  It adds a div, not a second main, and owns no width, surface or perimeter padding.
- Render exactly one [PageHeader](../components/page-header.md) first, followed by
  one or more direct Section children. Do not insert DOM wrappers between these parts.
- Root owns spacing-8 (32 px at the default root size) after PageHeader and spacing-10
  (40 px) between adjacent sections. It adds no trailing section margin. These values
  follow the owner's final decision; sections do not add their own outer spacing.
- Section contains optional SectionHeader followed by exactly one SectionContent.
  It owns spacing-4 between them. SectionHeader owns spacing-2 between h2 and description,
  lg semibold heading typography and small muted description typography, using
  [global tokens](../../app/globals.css). Omitting the header leaves no reserved gap.
- Sections are one level only; do not nest Section. SectionHeader always renders h2.
  Consumers own deeper headings (such as stage h3), field order, cards, grids, forms,
  table semantics and spacing within SectionContent. Content can contain multiple blocks.
- Preserve [Page heading](../patterns/page-heading.md) obligations and each nested
  component's public boundaries. Page-level actions stay in PageHeader controls.
  Do not add section action slots or move form actions into SectionHeader.
- Polling/data logic stays project-owned. Components rendering no DOM may remain in
  the route, but must not introduce extra visible blocks into the root composition.

### Recommendations

Use an unnamed-in-visuals Section with aria-label for an existing summary or form;
use SectionHeader for history, stages and logs. Preserve the existing card within
SectionContent rather than giving every section a surface. Keep empty-state heading
levels appropriate: h3 below a section h2, h2 when no section heading precedes it.

### Exceptions

None. Route fallback views keep their existing composition; adoption covers the four
main pages only. Internal layout differences are consumer-owned, not spacing variants.

## Accessibility

### Provided by the component

Native sections with forwarded accessible names, h2 section headings and paragraph
descriptions retain source order. No extra main, focus stop, live region or interaction
is introduced. SectionContent can shrink within its available width.

### Required of consumers

Supply one page h1 through PageHeader; use unique heading ids and matching
aria-labelledby, or a meaningful aria-label when SectionHeader is absent. Keep
section titles/descriptions non-interactive and retain nested component semantics,
including table scrolling and deployment status live regions. Verify wrapping,
focus visibility and content usability at narrow widths and zoom.
