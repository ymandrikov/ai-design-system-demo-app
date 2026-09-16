# Independent contract gates

Use this procedure only for independent checks explicitly requested by the task or
required by project policy. Read [admission policy](admission.md#select-the-applicable-policy)
for timing and completion conditions. An explicit verification refusal skips these checks.
Use a fresh subagent or independent session with only the public inputs below; a
self-review cannot replace an explicitly required independent check. Keep expected
answers outside worker inputs. Return decisions, failures and unavailable checks in
the conversation; no separate prompts, transcripts, logs or evidence archive are required.

## Whole-set migration discovery

Called at the end of authoring the complete selected area by automatic migration,
or gradual adoption with saved whole-set conditions, as selected by
[admission policy](admission.md#whole-set-migration-discovery). This procedure returns
evidence and blockers; the caller owns migration completion. Ordinary author audits
and structural checks remain part of authoring when verification is enabled.

If any selected contract is blocked, finish independent work and save blockers;
defer this gate until the whole selected set and its indexes are ready. Discovery
for actual consumer updates may run earlier against ready eligible contracts.

Before dispatch, prepare a coverage list of real page scenarios and groups of similar
components, layouts and patterns. Cover each such group with at least one request
that distinguishes candidates. Where real consumers or comparison groups are absent,
derive synthetic requests from documented purposes and composition rules and label
that coverage as synthetic. Record uncovered entities and the reduced coverage.
Apply [scenario quality](#scenario-quality) before counting coverage:
use product situations and deciding differences, with their origins recorded outside
the worker's inputs. A restated contract condition does not cover a comparison group.
Whole-set coverage does not require a must-fit/must-not-fit pair for every entity.

Run the prepared requests against the complete public set in a fresh independent context,
using [the discovery gate's public inputs and result assessment](#discovery-gate-run-the-actual-procedure).
Keep expected answers outside worker inputs. Correct discovered contract errors and
rerun affected cases in fresh context against final inputs. Retain failures and return
evidence or unavailable checks to the caller, which applies the
[admission and completion policy](admission.md#select-the-applicable-policy). Reuse
evidence only while its inputs and relevant rules remain unchanged.

## Prepare tasks before dispatch

Apply [scenario quality](#scenario-quality) to every prepared request.
For ordinary per-batch gates, derive a must-fit request for each affected entity in a new supported context beyond
its examples, and a nearby must-not-fit request from a real disqualifier. Neither
request names the target. Choose the closest plausible confusion, not just an obvious
mismatch; include a native alternative or no managed match where relevant. If the
entity has no disqualifiers, record that and test its boundary against a competing
candidate without inventing an exclusion. Prepare an API/composition edge for the
ordinary audit and optional consumption gate using a valid combination of optional
features. Do not set mutually exclusive inputs together.
A general component's canonical example is not automatically a disqualifier.
Record the expected decisions and deciding constraints separately from worker inputs.
For a pattern/layout, also prepare a composition that violates one required rule;
record which rule the verifier must reject. Prefer an actual project defect or boundary.

## Scenario quality

Start with a product situation: who is doing what, what the content represents,
its surrounding context and the required interaction or outcome. Derive real cases
from consumer tasks and product requirements; derive synthetic cases when those are
absent and identify them as synthetic in the controller's assessment. Prepare these
facts independently of the contract's wording and keep gate cases out of its examples.

For a close comparison, hold the task/context steady and change the fact that should
change the choice. For example, a saved item carries the text "Sync failed": compare
a state marker beside its name with an explanation of the failure and recovery steps
in the same location. The controller establishes the expected choice from this
project's rules; this example sets no universal Badge policy.

Before dispatch, identify each case's origin, competing uses and deciding fact
in the controller context, separate from worker inputs. A request must leave the component decision to discovery.
Copying or paraphrasing a selection criterion, naming the desired presentation, or
saying that the required recipe already calls for it does not exercise that decision.
Shared domain words are fine; judge whether the request supplies a situation or the
answer, not lexical similarity. Rewrite invalid cases before counting their coverage.
A correct answer to an invalid case supplies no evidence of contract sufficiency.

## Discovery gate: run the actual procedure

Give the worker an isolated copy containing DESIGN.md, all three UI indexes, their
linked contracts and the batch’s hidden contracts, required public rules/token definitions and the current design-system
skill. Keep competing candidates present. Omit component implementations, private
styles, tests, previews, consumer code and authoring history; source/test/example links
in the copied contracts are references, not additional permitted inputs. Keep expected
answers outside the worker's inputs. Validate structure and source links on the
author's full copy, not this reduced one.
For hidden new contracts or admission, set proposed discoverable status only in the
gate copy, then regenerate its indexes before dispatch. Label the result proposed-selection
evidence; it authorises neither source
status changes nor runtime-readiness claims. Already admitted entities keep actual status.

Dispatch all unnamed requests for the batch together, with neutral case ids and no
must-fit/must-not-fit labels. The worker decides each request separately:

```text
Read <copy>/skills/design-system/SKILL.md and follow design-system discovery.
Design: <DESIGN.md in copy>.
Requests: <case ids and unnamed tasks>.
Read only the supplied copy. Return the full discovery response in the conversation.
For each case, connect request facts to the deciding contract or linked public rule.
Use only read/search operations; return results in this conversation.
```

First check the cases against [scenario quality](#scenario-quality); a successful
response cannot compensate for an invalid case. Then compare the actual selection,
required questions and composition decisions with
the prepared expectations. Must-fit selects the target under actual ranking after
candidate contracts are compared; must-not-fit excludes it for the applicable clause.
A correct id with an invented reason, a guess filling a missing rule, or reliance on
implementation knowledge fails. Assess the decision and its stated basis, not response
length or formatting. A missing contract rule is an authoring defect, not a request fact
for the worker to invent or the controller to supply as an expected answer.
A different valid candidate may expose bad expected evidence: inspect contracts
before deciding whether the task, summary or contract needs correction. Do not alter
other contracts just to force a target win. A missing request fact may legitimately
require an answer; supply it in a new run instead of marking a conditional choice as
verified. Report each case's deciding clauses and result. After corrections, rerun affected
cases in a fresh context against the final public inputs; mention unresolved failures.

## Consumption/composition gate

Give a fresh worker the target contract and linked public dependencies, the supported
binding and the three tasks. Implementation, prior tests, previews and expected
answers remain hidden from the worker. A component-only case needs no unrelated
pattern contracts. A composition case needs all public dependencies it consumes.

```text
Use only these contracts: <paths>. Binding/context: <context>.
A: <must-fit request>. B: <must-not-fit request>. C: <valid edge request>.
Decide use for A/B and expressibility for C. For A and C write the actual invocation
or composition to <scratch artifact paths>. For a supplied invalid composition,
identify any required rule it violates. Explain any fact the contracts leave
undecidable. Do not inspect implementation or tests.
Return clear decisions, artifact paths, violations and unresolved facts.
```

The controller checks valid APIs, mandatory relationships and whether A fits, B is
excluded and C is expressible against the prepared evidence. Judge meaning rather
than response formatting or a printed candidate list. A stated false restriction
is a failure even when the chosen id is correct. Run generated artifacts with the
project's real bindings and focused checks in an isolated copy. For patterns/layouts verify that
the target composition exists, valid compositions pass and the deliberate violation
is rejected for the intended reason. Follow the project's established engineering
verification procedure; the framework defines these expected contract outcomes, not
how to author tests. Passing checks over unrelated existing UI are insufficient. A schema validator or a
worker saying "valid" does not replace runnable composition evidence when code exists.
Visual/interactive promises need the browser evidence described by
[verification](verify.md); document-only work can have executable checks not applicable,
with that limit named.

Pass requires correct decisions, valid artifacts, no unresolved fact needed for those
tasks, and passing applicable executable checks. Classify failures as contract,
implementation, test expectation or decision; route contract changes to craft
and component fixes to the project process, then rerun affected gates on final artifacts.
An unavailable check is not run, not pass. Report each applicable check and its result in the response.
