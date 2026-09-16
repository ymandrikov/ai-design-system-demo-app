# Set up the project

On a request to migrate an already connected project, hand off to [migrate](migrate.md)
without repeating connection work.

Run only for explicitly requested initial connection. Resume an unfinished initial
connection as the same operation. If connection is already complete, report that
result without rerunning connection work.
Use existing documents and task history as evidence, without a new completion marker.
When prior completion is uncertain, report the uncertainty instead of treating
missing files as permission to repeat setup. Recovery belongs to the project process.

Read [the shared model](model.md). Use its standard contract directories and uppercase
index filenames for new and existing projects. Preserve implementation paths;
DESIGN.md stays at the repository root. Connect established sources and record absent
capabilities. For a new system, [craft](craft.md) owns requested design decisions;
pass uncovered decisions to that authorised stage. Empty indexes are valid.
Connection-only work ends with the connection result. Explicit migration requests
are handed to [migrate](migrate.md) after connection completes.

For connection, run
[delegation](delegation.md) to distribute substantial independent work
when subagents are available and permitted. Correctness takes precedence over speed.

Use plain language in the user's language throughout setup questions, explanations
and reports. Briefly explain each new technical term at its first mention, beside
the decision or result it describes. For example, introduce a contract as documented
rules for using a component, and ask "What may I change during migration?" when
gathering migration decisions for the handoff; describe each option by its practical effect.

