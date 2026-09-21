---
id: tabs
description: Former local panel switcher, retired because no application page consumes it.
status: deprecated
sources: []
---

# Tabs

## When to use

All criteria must hold:

- A new authorised craft task must reintroduce and verify an implementation before use.

No current uses. The unused implementation and its line/vertical variants were removed
when the owner restricted the system to variants consumed by application pages.

## When not to use

- URL navigation uses [NavigationalTabs](navigational-tabs.md).
- A saved choice uses a native form control.
- A future local-panel interface requires a new, scoped design-system task.

## Public API

No implementation or supported exports remain. This record preserves historical links.

## Behaviour and states

None. Removing Tabs does not change the application's URL-based environment navigation.

## Accessibility

### Provided by the component

No rendered interface remains.

### Required of consumers

Future panel controls must establish their own keyboard interaction and panel relationships.
