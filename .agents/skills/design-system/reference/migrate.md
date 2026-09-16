# Migrate the design system

Run on an explicit automatic migration request, including `design-system migrate` or
equivalent natural language, an authorised handoff, or a saved migration resume.

Read [the shared model](model.md), DESIGN.md and the saved migration state. Apply
[missing-context handling](model.md#missing-project-context) if required sources or
indexes are missing; restoration is outside this framework. Reuse prior surveys
when current, and run [the adoption work-list step](adoption.md#save-the-work-list)
for the selected area. Read [admission and verification policy](admission.md) for this
migration's mode and saved choice. Run [delegation](delegation.md) for substantial
independent work when available, returning results here for integration.

### Establish the boundaries

Inspect repository instructions, DESIGN.md, authoritative rules, implementations
and actual consumers before asking for decisions. Use the requested area; an explicit
whole-codebase request covers the whole project. Report the discovered scope.

| Mode | Authorised work |
| --- | --- |
| 1 — Contracts and escape hatches without behaviour changes (recommended) | Contracts and supporting documents, plus bounded local exceptions. API and consumer edits may connect an exception while preserving existing appearance and observable behaviour; no standalone repairs. |
| 2 — Contracts, escape hatches and design repairs | Mode 1 plus design-only CSS, markup and public-parameter repairs, including related consumer presentation within the selected area. Preserve component internals and business logic. Apply the shared admission policy. |
| 3 — Contracts only | Component, layout and existing pattern contracts, indexes, DESIGN.md and supporting links, journals and progress. Runtime code stays unchanged. |

Include any missing [verification choice](admission.md#migration-verification) in this
startup round; reuse an explicit or saved choice for this scope.
Reuse explicit answers and saved decisions for this migration. If the mode is
missing, present the three options in the order above using
[the question format](model.md#questions-to-the-user). Recommend **mode 1**.
All modes retain the [design-only boundary](model.md#design-only-change-boundary);
none authorises internal component or business-logic changes.
Explicit delegation to choose permits mode 1 without questions; a request for
automation alone is not that delegation. Wait for required
answers before dependent edits; the survey and work list can proceed meanwhile.

Mode 1 may replace an existing styling override with a documented escape hatch
that produces the same appearance and behaviour. Record defects that require repairs
without fixing them. Mode 2 can restore a missing accessible label or correct a
consumer spacing setting against its contract. A missing domain validation or broken
interaction algorithm remains project-owned work even when evidenced by a failing
check. Record that defect without weakening the intended promise. Preserve unaffected
behaviour and honour explicitly narrower scope.

Modes 1 and 2 authorise their permitted craft changes and migration of their affected
product consumers. Inspect all callers before changing a shared API or appearance.
Preserve compatibility with consumers outside the selected area; if this cannot be
done, block the change pending a scope decision. Keep unrelated redesign outside
the migration. New normative rules require authoritative sources or explicit
delegation from the user; observed behaviour alone does not establish a
standard. Record conflicts and unresolved decisions instead of weakening promises.

Complete this step when mode, area, any explicit restrictions and verification choice
are settled and saved.

### Execute and resume

Before the first batch, follow [migration planning](migration-planning.md) to complete
and link the shared work list and execution plan in `design-system/adoption.md`.
Include project-owned components, layouts and existing patterns; in modes 1 and 2 also list affected
consumer locations and change dependencies. Pages are consumers, not automatically
new patterns. Group supported bindings and process dependencies first.

Save the mode, area, explicit restrictions, verification choice, the
[whole-set admission conditions and discovery timing](admission.md#whole-set-migration-discovery),
and any delegated normative authority in `design-system/adoption.md`. Track documentation, admission, repairs and verification
separately, with evidence, exceptions, blockers and the next work. Preserve independent
API-analysis results; using escape hatches does not require a separate analysis campaign.

Use an explicit batch size, otherwise a saved migration size, otherwise choose a
suitable positive size (10 is a starting point). Save it without asking. Automatic
migration authorises every batch: save each item's result and each batch's progress,
then continue without confirmation. Count attempted blocked items toward batch size.
On resume, reconcile sources and saved decisions, updating affected tasks through
[migration planning](migration-planning.md); recheck only invalidated results.
Revisit blockers only when their missing decision or evidence changes. A mode change
retains prior evidence but reopens obligations newly required by that mode.

For each entity, follow [contract authoring](contract.md) and the applicable
[craft audits](craft.md#edit-and-audit), subject to the
[selected admission and verification policy](admission.md#select-the-applicable-policy). In modes 1 and 2, complete permitted craft changes before updating consumers
through [use](use.md); when verification is enabled, follow
**craft → checks → use → checks**, verifying both the capability and its resulting use.
Existing authority settles the scope of those
consumer updates; unresolved API defaults or normative decisions remain blockers.
Use supported APIs within the selected mode's behaviour boundary; mode 2 also repairs
violations. In modes 1 and 2, use an escape hatch only
for an evidenced local need, following [craft's exception rules](craft.md#design-public-apis-and-escape-hatches)
and [exception recording](gaps.md#record-exceptions). Reuse a suitable mechanism;
otherwise create only its permitted design portion. Both modes require a non-empty
reason, explicit limits and the project's approval conditions and behaviour/accessibility
guarantees. Any missing internal enforcement logic remains a project dependency;
leave dependent exception work unfinished instead of shipping an unrestricted bypass.
Add mechanisms only where needed.

### Apply admission policy

Apply the [selected admission policy](admission.md#select-the-applicable-policy) to
each item's actual documentation and evidence. Keep intended promises and link
known defects from the affected contract sections. Track
admission separately from runtime evidence and required repairs. After authoring the
whole area, run [whole-set discovery](blind-gates.md#whole-set-migration-discovery)
only if explicitly requested or required by project policy and verification is enabled;
return its results and any blockers in the response.

### Validate plan completion

After the batches finish, follow [plan completion validation](migration-planning.md#validate-plan-completion)
when verification is enabled and save the assessment in `design-system/adoption.md`.
Otherwise use the progress maintained during execution. Complete any actionable omissions before the final report;
if only blocked work remains, record the partial result.

### Complete and report

When verification is enabled, before reporting complete
[final document reconciliation](completion.md#reconcile-final-documents)
for documents changed by migration and, only if explicitly requested or required by
project policy and verification is enabled, apply the
[final independent review](delegation.md#review-the-final-result).
When the selected scope is complete, [clean up completed work](completion.md#clean-up-completed-work)
before the final report; preserve continuation materials for a partial result.
Stop when every in-scope item meets the [policy's completion conditions](admission.md#select-the-applicable-policy)
or only blocked work remains. Report mode, area, restrictions, documentation,
eligibility, repairs, exceptions, static/behavioural/visual evidence and one consolidated
list of blockers and decisions. Apply the [refusal reporting rule](admission.md#migration-verification)
when verification was skipped. Close gaps only after their original expectations
are proved under [gap resolution](gaps.md#record-and-resolve). Return the migration
result to the caller.
