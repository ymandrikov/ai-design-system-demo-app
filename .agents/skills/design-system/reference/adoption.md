# Gradual adoption and API analysis

Enter on an authorised handoff, or from [craft](craft.md), for an explicit contract
migration or escape-hatch analysis request.
Migration delivers contracts, checks and admission; API analysis delivers
recommendations independently of contract readiness. Honour an explicitly narrower
scope, such as documentation only. Selecting one step does not start the other.
Before migration checks, settle [migration verification](admission.md#migration-verification)
alongside any missing batch-size decision. Reuse the explicit choice or saved progress.
For explicitly requested automatic codebase migration, enter [automatic migration](migrate.md):
it reuses this work list but owns mode selection, automatic batches and completion.

Read [missing-context handling](model.md#missing-project-context) if required project
inputs are unavailable. Read only the requested work-list section when called by
migrate; that call does not start gradual batching or API analysis.

## Save the work list

Inspect source exports, implementations and consumers to enumerate all project-owned
reusable components, layouts and existing patterns in scope, including wrappers around dependencies.
Exclude private implementation details, pages and unwrapped third-party components;
record ambiguous candidates with the classification question still open. Group
bindings of the same entity together and order dependencies before their consumers.

Create or update `design-system/adoption.md` and link it from DESIGN.md. Use a compact
checklist or table with each entity's kind, source paths, contract link when present,
and separate migration and API-analysis progress. Record recommendations, evidence,
blockers and the next batch there. Preserve existing contract lifecycle statuses when
updating the list. The work list does not grant eligibility;
contract metadata and indexes remain authoritative.
Keep this execution state while work remains; apply
[completion cleanup](completion.md#clean-up-completed-work) after the selected scope's
final checks, preserving independent unfinished work and transferring lasting results.

Complete the list before starting the first batch. On continuation, read saved
progress and reconcile source changes, preserving prior results. An empty list is
a valid result; report it without inventing entities or work.

## Choose the batch size

After saving a nonempty work list, show its scope and remaining count. Use an explicit
requested size, otherwise reuse the saved size for the selected step. If neither
exists, ask once using the [question format](model.md#questions-to-the-user): offer
5 or 10 entities, recommend 10, and accept any other positive integer. Wait for the
answer before processing the first batch. Explicit delegation to choose the size
allows choosing it without a question. An empty or completed list needs no size choice.

Save the selected size in `design-system/adoption.md` separately for migration and
API analysis. Reuse it on continuation until the user changes it; a new explicit
size replaces the saved value. Permission to finish all batches controls continuation,
not size selection.

## Run a batch

Process one batch up to the selected size for the selected step.
Count attempted entities, including blocked ones, toward the limit.
Save each result and leave blocked items unfinished with a reason. Continue independent
items within the batch; revisit a blocker when its missing decision or evidence changes.

After one batch, report completed work, blockers and remaining work, then wait for
continuation. An explicit request to finish everything authorises successive batches
without repeated confirmation; save progress after each. Stop when the selected step
is complete or only blocked work remains. Requesting contracts for all entities sets
the list's scope; it alone does not override the one-batch default. When the entire
selected step is complete, apply [completion cleanup](completion.md#clean-up-completed-work)
before its final report; an intermediate batch or blocked stop retains resume materials.

## Migrate contracts and admit

Read [admission policy](admission.md#select-the-applicable-policy) with the saved
verification choice, admission conditions and discovery timing. Apply saved
[whole-set conditions](admission.md#whole-set-migration-discovery) to their selected
scope; otherwise use ordinary per-batch admission. Run [delegation](delegation.md) for substantial independent
migration work when available; preserve the current batch boundary.

For each migration item, follow [craft](craft.md#edit-and-audit) to author or complete
its contract, regenerate indexes for its actual status and run the applicable audits. A request for this migration,
including an authorised handoff, includes admission authority for entities
that pass, subject to project policy and any explicitly narrower request; reuse that
authority for each batch.
It does not settle new normative choices or authorise unrelated implementation changes.

After authoring the whole area, run [whole-set discovery](blind-gates.md#whole-set-migration-discovery)
when selected by policy and enabled. Complete admission and migration only under
the [applicable policy](admission.md#select-the-applicable-policy), retaining the
separate document-only result where requested. Before final completion, run
[document reconciliation](completion.md#reconcile-final-documents), the enabled
[final review](delegation.md#review-the-final-result), then the existing cleanup step.
A partial batch or failed migration keeps its continuation state and unresolved work.

## Analyse APIs and escape hatches

For each analysis item, inspect the public API and actual consumers against
[craft's API and escape-hatch rules](craft.md#design-public-apis-and-escape-hatches).
Look for concrete local needs and unrestricted styling or composition overrides
that bypass established rules, including className, style and slots where applicable.
An override's existence alone does not establish a violation; identify the affected
rule or apply [the basis rule](formats.md#check-the-basis-for-choices) and record any
systemic finding through [gap recording](gaps.md#record-and-resolve).

Recommend a supported public API for recurring needs. For local exceptions, propose
reuse of the project's exception mechanism, a mandatory non-empty reason, permitted
deviations and approval conditions, preserving behaviour and accessibility guarantees.
Show actual use locations, the need, affected rules and impact on existing calls.
Save recommendations in the work list and link systemic findings to the gap journal;
an evidenced finding that no change is needed also completes analysis of an item.
Record unavailable evidence as unfinished analysis with a reason.

Complete an analysis item when its findings are supported by saved evidence. Implementation
of recommendations is a separate craft step requiring that scope; analysis alone
does not change APIs, consumers or contract promises.
