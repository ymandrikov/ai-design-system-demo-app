---
sourcesHash: 2dda7792331efcc2bfc97393ac16ec3246ae6dcbeb8c498cd5e9fbf64dd28498
id: confirmation-dialog
description: Ask the user to confirm or cancel one consequential action in a modal, with action order and styling determined by destructive or ordinary intent.
status: discoverable
sources:
  - design-system/tokens/semantic.css
  - components/ui/confirmation-dialog.tsx
  - components/ui/request-feedback.tsx
---

# ConfirmationDialog

## When to use

All criteria must hold:

- An action requires an explicit confirm-or-cancel decision before it starts.
- The user can decide from explanatory text and optional read-only context.

## When not to use

- The task requires editable fields: use a form; this component only confirms an already determined action.
- The content only reports an outcome: show feedback on the page instead of requiring confirmation.
- An action needs no confirmation: use [Button](button.md) directly.

## Public API

Import `ConfirmationDialog` from `@/components/ui/confirmation-dialog` in a client component.

```tsx
<ConfirmationDialog
  open={open}
  onOpenChange={setOpen}
  intent="destructive"
  triggerLabel="Roll back"
  title="Confirm rollback"
  description="This starts a new deployment and preserves history."
  confirmLabel="Roll back"
  onConfirm={startRollback}
/>
```

Required inputs: `open: boolean`, `onOpenChange(open: boolean): void`,
`intent: "destructive" | "default"`, `triggerLabel: string`, `title: string`,
`description: string`, `confirmLabel: string`, and `onConfirm(): void`.
Use destructive for removing or replacing working state, including rollback;
use default for ordinary confirmations. Intent controls both trigger and confirm
button styling, and footer order. Labels and explanatory text must be nonempty.

Optional `children: ReactNode` supplies read-only context between explanation and
feedback. Do not supply another action row or interactive form. `pending: boolean`
defaults to false; set it throughout a request. `pendingLabel: string` defaults to
"Working…"; supply task-specific progress text when known. `error: string` displays
a request error; omitted or empty means no error. The consumer owns request state,
validation, permissions, clearing errors, and closing or navigation after success.
Confirmation invokes `onConfirm` without closing automatically, so errors can stay
in context. No className or styling overrides are exposed.

Request feedback is rendered through [RequestFeedback](request-feedback.md); the dialog
retains ownership of its placement and public pending/error API. Do not supply
another feedback block through children.

The component owns modal width, inset, spacing, typography, scrolling, backdrop and
button placement. It uses existing popover/foreground, muted and border tokens and
[Button](button.md) treatments. The consumer owns placement of the trigger.

## Behaviour and states

The trigger opens the controlled modal. Cancel and Escape request closure; clicking
the backdrop does not. While pending, both buttons and the trigger are disabled,
Escape cannot close the window, and progress is announced. Errors remain in the
modal and permit retry once pending is false. Changing `open` externally still works.

The action group is always aligned to the right of the container. Within the group,
destructive confirmation precedes Cancel; ordinary confirmation follows Cancel.
Below the sm breakpoint buttons stack in that same DOM order, aligned to the right.
The popup is bounded by the viewport and scrolls when needed. Keep button labels
concise: Button labels do not wrap.

## Accessibility

### Provided by the component

Base UI AlertDialog supplies alertdialog semantics, associated title and description,
modal focus containment, background isolation and focus restoration to the trigger.
Initial focus is explicitly on Cancel. DOM and visual action order match. Progress
uses a polite live region and errors use role alert. Both buttons are native buttons.

### Required of consumers

Supply meaningful labels and consequences, including affected resource and context.
Use semantic markup for read-only details. Keep the trigger mounted through dismissal;
when navigating after success, the destination owns focus. Set pending before starting
work and retain server-side validation even if the trigger is unavailable.
