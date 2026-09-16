# Design-system project boundary

design-system organises and maintains a design system through contracts and workflows.
Its primary responsibility is consistency over time. The framework governs
design-system work; the project supplies implementation conventions and engineering
test procedures. Required contract rules and workflow checks remain binding;
recommendations and documented freedom remain distinct from requirements.

## Responsibilities

- Describe component purpose, selection conditions, public settings, states and
  observable promises, including behaviour and accessibility.
- Describe layout grouping, placement, spacing, sizing, order, nesting and adaptation,
  naming who owns each decision.
- Describe patterns for shared end-user tasks, required and optional regions,
  relationships, substitutions and composition limits.
- Maintain design rules, token meaning, roles, themes and constraints.
- Find and compare existing capabilities before introducing another shared variant;
  explain composition through the project's public APIs and permitted classes.
- Check that contracts support correct selection and use, including unsuitable and
  edge cases, structural validation and applicable independent gates.
- Govern proposals, adoption, admission, lifecycle changes and design migrations;
  assess defaults, compatibility, dependencies and affected consumers.
- Reconcile contracts, indexes, sources, presentation and usage; correct permitted
  design drift and retain unresolved promises without weakening them.
- Record gaps and bounded exceptions, triage their original expectations and maintain
  verifiable history. Recording a gap alone permits no bypass.
- Plan and execute design-system work with its defined scope, modes, batches,
  verification decisions, saved progress and completion criteria.

## Design-only change boundary

CSS, markup and public parameters may change only for design purposes, including
related consumer presentation within the task. Assess both purpose and effect:
changing CSS that controls available actions can affect behaviour too. Preserve
explicitly narrower task limits and the project's implementation paths and conventions.

Component internals and business logic remain project-owned: state, handlers,
effects, interaction algorithms, focus/keyboard implementations, domain validation,
permissions, calculations, persistence, networking and analytics. A documented
behavioural promise is a requirement to assess, not authority to implement or repair
its internal logic. Record such drift and its required project work. If a design
change depends on excluded logic work, retain the dependency rather than deliver an
inconsistent partial change.

The framework does not choose application architecture, dependencies, source-file
trees or engineering test methods. Follow the project's established procedures for
implementation and engineering evidence. The same agent may perform separately
authorised project work under those instructions; design-system governs its design-system
contribution and does not supply authority for business-logic changes.

## Shared vocabulary

Read this and [the canonical domain glossary](CONTEXT.md) once when entering any
framework workflow. DESIGN.md maps canonical terms to the project's names;
their responsibilities stay the same. Existing instructions using `entity` mean
**UI entity**, with managed status determined separately. Existing `user task`
wording means an end-user task; a component that `owns` a property has a
**Responsibility**. Token indexes lead to token definitions; they do not inherit UI contract formats or eligibility statuses.

## DESIGN.md and indexes

