---
sourcesHash: 7e6873024fea26217bca4c0567de66b229222010612a5cf328f528e3838ac5f6
id: page-header
description: Identify the current page with its primary heading, optional supporting description and optional page-level controls, grouped above the page content.
status: discoverable
sources:
  - components/ui/page-header.tsx
examples:
  - app/page.tsx
---

# PageHeader

## When to use

All criteria must hold:

- The text identifies the current page as a whole, introducing its main content.
- The heading belongs inside the page's main content, optionally accompanied by
  explanatory text and controls that act on or select that page's context.

## When not to use

- The text names a subsection, card or dialog within a page: use a heading at the
  appropriate level in that containing component; PageHeader always renders h1.
- The content identifies the application or supplies global navigation rather than
  the current page: keep it in the application shell.

## Public API

### React

Import `PageHeader` from `@/components/ui/page-header`.

```tsx
<PageHeader title="Services" description="Service health by environment." />
```

- Required `title: string` is the nonempty, meaningful name of the current page.
- Optional `description: string` explains the page's content or context. Omit it
  when the title is sufficient; an empty string also renders no description.
- Optional `controls: ReactNode` supplies page-level actions or context navigation.
  Omit it (or pass null) when none are needed. Consumers select and compose the
  controls, including their labels, state and behaviour. For URL-based environment
  selection, use [NavigationalTabs](navigational-tabs.md).

There are no events, methods, children, native-attribute forwarding or styling
overrides. This component supports server rendering without client state.

The owner approved one shared treatment based on the Services header: an xl
semibold, tightly tracked title; a small muted description separated by spacing-m;
and spacing-2xl between the text group and controls. Existing foreground and
muted-foreground tokens apply in light and dark themes. There are no size variants.
The component owns this typography, internal spacing and wrapping. The page owns
outer spacing, width and placement, using a surrounding container when needed.

## Behaviour and states

Text precedes controls in DOM and visual order. When both groups fit, they share a
row, align at the bottom and occupy opposite ends. When they do not fit, controls
wrap onto a following row at the start. Text wraps, including unbroken strings,
without truncation. The controls container can shrink to the available width;
the supplied controls own their internal wrapping or scrolling.

Title-only and title-with-description calls have no empty controls container.
There are no owned interactive, loading, disabled or error states. Controls retain
their own behaviour and accessibility responsibilities.

## Accessibility

### Provided by the component

One native h1, an optional paragraph and a header container. Reading order follows
visual order, with text before controls. No focus handling or extra tab stops are
introduced.

### Required of consumers

Place once inside the page's main content and do not add another page-level h1.
Supply a meaningful title and use lower-level headings for subsections. Controls
must have accessible labels and keyboard interaction under their own contracts;
do not place another h1 in the slot. Verify supplied controls remain usable at
narrow widths and zoom, including any internal scrolling they need.
