---
sourcesHash: 84ccde1c62bf44b7a5a327619cdcd0ce2b3d700d30ecd6ba76b4eae8f3ce62ea
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

The shared [VersionLabel implementation](../../components/deployments/version-label.tsx)
composes [Badge](badge.md) with `variant="secondary"` and `render={<code />}`.
The requested Badge migration adopts its compact pill, secondary surface/foreground,
padding and extra-small medium-weight text, retaining native code semantics.
VersionLabel exposes no visual variants.
[Global CSS](../../app/globals.css) provides the mono font and theme tokens.
Consumers own surrounding spacing, surface, field labels and layout. Compose it
inside a table cell, description-list value or other inline text context.

## Behaviour and states

The string `1.2.0` renders as `v1.2.0`; a changed prop updates that text.
Versions stay on one line under Badge's shared treatment; surrounding layouts must
allow sufficient width or scrolling. There is no tooltip, interaction, focus stop, loading state or
live announcement.

## Accessibility

### Provided by the component

The version is visible text inside native code. No interactive role or keyboard
behaviour is introduced; colour does not encode version meaning.

### Required of consumers

Identify the associated service or deployment and version field in surrounding
content. Supply the recorded version and preserve native table or description-list
semantics when using those structures.
