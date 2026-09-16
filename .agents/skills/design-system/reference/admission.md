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

| Context | Admission with verification enabled | Independent discovery | Completion |
| --- | --- | --- | --- |
| Ordinary craft and gradual adoption without saved whole-set conditions | Admit only when authorised public promises and selection/composition checks have current passing evidence. New/adopted entities remain hidden until then. | Per authoring batch for contract creation (including intended hidden contracts), selection, composition eligibility or index-routing changes; before admission. | Required ordinary and independent checks pass; explicit limits cannot stand in for required evidence. |
| Automatic migration, or gradual adoption with saved whole-set conditions | Fully documented existing entities become discoverable after ordinary author audits and structural checks, before independent discovery. Selected repair obligations remain. | Once the whole selected set is ready; batches organise authoring, not independent discovery. | Required final discovery/review and mode-specific work complete. Failed discovery leaves verification and migration incomplete without reversing admission. |
| Automatic modes 1 and 3 | The preceding migration admission also applies when runtime checks fail or are unavailable; contracts remain complete and linked to defects and limitations. | The whole-set gate still applies. | Defects requiring repairs outside the mode do not block documentation completion. Mode 1 still requires completion and enabled checks of its authorised exception changes. |
| Explicit verification refusal in any migration mode or gradual adoption | Newly documented implemented entities become discoverable under the refusal rule below, without evidence-gated or structural-validation prerequisites. | Skipped, together with the other refused checks. | Authorised work and mandatory document reconciliation complete; results remain explicitly unverified. |

Mode 2 retains its required design repairs and enabled verification; blocked repairs
or checks leave it partially complete. A failed or unavailable required independent
review also leaves migration completion pending. Empty scopes are valid completed results.

Preserve existing deprecated status and keep unimplemented drafts hidden in every
row. Preserve existing eligibility during document moves. A document-only pattern
needs no implementation of its own: empty sources do not prevent admission after
its applicable selection, composition and dependency checks. This is distinct from
an unimplemented component or layout. Unresolved normative choices block dependent
contract decisions in every mode; settle what is known meanwhile. Mandatory project
approval conditions continue to apply; report conflicts rather than silently changing
policy. A request to add an entity includes admission after successful checks unless
explicitly restricted. Draft creation or ordinary documentation alone grants no admission.

## Whole-set migration discovery

All automatic migrations use the whole-set row, including later independent runs
and resumption. Gradual adoption uses that row only when its authorised saved plan
explicitly requires both admission of fully documented existing entities after
ordinary audits and structural checks, and independent discovery after the full
selected scope is ready. Otherwise use the ordinary per-batch row. Save these
conditions with the scope in `design-system/adoption.md` and preserve them on resume.
They apply only to that scope; batching or a successful check grants no exception.

For whole-set work, run [migration discovery](blind-gates.md#whole-set-migration-discovery)
after all selected contracts and indexes are ready. Discovery for actual consumer
updates may run earlier against ready eligible contracts. Reuse evidence only while
its inputs and relevant rules remain unchanged. New authoring outside that saved
migration scope follows the ordinary row.

## Ordinary admission

Use [ordinary contract audits](contract.md#ordinary-audit) and the applicable
[independent gates](blind-gates.md). Typographical or other clarification that changes
neither selection/composition eligibility nor routing requires only affected ordinary
checks. Independent consumption is additional, required only by the task or project
policy. The author's own reasoning cannot substitute for required independent evidence.

## Migration verification

For automatic migration and gradual contract adoption, settle verification before
the first check, including link validation.
Inspect sources and configured commands first. Explain the applicable structural/link,
contract/selection, test/build, behavioural/browser and visual checks, including
required independent gates and unavailable capabilities. Explain that [final document reconciliation](completion.md#reconcile-final-documents)
is mandatory. Offer to run or skip the remaining verification,
recommend running it, and wait for the user's choice. Batch this with
other missing startup decisions using [the question format](model.md#questions-to-the-user).
Surveying sources and saving the work list can proceed meanwhile.

Reuse an explicit choice or the saved choice for this migration without asking again.
Save it in `design-system/adoption.md` with progress; an explicit new choice
replaces it. Automation or delegation of mode/batch size alone does not decide
verification. A saved refusal also applies on resume and after a mode change.

An explicit request to skip testing or verification takes precedence over check
requirements throughout the authorised work and its supporting procedures,
in every migration mode, except the mandatory
[final document reconciliation](completion.md#reconcile-final-documents), which always runs.
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

Record skipped checks as `unverified — skipped by user choice` in progress and reports,
and link limitations from the affected contracts. Preserve earlier evidence with its
scope; changed promises are not covered by stale results. Work may finish with
verification explicitly unverified; skipped checks alone are not blockers. Keep real
unresolved decisions and unfinished repairs explicit, and leave gaps requiring proof
open. Report that the user accepted the risk of nonworking code by choosing migration
without verification; `discoverable` and completed work do not certify correctness.
