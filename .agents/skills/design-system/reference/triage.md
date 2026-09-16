# Triage open design-system gaps

Read [gap recording](gaps.md) for the definition of a gap, evidence requirements
and the journal and archive locations in DESIGN.md. Review the open journal, or the entries
explicitly selected by the request. Inspect related rules, contracts, implementation
and consumers to assess those entries; a system-wide search for new gaps is a
separate request. At entry, count the archive's lines with a local command without
loading its contents into context. At 500 or more lines, or on an explicit archive
cleanup request regardless of size, follow [archive cleanup](archive-cleanup.md).
A cleanup-only request ends there. An empty journal ends with no open gaps to triage
after this archive check.

Triage updates the journal and archive and recommends work. Repairs belong to an
authorised [craft](craft.md) or [use](use.md) stage. A user's request to fix a gap
already authorises its repair scope: craft may invoke triage automatically for that
gap, then resume the repair. Keep implementation, contracts, indexes and normative
rules unchanged during triage, except for archive-link replacements required by cleanup.

## Verify and clean the journal

For each entry, compare its original request, Actual result and Expected result
with current authoritative sources. Follow [discovery](discovery.md) for selection
claims and [verification](verify.md) for relevant behavioural or visual claims;
return here with their evidence, without starting implementation.

Update evidence and the next step directly, without asking for each journal edit:

- Merge confirmed duplicates by independent cause, retaining every source and
  original expectation, including distinct consumer requirements. Similar wording
  alone does not establish a shared cause.
- Dismiss an erroneous record only when evidence establishes that it is not a
  system gap. Explain the reason and route any remaining product defect to use or
  missing request fact to clarification. Dismissal is not a demonstrated repair.
- Resolve an already-fixed gap only after demonstrating all its original
  expectations. Discoverability requires actual selection; implementation or a
  matching description alone is insufficient. Apply the resolution requirements in
  [gap recording](gaps.md), including the basis for choice gaps.
- Retain unresolved or uncertain entries with the remaining failure, missing
  facts or verification limit. Missing evidence is not evidence of an erroneous
  or resolved gap. Preserve the original expectation rather than weakening it
  to match the available capability.

Account for every reviewed entry as retained, merged, dismissed or already
resolved. [Archive every entry leaving the journal](gaps.md#archive-an-entry) with
its disposition and basis, and report that evidence. Preserve the existing journal
format; categories remain optional.

## Recommend the next work

For each retained entry in scope, add or update its
[resolvability assessment](gaps.md#assess-resolvability) from current evidence.
Keep its level separate from the work order below.

For each retained entry, identify the next actionable step: system work in craft,
consumer design work in use, project-owned logic repair, request-fact clarification
or a decision from the user.
Distinguish work ready for craft from work awaiting an answer or verification. A recommendation does not authorise that work.

When a new rule or another decision is needed, prepare a concrete question,
alternatives and a recommended decision with reasons. Keep the gap open and
continue the other entries. Observed variants do not establish normative authority;
apply [the basis for choices](formats.md#check-the-basis-for-choices). Honour decisions
already supplied; leave an interview or rule change to the next requested stage.

Recommend an order using consequences first: violated required promises and blocked
end-user tasks, then affected consumers and dependencies. Explain prerequisites
that must be settled before a repair can proceed. Use repair cost as a secondary
factor for comparable harm. State unknown impact, reach and effort explicitly;
use an explained order rather than numerical scoring.

Finish with the updated journal and archive and a concise report of dispositions and evidence,
recommended work order, ready next steps and pending facts or decisions.
When called from craft for a requested repair, return these results to craft and
continue the authorised work without a new permission question. A standalone triage
request ends with the report.