Read `DESIGN.md` at the target repository root. It explains design intent and shared
rules, and links UI indexes, token definitions, themes, public usage, verification
instructions. Standalone [codebase analysis](analyze.md#check-readiness) uses artifacts
and indexes under `design-system/` as its prerequisite; DESIGN.md is optional for
that procedure. Operational paths in it resolve from that root; ordinary Markdown
links resolve relative to their containing file. Missing required context follows the [handling rule below](#missing-project-context).
For a new system, [craft](craft.md) can establish requested design decisions.

New and connected projects use this contract structure:

```text
design-system/
  components/          # component contracts only
  layouts/             # layout contracts only
  patterns/            # pattern contracts only
  COMPONENTS.md         # component index
  LAYOUTS.md            # layout index
  PATTERNS.md           # pattern index
```

Each component/layout/pattern has one Markdown contract in its group directory. Its
frontmatter owns the stable id, description, status and code/evidence paths; see [formats](formats.md).
The three generated indexes contain only `discoverable` contracts: H1 display names,
full frontmatter descriptions and Contract links, sorted by id. See the
[index generation rules](../assets/inventory.md). Identity and eligibility remain
owned by the contract. Layouts appear only in LAYOUTS.md; patterns only in PATTERNS.md.
IDs are unique across all contracts in all three groups, including hidden and deprecated.
Empty indexes are valid. A contract in its standard group directory establishes managed
membership; absence from an index does not establish unmanaged status.

Code, styles, tests, token catalogues and other existing sources keep their project
paths. A contract id does not determine code paths or exports. Patterns can describe
recipes without implementation files. New gap journals also live under design-system/.
Use the established project instructions and their responsibility boundaries.

## UI eligibility and gradual adoption

| State | New product use |
| --- | --- |
| discoverable | Eligible for comparison by contract. Verify actual implementation before claiming completion. |
| hidden | Managed but not admitted; excluded from new selection and fallback. |
| deprecated | Excluded from new selection and fallback. Preserve existing calls outside the task; follow documented migration guidance within it. |
| unmanaged | No contract in the standard component/layout/pattern directories. Product build may inspect code/tests/consumers as a fallback after managed discovery finds no fit; report limited verification. This does not adopt it. |

Malformed entries, missing contracts and contradictory guidance are system defects,
not unmanaged escape routes. Unknown status is excluded. Discovery lists only eligible
candidates; an explicit request for an excluded entity gets a separate availability
explanation. Quoting the word "toggle" in a rejection is not selecting an unmanaged Toggle.

When authoring, changing eligibility or migrating, read [admission policy](admission.md)
for the applicable evidence and timing. Product selection reads the actual status and
linked limitations; discoverable does not certify runtime promises. Verify the
promises required by the consuming interface.

## Missing project context

A missing DESIGN.md, required index, source connection or other prerequisite is a
context defect. Name the missing inputs and return the restoration need to the user
or project process outside design-system. Do not recreate missing context or invent
sources. Pause only work that depends on it; continue independent authorised work.
After the project restores the inputs, resume the affected procedure.

Standalone analysis retains its own [artifact-based readiness](analyze.md#check-readiness):
DESIGN.md is optional when its required indexes and artifacts are available. Ordinary
maintenance of valid contracts, indexes and links remains within authorised craft;
this rule concerns recovery of missing required project context.

## Token scope

The design-system token source and index describe tokens available to consumers.
Private component details remain with the component and are outside the token index
and discovery. Components may use shared design tokens internally; that use does not
expose an override unless their contract permits one.

## Authority and task scope

design-system integrates as a specialist in contracts and design-system work, including
selection and reuse of components, layouts and patterns. An existing project skill
keeps its entrypoint and ownership of the overall task: requirements, architecture,
data, analytics, stage order, approvals and completion criteria. UI responsibilities
alone do not make that skill redundant. Follow the stages, expected results and
return points established in AGENTS.md or CLAUDE.md;
design-system's stage checks do not replace overall task completion checks.

Keep existing project rules and process instructions at their authoritative locations
and use their links from DESIGN.md. Moving them requires a separately agreed project
reorganisation. Preserve their established invocation, sequencing, approvals and
completion checks as well as their text.

Contracts state intended valid use; implementation and tests establish actual behaviour.
A mismatch is a defect, not permission to weaken the contract. A design reference
cannot silently override a required contract rule. Use a documented exception when
its conditions hold; otherwise ask the user to resolve the conflict.

The [use workflow](use.md) owns product composition and related design changes through
public APIs. The [craft workflow](craft.md) owns reusable design capabilities,
contracts, indexes, rules and tokens under the design-only boundary above.
A system gap is a handoff between these responsibilities,
not permission for use to change the system. When both workflows are authorised in
one task, follow **craft → checks → use → checks**: verify the shared capability
before consuming it, then verify the resulting composition and affected relationships.
Apply explicit migration verification and admission exceptions without claiming a
skipped check passed. Existing valid capabilities need no unrelated craft work.
For a missing reusable capability, choose an extension, a justified new entity or a
bounded exception before introducing an independent shared variant. Screen-specific
composition within existing contracts remains valid; a gap record alone grants no bypass.
Preserve independent legacy violations and unrelated gaps; report them separately,
subject to the [contrast scope](verify.md#contrast-scope) exception.
Honour explicit scope and decisions already given in the current task.

[Improve](improve.md) coordinates a bounded survey and craft work on an existing
system's presentation, structure and documentation. Its boundary preserves business
logic and component internals, including when a defect is found. Related consumer
presentation may change within scope; changes requiring excluded logic remain project
work. These limits remain in force in called procedures and every migration mode.

## Questions to the user

Across all design-system procedures, use the host's available question/ask-user tool
when permitted in the current mode. Use its native fields for the question, options,
consequences and recommendation. Use the user's language without emoji.
If no permitted question tool can present all required options, ask in a separate conversation message
using this format, including for a single question:

```markdown
**Q1 — Short title:** Question and necessary context.

- **A. Option** — consequences.
- **B. Option** — consequences.

**Recommendation:** A — brief rationale.
```

Offer at least two meaningful options and recommend one explicitly. Allow a custom
answer. For an unknown fact, explain the decision it affects and offer ways forward
(such as supplying the fact or delegating a proposed decision), not invented facts.
Delegation can authorise a new decision; it does not establish an unknown fact.
Investigate facts available from sources before asking.

Batch all currently independent questions together within the tool's limits; in
text, separate them with `---`. Continue question numbering across rounds in the
discussion. Wait for prerequisite answers
before asking dependent questions; continue independent authorised work meanwhile.
This format creates no requirement for an interview or repeated confirmation when
the task is clear and authorised. Silence is not an answer or delegation.

## Reports

Report decisions, material assumptions and evidence clearly. Labels shown by the
workflow procedures are convenient examples; equivalent prose or tables are valid
for reports. User questions follow the format above.
Do not manufacture fields, alternatives or explanations just to fill a template.
Free-form reports do not change the fixed contract format within each entity group,
the project's public APIs, or its required composition rules.
