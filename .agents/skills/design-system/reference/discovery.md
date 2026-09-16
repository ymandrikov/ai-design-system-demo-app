# Discover UI and tokens

This invocation ends by returning a selection decision in the conversation. For a
request to add or build UI, describe the intended composition and return to the
caller; implementation is the caller's next task, not a second phase of discovery.
The caller also owns pending questions, saving results and recording gaps.
Use only read/search operations. Never create, modify or delete files, including
temporary files, reports, logs and tests, through any tool or delegated agent.

Compare contracts, then choose. An omitted fact is unknown, not false.
For managed UI selection, use the request, DESIGN.md's public rules, supplied design
references, indexes, contracts and their linked public dependencies. Component
implementations, private styles, tests, previews and existing call sites are not
selection inputs; frontmatter source/evidence paths serve authoring and verification.
Public token definitions remain inputs to token selection even when stored in CSS.
The deciding rule must be available in a contract or a linked public rule. When it
is missing, return the contract gap to the caller rather than inferring it from code,
appearance or the entity's name. Distinguish that gap from a missing request fact,
which needs a question only when it could change the decision.
Read [the shared vocabulary and project rules](model.md) once per
conversation, then root DESIGN.md and any supplied design reference. Without the
required context, apply [missing-context handling](model.md#missing-project-context)
and return the missing inputs to the caller without writing files.

## Start at the affected level

Translate the developer's request into [purpose and intent](formats.md#purpose-and-intent)
using the public inputs above. Treat a named component as a proposed solution and
check it against the task. Explain a mismatch and select a suitable alternative;
an explicit request for an exception follows the documented exception and decision
rules rather than establishing ordinary eligibility.

For a new screen, read PATTERNS.md and its candidate contracts first, then the
layouts and components needed by viable patterns. Compare candidates at each level. For a local change,
read the containing composition's constraints and start at the affected level.
Split meaningful controls, layout containers and semantic surfaces into elements.
Fixed parts owned by a selected contract need contract validation, not separate
choices. Regions whose implementation the consumer chooses do need discovery.

When no pattern fits, continue layout/component discovery using the request and
existing product structure. Report the uncovered pattern only when relevant.
Reconsider an outer choice when no allowed inner composition can fulfil it.
For token-only requests, start at token selection below. For compositions, identify
consumer-controlled visual decisions alongside UI choices. Complete when every
requested element, inherited obligation and affected token role is accounted for.

## Find candidates

Read the relevant indexes. For each entry whose Description
covers the task or a broader category, follow its Contract link and read the
frontmatter to establish id and status.
Shortlist only discoverable entities, including eligible entities named by the request,
widget/context language or shortlisted contracts. Read every shortlisted contract
in full, including linked composition obligations. The generated description
routes; it does not add requirements, metadata authority or visual values.

Read linked known defects and verification limits as well. A discoverable entity
admitted through migration may have unverified or failing promises.
If a known defect prevents the requested result, report it and seek a working
alternative; missing evidence requires verification by the caller, not an assumed pass.

Keep a candidate when its purpose covers the task, no explicitly applicable
When-not-to-use clause rejects it, and its API/Structure and required composition
can express the stated request. An explicit conflict with a required When-to-use
condition rejects it. Unknown facts leave a conditional candidate, not a rejection.

Before treating an entity absent from the index as unmanaged, check the standard
contract directories for its contract and actual status. A discoverable contract
missing from its index is stale context to report to the caller, not an unmanaged fallback.
Code does not grant managed eligibility. Hidden/deprecated entities stay out of
Candidates and Choice, including through pattern dependencies. Missing/broken
contracts are defects. An explicit request for an excluded entity gets a separate
availability explanation; do not disguise it as unmanaged fallback.

## Rank and decide

Prefer, in order: exact task over broad category; stated means/context over an
assumption; fewer material assumptions. Compare the contracts of all contenders
before choosing; never lock an id from a summary alone.

State assumptions that affect the choice. Ask whether the missing fact could change
the selected composition's validity, required parts or material behaviour. If that
choice works for every possible answer, choose it now; an alternative's unknown
eligibility does not block it. State any preference assumption and continue.
If the selected composition depends on the answer, return a provisional choice
and a distinguishing Question before implementation. A single conditional candidate
can require a question without an Alternative.
If conflicting contracts need a new normative rule, identify the decision.
A design reference that contradicts a required rule needs that decision unless a
documented exception applies. A reference selecting a valid preference needs none.

For API values and visual variants, check the
[basis for choices](formats.md#check-the-basis-for-choices).
Return a missing or conflicting basis to the caller for gap recording and any required
decision; discovery remains read-only. An accepted value alone does not settle
the choice. A correct component id justified by an invented rule is still a failed
selection; tie the reason to the actual deciding public rule.

Return `nothing fits` only when no eligible candidate can cover the element.
Complete when each choice has its basis, assumptions and any required decision.

## Advise on composition

For composition advice or an interface request, turn the choices into a concrete
arrangement: identify meaningful groups and nesting, explain why the parts belong
together, and name the owners of spacing, inset, width, order and adaptation where
affected. Show which parts are required and which the consumer can replace or adapt.

Follow the project's composition conventions. These may use layout components,
nested primitives such as Stack, or task patterns assembling components with
permitted classes. Classes used within the documented public boundary are ordinary
composition; apply exception conditions only where that boundary requires them.
A recipe need not introduce a layout component. Classify patterns by their shared
end-user task and composition rules, not by the presence of classes alone.

Use established selection rules and contextual defaults for spacing and other
settings. When their basis is missing, propose a concrete choice for this composition
and explain the grouping it serves, marking it as a proposal subject to the existing
decision rules. Acceptance for one screen does not establish a system-wide rule.
Recommend a new layout or pattern only for an evidenced responsibility or task that
existing capabilities cannot suitably cover; describe its boundary and an example
use for a possible craft handoff, separately from the available selection.

Scale the advice to the affected composition: one sentence may suffice for a small
group; use a short outline or example when nesting needs explanation. Complete when
the consumer can understand the recommended arrangement and its adaptation limits.

## Select tokens for consumer decisions

Read DESIGN.md's design rules and token catalogue or definitions. Select by intended
role, type, scope, theme and usage constraints, not name resemblance or equal values.
Follow aliases to authoritative values and theme overrides without erasing the role
of the selected token. Base tokens and semantic tokens need not form mandatory tiers.
An existing source may serve as the token index; UI statuses and contract formats do
not apply to token definitions.

Choose tokens only for consumer-controlled properties or settings exposed by a UI
contract. A component's use of a shared token does not grant an override. For owned
spacing, for example, use the contract's supported setting rather than injecting a
raw gap or private component variable. Fixed internal values need no separate choice.

Apply required rules and documented exceptions. A missing fact that changes validity
or the resolved theme choice requires a question; state harmless preferences and
continue. If a needed role/definition is absent, report that limitation and return the
system extension to [craft](craft.md) through the caller. Do not invent a token or silently
substitute an equal-valued token with a different role. Complete when each affected
consumer decision has a valid token/setting, or an explicit limitation or question.

## Result

Make the choice for each requested need unambiguous: identify the component, layout
or pattern, and any selected token/setting with its source, or explain what is missing.
State material conditions and questions needed before implementation. Prose, a table
or labelled fields are all suitable.

Compare shortlisted contracts during discovery, but list all candidates only when
the request asks for comparison. A valid choice need not name every runner-up. Brief
reasons and references to an already explained clause suffice; do not invent a
restriction to justify a choice or rejection. Omit irrelevant alternatives rather
than manufacturing them. The meaning matters, not field names or block counts.

The [use workflow](use.md) may inspect unmanaged code after `nothing fits`; that
fallback remains separate from the managed Candidates and Choice.
