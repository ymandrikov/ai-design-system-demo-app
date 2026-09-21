---
sourcesHash: 69c565e0ead654d7defb17cbb172f859a002334ff883e98608825676088027c9
id: page-container
description: Center a route's main content with shared responsive page padding and a width suited to data views or a focused single-column form, including route fallback states.
status: discoverable
sources:
  - components/layouts/page-container.tsx
---

# PageContainer

## When to use

All criteria must hold:

- Content is the main content of an application route, including its loading, error or not-found view.
- The route presents a data overview/detail view or a focused single-column form using the application's shared page inset.

## When not to use

- Arranging a section within a page: use local section markup; this layout renders a main landmark and must not nest inside another main.
- Providing the HTML document: the framework applies [Root document layout](root-layout.md).
- Grouping only a page heading and its controls: use [PageHeader](../components/page-header.md) within the page container.

## Public API

### React

Import `PageContainer` from `@/components/layouts/page-container`.

```tsx
<PageContainer width="narrow">
  <PageHeader title="Deploy service" />
  <form>{/* Version selection and actions */}</form>
</PageContainer>
```

Required `children: ReactNode` supplies route content in reading order. Optional
`width` defaults to `"wide"`: use it for data overviews and detail views, including
tables and multi-column summaries. Use `"narrow"` for a focused single-column form.
Fallback views retain their route's width; the shared service not-found view uses
the service detail width. These choices preserve the eight existing views under
the owner's 2026-09-18 request to implement analysis A-01.

Optional `aria-busy` accepts native boolean or `"true"`/`"false"` values and forwards
to main. Set it while the whole region is loading; omission supplies no busy state.
The route owns loading and its status message. There are no events, methods, other
forwarded attributes, className/style overrides or alternate host elements.
The layout has no client directive, hooks or data access and can be imported by
server or client views.

## Composition

### Required

- PageContainer owns one native main, full available width, horizontal centering,
  and maximum width: `max-w-page-wide` for wide, `max-w-page-narrow` for narrow.
- It owns `px-2xl py-4xl`, increasing to `sm:px-4xl sm:py-6xl` at the existing small
  breakpoint. The narrow-screen horizontal inset is normalized from 20px to 24px;
  other dimensions retain their values through the semantic token system.
- Children remain in source order and normal block flow. The container adds no
  wrappers, gaps, clipping, scroll region, background or typography changes.
- Routes own branding, back navigation, empty states and all data/actions.
  On the four main pages, [PageContent](page-content.md) owns spacing between the
  page heading and top-level sections; routes retain other outer spacing. Forms, sections, navigation and shared UI are
  valid children; another main, html or body is not.
- Render once per active route view beneath the document shell. Keep it in the
  page/loading/error/not-found file so route fallback boundaries remain unchanged.

### Recommendations

Use [PageHeader](../components/page-header.md) for the page heading. Keep overflow
handling with the content that needs it, such as [Table](../components/table.md).

### Exceptions

None. Consumer classes and styles cannot override shared width or page padding.

## Accessibility

### Provided by the component

A native main landmark, unchanged source order and optional native aria-busy.
There is no focus handling, keyboard behavior or additional tab stop.

### Required of consumers

Provide one meaningful page heading, labelled controls and appropriate loading
feedback. Avoid nested or simultaneous visible main landmarks. Keep child content
usable at narrow widths and zoom; the container does not repair child overflow.
