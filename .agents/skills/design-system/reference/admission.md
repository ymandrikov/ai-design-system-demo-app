# Admission and verification policy

Read when authoring or changing contracts, deciding admission, or running migration
checks. This is a rule reference: the calling procedure owns execution,
repairs and completion. Apply the selected row below before using the independent
[gate procedures](blind-gates.md); reading this policy starts no workflow.

## Select the applicable policy

Admission makes an entity eligible for comparison; it does not prove runtime
correctness. Track document completion, eligibility, repairs and verification
separately. Use the saved scope, mode, admission conditions, discovery timing and verification choice;
never infer authority from a status or a successful check.

Independent discovery, consumption and final review are required only by an explicit
task request or project policy. Ordinary verification alone does not enable them;
without that requirement, their absence never blocks admission or completion.

| Context | Admission with verification enabled | Completion |
| --- | --- | --- |
| Locally added external components under [external-addition admission](#external-addition-admission) | Publish as discoverable immediately with the contract, before checks; unresolved duplicates remain hidden. | Reconciled contracts/indexes and explicit check outcomes; unresolved normative decisions remain pending. Actual failures remain explicit; unavailable checks follow the shared verification rule. |
| Ordinary craft and gradual adoption without saved whole-set conditions | Admit after authorised public promises and ordinary selection/composition checks pass. New/adopted entities remain hidden until then. | Applicable ordinary checks and any explicitly required independent checks pass. |
| Automatic migration, or gradual adoption with saved whole-set conditions | Fully documented existing entities become discoverable after ordinary author audits and structural checks. Selected repair obligations remain. | Mode-specific work and applicable checks complete. Explicitly required discovery/review failures leave completion pending without reversing admission. |
| Automatic modes 1 and 3 | Migration admission also applies when runtime checks fail or are unavailable; contracts remain complete and linked to known defects. | Out-of-mode repairs do not block documentation completion. Mode 1 still requires its authorised exception changes and enabled checks. |
| Explicit verification refusal in migration or gradual adoption | Newly documented implemented entities become discoverable without check prerequisites under the refusal rule below. | Authorised work complete under the shared verification rule. |

Apply the [shared verification rule](model.md#skipped-and-unavailable-verification)
before all admission and completion conditions in this file. Mode 2 retains its required
design repairs and enabled verification; unfinished repairs or actual check failures
leave it partially complete. Empty scopes are valid completed results.

Preserve existing deprecated status and keep unimplemented drafts hidden in every
row. Preserve existing eligibility during document moves. A document-only pattern
needs no implementation of its own: empty sources do not prevent admission after
its applicable selection, composition and dependency checks. This is distinct from
an unimplemented component or layout. Unresolved normative choices block dependent
contract decisions in every mode; settle what is known meanwhile. Mandatory project
approval conditions continue to apply; report conflicts rather than silently changing
policy. A request to add an entity includes admission after successful checks unless
explicitly restricted. Draft creation or ordinary documentation alone grants no admission.

## External-addition admission

[External-component adoption](craft.md#adopt-locally-added-external-components) includes
admission authority without a separate confirmation. For implemented local additions,
set discoverable and regenerate indexes when writing the contract, before checks.
This overrides ordinary craft's check-gated admission, including when the request is
to document a manual external addition. Preserve explicit narrower scope and project
approval conditions, existing deprecated status and hidden unimplemented drafts.
An unresolved duplicate remains hidden until the user settles the primary choice.

Run applicable ordinary checks after publication. Failures or unavailable evidence
do not delay or revoke availability; keep the intended promises and record their
specific defects in the contract and response. Unavailable checks follow the
[shared verification rule](model.md#skipped-and-unavailable-verification). Missing
normative choices remain explicit and block dependent decisions, not publication of
the known contract. Never invent rules or claim those decisions are complete.
Consumers still check suitability and required promises; discoverable is not a claim
of working behaviour. This exception does not apply to ordinary new-component craft,
direct library imports or an unrelated migration.

## Whole-set migration discovery

All automatic migrations use the whole-set row, including later independent runs
and resumption. Gradual adoption uses that row only when its authorised saved plan
specifies admission of fully documented existing entities after ordinary audits and
structural checks. Independent discovery, when explicitly required, runs after the
full selected scope is ready. Otherwise use the ordinary per-batch row. Save these
conditions with the scope in `design-system/adoption.md` and preserve them on resume.
They apply only to that scope; batching or a successful check grants no exception.

Only when explicitly requested by the task or required by project policy, run [migration discovery](blind-gates.md#whole-set-migration-discovery)
after all selected contracts and indexes are ready. Discovery for actual consumer
updates may run earlier against ready eligible contracts. Reuse evidence only while
its inputs and relevant rules remain unchanged. New authoring outside that saved
migration scope follows the ordinary row.

## Ordinary admission

Use [ordinary contract audits](contract.md#ordinary-audit) and, only when explicitly requested or required by project policy,
[independent gates](blind-gates.md). Typographical or other clarification that changes
neither selection/composition eligibility nor routing requires only affected ordinary
checks. Independent consumption is additional, required only by the task or project
policy. The author's own reasoning cannot substitute for required independent evidence.

## Migration verification

For automatic migration and gradual contract adoption, settle verification before
the first check, including link validation.
Inspect sources and configured commands first. Explain the applicable structural/link,
contract/selection, test/build, behavioural/browser and visual checks, including
any task- or project-required independent gates, final document reconciliation
and unavailable capabilities. Offer to run or skip verification,
recommend running it, and wait for the user's choice. Batch this with
other missing startup decisions using [the question format](model.md#questions-to-the-user).
Surveying sources and saving the work list can proceed meanwhile.

Reuse an explicit choice or the saved choice for this migration without asking again.
Save it in `design-system/adoption.md` with progress; an explicit new choice
replaces it. Automation or delegation of mode/batch size alone does not decide
verification. A saved refusal also applies on resume and after a mode change.

An explicit request to skip testing or verification takes precedence over check
requirements throughout the authorised work and its supporting procedures,
in every migration mode, including
[final document reconciliation](completion.md#reconcile-final-documents).
With that choice, read sources, tests and consumers to
understand and perform the work, but skip the remaining verification: tests, builds, structural
and link validators, contract/selection audits, browser/visual checks and independent
gates. Do not run checks under another name or require them for completion.

Keep the selected scope, including authorised implementation and consumer repairs,
escape hatches, contracts, indexes, supporting documents, links and progress. A refusal
does not change the selected mode's repair, scope or exception authority.
Make newly documented implemented entities `discoverable` immediately;
preserve existing `deprecated` status and keep unimplemented drafts hidden. This
exception overrides evidence-gated admission and structural-validation prerequisites.

Follow the [shared verification rule](model.md#skipped-and-unavailable-verification)
for reporting and completion. Preserve earlier check conclusions with their scope;
changed promises are not covered by stale results. Keep real unresolved decisions
and unfinished repairs explicit, and leave known defect gaps requiring proof open.
