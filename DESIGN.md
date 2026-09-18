# Deploy Board design

## Intent and shared rules

Deploy Board is a local deployment demo. The Services screen compares service health,
current versions and the last completed deployment by environment. Service pages show
the current version and active/completed deployment history. The Deploy form selects
a predefined version, shows its commit and description, and warns for production.
Health and deployment outcome are separate and must use explicit text labels.
No real deployment is performed.

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

[PageContainer](design-system/layouts/page-container.md) owns the main landmark,
centering, responsive page padding and width presets. Data overviews/details use
the default wide width; focused single-column forms use `width="narrow"`. Fallbacks
retain their route width; the shared service not-found view uses the service detail
width. Pages own content order, branding, spacing between regions and empty-data
conditions. [DatasetEmptyState](design-system/components/dataset-empty-state.md)
owns the shared empty-table surface, typography and internal spacing; pages supply
contextual copy and the appropriate h2 or h3 heading level.
[PageHeader](design-system/components/page-header.md) owns the page heading,
optional description and placement of page-level controls. Follow the
[page heading pattern](design-system/patterns/page-heading.md) for that composition.
[ConfirmationDialog](design-system/components/confirmation-dialog.md) implements the
[modal confirmation pattern](design-system/patterns/modal-confirmation.md): destructive
main actions before Cancel, ordinary confirmations after Cancel; the button group
is always right-aligned, preserving order when stacked.
Both rollback buttons use destructive styling. Environment
navigation uses [NavigationalTabs](design-system/components/navigational-tabs.md)
with canonical destination URLs derived by the server. The component renders
Next.js links with `aria-current="page"`; the server validates the environment and
loads its data. Tabs remains for local panel switching. Both components reuse
`components/ui/tabs-styles.ts` as their single source of list and item styling.
Standalone screen actions use [Button](design-system/components/button.md):
`Button` for form submission and `buttonVariants` on native/Next.js links for
navigation. Deploy uses the default treatment; Cancel uses the link variant.
Record links and back navigation use the [text-link styling helper](design-system/components/text-link.md)
on ordinary links, preserving native navigation and page-owned destinations.
Compact annotations use [Badge](design-system/components/badge.md).
[VersionLabel](design-system/components/version-label.md) composes its secondary
treatment with native code; [DeploymentResult](design-system/components/deployment-result.md)
uses secondary for success and destructive for failure. Both retain their domain
labels and public props across the services list, service history and deploy summary.
[DescriptionItem](design-system/components/description-item.md) owns each read-only
name/value pair inside a native description list: small muted label and spacing-2
before its value. Consumers own the dl, grid, field order and value formatting;
only the deployment status forwards a polite live region.
Components receive content through props and never access SQLite.

## Verification

From the repository root: `pnpm lint`, `pnpm build`, and `pnpm exec tsc --noEmit`.
Preview with `pnpm dev`; database setup is in [README.md](README.md).
No automated tests are added at this stage. Browser checks cover environment switching,
reload persistence, text status distinctions, empty data and narrow-width scrolling.
Deployment checks cover version selection and summary, the production warning,
Cancel navigation, pending/validation feedback, and preservation of the environment
in URLs. Verify successful and failed runs, the working version after a failure,
reload during an active run, competing submissions from two tabs, and the history's
one-second refresh stopping at completion. Check keyboard focus on actions and,
when previewing Tabs, on both triggers and active panels in light and dark themes.

```sh
node .agents/skills/design-system/scripts/generate-indexes.mjs .
node .agents/skills/design-system/scripts/generate-indexes.mjs --check .
```

Use the [contract checker](.agents/skills/design-system/scripts/check-contract.mjs)
with the relevant kind and all three indexes, following [formats](.agents/skills/design-system/reference/formats.md).
Source hashes establish reviewed source snapshots, not runtime correctness.

## Gaps and decisions

[Tabs](design-system/components/tabs.md) records its remaining verification.

[Open gaps](design-system/gaps.md); [archive](design-system/gaps-archive.md).
The initial connection was documentation-only. The owner authorized analysis A-01
on 2026-09-18: PageContainer now centralizes the existing page dimensions across
eight route views. There is no theme control or automated visual/accessibility suite. Deployment
details compose the existing header, version, outcome and action components with page-local stage cards, timestamped logs and modal rollback
confirmation. Retry and rollback actions live in the page header. Server-provided permissions control retry and rollback availability.
