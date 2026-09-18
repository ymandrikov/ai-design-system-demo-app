---
id: modal-confirmation
description: Confirm a consequential action with its context and consequences, right-aligning the action group and ordering destructive actions before Cancel and ordinary confirmations after Cancel.
status: discoverable
sources: []
---

# Modal confirmation

## When to use

All criteria must hold:

- The user must explicitly confirm a consequential action before it runs.

## When not to use

- The task is data entry rather than confirmation: use a form; retain the action-order rule for any modal form footer.
- The content is informational only: show feedback without a confirm-or-cancel decision.

## Structure

Use [ConfirmationDialog](../components/confirmation-dialog.md) for a read-only
confirmation: trigger, title, consequences, optional contextual details, request
feedback and two footer actions. Supply a concrete action label rather than "OK".
The caller owns permissions, server validation, pending/error state and completion.

For rollback, show service, environment, current and target versions, and explain
that a new deployment preserves history. Both opening and confirming buttons use
destructive intent. No text-entry confirmation is required for production.

## Composition

### Required

For all modal action rows, align the buttons together as a group at the right edge
of the container. Within that group, destructive confirmation comes before Cancel;
ordinary confirmation comes after Cancel. In a vertical stack preserve that order
top-to-bottom, including DOM order, and keep buttons aligned to the right.
Use destructive styling for destructive confirmations, default for ordinary
confirmations and outline for modal Cancel. ConfirmationDialog enforces this rule.
Any future modal form must follow the same rule rather than reversing buttons locally.

Focus Cancel initially. Preserve modal focus containment and return focus to the
opener on cancellation. Keep request failures inside the dialog. Prevent repeated
submission while pending. The component owns modal spacing, width and adaptation;
the caller owns semantic context details. Do not override the component's footer.

### Recommendations

Explain the actual consequence, not generic danger. Include the affected resource
and environment where those distinguish the target. Navigate to the resulting record
when confirmation creates one, as rollback does.

### Exceptions

None.

## Verification

Verify both intent values: destructive/Cancel and Cancel/ordinary-confirmation,
with matching visual and keyboard order, including stacked mobile layout. Verify
the group stays right-aligned rather than spreading buttons across the container.
Reject a destructive confirmation placed after Cancel, including via CSS order changes.
Check initial focus, Tab containment, Cancel/Escape, focus return, pending duplicate
prevention, error retention and successful completion. Inspect light and dark themes,
long context and narrow viewports. Run the component and consumer checks documented
in DESIGN.md; static contract checks do not prove focus or rendered layout.
