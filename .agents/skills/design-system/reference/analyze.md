# Analyze reusable UI candidates

Find opportunities to reuse, extend, adopt or extract components, layouts and task
patterns from product code. Read [the shared model and vocabulary](model.md) once.
Save recommendations in `design-system/analysis.md`; implementation is a subsequent
authorized [craft](craft.md) or [use](use.md) task. Analysis changes only its report
and evidenced [gap records](gaps.md), leaving code, contracts, indexes and rules intact.

## Check readiness

Inspect `design-system/COMPONENTS.md`, `LAYOUTS.md`, `PATTERNS.md` and their linked
contracts at the target project root. Present, readable indexes with reachable
artifacts establish connection for this procedure; empty groups are valid.
Read DESIGN.md when available for additional sources and policies. Its absence alone
does not block analysis, including gap recording within this procedure.

If the required indexes are missing or unreadable, report which ones under
[missing-context handling](model.md#missing-project-context). Their restoration belongs
to the project process. End this invocation without creating a system or an analysis report. A broken individual entry is a coverage/evidence limit: report
it and continue independent analysis without treating the entry as an unmanaged alternative.
Use a journal path established by existing project instructions or DESIGN.md; otherwise
use an existing unambiguous journal under `design-system/` or the default `design-system/gaps.md`.
Conflicting journal guidance blocks only the affected recording, with evidence kept in the report.

## Map scope and preserve progress

Use the requested area, or all project-owned UI when scope is omitted. Enumerate
pages, routes, product views, local UI, shared components/layouts, styles and existing
patterns. Exclude dependencies and generated copies; inspect wrappers and dependency
APIs when needed to assess reuse. Indexes alone are not the analysis scope.

Read any existing analysis report before updating it. Save the requested scope, date
and a compact coverage checklist with inspected, pending and unavailable areas and
their source paths. Reconcile saved progress with current sources. For a scoped run,
retain findings outside scope and mark them not rechecked during this run.

Inspect existing shared alternatives and all relevant consumers of each proposed
boundary, including outside the requested area. These dependency checks do not expand
the report into an unrelated whole-project audit. Search results locate work; inspect
the source and consumer flow before concluding that a candidate is valid.

Choose manageable batches, save progress after each and continue through the selected
scope without batch-size or continuation questions. A blocked candidate or unavailable
area does not stop independent work. Keep outstanding decisions with their candidates.

## Evaluate candidates

Look for repeated inline fragments, existing local entities, duplicate implementations,
recurring arrangement responsibilities and shared end-user tasks. Compare contracts,
implementations, styles, tests, examples and actual consumers. Similar names, markup,
CSS values or appearance locate candidates but do not prove a common responsibility.

Prefer multiple real uses with a shared responsibility and compatible differences.
A single use can qualify when evidence establishes an independent responsibility,
such as coordinated keyboard behavior, focus restoration and accessible announcements.
Speculative future reuse is insufficient. Name what remains consumer-owned and what
the proposed boundary owns; expose differences in data, behavior, adaptation and
accessibility that could make consolidation costly or incorrect.

Classify by the [canonical definitions](CONTEXT.md): a component owns a public UI
responsibility; a layout primarily arranges content; a pattern describes a shared
end-user task through regions, relationships and composition choices. A pattern may
be a documented recipe without new runtime code. Repeated combinations alone do not
establish a pattern, and a component can implement a pattern while remaining distinct.

For each candidate, compare existing system capabilities before recommending:

| Action | Evidence needed |
| --- | --- |
| Reuse existing | Its public contract and actual behavior cover the identified consumers. |
| Extend existing | A concrete unmet need belongs to its responsibility; identify compatibility and consumer impact. |
| Adopt local entity | Its existing boundary is useful and reusable but lacks system governance. |
| Extract new | A shared or independently justified responsibility lacks a suitable existing boundary. |
| Keep local | Differences, coupling or extraction cost outweigh demonstrated reuse benefits. |

Inspect hidden/deprecated entities to understand overlap and history, but do not
recommend them for new use without a separate craft availability decision. Check the
[basis for choices](formats.md#check-the-basis-for-choices) before proposing shared rules.
Observed variants are evidence of current behavior, not authority to normalize them.
Record the missing decision instead of inventing a standard or silently choosing one.

Read existing evidence first. Run focused tests, builds or browser/visual checks when
a material conclusion depends on behavior or rendering that reading cannot establish;
honor explicit verification choices and project policy. Record what was read, run,
skipped or unavailable. Missing evidence limits that conclusion, not unrelated findings.

## Update the report and finish

Keep one report, preserving existing candidate anchors and accepted/rejected decisions
with their reasons. Reconcile findings against current implementations and intended
consumers; mark implemented proposals only with supporting evidence. Reconsider a
rejected proposal only when new evidence changes its basis, retaining the original
decision and explaining the change. An accepted recommendation does not authorize implementation.

Put prioritized recommendations first, followed by other supported findings, considered
cases best left local, coverage/progress and unresolved evidence or decisions. Each
candidate includes:

- Kind and recommended action, linked source and consumer locations, and existing
  alternatives considered.
- Common responsibility, proposed boundary or recipe, meaningful differences and
  responsibilities retained by consumers.
- Concrete benefit, consolidation risks, compatibility impact and prerequisites.
- Evidence and verification limits, decision/reason when present, and the next step.

Order by demonstrated benefit and affected consumers, accounting for dependencies,
risks and effort; explain the order without invented numerical precision. A potential
extraction is not automatically a gap. Use [gap recording](gaps.md#record-and-resolve)
only for evidenced systemic shortfalls, reusing existing entries and linking the report.
Keep ordinary opportunities here rather than copying them into the adoption work list.

Re-read the report against sources and saved decisions before finishing. Every area
in scope must be accounted for; pending or unavailable inspection means partial coverage,
even when accessible work is finished. Report zero candidates when none are justified.
Return the report link, highest-priority actions, coverage and material limitations.
End with recommendations; implementation, adoption and admission remain separate work.
