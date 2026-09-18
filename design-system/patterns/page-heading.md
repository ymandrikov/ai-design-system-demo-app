---
id: page-heading
description: Orient the user on a page with its title, optional description and available page-level actions above the main content.
status: discoverable
sources: []
---

# Page heading

## When to use

All criteria must hold:

- The composition introduces an entire page and its available page-level actions.

## When not to use

- The heading introduces a section or modal: use its own lower-level heading instead.

## Structure

Inside [PageContainer](../layouts/page-container.md), place one
[PageHeader](../components/page-header.md) before the main content regions.
Required: page title. Optional: description explaining context, and controls for
page-level actions or context navigation. Use [Button](../components/button.md)
for immediate actions and [ConfirmationDialog](../components/confirmation-dialog.md)
for actions requiring confirmation. Context navigation uses
[NavigationalTabs](../components/navigational-tabs.md).

```tsx
<PageHeader title="Deployment #42" description="API · production" controls={actions} />
```

## Composition

### Required

PageHeader owns typography, internal spacing and responsive placement: text left,
controls right, bottom aligned; controls wrap below text when space runs out.
The page owns outer spacing and supplies action labels, availability and behaviour.
Keep one h1. Actions must apply to the page's subject and must not be duplicated in
a separate action section below the content. Omit description or controls when absent.

### Recommendations

Keep back navigation above the header. Put context needed to interpret an action in
the description or its confirmation. Keep action labels concise.

### Exceptions

None. Section actions remain with their sections rather than moving into this header.

## Verification

Check title-only, title with description, and title with controls compositions.
At narrow widths and zoom verify controls remain reachable and follow text. Verify
availability matches server-provided permissions. Reject a second page h1 or an action
that only applies to a subsection. Check that adding controls does not change heading
styling. Use `pnpm lint`, `pnpm build`, and `pnpm exec tsc --noEmit` for consumer code.
