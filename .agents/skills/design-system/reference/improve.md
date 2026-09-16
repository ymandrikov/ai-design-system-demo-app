# Improve an existing design system

Survey the existing system, implement evidenced improvements to its presentation,
composition and documentation, and verify the result. Read [the shared model](model.md)
and root DESIGN.md. Apply [missing-context handling](model.md#missing-project-context)
when required connections are missing; report them and end this invocation.
Creating a system belongs to a separate [craft](craft.md) task.

## Preserve the boundary

Improve changes design-system contracts, indexes, rules, tokens and presentation,
including related consumer CSS, markup and public design settings within scope.
Ownership comes from DESIGN.md, contracts and actual responsibilities, not directory
names. Follow the [design-only boundary](model.md#design-only-change-boundary) and any
explicitly narrower request, such as leaving consumers unchanged.

Preserve business logic and component interaction behaviour. Event handling, data
processing, domain validation, state transitions and focus/keyboard implementations
stay unchanged, including when defective. Logic refactoring is outside scope even if
intended to preserve behaviour. Design changes may correct presentation or semantic
markup under established or agreed contracts; assess behavioural consequences before
changing CSS or markup and preserve interaction guarantees.

Record systemic logic defects through [gaps](gaps.md) and defer their repair to a
project-development task. Keep improvements requiring excluded logic or out-of-scope
consumer edits as proposals with their dependencies. Product-only logic defects remain outside
this survey's repair scope and are not system gaps. Calling another procedure,
delegating choices or accepting a proposal within improve never lifts these limits.

## Map scope and progress

Use the explicitly requested area, or the whole existing design system by default.
Enumerate its components, layouts, patterns, contracts, indexes, shared styles,
tokens and rules from connected sources; exclude dependencies and generated copies.
Inspect relevant consumers, including outside a narrowed area, for evidence and
compatibility without expanding into a whole-product improvement audit.

Read `design-system/improvements.md` if present. Keep one report with the scope,
date, source-linked coverage checklist, findings, decisions, changes and verification.
Mark areas inspected, pending or unavailable. Reconcile saved progress with current
sources when resuming; prior completion is not current evidence. Preserve stable
finding anchors, accepted/rejected decisions and reasons. Reconsider a rejection
only when its basis changes, retaining that reason and explaining the new evidence.
Keep findings outside a scoped run and mark them not rechecked.

Reuse and link existing gaps and `design-system/analysis.md` candidates rather than
copying their bodies. The improvements report owns execution progress; those sources
retain their findings and expectations. Save progress after manageable batches and
continue without batch-size or continuation questions. Scope mapping is complete
when every system area in scope has a coverage entry.

## Find and assess improvements

Inspect actual source, contracts, rules, tests, examples and affected consumer flows.
Look for contract/index drift, presentation that conflicts with established rules,
misleading documentation, duplicated presentation and unclear composition ownership.
Evaluate opportunities without a defect only when current uses establish
a concrete benefit; visual similarity and speculative future reuse are insufficient.
Use [analysis criteria](analyze.md#evaluate-candidates) for reuse or consolidation
questions, keeping analysis advisory until a design change is authorised.

For each finding, identify its evidence, expected result, benefit, affected artifacts
and consumers, compatibility, and next action. Separate independently repairable
presentation/documentation issues from logic defects instead of letting the latter
block the former. Reuse [gap recording](gaps.md) for systemic shortfalls and
[triage](triage.md) for relevant existing entries and duplicates. Ordinary
opportunities stay in the report or linked analysis; they need no invented gap.

Use triage's consequence/dependency ordering for defects, then weigh demonstrated
benefit and effort for opportunities. A/B/C resolvability is evidence about the
intervention, not permission to exceed improve's boundary. Assessment is complete
when each finding has an autonomous action, a concrete pending decision, a deferred
task or an evidenced reason to leave it unchanged. Zero findings is valid.

## Decide and implement

The improve request authorises ready improvements under existing requirements.
Use [craft](craft.md) for permitted edits, retaining the boundary above throughout
its proposal, authoring, token and audit procedures. A failing logic check does not
authorise a repair, and a contract must not be weakened to match defective behaviour.

Present new design rules, public capabilities, contract-semantic changes and breaking
changes before dependent edits. Include concrete proposals, compatibility and consumer
impact; reuse decisions already supplied. Editorial corrections supported by an
unchanged contract need no new approval. Defer accepted proposals that require excluded
logic or out-of-scope consumer changes. A permitted API extension still needs craft's
default and migration decisions. Related consumer design changes use [use](use.md):
**craft → checks → use → checks**. Preserve the original behaviour when that extension
is omitted unless an authorised design decision explicitly changes that promise.

Batch all currently independent questions using [the shared question rules](model.md#questions-to-the-user)
and continue independent work while answers are pending. After answers, implement
eligible agreed changes in the same run. Keep unanswered items pending with their
proposals and continue through the remaining scope; awaiting a decision never counts
as completing its dependent work.

## Verify and finish the pass

Follow craft's applicable audits and [verification](verify.md) for affected promises,
including consumer checks that establish compatibility. Report static, behavioural
and visual evidence separately. Tests and snapshots must retain existing interaction
expectations. Missing tools or skipped checks are unverified, and pre-existing logic
failures remain explicit deferred defects rather than being repaired or labelled pass.

Repair regressions caused by this run within its boundary. If an attempted improvement
requires a prohibited change to work correctly, revert that attempted improvement
without disturbing unrelated work and retain it as a deferred proposal. Resolve and
archive a gap only after proving its original expectation through the existing gap
procedure; partial fixes leave remaining expectations open.

Finish one full pass of the selected scope, eligible changes and their verification.
Do not restart a whole-system search after fixes. Reread changed documents and the
report against final sources, decisions and evidence. Account for every area and
finding, separating completed work, pending decisions, deferred tasks and verification
limits. Unavailable or uninspected areas mean partial coverage. Return the report
link, changes, coverage, evidence and remaining decisions; completed permitted work
does not imply that deferred defects are fixed or that the whole system is verified.
