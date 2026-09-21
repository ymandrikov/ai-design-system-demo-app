---
sourcesHash: 1df1453dc7aa1805194e4ea43e23f754cb19d2d0ddb5a79e942a049d28eddba1
id: root-layout
description: >-
  Provide the application's shared HTML document shell around route content,
  including document language, global theme and font definitions, and a vertical
  body container. Next.js applies it to routes under app/; it is not a wrapper for
  individual sections within a page.
status: discoverable
sources:
  - app/layout.tsx
  - app/globals.css
  - design-system/tokens/raw.css
  - design-system/tokens/semantic.css
examples:
  - app/page.tsx
---

# Root document layout

## When to use

All criteria must hold:

- The content is a route under this application's `app/` tree that needs the shared
  outer document shell; Next.js supplies this layout automatically for that route.
- The requested responsibility is the outer document, not arrangement of a region
  inside an already rendered page. Use [PageContainer](page-container.md) for the route main; local markup arranges its sections.

This is the existing application shell, not an optional card or page-width preset.
For example, a new help route inherits it by adding its page under `app/`.

## When not to use

- The content is a section inside an existing document, such as a toolbar or related
  links panel: use native semantic markup or a nested layout, since this layout
  renders the document's `html` and `body` elements.
- The content belongs to a separate application outside this `app/` tree: this
  repository's root shell is applied by its own route hierarchy, not as a portable
  component for another application.

## Public API

### Next.js App Router

The default export in `app/layout.tsx` receives `LayoutProps<"/">`. The supported
content input is `children`, supplied by Next.js from the active route; it has no
fallback content. Consumers create route files instead of importing and nesting
`RootLayout` manually. Minimal route content, for example in `app/help/page.tsx`:

```tsx
import { PageContainer } from "@/components/layouts/page-container";
import { PageHeader } from "@/components/ui/page-header";

export default function HelpPage() {
  return (
    <PageContainer>
      <PageHeader title="Help" />
    </PageContainer>
  );
}
```

There are no public variants, callbacks, methods, extra named slots or forwarded
native attributes. `className`, `style`, `lang` and theme are not consumer props.
The shell owns `lang="en"`, global CSS loading and font variable setup. Its static
metadata provides document defaults; route metadata uses the
Next.js metadata API rather than shell props or manually inserted `head` elements.

The [semantic theme definitions](../tokens/semantic.css) provide background/foreground roles
and sans/mono aliases. Dark colours use an ancestor `.dark` class; no theme control is exposed by the shell.
The sans alias resolves to Geist Sans and is selected on HTML; the mono alias resolves to Geist Mono.

## Composition

### Required

- The shell owns the outer `html` and `body`. Route and nested-layout content goes
  inside `children`; it must not introduce another document shell.
- The shell owns full-height HTML and a minimum-full-height flex-column body.
  Direct children retain source order. It does not supply page padding, content
  width, gaps, centering or breakpoints. Routes compose [PageContainer](page-container.md)
  for page dimensions and own the gaps between their content regions.
- Consumers own their content grouping, semantic regions and responsive arrangement.
  There is no required UI component child. Empty route content adds no fallback.
- The shell supplies global theme and font definitions; a page's local presentation
  does not become a shared rule merely because it appears inside this shell.

### Recommendations

Keep route-specific arrangement with the route; use a nested layout when sibling
routes need shared inner structure. Neither requires another `html` or `body`.

### Exceptions

None defined. There is no public shell override or local-exception API.

## Accessibility

### Provided by the component

The document declares English through `lang="en"`. The shell introduces no controls,
focus handling, keyboard interactions or main landmark. The Services composition has been checked in Chrome; see
[verification](../../DESIGN.md#verification). No theme-switching interface is provided.

### Required of consumers

Routes provide their main content landmark, headings, control names and any
interaction-specific keyboard/focus behavior. These cannot be delegated to the
shell. Content in another language must carry the appropriate `lang` attribute
on its own region; this shell exposes no document-language parameter.
