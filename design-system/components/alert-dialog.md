---
sourcesHash: 821f9893de2b9e896c00c02ca46ee5eeb3902ac3e697d0bd1fc3f6318440c8ba
id: alert-dialog
description: Present an important warning requiring a response through composable modal parts when the task needs content or action flow beyond the fixed ConfirmationDialog API.
status: discoverable
sources:
  - components/ui/alert-dialog.tsx
---

# AlertDialog

## When to use

For direct product use, all criteria must hold:

- An important warning interrupts the current task and requires a response before proceeding.
- The task needs composition beyond [ConfirmationDialog](confirmation-dialog.md), such as a typed acknowledgement or several distinct responses.

These parts also provide the shared implementation beneath ConfirmationDialog.
That wrapper adds its own action-order, focus and feedback rules; select the wrapper
for product tasks covered by its API.

## When not to use

- The user reviews read-only consequences and chooses confirm or cancel: use [ConfirmationDialog](confirmation-dialog.md), which owns action order, intent styling and request feedback.
- The user fills in an ordinary form without responding to an interrupting warning: use [Dialog](dialog.md).
- A status update needs no response: keep it inline, using [RequestFeedback](request-feedback.md) for pending or failed requests.

## Public API

Import the named parts from `@/components/ui/alert-dialog`. These are locally adapted
[shadcn Base UI components](https://ui.shadcn.com/docs/components/base/alert-dialog).

This controlled composition assumes the consumer defines `open`, `setOpen`,
`cancelRef`, `acknowledgement`, `setAcknowledgement` and `discardDraft`:

```tsx
<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger render={<Button variant="destructive" />}>Discard draft</AlertDialogTrigger>
  <AlertDialogContent initialFocus={cancelRef}>
    <AlertDialogHeader>
      <AlertDialogTitle>Discard this draft?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone. Type DISCARD to confirm.</AlertDialogDescription>
    </AlertDialogHeader>
    <label>
      Confirmation
      <input value={acknowledgement} onChange={(event) => setAcknowledgement(event.target.value)} />
    </label>
    <AlertDialogFooter>
      <AlertDialogAction variant="destructive" disabled={acknowledgement !== "DISCARD"} onClick={discardDraft}>
        Discard draft
      </AlertDialogAction>
      <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

- `AlertDialog` forwards [Base UI Root props](https://base-ui.com/react/components/alert-dialog#root).
  Use `open` with `onOpenChange` for asynchronous actions; `defaultOpen` supports
  internally managed state. `onOpenChange(open, details)` can reject dismissal with
  `details.cancel()`. The dialog is always modal and outside clicks never close it.
- `AlertDialogTrigger` forwards trigger props including `render`, refs, disabled
  state and events. Use `render={<Button />}` for the shared action treatment.
- `AlertDialogContent` includes portal, backdrop and viewport and forwards Popup
  props, including children, `initialFocus` and `finalFocus`. `size="default"` uses
  max-w-dialog; `size="sm"` retains the upstream compact 20rem width. Use default
  for fields or supporting context. The compact option is for an acknowledgement
  whose content is just a title, explanation and actions; it still wraps and scrolls.
- `AlertDialogHeader` and `AlertDialogFooter` accept native div props. Header groups
  title, description and optional media. Footer aligns actions right and stacks
  them in DOM order on narrow screens. Consumers provide the order: destructive
  action before Cancel, ordinary confirmation after Cancel, following the
  [modal confirmation pattern](../patterns/modal-confirmation.md).
- `AlertDialogTitle` and `AlertDialogDescription` forward Base UI part props and
  establish the dialog's name and explanation. Supply both; put fields and other
  structured context outside Description.
- `AlertDialogMedia` accepts div props for an optional decorative icon or image
  supporting the warning. It owns a muted rounded surface, size-4xl dimensions,
  spacing-md bottom margin and size-2xl SVG dimensions. Text must carry the meaning.
- `AlertDialogAction` accepts [Button](button.md) props and renders an ordinary
  button. It does **not** close automatically: consumers perform the action and
  close after success. Select destructive or default styling from the action's intent.
- `AlertDialogCancel` forwards Base UI Close props and Button `variant`/`size`.
  It requests dismissal and defaults to outline/default. Keep that treatment for
  cancellation; supported overrides follow the Button contract.
- `AlertDialogPortal` and `AlertDialogOverlay` expose portal/backdrop props for
  lower-level compositions; Content already includes both.

Parts accepting `className` or `style` preserve the upstream API. Consumer styling
is limited to layout; colours and typography remain component-owned. There is no
`designSystemException` prop. Use [TextLink](text-link.md) for text navigation.
Content owns the overlay surface, border, shadow and spacing-2xl padding/gaps;
viewport clearance is spacing-xl. Header uses spacing-md, text-md semibold titles
and text-sm/content-subtle descriptions. These rules apply to both widths and themes.

## Behaviour and states

Escape requests cancellation; clicking outside does not. The consumer owns action
state, validation, pending/error feedback and closing on success. For asynchronous
work, reject dismissal during pending, disable actions and announce progress/errors.
Cancellation must not invoke the consequential action. AlertDialog provides no
automatic intent-based button order, initial Cancel focus or request feedback;
these are additional responsibilities compared with ConfirmationDialog.

## Accessibility

### Provided by the component

Base UI supplies alertdialog semantics, title/description associations, modal focus
containment, background isolation and restoration to the trigger. The popup is
bounded by the viewport and scrollable. Shared tokens support both themes.

### Required of consumers

Explain consequences with a meaningful Title and Description. Supply a visible
cancel action and set initialFocus to it for destructive decisions. Keep the trigger
mounted or supply finalFocus. Label fields, preserve visible keyboard focus and
announce validation or request feedback. Decorative media must be hidden from
assistive technology or have empty alternative text.
