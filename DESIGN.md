# Deploy Board design

## Intent and shared rules

Deploy Board is a local deployment demo. The Services screen compares service health,
current versions and the last completed deployment by environment. Health and deployment
outcome are separate and must use explicit text labels. No real deployment is performed.

Follow [AGENTS.md](AGENTS.md) and the [design-system skill](.agents/skills/design-system/SKILL.md).
Product composition uses `use`; authorised reusable work uses `craft`, then checks,
then `use` and its checks. Page-specific compositions do not require pattern extraction.

## Design-system sources

- Components: [index](design-system/COMPONENTS.md)
- Layouts: [index](design-system/LAYOUTS.md)
- Patterns: [index](design-system/PATTERNS.md)
- Tokens and themes: [app/globals.css](app/globals.css). Existing shadcn semantic roles
  govern background/foreground, card surfaces, muted content, primary navigation,
  borders, focus and destructive outcomes. Pair surface tokens with their foreground
  counterparts. Colour supplements status text. No new status palette is needed.
- Fonts: [app/layout.tsx](app/layout.tsx) loads Geist Sans and Geist Mono; global sans
  and mono aliases resolve to these variables. The sans font is applied on HTML.
- Dark tokens activate under `.dark`; there is no theme-switching UI or system-preference
  activation. No external visual specification or screenshot baseline is supplied.

## Contracts and public use

Contracts belong in `design-system/components/`, `design-system/layouts/` and
`design-system/patterns/`. The uppercase indexes are generated from discoverable contracts.
The root document layout is framework-owned. Table owns its shared styling and native
scrollable structure; see its [contract](design-system/components/table.md).

The Services page owns its width, spacing, header and empty state. Environment
navigation uses [NavigationalTabs](design-system/components/navigational-tabs.md)
with canonical destination URLs derived by the server. The component renders
Next.js links with `aria-current="page"`; the server validates the environment and
loads its data. Tabs remains for local panel switching. Both components reuse
`components/ui/tabs-styles.ts` as their single source of list and item styling.
Components receive content through props and never access SQLite.

## Verification

From the repository root: `pnpm lint`, `pnpm build`, and `pnpm exec tsc --noEmit`.
Preview with `pnpm dev`; database setup is in [README.md](README.md).
No automated tests are added at this stage. Browser checks cover environment switching,
reload persistence, text status distinctions, empty data and narrow-width scrolling.

```sh
node .agents/skills/design-system/scripts/generate-indexes.mjs .
node .agents/skills/design-system/scripts/generate-indexes.mjs --check .
```

Use the [contract checker](.agents/skills/design-system/scripts/check-contract.mjs)
with the relevant kind and all three indexes, following [formats](.agents/skills/design-system/reference/formats.md).
Source hashes establish reviewed source snapshots, not runtime correctness.

## Gaps and decisions

[Contract adoption progress](design-system/adoption.md) tracks the new Tabs contract.

[Open gaps](design-system/gaps.md); [archive](design-system/gaps-archive.md).
The initial connection was documentation-only. This screen adds the first shared
component. Page width and spacing remain page-owned choices. There is no shared
inner layout, theme control or automated visual/accessibility suite. No decisions
are required for the current read-only screen.
