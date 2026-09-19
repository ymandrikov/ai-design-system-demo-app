---
id: label-formatting
description: Help users identify destinations, actions, fields and statuses through consistent sentence-case labels while preserving names and technical values.
status: discoverable
sources: []
---

# Label formatting

## When to use

All criteria must hold:

- The interface names a destination, action, field, column, section, state or annotation for the user to recognise or choose.

## When not to use

- The content is prose, a log, a quotation or a verbatim data value rather than an interface label: retain its appropriate text formatting.

## Structure

Required: a text label associated with its destination, action or subject. Optional:
a supporting icon or value. The label remains meaningful without the icon.
Use [Tabs](../components/tabs.md) for local panels,
[NavigationalTabs](../components/navigational-tabs.md) for destinations,
[Badge](../components/badge.md) for annotations and
[Button](../components/button.md) for actions, according to their contracts.
Native field labels and table headings follow the same text rule.
Consumers own copy and association; components keep their existing styling and semantics.

Example recipe: a navigation item displays `Production` while its URL retains
`environment=production`; a status badge displays `In progress`; an action displays
`Deploy version`. These labels do not change the underlying identifiers or values.

## Composition

### Required

- Use sentence case for all interface labels: capitalise the first word and keep
  subsequent ordinary words lowercase. Do not use title case or all caps for emphasis.
- Supply correctly cased display text at its source. Do not use CSS `capitalize`
  or `uppercase`, or blanket lowercase conversion: these cannot preserve sentence
  case, proper names and technical spelling reliably.
- Keep the same wording and casing for the same meaning across tabs, badges,
  buttons, navigation, field labels, table headings and section labels.
- Keep accessible names consistent with visible labels. Casing must not depend on
  a visual-only transformation. Preserve the host component's semantics and label
  relationships.

### Recommendations

Keep labels concise. For domain values, reuse an explicit display-label mapping
where one exists instead of changing stored values, route parameters or identifiers.

### Exceptions

Preserve conventional casing of proper names, brands and acronyms, including within
a label: `Deploy Board`, `GitHub settings`, `API status`, `Deploy to API`.
Verbatim service names, version strings, commits, paths and other technical values
retain their exact spelling, even inside a badge or tab; for example `v1.2.0` and
`api-gateway`. A human-readable environment label such as `Production` is not a
verbatim identifier simply because it is derived from `production`.

## Verification

Review display copy independently of internal values. Accept `Deployment history`,
`In progress`, `API status` and `Production`; reject `Deployment History`,
`in progress` and `PRODUCTION` as ordinary labels. For a new field, accept
`Release channel`; preserve a neighbouring verbatim `release/v2` value.
Reject a composition that relies on CSS capitalisation while supplying lowercase
accessible text, or that rewrites `API` to `Api` or `v1.2.0` to `V1.2.0`.

This is a document-only recipe. When applying it to a screen, inspect visible and
accessible labels and confirm that URLs, submitted values and identifiers stay
unchanged.
