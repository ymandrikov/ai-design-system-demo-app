# Clean the gap archive

Run on an explicit archive cleanup request, or when the archive reaches 500 lines
at triage entry or after archiving entries. Use the archive linked from DESIGN.md.
A missing or empty archive needs no cleanup. These triggers authorise cleanup
without another confirmation; they do not authorise commits or pushes.

Clear every eligible entry, rather than trimming down to 499 lines:

1. For each entry, find a commit reachable from the current HEAD that contains its
   full current record, including evidence and closure metadata. Compare the record
   with the committed file; a tracked file or a staged entry alone is insufficient.
   Retain entries whose current version is absent from that history. If Git history
   is unavailable, retain the archive and report the limitation.
2. Find incoming links in project files, including reference-style Markdown links,
   exception annotations and links between archive entries. For links that will
   survive cleanup, replace the destination with a permalink to the committed
   archive at the full commit SHA and the entry's verified anchor or line range.
   Derive the URL from the repository's actual host and verify that the commit is
   available there; a local-only commit does not establish a usable web permalink.
   File-level links must likewise reach a saved archive version. If a required
   replacement cannot be established or edited, retain its target and report why.
   Check surviving links again if retaining an entry leaves additional links alive.
3. Save and verify the replacement links before removing their targets. Preserve
   the archive title, other non-entry content and retained records exactly. When
   every entry is eligible, leave the archive without entries. Keep the open journal
   unchanged except for required link destinations; cleanup does not reopen gaps.

Report removed and retained counts and any history or link limitations. If retained
content still occupies 500 or more lines, report that fact and finish this cleanup
attempt; retry at the next trigger. Do not create commits to make entries eligible.
