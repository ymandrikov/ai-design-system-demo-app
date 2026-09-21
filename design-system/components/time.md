---
sourcesHash: eed9aa842f6a2c64a29035edd4a689daf05b2db589d0b61d78ef0162cc92e2cd
id: time
description: Display a recorded date or time as secondary inline metadata with a machine-readable value.
status: discoverable
sources:
  - components/ui/time.tsx
  - lib/with-design-system-exception.tsx
---

# Time

## When to use

All criteria must hold:

- The user reads a recorded date or time associated with an event or record.
- The timestamp is supporting inline metadata, such as a summary value or log entry.

## When not to use

- The user edits a date or time: use a labelled input instead.
- The value is absent: the consumer provides missing-data text instead.
- The content is an elapsed duration rather than a recorded date or time: use ordinary text with units.
- The date is a primary heading rather than supporting metadata: retain heading semantics and its owning typography.

## Public API

### React

Import `Time` from `@/components/ui/time`.

```tsx
<Time value={deployment.startedAt} format="dateTime" />
<Time value={log.at} format="time" showTimeZone={false} />
```

Required `value: Date` is the recorded instant; supply a valid Date, never null.
Required `format: "dateTime" | "time"` selects the system format. Use `dateTime`
for dates with hours and minutes in summaries and tables. Use `time` for hours,
minutes and seconds in timestamped logs whose surrounding context identifies the
event or run. Both use the fixed `en-GB` locale and UTC time zone.

Optional `showTimeZone: boolean` defaults to true and appends ` UTC` to either
format. Set it to false only when a surrounding group or column heading explicitly
identifies UTC. It controls the label, never conversion of the value.
The component derives both visible text and native datetime from value.

The component owns the native time element and inherits colour, font, size and
wrapping from its context. Consumers own surrounding spacing and field labels.
There are no other native-attribute forwarding, events or methods.
`children`, `dateTime`, and top-level `className` and `style` are not public props.

For an authorised local styling deviation, pass `designSystemException` with a
required meaningful `reason: string` and optional `className: string` and
`style: CSSProperties`, using the shared
[withDesignSystemException helper](../../lib/with-design-system-exception.tsx).
Omitting it preserves existing styling; existing consumers need no migration.
Exception classes are forwarded to the time element, which has no default classes.
Inline styles have normal CSS precedence.
The exception cannot change formatting or native datetime semantics. Its object
and reason are not forwarded to the DOM; the reason is required by TypeScript,
without runtime validation. Each actual use requires an entry in the
[exception journal](../gaps.md), linked by an adjacent source comment.
No current consumer needs an exception.

## Behaviour and states

Formats the supplied instant in UTC, independently of the runtime's local time
zone. The native datetime retains its complete ISO value, including seconds and
milliseconds even when the display omits them. Changed props update the text;
there is no timer, data loading or relative-time display. It supports server and
client composition without state. Missing values are handled by the consumer;
no loading or empty state exists. Invalid Dates are programming errors and throw
instead of displaying a fabricated timestamp.

## Accessibility

### Provided by the component

Native time semantics associate readable content with its machine-readable value.
No interactive role or tab stop is added.

### Required of consumers

Provide a valid Date and identify the associated event in surrounding content.
When showTimeZone is false, identify UTC in the group or column heading.
Preserve description-list, table or list semantics around the component.
