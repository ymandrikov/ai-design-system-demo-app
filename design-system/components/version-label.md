---
sourcesHash: 8f4d587ac0309a0a6b198fd79f6b0873219c95f4886309aa5c727197eb8b9cc3
id: version-label
description: Show a recorded service version as non-interactive inline code with a v prefix, separately from commit identifiers and missing-version text.
status: discoverable
sources:
  - components/deployments/version-label.tsx
---

# VersionLabel

## When to use

All criteria must hold:

- The user is reading an existing service version, such as the current version or the target of a recorded deployment.
- The version annotates a service or deployment as non-interactive inline content.

## When not to use

- The identifier is a commit hash rather than a service version: use separate native code without a version prefix.
- No version exists: the consumer supplies its missing-version text.
- The task is choosing or changing a version: use a suitable control; this component only displays a value.

## Public API

### React

Import `VersionLabel` from `@/components/deployments/version-label`.

```tsx
<VersionLabel version="1.2.0" />
```

Required `version` is the recorded version string, supplied by the consumer without
the display prefix `v`. There is no default or null state. The component prepends
`v` without parsing, trimming or normalising the value; prerelease and build suffixes
are preserved. Consumers select the record and handle missing data.
There are no children, events, methods, native-attribute forwarding or styling overrides.
The component is server-compatible and does not load data.

The owner's implementation request for [A-02](../analysis.md#a-02--отображение-версии)
preserves the existing native inline code, rounded corners, muted background,
horizontal and vertical padding and extra-small text. This is one shared treatment,
with the surrounding foreground inherited; it has no badge variants.
[Global CSS](../../app/globals.css) provides the mono font and theme tokens.
Consumers own surrounding spacing, surface, field labels and layout. Compose it
inside a table cell, description-list value or other inline text context.

## Behaviour and states

The string `1.2.0` renders as `v1.2.0`; a changed prop updates that text.
Long versions follow the surrounding layout and native code wrapping without
truncation or a tooltip. There is no interaction, focus stop, loading state or
live announcement.

## Accessibility

### Provided by the component

The version is visible text inside native code. No interactive role or keyboard
behaviour is introduced; colour does not encode version meaning.

### Required of consumers

Identify the associated service or deployment and version field in surrounding
content. Supply the recorded version and preserve native table or description-list
semantics when using those structures.
