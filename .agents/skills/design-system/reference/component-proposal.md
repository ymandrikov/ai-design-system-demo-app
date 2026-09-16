# Develop a component, layout or pattern proposal

Enter from [craft](craft.md) for component, layout or pattern creation or public changes; for adoption
or clarification, discuss only uncovered decisions. A need and an optional mockup
are sufficient to start.

## Prepare a proposal

Inspect the brief, DESIGN.md, relevant contracts, implementation and consumers first.
Reuse established rules and explicit decisions. Treat examples as evidence of use;
check the [basis for choices](formats.md#check-the-basis-for-choices) before making them
rules. Separate desired behaviour from observed and verified implementation.

Present a coherent proposed public boundary: purpose, selection conditions, public
use, behaviour/states, composition and accessibility, covering the relevant parts of
[the contract formats](formats.md). Scale detail to the change. Explain
consumer decisions in terms of tasks and outcomes; translate them into the project's
API conventions. Identify which decisions come from sources and which are proposals.

For layouts, propose grouping, regions or children, nesting and ownership of spacing,
inset, sizing, order and adaptation. For patterns, propose the shared end-user task,
required and optional regions, relationships, substitutions and a minimal recipe.
Follow the project's composition conventions: a recipe may use components with
permitted classes without a dedicated layout implementation. Compare reuse and
adaptation with a new reusable boundary; distinguish a screen-specific composition
from a pattern justified by a shared task. Keep consumer-owned content, behaviour
and semantics explicit, using the applicable contract format for the final proposal.

For each proposed setting, establish who decides: a system standard, automatic
component behaviour, or consumer choice. Give conditions for choosing values,
including defaults, or explicitly define the scope of permitted freedom. Comparable
uses follow the same rule. An aesthetic preference can establish an authorised
visual standard; it needs no invented usability claim. Explain what warrants a
difference when proposing variants.

Challenge the need for a new entity or setting with concrete uses and alternatives.
Recommend reuse, a single standard or automatic adaptation when it covers the need;
account for compatibility when changing an existing API. For example, page names do
not determine pagination density. Propose a shared standard or meaningful selection
conditions and assess container adaptation separately from visual density.

## Resolve material choices

Make the proposal easy to accept as a whole, amend, or delegate within a stated scope.
A fully specified request or existing delegation can make further questions unnecessary.
Ask only for answers that materially change the proposal and cannot be obtained from
sources or resolved within that delegation. Follow the shared
[question format and rounds](model.md#questions-to-the-user).

Use the contract topics to prepare the proposal, not as a mandatory questionnaire.
When the user is unsure, offer a recommended resolution and explain the useful
alternatives. Deepen discussion at their request or around a concrete contradiction;
offer a visual comparison or prototype when it would resolve that uncertainty.
Keep accepted and remaining material decisions briefly visible in the conversation,
rather than assigning the user a backlog of unanswered questions.

Explicit delegation authorises the agent to choose and record decisions in that
area without repeated approval. Preserve its limits: deciding a new component's
defaults does not authorise changing shared rules or migrating unrelated consumers.
Outside delegation, a proposal becomes a rule through the user's acceptance;
silence is not acceptance. Bundle the remaining decisions into the concrete
proposal, and continue independent work within the task's scope.

## Return to craft

Once material choices are supplied, accepted or resolved within delegation, continue
the authorised craft work. A discussion-only request ends with the proposal.
Record settled rules and concise material rationale in the contract or authoritative
shared source, linking instead of duplicating them in a separate questionnaire.
Contract authors perform the [ordinary audit](contract.md#ordinary-audit), including
selection and public-use checks; the user need not answer those checks as another
interview. Agreement on design does not establish implementation evidence or admission.
