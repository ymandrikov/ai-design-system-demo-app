# Delegate the selected work

Use available, permitted subagents automatically for substantial independent work
within the caller's authorised scope. Keep small or inseparable
work with the main agent. Respect runtime permissions, user restrictions and capacity;
without execution subagents, continue sequentially. Use established project instructions.
Delegation preserves the caller's scope, applicable migration mode, batch
limits, continuation rules and the saved verification choice.

## Assign independent work

The main agent owns scope decisions, user questions, integration and shared documents:
DESIGN.md, agent instructions, indexes and progress/gap journals. Subagents return
proposed shared-document updates to it. Delegate source surveys by independent area
and migration tasks by disjoint file ownership, using the existing
[migration plan](migration-planning.md) and work list rather than a second task system.

Before dispatch, give each worker:

- Its concrete result, source paths, applicable skill procedures and authoritative rules.
- The selected scope, mode, restrictions, verification choice and unresolved decisions.
- Exact files it may change, prerequisites already completed and acceptance criteria.
- A request to return changed paths, check results and blockers in the response.

Assign each writable file to one active owner; the main agent also respects that
ownership. Read-only surveys may share sources. Complete shared API, token or contract
dependencies before dispatching their consumers. Serialize overlapping changes; if a
worker discovers an unassigned dependency, it reports it for reassignment instead of
expanding its scope. Workers return questions to the main agent for consolidation.
Dispatch only within the current batch for gradual migration, preserving its pause.

## Accept results and recover

Before accepting a worker result, read actual changed files and compare the changes
with the assignment, authoritative sources and related system/consumer contracts.
Integrate shared-document updates and perform applicable enabled checks against the
combined result; repeat checks invalidated by subsequent edits. A worker's success
report alone is insufficient. With verification skipped, integrate the assigned work
and update progress without separate acceptance audits or document reconciliation.
Follow the [shared verification rule](model.md#skipped-and-unavailable-verification).

On failure or interruption, continue independent work and pause dependent tasks.
Before retrying, reassigning or finishing the task yourself, ensure the previous
worker has stopped writing, inspect partial changes and reconcile saved progress
with disk. Preserve valid work, record unfinished outcomes and repair or reassign
only the remainder. Mark work complete only after acceptance; preserve blockers and
the next action in existing progress. On resume, revalidate dependencies and ownership
against current files before dispatch.

## Review the final result

Run a final independent review only when explicitly requested by the task or required
by project policy, and verification is enabled. Otherwise finish with enabled ordinary
checks and document reconciliation; reviewer availability is not a completion condition.
Use a fresh subagent that did not author the work for a read-only consistency review.
Give it the scope, decisions, source rules, resulting files and check results in the
conversation. It reports actionable findings with paths and reasons in its response.
For changed contract boundaries, include the [ordinary contract audit](contract.md#ordinary-audit)
and [scenario quality](blind-gates.md#scenario-quality).

The main agent assesses findings against sources, fixes actionable in-scope omissions,
reconciles changed documents and reruns invalidated enabled checks. Have a fresh
review context check affected findings against the corrected final files. Unresolved
findings remain explicit blockers. If an explicitly required independent reviewer is
unavailable, briefly report that in the conversation and finish independent work;
reviewer absence does not block completion or establish independent evidence.

This review is separate from [independent discovery](admission.md#whole-set-migration-discovery):
preserve its fresh context, public-only inputs and policy-selected timing. A reviewer with
implementation access cannot supply that evidence. An explicit verification refusal
skips both independent checks and final document reconciliation under
[migration verification](admission.md#migration-verification).