At the first mention of an escape hatch, before a migration-mode choice or an
analysis offer, briefly explain it as a controlled local exception to design-system
rules, with a required reason and explicit limits that preserve behaviour and
accessibility. Explain that these boundaries help keep a local exception from
silently becoming a general rule and the design system from drifting. Use
[craft's exception rules](craft.md#design-public-apis-and-escape-hatches) for its
actual permissions and requirements.

## Survey the existing sources

First [determine the repository's agent mode](#determine-the-agent-mode), before
creating or changing files. Then continue the source survey below.

Read repository instructions, existing DESIGN.md or legacy profile, UI libraries,
token definitions, themes, design rules, public usage and verification commands.
Find pages from the code when useful; a user-selected page is not required. Inspect
representative consumers to distinguish actual evidence from naming or popularity.
Report conflicting sources and unresolved normative choices without inventing new
system rules. Complete when the available sources and gaps in
project context are known; surveying pages does not authorise their adoption.

### Determine the agent mode

Use an explicit user-selected mode when supplied. Otherwise inspect project-owned
agent instructions and configuration, including hidden directories and nested packages:

- **Multiple agents:** any existing `.agents/` directory or `AGENTS.md`, or evidence
  of another agent's configuration, selects this mode. This includes `.agents/`
  created by an installer before setup.
- **Claude-only:** `CLAUDE.md` or `.claude/` exists, with no evidence of other agents.
- **Unknown:** use the multiple-agent mode, including when no repository skills or
  agent instruction files exist. Missing evidence does not require a question.

Exclude dependencies, third-party code and symlink targets outside the repository.
Report the selected mode and its evidence. Setup uses the already installed design-system
package, whether repository-local or user-global; keep it and other skills at their
actual locations. Global installations and the current agent do not determine the
repository's mode. Setup neither installs nor relocates skills.

### Consolidate agent instructions

For Claude-only repositories, retain the Claude-specific structure and extend
`CLAUDE.md` routing; create a root `CLAUDE.md` if missing. Keep setup's new agent
instructions there, without creating `.agents/` or `AGENTS.md`.

For multiple-agent repositories, use `AGENTS.md` as the canonical instruction file.
At the root and beside every project-owned nested `CLAUDE.md`, merge its contents
into the sibling `AGENTS.md`, then replace `CLAUDE.md` with a relative symlink to
`AGENTS.md`. Create the root pair even when neither file exists. Preserve each file's
directory scope, all unique instructions, invocation order and references; remove
only exact duplicates and mark Claude-specific instructions as applying only to Claude.
Preserve referenced instructions and repair affected links or imports.

When instructions contradict each other, present the conflicting passages and settle
the rule with the user before replacing that file; neither filename wins automatically.
Continue independent connection work. Read and preserve existing symlink contents
before changing links, normalise reverse links without cycles, and leave an already
correct pair intact. Externally linked or unreadable instructions stay unchanged and
are reported as unresolved. Confirm merged contents are saved before replacing a file.

This consolidation is part of ordinary setup authority. Complete when every in-scope
pair preserves its instructions and resolves to its canonical file, or report the
specific pairs blocked by unresolved conflicts or unreadable sources.

## Reconcile repository skills

During the initial survey, analyse existing skills inside the target repository
without asking whether to analyse them. Inspect hidden skill directories and
repository instructions that invoke skills; read relevant SKILL.md files and their
supporting instructions. Keep discovery inside the repository, including symlink
targets; report externally linked or unreadable skills as outside the inspected
coverage. Global and session/plugin skill catalogues are outside this analysis.

Compare actual instructions, triggers and responsibilities with design-system's setup,
craft, use and supporting procedures. Distinguish complementary guidance, overlapping
functionality and incompatible instructions. Ground conflicts in source passages and
a concrete affected operation, such as replacing DESIGN.md or bypassing component
contracts. Judge fit for this project rather than general skill quality or popularity.

Preserve existing skills and processes by default under the
[shared responsibility boundary](model.md#authority-and-task-scope):

- **Compatible overlap:** retain the skill and its entrypoint. Connect design-system to
  its relevant stages through repository instructions, preserving the overall process.
  No replacement proposal or replacement decision is needed, even for fully overlapping
  UI responsibilities. Preserve unrelated and complementary skills too.
- **Concrete conflict:** propose the smallest rule or responsibility-boundary change
  that resolves the evidenced operation; one conflicting rule does not justify removing
  the skill. For example, route authorised shared-component work through craft before
  resuming use. Existing task authority counts; ask only for missing authority or an
  unresolved rule choice. Present the concrete edit using
  [the question format](model.md#questions-to-the-user), batched with independent decisions.
- **Explicit replacement or consolidation request:** first map every responsibility
  to its proposed owner, including triggers, stage order, handoffs, approvals and
  completion checks. Read referenced Markdown resources and scripts; identify what
  survives, changes or is lost before proposing a concrete migration with affected
  files and invocation routes. Apply already supplied authority without repeated
  confirmation, but settle newly discovered losses or uncovered responsibilities
  before removal. Preserve required behaviour and resources at their agreed destinations
  and repair references before deleting anything. A request for automatic codebase
  migration alone does not request skill replacement or consolidation.

Link existing project rules from DESIGN.md at their authoritative locations after
[agent instruction consolidation](#consolidate-agent-instructions); other instruction
transfer requires separately agreed reorganisation. Record unresolved conflicts and
their affected operations in DESIGN.md. Continue independent connection work and block
only dependent actions; retaining a skill or declining a proposed edit does not itself
block connection. With no other repository skills, continue without a reconciliation
question.

Complete the analysis when inspected coverage, evidence and proposed or selected
dispositions are explicit. Report pending choices and unresolved conflicts separately
from the completed connection; do not claim compatibility beyond the inspected scope.

## Connect the project

Before the first connection check, inspect configured commands, explain the applicable
link, structure and instruction checks and unavailable capabilities, then offer to run
or skip verification, recommending run. Wait for the choice; source survey may continue.
Reuse an explicit or saved choice. Save it in DESIGN.md for this operation and the
selected next-step handoff; do not apply it to unrelated later work. A refusal skips
validators, audits, tests, builds, browser checks, demonstrations and independent review;
report the result as unverified. [Final document reconciliation](completion.md#reconcile-final-documents)
remains mandatory. Refusal changes neither scope nor authority.
For an explicitly requested migration, gather its missing boundary and verification
decisions in that same round; for gradual adoption, include batch size.

Use [the DESIGN.md template](../assets/DESIGN.md) to create or complete root DESIGN.md.
Preserve existing design content and link authoritative sources. Record actual paths,
commands and missing tools; source conflicts remain explicit. Existing profiles may
supply facts, but DESIGN.md becomes the framework's entry point.

Generate COMPONENTS.md, LAYOUTS.md and PATTERNS.md from the migrated contracts using
[the index command](../assets/inventory.md).
Move existing component/layout/pattern contracts into their respective group directories;
move the entire Purpose into frontmatter `description`, remove the Purpose section, and
add [frontmatter](formats.md#contract-frontmatter) from evidenced identity, lifecycle
and actual source files. Preserve valid public promises and eligibility during moves.
Store each pattern as a separate contract using [the pattern template](../assets/patterns.md).
Update incoming links, index links, document-relative references and examples that
resolve relative imports from the moved document. Keep root-relative code paths intact.
IDs remain unique across components, layouts and patterns; report collisions before
choosing a new identity. Empty groups are valid. Complete these moves when the standard
locations and metadata are correct and all affected links resolve, applying the saved
verification choice to validation.
For documents mixing contracts and process instructions, apply the
[contract structure](model.md#designmd-and-indexes): always move the contract
content into `design-system/` and leave only the non-contract information and
instructions at the old path. Preserve their invocation and references; route each
incoming link to the content it needs. Mixed content is not a reason to defer the
contract move. Unresolved rules remain explicit rather than silently discarded.
Link an existing token catalogue or directly usable definitions without duplicating
it. Record absent token sources explicitly rather than inventing definitions.

Use `design-system/gaps.md` for new journals with [the gap template](../assets/gap-ledger.md).
Link the archive in DESIGN.md, using `design-system/gaps-archive.md` for a new one;
initialise a missing archive with a title and no entries. Existing journals and archives can remain
linked at their current paths. Apply [agent instruction consolidation](#consolidate-agent-instructions)
and extend the selected AGENTS.md or CLAUDE.md invocation
routes within authorised setup scope with a DESIGN.md and `design-system` pointer and the
[division of responsibilities](model.md#authority-and-task-scope). Keep the project
skill as the overall entrypoint; identify use for selection and reuse in product UI,
craft for contracts and system development, and the results returned to the caller.
Record the calling stages and where the project workflow resumes, preserving its
overall approvals and completion criteria.
Reference the installed package at its actual location; do not invent a repository-local
copy for a globally installed skill.

Complete when DESIGN.md reaches the real sources, indexes and available verification
instructions, and missing capabilities are explicit. Check links from their containing
files; operational paths in DESIGN.md resolve from the repository root.

## Report the connection

For reconciliation, include the selected agent mode, canonical instruction files,
relative symlink targets, source and installed-skill paths, preserved project entrypoints,
stage order, approvals and completion checks. Supply these requirements to
[delegation](delegation.md#review-the-final-result) as well. Connection without changed
contract boundaries requires no contract discovery gate.
Run [final document reconciliation](completion.md#reconcile-final-documents), then
[the final independent review](delegation.md#review-the-final-result) when enabled,
and [completion cleanup](completion.md#clean-up-completed-work). Report connection
complete only when its own required work is complete. Retain materials needed by
an already selected migration, without making migration completion a setup condition.
Preserve the verification choice in DESIGN.md for the next-step handoff even when
cleaning up execution files; once selected, save it with that migration's progress.

Report DESIGN.md, linked sources, created artifacts, unmanaged UI and decisions needed,
including inspected repository skills, preserved workflows, specialist routing,
any explicitly requested migrations and remaining conflicts.
If automatic codebase migration was explicitly requested, hand off to
[migrate](migrate.md) after connection. Its startup decisions and batching apply
instead of the next-step question below.
For a connection-only request, ask "What next?" using
[the question format](model.md#questions-to-the-user), with these four explicit
options in this order:

- **A. Automatic migration (recommended)** — complete the selected scope with saved
  progress, continuing through all batches without repeated confirmation.
- **B. Gradual adoption** — write contracts, run checks and admit existing components,
  layouts and patterns in batches, pausing after each for the user to continue.
- **C. API and consumer analysis** — recommend escape hatches from actual APIs and
  callers, without implementing them; use batches and save findings.
- **D. Stop here** — finish with the completed connection.

Automatic migration must be a selectable option, not a note below the question.
Connection is complete without an answer; start further work only when selected.
Choosing A explicitly authorises [migrate](migrate.md); transfer the selected scope
and existing decisions there. That procedure owns any missing mode/verification
choices and automatic batches. Selecting A alone does not choose its mode.
Choosing B or C hands off to the corresponding [adoption](adoption.md) step
without renewed permission. Before B starts, save the selected scope, verification
choice and these admission conditions in `design-system/adoption.md`: admit fully
documented existing entities after ordinary author audits and structural checks;
run independent discovery after the whole selected set is ready. Apply the
[verification-refusal exception](admission.md#migration-verification) when selected.
These concrete conditions persist on resume; no origin label is needed. Adoption
owns work-list enumeration and batch-size selection. Choosing D ends setup.
Adoption and admission are separate; connection requires neither. For an analogous-page
demonstration requested by the task or project policy, use [the demonstration below](#optional-setup-demonstration).
Its absence does not make ordinary setup incomplete.

## Optional setup demonstration

When an analogous-page demonstration is requested, use an existing page found during
setup or named by the task. Give a fresh worker an analogous request, root DESIGN.md
and public sources in an isolated copy. Run build with actual discovery, then verify
the resulting page and a deliberate composition violation. Save requests, artifacts,
commands and available browser evidence. Report demonstration limits separately from
the completed connection; this does not authorise admission of unadmitted entities.
