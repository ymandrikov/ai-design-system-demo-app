---
sourcesHash: bb08608f2a556fdc3d23649aeecac5d1b92310b021c3c139e08920c6fc62cb23
id: commit-hash
description: Identify the recorded source commit of a version or deployment as a complete, non-interactive inline hash.
status: discoverable
sources:
  - components/deployments/commit-hash.tsx
---

# CommitHash

## When to use

All criteria must hold:

- The user reads the source commit associated with a version or deployment.
- The recorded hash is available and displayed as read-only inline metadata.

## When not to use

- The identifier is a release version: use [VersionLabel](version-label.md).
- No hash is recorded: the consumer provides missing-data text.
- The content is a command or another code fragment rather than a commit hash: use native code.
- The user must open a commit or copy it with an action: this component provides no navigation or control.

## Public API

### React

Import `CommitHash` from `@/components/deployments/commit-hash`.

```tsx
<CommitHash hash={version.commit} />
```

Required `hash: string` is the nonempty commit identifier supplied by the record.
It accepts both recorded abbreviated hashes and full hashes; the component does
not shorten, prefix, validate or otherwise transform the supplied string.
The consumer handles null or absent values before rendering it.
There are no children, styling overrides, native-attribute forwarding, events or methods.

The component owns native code semantics and `break-all`, preserving complete
values while allowing long hashes to wrap as required by the
[status summary pattern](../patterns/status-summary.md). It uses the application's
inherited code font and inherits size and colour from its context. Consumers own
field labels, surrounding spacing and table or description-list structure.

## Behaviour and states

Displays the supplied hash unchanged; changed props update its text. It has no
tooltip, truncation, clipboard action, link, loading state or missing-data state.
It supports server and client composition without state or data access.

## Accessibility

### Provided by the component

Native code presents the complete identifier as text without an interactive role
or keyboard focus stop. Line wrapping does not change the value.

### Required of consumers

Identify the associated version or deployment and label the commit field in its
surrounding context. Supply explicit missing-data text when there is no hash and
preserve native table or description-list relationships.
