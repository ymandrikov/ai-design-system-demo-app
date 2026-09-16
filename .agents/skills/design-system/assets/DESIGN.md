# <Project> design

Use this template for root `DESIGN.md`. Preserve existing design content. Operational
paths resolve from the repository root; Markdown links from their containing file.
Record absent sources/tools as `none`. Link definitions instead of duplicating values.

## Intent and shared rules

The end-user tasks, visual character and hierarchy the interface should support.
Link existing shared rules at their authoritative locations; state new rules here:
grouping, composition, typography, accessibility and adaptation. Distinguish required rules, recommendations
and scoped exceptions. Map local terminology to the framework glossary when needed.

## Design-system sources

- Components: [index](design-system/COMPONENTS.md)
- Layouts: [index](design-system/LAYOUTS.md)
- Patterns: [index](design-system/PATTERNS.md)
- Tokens: existing catalogue or definitions, with types, values, roles and constraints.
- Themes and visual specifications: authoritative sources and how consumers use them.

UI indexes route to contracts; token sources have their own format and no inherited
UI eligibility statuses. Empty UI indexes are valid. A layout appears only in Layouts.

## Contracts and public use

Component contracts live in `design-system/components/`, layouts in `design-system/layouts/`
and patterns in `design-system/patterns/`, each with its uppercase index. Apply this
structure when connecting existing projects too. Contract frontmatter owns id/description/status and source, test and example paths
relative to this project root; Markdown links resolve from their containing document.
Name public imports/invocation for supported bindings and which product areas use them.
Link project guidance for product views and component development. Link shared
stylesheet/token entry points and explain public settings/overrides. Craft follows
the project's process for design-only CSS, markup and public settings; use composes
public APIs. Component internals and business logic remain project-owned. A document-only
pattern can describe a recipe without introducing a component.

## Verification

Link the established project testing and preview procedures, including their actual
commands and working directories where useful. State accessibility and browser support
policy and authoritative visual sources. The framework checks contract promises and
composition using those procedures, respecting the user’s verification choice.
Report actual results; briefly mention unavailable requested checks in the conversation.

## Gaps and decisions

Open gaps: [journal](design-system/gaps.md). Closed entries:
[archive](design-system/gaps-archive.md). Move closed entries there in full with
their disposition, closure date and basis. Resolution requires demonstrating the
original expected result.

Existing explicit decisions count. Independent quality mode applies only when the
task or project policy requires it; name any such policy.
