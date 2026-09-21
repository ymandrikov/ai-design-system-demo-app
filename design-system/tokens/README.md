# CSS design tokens

Two levels: [raw.css](raw.css) owns literal values; [semantic.css](semantic.css)
assigns those values to public roles and scales. Global CSS imports both after
Tailwind. Components and pages use semantic utilities or semantic CSS variables,
never raw tokens. Tailwind colour aliases only expose the existing semantic roles;
they are an integration bridge, not another design tier.

## Scales

Values below are CSS pixels at the default 16px root size. Dimensions and font sizes
are stored in rem; line heights use ratios. Borders, focus strokes and offsets use px.

| Scale                             | Names                                    | Values                                    |
| --------------------------------- | ---------------------------------------- | ----------------------------------------- |
| Spacing                           | xs, s, m, l, xl, 2xl, 3xl, 4xl, 5xl, 6xl | 2, 4, 8, 12, 16, 24, 32, 40, 48, 64       |
| Font size                         | xs, s, m, l, xl                          | 12, 14, 16, 18, 30                        |
| Line height paired with font size | xs, s, m, l, xl                          | 16, 20, 24, 28, 36                        |
| Radius                            | none, m, full                            | 0, 8, capsule                             |
| Font weight                       | normal, medium, semibold                 | 400, 500, 600                             |
| Shadow                            | s, l                                     | existing small elevation, modal elevation |

Use spacing utilities such as `p-xl`, `gap-m`, `mt-2xl`; text utilities
`text-s`, `text-xl`; and `rounded-m` or `rounded-full`.
The same size name in different scales does not imply the same numerical value.
Zero is structural and remains `p-0`, `gap-0`, `rounded-none`, etc.

## Dimensions by purpose

| Role                            | Utility examples                          | Value       |
| ------------------------------- | ----------------------------------------- | ----------- |
| Button/control height           | h-control-xs/s/m/l, size-control-xs/s/m/l | 24/28/32/36 |
| Icon size                       | size-icon-s/m/l                           | 12/14/16    |
| Badge height                    | h-badge-height                            | 20          |
| Table header/row heading height | h-table-header-height                     | 40          |
| Choice target minimum height    | min-h-option-min-height                   | 48          |
| Modal width                     | max-w-dialog-width                        | 512         |
| Focused form width              | max-w-page-narrow                         | 672         |
| Overview/detail width           | max-w-page-wide                           | 1152        |
| Scrollable table minimum        | min-w-table-min-width                     | 896         |

Preserve roles even when values coincide: a control height is not page spacing.
Button's public sizes remain xs/sm/default/lg and their icon equivalents.
Use the default unless its contract permits another size for the requested context.

## Themes and interaction

Component state colour tokens resolve light/dark differences in CSS. Use these
roles inside their owning shared components, rather than local `dark:` classes.
Values below reference the existing semantic palette; translucent colours mix in
OKLab with transparent using the named alpha scale.

| Token               | Owner and role                                            | Light                | Dark                 |
| ------------------- | --------------------------------------------------------- | -------------------- | -------------------- |
| border-invalid      | Button invalid border                                     | destructive          | destructive / half   |
| destructive-ring    | Button/Badge invalid and destructive focus ring           | destructive / subtle | destructive / medium |
| destructive-surface | Button/Badge destructive background                       | destructive / faint  | destructive / subtle |
| destructive-hover   | Button destructive hover background                       | destructive / subtle | destructive / muted  |
| border-outline      | Button outline border                                     | border               | input                |
| outline             | Button outline background                                 | background           | input / muted        |
| outline-hover       | Button outline hover background, including expanded state | muted                | input / half         |
| outline-expanded    | Button outline expanded background                        | muted                | input / muted        |
| ghost-hover         | Button/Badge ghost hover background                       | muted                | muted / half         |
| tabs-foreground     | Tabs/NavigationalTabs inactive text                       | foreground / strong  | muted-foreground     |
| border-tabs-active  | Filled Tabs/NavigationalTabs active border                | transparent          | input                |
| tabs-active         | Filled Tabs/NavigationalTabs active background            | background           | input / muted        |

