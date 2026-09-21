# CSS design tokens

[raw.css](raw.css) contains only the shared dimension scale, named by its pixel
value at a 16px root (`--size-16: 1rem`). Components never consume it directly.
[semantic.css](semantic.css) assigns dimensions to roles and defines colours,
typography, geometry and motion directly. Semantic Tailwind theme names are the
public API; there is no additional colour-alias tier and no `ui-` prefix.

Keep only tokens consumed by application pages, including loading, empty, error
and interaction states and both themes. A supported component variant must have
an application consumer. Documentation, merger configuration, or an alias with no
final consumer does not establish usage. Remove obsolete variants and their
transitive dependencies together; do not retain compatibility aliases.

## Scales

Dimensions and font sizes use rem. Borders and focus geometry use px. The spacing
scale is unchanged; names use `sm/md/lg` rather than `s/m/l`.

| Scale              | Names                                       | Values at a 16px root                 |
| ------------------ | ------------------------------------------- | ------------------------------------- |
| Spacing            | xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl | 2, 4, 8, 12, 16, 24, 32, 40, 48, 64px |
| Text               | xs, sm, md, xl                              | 12, 14, 16, 30px                      |
| Paired line height | xs, sm, md, xl                              | 16, 20, 24, 36px                      |
| Font weight        | normal, medium, semibold                    | 400, 500, 600                         |
| Radius             | md, full                                    | 8px, capsule                          |
| Shadow             | sm, lg                                      | Small elevation, modal elevation      |

The former 18px text step now uses `text-md` (16px/24px). Section/dialog headings
and emphasized summary values retain semibold weight. Page titles stay 30px.
Use `p-xl`, `gap-md`, `mt-2xl`, `text-sm`, `rounded-md` and `rounded-full`.
Zero remains structural (`inset-0`, etc.). Identical names across scales do not
imply identical values.

## Dimensions by purpose

| Role                                       | Utility                 | Value  |
| ------------------------------------------ | ----------------------- | ------ |
| Button/input height; icon-only button size | h-control, size-control | 32px   |
| Button SVG icon                            | size-icon               | 16px   |
| Badge height                               | h-badge                 | 20px   |
| Table heading height                       | h-table-header          | 40px   |
| Choice minimum height                      | min-h-option            | 48px   |
| Modal maximum width                        | max-w-dialog            | 512px  |
| Focused page maximum width                 | max-w-page-narrow       | 672px  |
| Overview/detail maximum width              | max-w-page-wide         | 1152px |
| Scrollable table minimum width             | min-w-table             | 896px  |

Keep distinct roles even when their values coincide. Only Button sizes `default`
and `icon` remain. Button SVGs use the single 16px icon token; unused compact/large
control sizes and additional icon sizes were removed.

## Colours and themes

Names describe purpose: `content` for text, `canvas` for surfaces, `container` for
controls/annotations and `border` for lines/focus. State names end in `-hover`,
`-selected`, etc. Component-scoped names remain where their role differs from a
shared one. The CSS groups and declarations are the authoritative value catalogue.

- Body uses `canvas` / `content`; cards use `canvas-card` / `content-card`;
  dialogs use `canvas-overlay` / `content-overlay`.
- Primary actions use `container-emphasis` / `content-inverted`. Title links use
  `content-emphasis-hover` on hover. Both retain the existing blue emphasis colour.
- Neutral badges use `container` / `content-secondary`; destructive controls and
  badges use `container-destructive` / `content-destructive`.
- Supporting text uses `content-subtle`. Navigation tabs own their selected
  container/border and inactive content roles.
- Translucent surfaces, backdrops and focus rings are named colours. Percentages
  live directly in their `color-mix()` definitions; there is no raw or semantic
  alpha scale. Components do not add colour opacity modifiers.

Theme-dependent colours use `light-dark(light, dark)` in a single declaration.
Root `color-scheme: light dark` follows the operating-system/browser preference,
including native controls. There are no `.dark` overrides, theme switch, or
JavaScript theme state. Preserve both branches when editing colours; fixed colours
need no `light-dark()` wrapper. Existing light/dark colour values are retained.

## Geometry, fonts and motion

Shared non-Tailwind geometry variables cover the 1px separator, 2px focus outline,
1px navigation outline, 3px focus ring, 4px focus/underline offsets and 1px press
movement. Disabled controls use `--opacity-disabled: 0.5`.

Next.js supplies Geist Sans and Geist Mono. Inline Tailwind font aliases resolve
those variables at the consuming element, without intermediate raw aliases.
Transitions retain 150ms and `cubic-bezier(0.4, 0, 0.2, 1)`.
Standard Tailwind breakpoints are `sm=40rem` and `lg=64rem`; direct build-time
values replace raw breakpoint tokens and custom variant registration.

Tailwind scans only `app/` and `components/`; documentation examples do not generate
utilities. Unused animation/shadcn stylesheet imports are removed; navigation uses
the native Tailwind `data-[active]` variant.

## Components and verification

Button retains default/outline/destructive variants; Badge retains
secondary/destructive. NavigationalTabs owns one filled horizontal treatment.
Unused panel Tabs, table footer and vertical Separator were removed.
Stack defaults to adjoining children; `spacing="md"` groups related explanations
with an 8px gap. BorderedCard.Section owns 16px padding and gaps between blocks.

Use the configured `cn` from `@/lib/utils` to distinguish `text-md` from colours
and merge named dimensions correctly. Structure and private derived geometry stay
local to components. No new dependencies, test suite or token-check framework are
introduced.

Run lint, build, type checking and the contract/index checks from
[DESIGN.md](../../DESIGN.md). For token changes, trace every retained declaration
to a CSS use or a generated utility used by a page/component, following aliases
transitively; inspect the compiled CSS for unresolved references. Check both system
colour schemes at narrow/wide widths, focus, dialogs and table scrolling.
