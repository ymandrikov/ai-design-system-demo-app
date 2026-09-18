---
sourcesHash: f314db27ce98404c63cdbe319b914a7d9551c4226498fb079456617af8f2a7a6
id: app-identity
description: Identify Deploy Board and its local-demo context with a shared non-interactive application name and qualifier.
status: discoverable
sources:
  - components/ui/app-identity.tsx
---

# AppIdentity

## When to use

All criteria must hold:

- The content identifies Deploy Board itself and its local-demo context, rather than the current page or record.
- The identity is informational text, not a navigation control.

## When not to use

- The content identifies the current page and its actions: use [PageHeader](page-header.md).
- The user needs a link to a destination: use an ordinary [text link](text-link.md).
- The content names a service, deployment or another application: supply that content in its own context.

## Public API

### React

Import `AppIdentity` from `@/components/ui/app-identity`.

```tsx
<div className="mb-12">
  <AppIdentity />
</div>
```

There are no props, children, variants, native-attribute forwarding, styling overrides,
events or methods. The fixed text is `Deploy Board` followed by `/ Local demo`.
The component supports server rendering without state or a client directive.

The owner approved preserving the four existing identity blocks: a small semibold,
tightly tracked paragraph with a normal-weight muted qualifier separated by spacing-2.
The component owns this typography and internal spacing. Colours inherit foreground
and use muted-foreground from [global tokens](../../app/globals.css).

Pages own placement and outer spacing. The four existing consumers (Services,
Service details, Deployment details and Deploy) wrap it with mb-12 before the next
region. It is not injected by PageContainer or the document layout and is not added
to loading, error or not-found views by this extraction.

## Behaviour and states

Renders a paragraph with the app name followed by a span containing the qualifier.
Text follows normal wrapping. It does not navigate, load data, react to route state,
truncate content or introduce loading, error or interactive states.

## Accessibility

### Provided by the component

Visible text in reading order, without a heading, new landmark, role, live region or
focus stop. The demo qualifier conveys its meaning in text rather than colour alone.

### Required of consumers

Supply the page heading separately with PageHeader. Keep the identity readable in
its surrounding layout at narrow widths and zoom. Do not treat it as a home link
or replace the page's main heading with it.