Line tabs keep transparent active borders and backgrounds. Badge's destructive
link hover remains destructive / subtle in both themes. Badge's invalid border
remains destructive; only Button uses border-invalid.

The following role aliases apply in both themes and are re-resolved at each
`:root` or `.dark` boundary. They preserve the existing colours and opacity while
following design-lint's standard text, border and hover naming rules.

| Token                    | Role                                         | Value in either theme |
| ------------------------ | -------------------------------------------- | --------------------- |
| destructive-foreground   | Error text and destructive Button/Badge text | destructive           |
| border-destructive       | Badge invalid border                         | destructive           |
| border-destructive-focus | Destructive Button focus border              | destructive / medium  |
| foreground-hover         | Button and tab hover text                    | foreground            |
| muted-foreground-hover   | Badge outline/ghost hover text               | muted-foreground      |
| link-foreground-hover    | Title link hover text                        | primary               |
| primary-hover            | Primary Button/Badge hover background        | primary / hover       |
| badge-secondary-hover    | Secondary Badge link hover background        | secondary / hover     |
| badge-destructive-hover  | Destructive Badge link hover background      | destructive / subtle  |
| badge-outline-hover      | Outline Badge link hover background          | muted                 |
| table-row-hover          | Table row hover background                   | muted / half          |

`destructive-foreground` is red text on the existing neutral or translucent
surfaces, not a contrasting white label for a solid red background. Keep
`badge-destructive-hover` separate from Button's `destructive-hover`: Badge retains
20% in both themes, while Button uses 20% in light and 30% in dark. Secondary Badge
hover retains 80% opacity; the secondary Button retains its different colour mix.

Colour roles retain their existing names, including background/foreground, card,
popover, primary, secondary, muted, destructive, border, input and ring.
Pair surfaces with their foreground tokens. Light and .dark map roles directly
to raw palette values; no automatic theme switching or new palette is introduced.
Existing chart/sidebar/accent definitions remain available without new consumers.

Semantic alpha modifiers faint/subtle/muted/medium/half/strong/hover preserve
10/20/30/40/50/60/80 percent opacity, for example
`bg-destructive/(--alpha-faint)`. Disabled controls use opacity-disabled (50%).
The secondary hover mix keeps its 5% foreground contribution.

Border-width is 1px; focus-outline-width is 2px, focus-outline-thin is 1px,
focus-ring-width is 3px and focus-offset is 4px. Link underline offset is 4px;
indicator thickness is 2px and pressed controls move 1px. Utilities reference
these semantic variables with Tailwind's typed variable syntax where necessary.
Normal transitions retain 150ms and the existing standard easing.

Responsive variants remain sm=640px and lg=1024px. Their semantic viewport-sm/lg tokens use
Tailwind's build-time `theme()` lookup of raw values: runtime CSS `var()` does not
work in media conditions. Explicit variant registration preserves ascending
breakpoint order. Change the raw breakpoint, then rebuild.

## Migration and boundaries

The owner approved normalizing spacing 3→4, 6→8, 10→12 and 20→24px, compact-button
type 12.8→12px, and radii 8/10→8px. The former 26px badge radius becomes full.
Other existing design values retain their meaning and value.
The audit covered every defined variant, including currently unused Button and
Tabs variants, rather than only the four main screens.

Structural classes (flex/grid, alignment, wrapping, full/auto sizes, zero offsets,
visibility and scrolling) remain ordinary CSS. Private geometry stays with its
component and derives from semantic tokens when related to a border or inset.
The tabs indicator follows the list inset; the horizontal trigger fills its inner
height after the approved padding normalization.

Use the configured `cn` from `@/lib/utils`; the default merger mistakes text-s/m/l
for colours and does not resolve all custom spacing conflicts.
No new components, dependencies, visual lint or automated test suite are introduced.
Run the existing build, type, lint and contract checks from [DESIGN.md](../../DESIGN.md).
Inspect both themes at narrow and wide widths, focus, variant sizes, modal placement
and table scrolling after changing tokens.
