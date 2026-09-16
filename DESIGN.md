# AI design system demo design

## Intent and shared rules

The current interface is the Next.js starter: instructions and links to templates,
learning, deployment and documentation in [app/page.tsx](app/page.tsx).
Product-specific end-user tasks, brand direction and shared composition rules: none
documented. Its current presentation is implementation evidence, not a reusable
design specification.

Repository requirements remain in [AGENTS.md](AGENTS.md), including the requirement
to read the installed Next.js guides before writing code and Conventional Commits.
Use the [design-system skill](.agents/skills/design-system/SKILL.md) for design work.
A contract documents a UI entity's intended use and observable promises; a token is
a named design choice such as a foreground colour.

## Design-system sources

- Components: [index](design-system/COMPONENTS.md)
- Layouts: [index](design-system/LAYOUTS.md)
- Patterns: [index](design-system/PATTERNS.md)
- Tokens and themes: [app/globals.css](app/globals.css) defines background and
  foreground CSS variables, their Tailwind colour aliases and font aliases. Dark
  colours follow `prefers-color-scheme`. A separate token catalogue and documented
  usage constraints: none.
- Fonts and stylesheet entry: [app/layout.tsx](app/layout.tsx) imports global CSS
  and loads Geist and Geist Mono variables. The body stylesheet uses Arial/Helvetica;
  the starter page selects the sans token with `font-sans`.
- Visual specifications, design references and a theme-switching API: none.

## Contracts and public use

Component contracts belong in `design-system/components/`, layout contracts in
`design-system/layouts/` and pattern contracts in `design-system/patterns/`.
The three uppercase indexes are generated from discoverable contracts. Component
and pattern indexes remain empty. The [root document layout](design-system/layouts/root-layout.md)
documents the existing framework-owned route composition boundary.
Implementation paths stay unchanged.

The starter page remains an unmanaged consumer (without a design-system contract).
There is no project-owned reusable UI library or documented shared override API.
The page uses native elements, `next/image` and Tailwind classes; these observations
do not establish shared component promises. Global CSS is loaded by the root layout.

Use `design-system use` for product selection and composition, and `design-system
craft` for authorised shared design and contract development. When both are
authorised, follow craft → checks → use → checks, then return evidence to the calling
project task. Component internals and business logic remain project-owned, as do
engineering procedures, approvals and overall completion criteria.

## Verification

Run commands from the repository root. [package.json](package.json) selects pnpm
and provides `pnpm dev` (preview), `pnpm lint`, `pnpm build` and `pnpm start`
(production preview after building). See [README.md](README.md) for local preview
instructions and [eslint.config.mjs](eslint.config.mjs) for lint configuration.

Generate and check indexes with the installed skill:

```sh
node .agents/skills/design-system/scripts/generate-indexes.mjs .
node .agents/skills/design-system/scripts/generate-indexes.mjs --check .
```

Contract structure checks are supplied by the installed skill's
[checker](.agents/skills/design-system/scripts/check-contract.mjs) and
[format instructions](.agents/skills/design-system/reference/formats.md).
The root-layout contract is checked with `--kind layout` and all three indexes.
Dedicated test commands, automated browser/accessibility or visual regression
checks, and a project browser-support or
accessibility policy: none configured. Runtime appearance and accessibility remain
unverified by this documentation-only migration. Rendered heights, theme appearance,
font loading and browser interactions have source evidence only. Detailed migration
verification records are not retained, by user choice.

Setup verification choice: run (selected by the user). This choice applies only to this connection and
its selected next-step handoff, not unrelated future work. Applicable setup checks
cover local links, generated indexes, instruction preservation and independent review.

## Gaps and decisions

Open gaps: [journal](design-system/gaps.md). Closed entries:
[archive](design-system/gaps-archive.md). Move closed entries there in full with their
disposition, closure date and evidence of the original expected result.

Initial connection and repository-wide automatic migration are complete. Migration
used mode 3 (contracts only), with verification enabled and runtime code unchanged.
One existing layout is documented and discoverable. The starter page and its inline
regions are consumers, not extracted components or patterns; unwrapped `next/image`
is external and was not adopted. Tokens remain at their existing source.
Contract/source-hash validation, index freshness, local links, independent discovery
and final independent review passed. No blockers remain for documentation completion.
Independent discovery confirmed route-level use and excluded use as an inner section
wrapper. Runtime verification limits remain in Verification above.
No repairs or exceptions are introduced.
Missing design decisions and verification capabilities are recorded above; setup
does not invent them or introduce new components.

Agent mode is multiple-agent, evidenced by `AGENTS.md` and `.agents/`.
`AGENTS.md` is canonical; `CLAUDE.md` points to it through the relative symlink
`AGENTS.md`, preserving its former `@AGENTS.md` import. There are no nested agent
instruction files. Inspected repository skills: only
`.agents/skills/design-system`, also exposed at `.claude/skills/design-system` through
`../../.agents/skills/design-system`. Both paths retain the same installed package.
The installation is recorded in [skills-lock.json](skills-lock.json); no competing
repository skill, additional project workflow, or instruction conflict was found.
Global and session skills were outside this repository reconciliation.
