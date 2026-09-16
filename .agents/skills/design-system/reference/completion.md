# Complete the selected work

Called when the selected scope is ready. The caller supplies its scope, settled
decisions and operation-specific reconciliation requirements. Reconcile documents
before the caller's enabled final review; clean up after that review succeeds.
Return coverage and retained limitations to the caller.

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
decisions rather than choosing a new rule. This reconciliation is mandatory whenever called,
including when testing or verification is skipped; it is a mandatory exception to
[migration verification](admission.md#migration-verification). Complete when every in-scope
document has been reconciled and actionable mismatches are corrected. Report coverage
and any unreadable files or unresolved conflicts explicitly, without claiming those
parts are reconciled. Account for deleted documents by reconciling their incoming references and any transferred content.

## Clean up completed work

After the caller's entire selected scope meets its completion rules, including
final document reconciliation and enabled final checks, automatically clean up
before its final report. Preserve materials needed by independent unfinished work.
A batch boundary, pause, blocker or pending required check is not completion: retain progress and execution materials
needed to resume. An explicit verification refusal permits cleanup after mandatory
document reconciliation, preserving the unverified result.

Inspect artifacts and their references by continuing purpose, not filename or age.
Remove completed plans and progress, one-off migration scripts, temporary copies,
scratch outputs, logs and reviewer responses used only to execute this work. Include
older documents and scripts fully superseded within the authorised scope.
Keep contracts, indexes, active instructions, working tests, examples and evidence
needed to support current contract claims, decisions or limitations, even if created
during this work. Cleanup does not authorise unrelated skill or workflow replacement.

Before deleting a file or section, transfer its still-useful rules, decisions,
recommendations, known defects and verification limits to the appropriate permanent
documents: DESIGN.md, contracts, authoritative rules or the existing gap journal.
Preserve required supporting evidence and repair incoming links, imports and command
references to the retained content. Keep unresolved defects and skipped checks explicit;
cleanup neither closes gaps nor turns an unverified result into a verified one.

Treat `design-system/adoption.md` as execution state. Once its completed plan and
assessment have served final checks, remove them under this rule. Preserve independent
unfinished migration or API analysis with its inputs, evidence, decisions and next
action; completing one step does not start or discard the other. Delete the file and
its DESIGN.md link only when no continuing work remains and lasting results have been
transferred. Preserve decisions needed by any authorised handoff at the destination
specified by the caller before removing their execution file.
Requirements to save execution history apply while the work or its checks need it;
do not create a separate archive merely to retain completed execution history.

After cleanup, reconcile surviving documents and affected references again. Rerun
only enabled checks invalidated by the changes, respecting the saved verification
choice. Complete when disposable artifacts are removed, lasting information remains
reachable and continuation state is intact. Retain artifacts whose purpose cannot be
established and report that unresolved cleanup alongside removed and retained paths.
