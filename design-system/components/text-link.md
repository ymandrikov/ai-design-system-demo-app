---
sourcesHash: cdc13600f62c19f42f6f0bbc119db7d9f70483dfcd4b96cad1c307237f3d142e
id: text-link
description: Identify an ordinary record reference or return-navigation link with shared underline and keyboard-focus styling while preserving native link semantics.
status: discoverable
sources:
  - components/ui/text-link-styles.ts
---

# Text link

## When to use

All criteria must hold:

- The user follows an individual record reference or return-navigation destination.
- The link belongs in prose, a table identity, or ordinary back navigation rather than a standalone action or peer-destination strip.

## When not to use

- Navigation is a standalone action such as Deploy or form Cancel: use [Button's styling helper](button.md).
- Links switch between peer page contexts: use [NavigationalTabs](navigational-tabs.md).
- The control performs an action without navigating: use [Button](button.md).

## Public API

### React

Import `textLinkClassName` from `@/components/ui/text-link-styles` and apply it to
an existing Next.js Link or native anchor. This export is a class string, not a
component or function; it has no inputs, defaults, events, methods or attribute forwarding.

```tsx
<Link href="/services/api?environment=staging" className={textLinkClassName}>
  API service
</Link>
```

The owner approved REC-01: preserve the seven existing ordinary links' primary text,
underline with offset-4, and focus-visible outline-2 with offset-4. These classes
own the shared visual treatment, using [global tokens](../../app/globals.css).
There are no variants or client-only dependencies.

Consumers own the native element, destination, visible label, routing behavior,
query parameters, navigation landmarks and surrounding typography/layout.
Additional classes may control outer spacing/display and inherited-context text size.
Retain font-semibold for the service identity in the Services table; other current
links inherit their context's weight. This preserves the approved existing emphasis,
not a new rule that every record link must be bold. Do not override shared colour,
underline or focus treatment. Concatenate permitted classes with the string when needed.

## Behaviour and states

The helper only supplies styles. The host link retains its native navigation,
keyboard activation and browser operations. It adds no click handler, role, disabled
state, loading state, prefetch setting or focus management. Underlines remain visible;
keyboard-visible focus uses the shared outline. Text wrapping follows the host context.

## Accessibility

### Provided by the component

The styling capability provides a visible underline and focus-visible outline without
changing the host's semantics or creating extra tab stops.

### Required of consumers

Apply it to a real anchor or Next.js Link with a meaningful destination and label.
Keep navigation as links rather than clickable spans or button roles. Preserve
context in URLs where the route requires it and retain appropriate nav landmarks.
Ensure surrounding containers do not clip focus indicators; verify rendered links
in their actual contexts when changing layout or appearance.
