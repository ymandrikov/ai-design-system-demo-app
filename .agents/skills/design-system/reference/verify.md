# Verify the affected UI or component

Read [the shared model](model.md), the
root DESIGN.md. Apply [missing-context handling](model.md#missing-project-context)
when required inputs are unavailable.
Verification checks the actual changed composition or component preview and its
required surrounding relationships. The caller owns repairs. A standalone review
reports findings and records applicable gaps without starting implementation.
The framework determines the contract and design-system conditions to verify.
Follow the project's established testing and preview procedures for engineering
evidence; do not introduce a separate testing methodology. When verifying migration work, read and apply the saved
[verification choice](admission.md#migration-verification). In every workflow, apply
the [shared verification rule](model.md#skipped-and-unavailable-verification).

## Static verification

Read the selected pattern, layout and component contracts. Check actual imports,
helpers, inputs, slots, events, region order, grouping and every consumer obligation,
including labels, error associations and form ownership. Check required rules and
conditions of any exception; distinguish recommendations from mandatory constraints.

Check selected token definitions and shared design rules: role, type, theme/alias
resolution and constraints. For consumer choices, verify that the consumer controls
the property or uses a supported contract setting. Equal values alone do not justify
substituting roles. Craft also checks implementation-owned values against the
component's promised appearance and applicable system rules.

Check the [basis for affected API values and visual variants](formats.md#check-the-basis-for-choices),
including differences between comparable uses. Missing guidance reaches the gap gate
even when the values are accepted by the API and technical checks pass.

Confirm new managed product uses are discoverable. Craft may check draft component
previews to establish evidence without admitting them or permitting product use.
Preserve existing deprecated uses outside
scope and report affected migration guidance. Inspect unmanaged fallbacks against
their code, tests and consumers; report the limits without inventing a contract.

Run the relevant test/composition commands from DESIGN.md, reporting each command and result briefly in the response. For each affected entity
report `Contract check: <id> — valid|invalid` with a reason for invalid use. For a
pattern/layout include its required composition rules, not just component API calls.

Complete when all affected calls and relationships have a result. Return failures to
the caller for repair within its authorised workflow, or report the remaining defect;
a failed check is never a pass.

## Behavioural and visual verification

Follow the project's established procedure linked from DESIGN.md to verify affected
behaviour, semantics, states, layout, spacing, sizing and typography against their
contracts and visual sources. Include relevant supported themes, contexts and defined
tolerances. Record commands or observations and their results. When a required
procedure or environment is unavailable, continue independent checks and name the
missing evidence.
Browser absence does not prevent static work or completion; do not claim browser evidence.
Unit DOM output alone is not rendered layout or interactive-browser evidence.

Complete when enabled, available checks have outcomes. With no visual reference,
verify documented layout and behaviour without inventing comparison values.

## Reconcile

For each affected reference element or contracted region, check presence, selected
entity, required composition, measured values and states. Report a match count when
there is a reference and one row per deviation:

| Element | Expected | Actual | Cause | Result / gap |
| --- | --- | --- | --- | --- |

Causes distinguish product defects/decisions, selection assumptions, contract drift,
system limitations. Omit unavailable comparisons; they are not matching elements or
deviations. With no reference, name the documented promises checked. Do not fabricate
a reference match count or imply coverage of omitted comparisons.

## Contrast scope

In ordinary work, exclude inherited or explicitly prescribed colour combinations
from contrast checks: an existing component used as intended, an explicitly supplied
token combination, or a combination reproduced from a design reference such as Figma.
For these combinations, omit contrast findings from user reports, completion blockers
and gap records, and preserve the colours rather than correcting them autonomously.
This also applies to incidental findings from broader checks.

An available palette or token alone does not establish an intended combination.
Check contrast regressions introduced by the agent's choices, including changes to
background, opacity or token role. A direct contrast audit or an explicit task,
project or contract contrast requirement remains applicable. Report a conflict with
that requirement once; honour an already accepted exception without reopening it.

Excluded contrast is outside the task's verification scope and does not block
completion. Omit it from routine reports; never describe an excluded
check as passed or imply that all contrast was verified. Other applicable visual,
behavioural and accessibility checks remain in scope.

## Report and gap gate

Report actual static, behavioural and visual check outcomes briefly in the conversation.
Omit skipped checks and empty result categories. Briefly mention any requested check
that could not run, without status labels or contract/progress records. Include the
reconciliation match count when a reference exists and comparisons ran, and one row
per observed deviation. Existing independent violations are incidental findings,
subject to the [contrast scope](#contrast-scope) exception.

For a reusable system limitation, contract drift, contradictory guidance or design
conflict read and follow [gap recording](gaps.md),
then report `Gap gate: recorded — <title>`
or `Gap gate: none`. Actual applicable check failures remain explicit. Claim full UI
verification only when all affected visual and behavioural properties have evidence.
Skipped or unavailable checks alone do not block completion. Contracts and shared code stay
unchanged here; return design defects to the authorised workflow and internal-logic
defects to project development.
