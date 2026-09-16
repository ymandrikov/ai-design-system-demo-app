# Design-system improvements

Date: 2026-09-16. Scope: one full survey of the existing system and its Services
consumer. Presentation changes only; application logic and interaction behaviour
are unchanged. No previous improvement report or analysis candidates existed.

## Coverage

All connected system areas were inspected; browser verification is unavailable.

| Area | Sources | Result |
| --- | --- | --- |
| Rules and ownership | [DESIGN.md](../DESIGN.md), [AGENTS.md](../AGENTS.md) | Inspected; existing rules support both repairs below. |
| Components | [index](COMPONENTS.md), [Table contract](components/table.md), [implementation](../components/ui/table.tsx) | Inspected; public API and implementation agree. |
| Layouts | [index](LAYOUTS.md), [root contract](layouts/root-layout.md), [implementation](../app/layout.tsx) | Inspected; document structure, language, fonts and ownership agree. |
| Patterns | [index](PATTERNS.md) | Inspected; empty. One screen does not establish a reusable pattern. |
| Shared styles, tokens and themes | [global CSS](../app/globals.css) | Inspected both theme definitions and aliases; no token changes needed. Chart/sidebar roles have no current consumers. |
| Consumers | [Services page](../app/page.tsx) | Inspected all Table usage, environment links, statuses and empty-state markup; repaired I-01 and I-02. |
| Existing findings | [gaps](gaps.md), [archive](gaps-archive.md) | Inspected; no existing entries or duplicates. No systemic gap found. |

Dependencies and generated copies are excluded. No shared component, contract,
eligibility, index, token or normative rule changes were needed. Shared sources and
contracts were checked before the consumer edits; no shared API migration applies.

## Findings and decisions

### I-01 — Pair the empty card's surface and foreground

Completed. The Services empty state used `bg-card` while inheriting the document
foreground. DESIGN.md requires pairing surface tokens with their foreground roles.
Added `text-card-foreground` to the existing section. This makes the role explicit
if the card palette changes; current light and dark foreground values coincide, so
no visible colour change is intended. Empty-state structure and text are unchanged.
Only the Services consumer is affected. Static verification passed; its rendered
empty state remains unverified.

### I-02 — Keep date presentation inside Table's cell boundary

Completed. Services applied nowrap and muted text classes directly to `td` despite
the Table contract reserving cell styles to the component and allowing consumers
to format inline content. Moved those classes onto an inline span around the existing
date or dash, retaining the semantic `time` element and its data. Added `text-nowrap`
alongside the existing whitespace fallback, following the retrieved web guidance.
The intended date presentation is unchanged; Table retains cell styling ownership.
Only the Services consumer is affected. Source and HTTP markup checks passed;
narrow-width layout remains unverified.

No new public capabilities, semantic contract changes or breaking changes are
proposed. No decisions or logic repairs are pending. Additional components and
patterns were not extracted: the inspected screen supplies no demonstrated need.

## Verification

Commands ran from the repository root on 2026-09-16.

- `node .agents/skills/design-system/scripts/generate-indexes.mjs --check .`:
  exit 0; all three indexes current.
- `node .agents/skills/design-system/scripts/check-contract.mjs --kind component --inventory design-system/COMPONENTS.md --inventory design-system/LAYOUTS.md --inventory design-system/PATTERNS.md design-system/components/table.md`:
  exit 0, `ok`; source snapshot current.
- Same checker and indexes with `--kind layout design-system/layouts/root-layout.md`:
  exit 0, `ok`; source snapshot current.
- Contract check: **table — valid**. Required captions name the environment;
  column and row headers, text statuses, native structure and inline formatting
  satisfy consumer obligations. Cells now have no consumer styling overrides.
- Contract check: **root-layout — valid**. One document shell, English language,
  font aliases, source order and page-owned main landmark and spacing are intact.
- `pnpm lint`: exit 0.
- `pnpm build`: failed because Turbopack cannot bind its internal port in the sandbox.
  The documented alternative, `pnpm build --webpack`, exited 0 and compiled both routes.
- `pnpm exec tsc --noEmit`: exit 0 after the build. The initial concurrent attempt
  encountered missing generated `.next/types` files while the build was regenerating them.
- Local production preview: HTTP checks for production and staging both passed
  (200 response, environment caption, current navigation link, inline date classes,
  and no styled `td`). This is server-rendered markup evidence, not a browser check.
- `git diff --check`: exit 0. No automated tests were added, per project instructions.

Static: pass. Behavioural and visual: unverified in-browser because the available
computer-use tool returned “No browser is available.” Keyboard scrolling, focus
outline, environment-link interaction, reload persistence, narrow widths, both
rendered themes and the rendered empty state were not checked in this pass.
No external visual baseline exists; no pixel-match claim is made.

Survey and permitted edits are complete; UI verification remains partial. Resume
with a connected browser to check those states. Gap gate: none. Decisions needed: none.
