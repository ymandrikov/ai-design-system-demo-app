# Complete the selected work

Called when the selected scope is ready. The caller supplies its scope, settled
decisions and operation-specific reconciliation requirements. Reconcile documents
before the caller's enabled final review; clean up after that review succeeds.
Return coverage and retained limitations to the caller.

When verification is skipped, omit the reconciliation passes below. Update documents
and links during the work and cleanup itself, following the
[shared verification rule](model.md#skipped-and-unavailable-verification).

## Reconcile final documents

Reread from disk every surviving document created or changed by the caller, plus
root DESIGN.md and existing AGENTS.md and CLAUDE.md files in the affected area,
even if unchanged. Do not create absent instruction files for this check. Compare
them with actual project state, authorised results and the caller's requirements:
source paths, links, configured commands, responsibilities, authoritative rules and
references affected by moves or replacements. Check links from their containing
files and operational paths from the repository root; existence alone does not
establish that a document describes the resulting project accurately.

Correct factual mismatches within the calling scope and reread the corrected files. Preserve
unrelated instructions; record contradictory rules and ask for unresolved normative
decisions rather than choosing a new rule. Run this reconciliation only when
verification is enabled. Complete when every in-scope
document has been reconciled and actionable mismatches are corrected. Report coverage
and any unreadable files or unresolved conflicts explicitly, without claiming those
parts are reconciled. Account for deleted documents by reconciling their incoming references and any transferred content.

## Clean up completed work

After the caller's entire selected scope meets its completion rules, including
enabled final document reconciliation and final checks, automatically clean up
before its final report. Preserve materials needed by independent unfinished work.
A batch boundary, pause, blocker or pending required check is not completion: retain progress and execution materials
needed to resume. Skipped or unavailable checks alone do not prevent cleanup.

Inspect artifacts and their references by continuing purpose, not filename or age.
Remove completed plans and progress, one-off migration scripts, temporary copies,
scratch outputs, logs and reviewer responses used only to execute this work. Include
older documents and scripts fully superseded within the authorised scope.
Keep contracts, indexes, active instructions, working tests, examples and
meaningful source references, decisions and limitations. Preserve pre-existing user
materials outside the calling scope; a filename containing evidence is not a deletion rule. Cleanup does not authorise unrelated skill or workflow
replacement.

Before deleting a file or section, transfer its still-useful rules, decisions,
recommendations and known defects to the appropriate permanent
documents: DESIGN.md, contracts, authoritative rules or the existing gap journal.
Repair incoming links, imports and command
references to the retained content. Keep unresolved defects explicit;
cleanup does not establish that a defect was repaired.

Treat `design-system/adoption.md` as execution state. Once its completed plan and
assessment have served final checks, remove them under this rule. Preserve independent
unfinished migration or API analysis with its inputs, findings, decisions and next
action; completing one step does not start or discard the other. Delete the file and
its DESIGN.md link only when no continuing work remains and lasting results have been
transferred. Preserve decisions needed by any authorised handoff at the destination
specified by the caller before removing their execution file.
Keep only the continuation state needed to resume unfinished work; no execution
history archive is required.

When verification is enabled, reconcile surviving documents and affected references
after cleanup. Rerun
only enabled checks invalidated by the changes, respecting the saved verification
choice. Complete when disposable artifacts are removed, lasting information remains
reachable and continuation state is intact. Retain artifacts whose purpose cannot be
established and report that unresolved cleanup alongside removed and retained paths.
