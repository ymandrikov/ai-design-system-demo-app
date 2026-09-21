---
sourcesHash: bec1fc84e6c4f27a7ad9a08f5d4615b0203f92371e4369e44deeb652c3c8f90b
id: request-feedback
description: Report pending work and request failures as standalone feedback beside an action or inside its confirmation dialog.
status: discoverable
sources:
  - components/ui/request-feedback.tsx
---

# RequestFeedback

## When to use

All criteria must hold:

- The user needs pending or failure feedback for an initiated action request.
- Feedback belongs to the action as a whole, without association to an individual form field.

## When not to use

- An error describes a form field: keep field-associated feedback with its input and description id.
- Content describes the recorded outcome of a deployment: use [DeploymentResult](deployment-result.md).
- A route is loading or failed to load: retain its route fallback composition.

## Public API

### React

Import `RequestFeedback` from `@/components/ui/request-feedback`.

```tsx
<RequestFeedback pending={pending} pendingLabel="Starting deployment…" error={error} />
```

Required `pending: boolean` reflects the caller's in-flight request state.
Required `pendingLabel: string` is meaningful nonempty progress text for that action.
Optional `error: string` supplies the current request failure; omitted or empty
means no failure message. Neither required prop has a default. If both pending
and error are present, both display, with progress first. Consumers decide when to
clear a previous error; this component does not infer a state machine.

The owner approved SEM-02 on 2026-09-21: preserve the two existing feedback blocks'
order, polite live region, alert error and idle sr-only treatment. The component
owns text-s typography with muted-foreground for progress and destructive-foreground
for errors, using [semantic tokens](../tokens/semantic.css). Consumers own outer
spacing and placement. No children, variants, styling overrides, forwarded attributes,
events or methods are exposed. It works in server and client compositions.

Keep the component mounted while the surrounding action surface is present,
including idle. Inside [ConfirmationDialog](confirmation-dialog.md), the dialog
owns its placement; callers continue to use the dialog's pending/error props and
must not add a second RequestFeedback in its children. Forms needing error ids,
aria-describedby or atomic feedback retain their separate composition.

## Behaviour and states

Idle renders an empty visually hidden live-region container. Pending displays the
progress paragraph; an error displays an alert paragraph. Prop changes update the
messages without replacing their outer container. The component does not start
requests, disable controls, navigate, dismiss a dialog or move focus.

## Accessibility

### Provided by the component

A polite live-region container and role alert on error text preserve the existing
announcement markup. Meaning is expressed in text, not colour alone. No focus stop
is added. Actual announcements depend on the browser and assistive technology.

### Required of consumers

Keep feedback in the relevant action or modal context and retain the container
through request-state changes. Own state, duplicate-submission prevention and error
clearing. Do not add another live region around this component or use it for field
validation; it exposes no error id or field association. Check announcements in the
consuming interface rather than assuming markup alone proves their timing.
