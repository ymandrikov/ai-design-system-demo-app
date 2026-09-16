# Build product UI

Read [the shared model](model.md) and the
root DESIGN.md. Apply [missing-context handling](model.md#missing-project-context)
when required inputs are missing; resume dependent UI work after external restoration. Read a supplied design reference
before selecting the structure.
Apply the [design-only boundary](model.md#design-only-change-boundary) to changes:
compose public capabilities and edit related CSS, markup and design settings while
preserving component internals and business logic. Broader project work follows its
own instructions and remains separate from this workflow's authority.

## Select the composition

Follow [discovery](discovery.md). For new pages, use its pattern → layout →
component choices. For local work, retain surrounding contracts and change the
smallest affected composition. A required Question pauses that element's
implementation until answered; rerun it with the answer. Independent work can
continue. Preference assumptions within explicitly permitted freedom do not require
approval.

Before implementation, present discovery's recommended composition and adaptation
limits, scaled to the change. Reuse an already explained or supplied composition;
continue within existing authority once material decisions are settled, without
making the presentation a new approval gate.

Complete when every affected element has a managed choice or explicit fallback,
consumer-controlled token decisions are accounted for, and required decisions for
the work about to be implemented are settled.

## Build through public boundaries

Read DESIGN.md's product-view and test guidance. Use the binding for the product
area, and the selected contracts' APIs and required composition. Follow documented
exceptions only when their conditions hold. Use the selected tokens for their roles
and themes within consumer-controlled properties and supported public settings.
Apply recommendations with stated reasons for material departures. A public override
requiring review waits for approval; existing authorisation counts.
Use the project's documented escape hatch within its permitted scope, supplying the
required reason. Keep the deviation local rather than treating it as a reusable
system variant. For each use or design-lint suppression, follow
[exception recording](gaps.md#record-exceptions); suppressing a warning grants no permission.

On `nothing fits`, inspect existing product patterns and unmanaged code, its tests
and callers. Prefer a suitable existing implementation to duplication. Report
`Fallback: <path> — unmanaged; <evidence and remaining limits>`. Product-local markup
is valid for screen-specific composition within existing contracts. A missing
reusable capability requires an extension, a justified new entity or a bounded
exception before introducing an independent shared variant; merely recording a gap
does not authorise that variant. Hidden/deprecated entries and missing managed
contracts cannot enter through fallback. Do not create a contract during product work.

When implementation contradicts a contract, record the defect and use a working
alternative if available. Shared component design, contract, rule and token
changes belong to the separate [craft workflow](craft.md). Hand off the gap and
needed capability; enter craft only when system work is authorised. When both
workflows are in scope, finish craft and its applicable checks before resuming use.
Then verify the resulting use: **craft → checks → use → checks**. Explicit migration
exceptions retain their scope and must remain visible in the reported evidence.
Keep independent legacy violations outside the diff; expand only surrounding
relationships needed for the new work to function correctly.

Complete when the implementation and affected label, error, grouping, layout and
interaction relationships are ready for verification.

## Verify and hand off gaps

Follow [verification](verify.md) and complete its applicable checks. Record reusable
missing components/layouts/patterns, unexplained API choices or visual variants,
misleading guidance, contract drift or required design-reference conflicts using
[gap recording](gaps.md). Read it
when such a gap appears. A product-specific fallback alone needs no gap. Recording
alone grants no bypass and does not block independent contract-compatible work.

Report choices, material assumptions, fallback evidence, changed composition,
static/behavioural/visual results and gaps. End with Decisions needed, or `none`.
Unavailable browser evidence is reported as incomplete verification, not a fully
verified UI. Report any craft handoff separately from the product result; an open gap
does not turn this workflow into shared component development.
