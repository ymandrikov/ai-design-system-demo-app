# Craft the design system

Read [the shared model](model.md) and existing root `DESIGN.md`. Craft owns reusable
components' design, layouts, patterns, contracts, indexes, design rules and token
organisation/values. Apply the [design-only boundary](model.md#design-only-change-boundary)
using project conventions: CSS, markup and public design settings may change;
component internals and business logic remain project-owned. Related consumer design
changes use the separate [use workflow](use.md).

Apply [missing-context handling](model.md#missing-project-context) when required
connections are absent. For a new system, inspect the brief, project and requested
scope; establish design intent and needed rules from authoritative sources and
explicit decisions. Return missing prerequisites to the caller. Continue independent
proposal work; dependent authoring resumes when required context exists. Empty
indexes are valid; a pre-existing catalogue is unnecessary.

## Identify the change

When the user asks to fix a design-system gap, automatically follow [triage](triage.md)
for the requested entry and directly related duplicates before planning the repair.
For an unrecorded gap, first use [gap recording](gaps.md) to capture the request,
expected result and evidence. Return here with the current failure, authoritative
requirements and next actionable step. The repair request already authorises its
craft scope; continue ready work without renewed permission. An already-resolved or
dismissed entry needs no system repair; report its disposition and any remaining
work. Keep unrelated entries outside this review and resolve missing decisions
before dependent edits.

An explicit automatic migration request enters [migrate](migrate.md), which owns
scope, mode, batching and completion. When called for one migration item, return
its result to that caller instead of starting another migration. For an explicit
gradual contract migration or escape-hatch analysis, call [adoption](adoption.md)
for the work list and batches; analysis-only work ends with recommendations.
Read [admission policy](admission.md) when authoring contracts or deciding eligibility;
use the caller's saved context and verification choice rather than selecting a new policy.

Find authoritative definitions and affected references through DESIGN.md and indexes.
For a UI entity, distinguish creation, adoption, design repair, contract
change, clarification and lifecycle change. For tokens/rules, identify the role,
scope and affected consumers.
Classify compatibility: rejecting previously valid use or changing an observable
promise is breaking. State undecidable consequences as a decision.

Map affected implementations, contracts, indexes, rules, tokens and public consumers.
Search incoming links and usages before editing shared promises or values. An existing
consumer needs impact assessment; a dependent contract directs future use and may
need correction. Complete when the change's scope and compatibility are understood.

For component, layout or pattern creation or public changes, follow the
[proposal discussion](component-proposal.md) to prepare a coherent proposal and
resolve material choices. For adoption or clarification, use it for uncovered
decisions. Reuse complete briefs and existing delegation without a mandatory interview.

For every extension of a component's public API, including backward-compatible
optional inputs, present the concrete proposal and impact on existing uses. Before
implementing dependent changes, settle whether and which existing uses to migrate,
and what behaviour applies when the new input is omitted. Reuse explicit answers,
authoritative project rules or choices within delegated authority; otherwise ask for the missing decisions
in one batch. A required input with no default is valid. Recommend preserving existing
behaviour where possible and explain the consequences for current uses. Proceed once
both decisions are settled. Migration concerns uses of the changed component only;
extending other components requires its own scope. Do not repeat questions whose
answers are already determined; technical compatibility alone does not settle an
otherwise unknown design default or migration decision.

## Edit and audit

Before turning observed variants into contract or design rules, check their basis
using [the basis rule](formats.md#check-the-basis-for-choices).
Record unsupported choices or rule replacements instead of normalising them.

For UI contracts, follow [contract authoring](contract.md) and the standard structure
in [the model](model.md). Metadata for all three groups belongs in contract frontmatter.
Set eligibility using the
[selected admission policy](admission.md#select-the-applicable-policy).
Update directly invalidated contract references and index
summaries within scope. Preserve a disqualifier when only its suggested alternative
has retired; report an uncovered need if no replacement fits.

For token organisation, values or shared design rules, follow
[design rules and tokens](tokens.md).

### Design public APIs and escape hatches

When creating or changing a public API, prefer inputs that express consumer intent
and supported system options. Make established design rules part of the public boundary;
the project determines how that boundary is implemented and enforced.
For example, if this system defines confirmation button styles and order by intent,
let the dialog own those decisions instead of accepting arbitrary action buttons:

```jsx
<ConfirmationDialog intent="destructive" confirmLabel="Delete organization" />
```

Where local deviations are needed, prefer a clearly named escape hatch with a
mandatory, non-empty reason over unrestricted styling or composition overrides.
Reuse the codebase's exception mechanism; its shape depends on the project's binding
and conventions, not a required prop on every component. This JSX is illustrative:

```jsx
<Badge
  designSystemException={{
    reason: "HTTP method badges must fit 24px inspector rows; the smallest Badge is 28px.",
    attributes: { className: "min-h-0 px-1 py-0 text-xs leading-4" },
  }}
>
  GET
</Badge>
```

Define the permitted deviations and approval conditions in the contract. Restrict
the mechanism to that scope and verify that each use supplies a meaningful non-empty
reason. The project determines the enforcement mechanism; adding internal validation
logic is project work. A generic attributes object
must not silently bypass unrelated behaviour or accessibility guarantees. Treat the
result as a local exception, not a variant to copy into other consumers. Each use,
including a design-lint suppression, follows [exception recording](gaps.md#record-exceptions).
A reason or suppressed warning does not replace required authorisation.

### Audit the implementation

For component creation or design repair, implement permitted CSS, markup and public
design settings using the project's process. Keep internal logic project-owned;
record dependencies on it and preserve the intended contract. Check affected callers
before changing shared behaviour. Verify public use, relevant states, accessibility
and composition with focused project checks; use [verification](verify.md) for
affected browser promises. Keep documentation-only requests documentation-only.
Document-only patterns need no implementation. Complete the implementation audit
when affected promises have evidence or an explicit failed/unverified result.

Run the [ordinary contract audit](contract.md#ordinary-audit). Use the applicable
[independent gate method](blind-gates.md) at the timing selected by admission policy;
return per-item evidence to a migration caller that owns whole-set discovery.

Repair design drift within the authorised craft scope; otherwise record
the remaining defect. A contract is not weakened to hide a defect. Craft owns the
agreement between implementation and public promises, including their evidence.

## Apply authorised decisions

Present the concrete changes, affected consumers, migration needs and audit evidence
before asking about unresolved normative rules, admission, breaking changes or
retirement. Existing explicit authority counts. Independent migrations stay outside
scope. Apply [admission policy](admission.md#select-the-applicable-policy) to the actual
scope and evidence before changing eligibility. Report document completion separately
from runtime readiness and return any unresolved decision to the caller.

## Resolve gaps and report

Only resolve gaps within the task's stated scope. Rerun the original request and
verify every Expected result, including discoverability, behaviour and composition
when required. Hidden adoption or matching description alone cannot close a discovery
gap. After proof, [archive the full entry](gaps.md#archive-an-entry) as Resolved and
report the evidence. Otherwise leave it open with the remaining limitation.
For new systemic gaps, use [gap recording](gaps.md).

Report changed artifacts, compatibility, public-use evidence, affected consumers,
gaps and unresolved decisions. Separate static, behavioural and visual results;
a missing check is unverified, not pass.
When consumer changes are in scope, continue through [use](use.md) after craft's
checks, then verify the affected composition. Earlier component evidence alone does
not prove the correctness of its new use.
