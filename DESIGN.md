# Deploy Board design

## Intent and shared rules

Deploy Board is a local deployment demo. The Services screen compares service health,
current versions and the last completed deployment by environment. Service pages show
the current version and active/completed deployment history. The Deploy form selects
a predefined version, shows its commit and description, and warns for production.
Health and deployment outcome are separate and must use explicit text labels.
No real deployment is performed.

All interface labels must use sentence case, including tabs, badges, buttons,
navigation, field labels and table headings. Follow the
[label formatting pattern](design-system/patterns/label-formatting.md) for casing,
technical values and consumer responsibilities.

Follow [AGENTS.md](AGENTS.md) and the [design-system skill](.agents/skills/design-system/SKILL.md).
Product composition uses `use`; authorised reusable work uses `craft`, then checks,
then `use` and its checks. Page-specific compositions do not require pattern extraction.

## Design-system sources

- Components: [index](design-system/COMPONENTS.md)
- Layouts: [index](design-system/LAYOUTS.md)
- Patterns: [index](design-system/PATTERNS.md)
- Tokens and themes: [token catalogue](design-system/tokens/README.md),
  [raw values](design-system/tokens/raw.css) and [semantic definitions](design-system/tokens/semantic.css),
  imported by [app/globals.css](app/globals.css). Semantic tokens reference raw values;
  components and pages use semantic Tailwind utilities. Existing shadcn semantic roles
  govern background/foreground, card surfaces, muted content, primary navigation,
  borders, focus and destructive outcomes. Pair surface tokens with their foreground
  counterparts. Colour supplements status text. No new status palette is needed.
- All existing component variants use the same token system. Numeric spacing utilities
  are replaced by the named scale; structural CSS and private geometric corrections
  remain local. Use `cn` from `@/lib/utils` so custom typography and spacing names merge correctly.
  Do not import the unconfigured `cn` package directly.
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
width. Pages own content order, placement of branding, spacing between regions and empty-data
conditions. [PageContent](design-system/layouts/page-content.md) owns the four main
pages' heading/section composition: spacing-3xl after PageHeader, spacing-4xl between
sections, spacing-xl from section heading to content and spacing-m before descriptions.
It adds no perimeter padding; cards, grids and form internals remain consumer-owned.
[AppIdentity](design-system/components/app-identity.md) owns the fixed
Deploy Board / Local demo text and its typography; the four main pages retain their
outer mb-5xl spacing. Route fallback views do not add this identity. [DatasetEmptyState](design-system/components/dataset-empty-state.md)
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
loads its data. Follow the [environment browsing pattern](design-system/patterns/environment-browsing.md)
to keep navigation, record data, empty states and destination context consistent on
the Services and Service details screens. Tabs remains for local panel switching. Both components reuse
`components/ui/tabs-styles.ts` as their single source of list and item styling.
Standalone screen actions use [Button](design-system/components/button.md):
`Button` for form submission and `buttonVariants` on native/Next.js links for
navigation. Deploy uses the default treatment.
Text navigation uses [TextLink](design-system/components/text-link.md),
preserving native navigation and page-owned destinations. These rules are required:

- **Title links (ссылки-заголовки)** name an object and provide its main entry to
  details in a list, table or card. Service names and deployment numbers in tables
  use `variant="title"`: `foreground` and semibold weight; hover changes colour to `primary`.
- **Ordinary links** include back navigation, contextual deployment references
  and form Cancel. Omit `variant` or use `variant="default"`. They inherit surrounding
  colour and weight; hover adds an
  underline without changing colour.
- Neither kind is underlined at rest; title links also stay ununderlined on hover.
  Both retain visible keyboard-focus outlines and have no distinct visited colour.
  These rules apply in both themes; navigation tabs and button treatments keep
  their own contracts.

`TextLink` exposes styling overrides only through `designSystemException`:
required `reason: string`, optional `className` and `style`. Ordinary styling props
are excluded from its TypeScript API; parents own external spacing. The shared
[withDesignSystemException](lib/with-design-system-exception.tsx) helper wraps a
component that accepts optional styling props. Wrapped implementations must merge
incoming classes after their defaults (using `cn`) and apply incoming inline styles
after any default styles. The helper forwards other props, including refs, unchanged;
it adds no DOM wrapper, runtime validation or CSS inspection. Apply it only to
components explicitly adopting this contract; currently that is `TextLink`.
Each actual exception requires a reason and an entry in the
[journal](design-system/gaps.md), linked from an adjacent source comment.

Compact annotations use [Badge](design-system/components/badge.md).
[VersionLabel](design-system/components/version-label.md) composes its secondary
treatment with native code; [DeploymentResult](design-system/components/deployment-result.md)
uses secondary for success and destructive for failure. Both retain their domain
labels and public props across the services list, service history and deploy summary.
[DescriptionItem](design-system/components/description-item.md) owns each read-only
name/value pair inside a native description list: small muted label and spacing-m
before its value. Consumers own the dl, grid, field order and value formatting;
only the deployment status forwards a polite live region.
Components receive content through props and never access SQLite.

Service and deployment detail summaries follow the
[status summary pattern](design-system/patterns/status-summary.md): primary status
and version above supporting metadata, with neutral surfaces and precise consequence
text. [StatusSummaryLayout](design-system/layouts/status-summary-layout.md) owns the
shared surface, wrapping primary description list and separated supporting region.
Pages supply the fields and retain spacing and arrangement within supporting content. Service summaries distinguish the current service from its last completed
deployment; active progress stays in history.

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
