# Author a consumer contract

Called by [craft](craft.md) or a migration procedure; return authoring results to
that caller. Read [fixed formats](formats.md), DESIGN.md
and the index's Contract link. Store component/layout/pattern
contracts in their standard group directories. Before any audit, read the caller's
[admission and verification policy](admission.md) and reuse its saved choice.
Maintain id, status and root-relative
source/evidence paths in frontmatter; connect source files to the supported public
bindings in Public API or the pattern's Structure.
Use actual paths instead of deriving them from an id. A document-only pattern needs
no new code.
The framework owns contract correctness and the audits below. Follow the project's
established procedures for engineering evidence; describing or detecting a logic
mismatch does not authorise repairing component internals or business logic.

## Write the promise

Establish [purpose and intent](formats.md#purpose-and-intent) before drafting the
selection and public-use rules. For creation or a public change, describe intended
valid use from the request and authoritative sources. Report new unresolved normative choices to the user.
An intended promise is not evidence that its implementation already exists.

For adoption, inspect code, styles, tests and actual consumers as evidence of public
use and observable outcomes. Separate entity responsibilities from consumer choices.
Before drafting selection prose, identify the user tasks represented by those consumers
and the nearest plausible alternatives, including native content and parent-owned
compositions. For each distinction, establish the deciding fact and its source or
unresolved decision. Use this reasoning to write the promise, then audit it with
[independent product situations](blind-gates.md#scenario-quality), not rewritten criteria.
An emitted change event demonstrates notification, not a required save policy.
Trace each promise and restriction to evidence or an explicit decision;
report source contradictions and desired improvements separately. Incidental internal
acceptance need not become public API.
Capture the resulting selection reasoning in the contract. A consumer cannot rely
on the author's knowledge of the implementation or infer a restriction from the
absence of other call sites.
Apply [coherent public promises](formats.md#visual-sources-and-unresolved-decisions)
when integrating old guides: reconcile their meaning, preserve concrete limitations
and leave migration history in the journal.

Clarification preserves valid calls, composition and observable promises. Reclassify
as a contract change if meaning changes. Complete when the required sections describe
the intended public boundary and any unresolved decisions are explicit.

## Ordinary audit

Check every selection item against the [shared selection rules](formats.md#shared-selection-sections):
list form, one criterion per item and a single interpretation. Compare the combined
When-to-use logic with every disqualifier, including boundary values, and look for a
request that both allows and forbids use. Any such case is a contract contradiction;
resolve it from authoritative evidence or report the unresolved decision.

For every affected public parameter, use the [Public API rules](formats.md#component)
to determine a value from a concrete request. Follow linked rules and check defaults,
interacting inputs and permitted free choice. If only accepted values or examples
explain the choice, report the missing basis through craft's gap process.

Compare public calls, defaults, states, events, form values and accessibility with
evidence for each supported binding. Check promised parity and documented differences,
not identical internal DOM. Include layout spacing, region order/grouping and all
consumer obligations from linked contracts. Report unsupported promises as defects;
use the project's implementation conventions for internal mechanics.

Check a new suitable context beyond the documented examples, the nearest plausible
unsuitable use (when the contract has a disqualifier) and a valid edge case. For each,
translate request facts into the entity's purpose and connect them to the deciding
contract clauses and the resulting selection, configuration or composition. Check
that the translation follows from the contract's meaning and responsibilities;
mechanics or a product example alone are insufficient. An obvious mismatch alone does not test a disputed
boundary. The [explanations](formats.md#detail-for-agent-decisions) are sufficient when
these decisions follow without implementation knowledge, invented restrictions or
treating examples as the only valid uses; report any missing basis through craft's gap process.
Check both the scenarios' [quality](blind-gates.md#scenario-quality) and the contract's
reasoning. For each close alternative, locate the deciding condition and explanation
in the selection sections or a precise linked rule. An API type, a self-describing
component name or a successful answer to a restated criterion is insufficient evidence.
For patterns/layouts also check a deliberate violation of a
required composition rule.

Read [admission policy](admission.md#select-the-applicable-policy) before deciding
which independent checks apply. Run the [independent discovery gate](blind-gates.md)
for ordinary per-batch authoring when required. For whole-set migration, return the
ordinary audit and structural results to the migration caller, which owns the final
[whole-set check](blind-gates.md#whole-set-migration-discovery). This changes timing,
not the ordinary audit above. Independent consumption remains conditional on the
policy, task and project requirements.

Use existing tests, examples and focused public-use checks as evidence where they
prove the current promises; inspect their actual results. Missing runtime evidence
remains unverified. Browser-dependent promises need rendered/interactive evidence via
[UI verification](verify.md). Unchanged evidenced promises
need no new test or browser run merely because their wording was clarified.

Regenerate [indexes](../assets/inventory.md) from the current contracts and align
directly affected incoming contract references. Run the generator with `--check`
to verify index freshness and id uniqueness across every status.
When `sourcesHash` is missing or stale, complete the source-to-contract
review above, resolve or record its findings and limitations, then run the command
below with `--update-sources-hash` for that reviewed contract. The reviewing agent
normally records this snapshot; a hash-only update is valid when the promises remain
unchanged. Refresh it only after review, never merely to clear a failing check.

Run validation with the entity's group and all three indexes:

```sh
node <design-system-directory>/scripts/check-contract.mjs --kind <component|layout|pattern> \
  --inventory <components-index> --inventory <layouts-index> \
  --inventory <design-system/PATTERNS.md> <contract-path>
```

For `--kind pattern`, pass the individual `design-system/patterns/<name>.md` contract.
The checker validates its sections, metadata, index membership, cross-group identity
and source snapshot.
Source paths resolve from the nearest ancestor DESIGN.md.

Record the command, result and output or evidence path. The checker validates
structure/links/indexes and source freshness, not semantic correctness. Fix structural errors and report
semantic contradictions, failing or unavailable checks to the caller. Complete the
audit when each affected public promise has evidence or an explicit limitation and
the applicable [policy conditions](admission.md#select-the-applicable-policy) are met.
For a deferred whole-set gate, return authoring results without claiming that gate passed.
The caller owns admission and coordinates the applicable independent gates under
the selected policy.
