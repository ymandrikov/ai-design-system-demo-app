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
  [dimension values](design-system/tokens/raw.css) and [semantic definitions](design-system/tokens/semantic.css),
  imported by [app/globals.css](app/globals.css). Raw values contain only the shared
  dimension scale. Semantic colours, typography, states and geometry are defined directly;
  Tailwind theme names are the public API without a duplicate alias layer.
  Content, canvas, container and border names describe each colour's purpose.
  Preserve distinct roles even when their values coincide. Colour supplements status text.
- Keep only tokens and component variants consumed by application pages, including
  their loading, empty, error and interaction states and both themes. Documentation
  or an alias without a final consumer is not usage. The spacing scale stays unchanged;
  the former 18px text size is consolidated into 16px with semibold emphasis.
- Components and pages use semantic utilities. Structural CSS and private geometry
  remain local. Use `cn` from `@/lib/utils` so custom typography and spacing names merge
  correctly; do not import the unconfigured `cn` package directly.
- Fonts: [app/layout.tsx](app/layout.tsx) loads Geist Sans and Geist Mono; global sans
  and mono aliases resolve to those variables. The sans font is applied on HTML.
- Both themes use CSS `light-dark()` and `color-scheme: light dark`, following the
  system preference. There is no theme-switching UI or JavaScript theme state.

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
sections, spacing-xl from section heading to content and spacing-md before descriptions.
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
The locally added shadcn [Dialog](design-system/components/dialog.md) parts support
forms and focused secondary tasks. [AlertDialog](design-system/components/alert-dialog.md)
parts support important warnings with custom content or response flows beyond
ConfirmationDialog's fixed API; use ConfirmationDialog for read-only confirm/cancel
tasks. AddServiceDialog composes Dialog; ConfirmationDialog composes AlertDialog
and adds intent-based action order, initial Cancel focus and request feedback.
The primitives own the shared overlay styling and use the existing Button API.
Both rollback buttons use destructive styling. Environment
navigation uses [NavigationalTabs](design-system/components/navigational-tabs.md)
with canonical destination URLs derived by the server. The component renders
Next.js links with `aria-current="page"`; the server validates the environment and
loads its data. Follow the [environment browsing pattern](design-system/patterns/environment-browsing.md)
to keep navigation, record data, empty states and destination context consistent on
the Services and Service details screens. Unused local-panel Tabs were retired;
NavigationalTabs owns its filled horizontal styling directly.
Standalone screen actions use [Button](design-system/components/button.md):
`Button` for form submission and `buttonVariants` on native/Next.js links for
navigation. Deploy uses the default treatment.
Named single-link return regions use [BackNavigation](design-system/components/back-navigation.md)
around TextLink, with page-owned outer spacing and destination context.
Standalone pending/error feedback for retry and confirmation uses
[RequestFeedback](design-system/components/request-feedback.md); field-associated form
feedback remains owned by the form.

Text navigation uses [TextLink](design-system/components/text-link.md),
preserving native navigation and page-owned destinations. These rules are required:

- **Title links** name an object and provide its main entry to
  details in a list, table or card. Service names and deployment numbers in tables
  use `variant="title"`: `content` and semibold weight; hover uses `content-emphasis-hover`.
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
components explicitly adopting this contract; currently those are `TextLink`,
[Time](design-system/components/time.md), [Separator](design-system/components/separator.md)
and [BorderedCard.Section](design-system/components/bordered-card.md).
Each actual exception requires a reason and an entry in the
[journal](design-system/gaps.md), linked from an adjacent source comment.

Compact annotations use [Badge](design-system/components/badge.md).
[VersionLabel](design-system/components/version-label.md) composes its secondary
treatment with native code; [DeploymentResult](design-system/components/deployment-result.md)
uses secondary for success and destructive for failure. Both retain their domain
labels and public props across the services list, service history and deploy summary.
[DescriptionItem](design-system/components/description-item.md) owns each read-only
name/value pair inside a native description list: small muted label and parent-owned
spacing-sm between label and value. Plain children use ordinary styling; DescriptionItem.Emphasised and DescriptionItem.Empty
style emphasized values and missing-data text. Consumers own field order and value formatting.
[DescriptionList](design-system/components/description-list.md) owns the native dl
and wrapping layout for summary pairs, with spacing-4xl on both axes;
only the deployment status forwards a polite live region.
Components receive content through props and never access SQLite.

Service and deployment detail summaries follow the
[status summary pattern](design-system/patterns/status-summary.md): primary status
and version above supporting metadata, with neutral surfaces and precise consequence
text. [BorderedCard](design-system/components/bordered-card.md) owns the surface and
vertical arrangement without gaps. Its Section owns spacing-xl padding and gaps
between blocks; [Separator](design-system/components/separator.md) divides sections.
[Stack](design-system/layouts/stack.md) with `spacing="md"` owns spacing-md between
related explanations. Pages supply content, conditions and a typography-only
`text-sm` wrapper around the supporting Section, or an authorised Section exception
for that typography. Service summaries distinguish the current service from its last completed
deployment; active progress stays in history.

## Verification

From the repository root: `pnpm lint`, `pnpm build`, and `pnpm exec tsc --noEmit`.
`pnpm lint` includes design-lint through [oxlint.config.mjs](oxlint.config.mjs),
using the application's Tailwind entry and shared component import paths. Standard
rules apply without custom overrides: text and border colours use their semantic
roles, and hover colours use tokens ending in `-hover`.
Button, Badge and navigation tabs resolve theme-dependent state colours through
semantic tokens, without local `dark:` branches.
Preview with `pnpm dev`; database setup is in [README.md](README.md).
No automated tests are added at this stage. Browser checks cover environment switching,
reload persistence, text status distinctions, empty data and narrow-width scrolling.
Deployment checks cover version selection and summary, the production warning,
Cancel navigation, pending/validation feedback, and preservation of the environment
in URLs. Verify successful and failed runs, the working version after a failure,
reload during an active run, competing submissions from two tabs, and the history's
one-second refresh stopping at completion. Check keyboard focus on actions and navigation links in both system colour schemes.

```sh
node .agents/skills/design-system/scripts/generate-indexes.mjs .
node .agents/skills/design-system/scripts/generate-indexes.mjs --check .
```

Use the [contract checker](.agents/skills/design-system/scripts/check-contract.mjs)
with the relevant kind and all three indexes, following [formats](.agents/skills/design-system/reference/formats.md).
Source hashes establish reviewed source snapshots, not runtime correctness.

## Gaps and decisions

[Open gaps](design-system/gaps.md); [archive](design-system/gaps-archive.md).
The initial connection was documentation-only. The owner authorized analysis A-01
on 2026-09-18: PageContainer now centralizes the existing page dimensions across
eight route views. There is no theme control or automated visual/accessibility suite. Deployment
details compose the existing header, version, outcome and action components with page-local stage cards, timestamped logs and modal rollback
confirmation. Retry and rollback actions live in the page header. Server-provided permissions control retry and rollback availability.
