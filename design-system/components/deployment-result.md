---
sourcesHash: 184be7c99804fb54a5c6904966d7affd450df82d10c211f53f5c2c49419b5d06
id: deployment-result
description: Show the succeeded or failed outcome of a completed deployment as inline text, separately from service health and missing deployment history.
status: discoverable
sources:
  - components/deployments/deployment-result.tsx
  - lib/deployments/presentation.ts
---

# DeploymentResult

## When to use

All criteria must hold:

- The user is reading the recorded succeeded or failed outcome of a completed deployment.
- The outcome annotates that deployment or a labelled last-deployment field as non-interactive inline content.

## When not to use

- The value describes service health rather than a deployment outcome: use separate service-state text. A failed deployment can leave the current service healthy.
- No deployment exists: the consumer supplies its empty-state text instead of inventing an outcome.
- The task is to show active progress or a detailed error explanation: use separate content; this component only names a completed outcome.

## Public API

### React

Import `DeploymentResult` from `@/components/deployments/deployment-result`.

```tsx
<DeploymentResult result="failed" />
```

Required `result` is `"succeeded" | "failed"`, taken from the completed deployment
record, not derived from service health. There is no default or null state.
Consumers select the record and render missing-data text themselves.
There are no children, events, methods, forwarded native attributes or styling overrides.
The component is server-compatible and does not load data.

The owner's implementation request for [A-01](../analysis.md#a-01--отображение-результата-деплоя)
preserves the existing inline treatment across the three consumers: medium weight,
Failed in the destructive semantic colour, Succeeded inheriting its surrounding
foreground. This is the single treatment, not a configurable badge. Labels reuse
the shared presentation module. [Global tokens](../../app/globals.css) supply both
themes; consumers retain surrounding surface, font size, spacing and field labels.
Use within a table cell, a description-list value or other inline text context.

## Behaviour and states

`succeeded` renders “Succeeded”; `failed` renders “Failed”. Updating the prop updates
the text and corresponding colour. It adds no interaction, focus stop, loading state
or live announcement. Long surrounding content follows the consumer's layout.

## Accessibility

### Provided by the component

The outcome is visible text in a native span; colour is supplementary. No interactive
role or keyboard behaviour is introduced.

### Required of consumers

Keep the deployment identity or field label clear in the surrounding content. Keep
service health separately labelled. Supply a valid recorded outcome, and retain
native table or description-list semantics when composing those structures.
