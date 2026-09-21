---
sourcesHash: 7e7576ca6842bb34ee893c3445103a22c0a9d071ea277c9351682ef3019e6a28
id: dialog
description: Present a focused form or secondary task over the current screen using composable dialog parts, while preserving the underlying page context.
status: discoverable
sources:
  - components/ui/dialog.tsx
---

# Dialog

## When to use

All criteria must hold:

- The user performs a focused secondary task while retaining the current page as context, such as editing a name or reviewing sharing settings.
- The content requires consumer-owned composition, such as editable fields and form submission.

## When not to use

- The user only confirms or cancels an already determined consequential action: use [ConfirmationDialog](confirmation-dialog.md).
- An important warning requires a response and a custom flow beyond ConfirmationDialog's read-only context and confirm/cancel actions: use [AlertDialog](alert-dialog.md).
- The content is the primary task with its own navigation destination: use a page.

## Public API

Import the named parts from `@/components/ui/dialog`. These are locally adapted
[shadcn Base UI components](https://ui.shadcn.com/docs/components/base/dialog).

```tsx
<Dialog>
  <DialogTrigger render={<Button />}>Edit name</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit name</DialogTitle>
      <DialogDescription>Choose the name shown to your team.</DialogDescription>
    </DialogHeader>
    <label>
      Name <input name="name" autoComplete="off" />
    </label>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

- `Dialog` forwards [Base UI Root props](https://base-ui.com/react/components/dialog#root).
  Omit `open` for internal state; use `defaultOpen` for its initial value. Supply
  `open` and `onOpenChange` when the application controls opening or dismissal.
  `onOpenChange(open, details)` can call `details.cancel()` to reject closure during
  saving. Keep the default `modal={true}` for tasks that block the underlying page;
  use `modal={false}` only when users must interact with that page while it is open.
  `disablePointerDismissal` defaults to false; enable it to prevent outside-click dismissal.
- `DialogTrigger` and `DialogClose` forward Base UI trigger/close props, including
  `render`, `disabled`, refs and events. Compose a [Button](button.md) through
  `render`, without nesting buttons. Close requests dismissal; it does not submit or save.
- `DialogContent` forwards Popup props, including `initialFocus`, `finalFocus`,
  children and native attributes. It includes the portal, backdrop and viewport.
  `showCloseButton` defaults to true and adds an icon button labelled Close.
  Set false when supplying another visible close control or blocking dismissal.
- `DialogHeader` and `DialogFooter` accept native div props and children. Header
  groups title and description. Footer aligns consumer-supplied actions to the right,
  stacking them in DOM order on narrow screens. Its `showCloseButton` defaults to
  false; enable it to append an ordinary Close button when no custom footer action is needed.
- `DialogTitle` and `DialogDescription` forward their Base UI part props. A Title
  is required. Description supplies the explanation; editable fields stay outside it.
- `DialogPortal` and `DialogOverlay` expose Base UI portal/backdrop props for
  lower-level compositions; do not wrap DialogContent in a second portal or backdrop.

Parts accepting `className` or `style` preserve the upstream API. Consumer styling
is limited to layout; colours and typography remain component-owned. There is no
`designSystemException` prop. Use [TextLink](text-link.md) for textual navigation.

The content owns the overlay surface, border, shadow, spacing-2xl padding and gaps,
and max-w-dialog width. The viewport supplies spacing-xl edge clearance and the
popup scrolls when tall. Header uses spacing-md; title uses text-md semibold and
description uses text-sm/content-subtle. The icon close control uses Button outline/icon.

## Behaviour and states

Base UI owns opening, focus management and modal interaction. Escape and outside
clicks request closure unless blocked by the consumer. The content unmounts when
closed. The default close control reserves space in DialogHeader. Form state,
validation, submission, pending feedback and reset-on-close belong to the consumer.
While saving, reject closure and disable every applicable action, including replacing
the built-in close control with a disabled consumer-owned one when necessary.

## Accessibility

### Provided by the component

Base UI supplies dialog semantics, title/description associations, modal focus
containment, background isolation and focus restoration. The built-in icon is
decorative and its close button has an accessible name. Both themes use semantic tokens.

### Required of consumers

Provide a meaningful Title, labelled fields, error associations and a visible close
control. Choose initialFocus for the task, commonly the first field. Keep the trigger
mounted or supply finalFocus when it disappears. Preserve keyboard operation and
focus visibility, and manage pending states and unsaved changes explicitly.
