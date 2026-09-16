# Plan automatic migration

Plan the design-system migration and its evidence. Write the plan in
`design-system/adoption.md`, extending the [saved work list](adoption.md#save-the-work-list)
with tasks and steps. The plan and execution progress share this document.
[Automatic migration](migrate.md) owns scope, authority, batching,
resume and completion; [migration verification](admission.md#migration-verification)
owns the saved run-or-skip choice.
Use the [design-only boundary](model.md#design-only-change-boundary) in every mode.
Internal component and business-logic work remains an explicit project dependency,
not an executable migration task. Engineering checks follow the project's procedure.

## Establish the plan context

Write for an executor who knows neither the codebase nor its domain. State the goal
in one sentence, the approach in two or three sentences, and the relevant technologies.
Link the authoritative requirements or design documents the plan implements.
Record global constraints once, including the settled migration mode, area,
restrictions and verification choice. Copy exact requirement values from their
sources; every task inherits these constraints.

Before defining tasks, map the files to create or modify and each file's responsibility.
Follow existing project structure and patterns. Reuse existing capabilities and plan
only changes needed for the selected migration result. Keep related changes together
and boundaries clear; migration does not itself justify restructuring the codebase.

## Define tasks and steps

Give each task an independently assessable result. Include its necessary preparation,
configuration and documentation in that task. Split tasks where a reviewer could
accept one result while rejecting the other, rather than separating technical layers.
Order dependencies before the tasks that consume them.

For every task, specify:

- The concrete result and the in-scope work-list items it covers.
- Exact paths to create or modify, the relevant locations in existing files, and
  applicable test paths.
- Inputs from earlier tasks and outputs later tasks need. When an API changes,
  include exact names, parameter and return types so adjacent tasks agree.
- Ordered `- [ ]` steps, each containing one action small enough to perform in a few
  minutes, and explicit criteria for completing the task.
- When verification is enabled, the applicable check commands and expected outcomes.
  State which contract promises and selection/composition results they must establish.
  Follow the project's established testing procedure; this plan prescribes no
  test-authoring method. Use the saved verification choice to determine which checks apply.

Describe exact edits and expected behaviour. Include code or test examples where
needed to remove ambiguity; duplicating all future implementation and test code is
not required. Documentation steps identify the content to add or change and its
evidenced source. Replace vague directions such as "add validation", "handle edge
cases" or "write tests" with the actual rule, cases and expected results.

Make each task understandable on its own: include the details it needs instead of
"similar to Task N". Every referenced interface must exist in the inspected code
or be defined by a preceding task. Unresolved requirements remain explicit blockers
on the dependent work, rather than invented decisions or executable TODO steps.

## Review the plan

Before the first batch, review the complete plan yourself against its source requirements:

1. Map every in-scope requirement and work-list item to a task; add missing work.
2. Find and replace placeholders, vague edits and missing completion criteria with
   concrete instructions; distinguish blocked decisions from executable steps.
3. Check that names, types and signatures agree across tasks and with existing code.

Fix issues in the plan before execution. Apply the same review to affected tasks
when revising the plan on resume. A usable plan covers the full selected scope,
defines concrete steps for settled work and identifies what blocks the remainder.

## Validate plan completion

After executing the plan, or when only blocked work remains, reconcile every task
and step in `design-system/adoption.md` with the actual files and saved results
before reporting completion. Checked boxes alone are not evidence of execution.

1. Compare each planned result and completion criterion with the resulting documents,
   implementation and affected consumers, within the selected mode's scope.
2. Match required enabled checks to recorded outcomes covering the final changes.
   Run missing checks and repeat invalidated ones under the saved verification choice.
   With verification skipped, limit this stage to source and progress reconciliation;
   retain `unverified — skipped by user choice` without running the skipped audits.
3. Reopen incorrectly completed steps and add any omitted in-scope work. Continue
   actionable tasks, then reconcile their results again. Keep unresolved blockers
   attached to unfinished tasks.

Save the completion assessment in `design-system/adoption.md`, with references to
the resulting files and evidence, remaining work and blockers. Declare the plan
complete only when every task satisfies the selected mode's completion rules;
otherwise report it as partially complete. Preserve the distinction between
completed work and verified behaviour when checks were skipped.
Keep the plan and assessment through final checks, then apply
[completion cleanup](completion.md#clean-up-completed-work) before the final report.
Completed planning history is temporary; partial plans remain available for continuation.
