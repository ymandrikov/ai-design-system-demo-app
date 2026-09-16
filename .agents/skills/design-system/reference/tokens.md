# Author design rules and tokens

Use DESIGN.md to find authoritative rules, token definitions, themes and consumers.
Keep the existing storage format and sources. New framework documents belong in
`design-system/`; an adequate existing catalogue needs no duplicate index.

## Change the design decision

For a rule, state its scope, required/recommended force and documented exceptions.
For a token, state its identity, type, value, intended role and usage constraints.
Inspect references and theme overrides before changing a shared value or alias.
Preserve role distinctions even when values match; introduce base tokens or aliases
only when the actual system needs them. Private component details stay outside the
shared token catalogue and follow the project's implementation conventions.

Update the authoritative definition and directly affected references. New normative
choices and breaking changes follow the [craft decision process](craft.md#apply-authorised-decisions). Complete when
consumers can find and interpret the changed rule or token without conflicting copies.

## Audit the affected uses

Check types, values, alias targets and cycles, affected theme values and role constraints
using the project's existing tools or direct inspection of the changed definitions.
Resolve aliases through their sources without treating every alias as a semantic role.
Exercise suitable, unsuitable and edge uses against the rule/token meaning. Check
consumer-controlled decisions and public overrides against their UI contracts.

For a changed visual value, inspect affected consumers and use
[UI verification](verify.md) for the relevant appearance,
contrast within its [scope](verify.md#contrast-scope), layout and themes.
Token selection can be correct while rendered contrast
fails. Record missing evidence instead of claiming a visual pass. An organisational
change with unchanged resolved values needs reference/meaning checks, not invented
runtime work. Return evidence, compatibility and any remaining decisions to craft.
