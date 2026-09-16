# Generated UI indexes

Generate COMPONENTS.md, LAYOUTS.md and PATTERNS.md from Markdown contracts in
`design-system/components/`, `layouts/` and `patterns/`, including subdirectories:

```sh
node <design-system-directory>/scripts/generate-indexes.mjs <project-root>
node <design-system-directory>/scripts/generate-indexes.mjs --check <project-root>
```

The project root contains DESIGN.md. Run generation after creating, moving, removing
or changing contracts, including status changes. The command owns all three files;
edit the contracts, not generated entries. `--check` reports stale or missing indexes
and exits nonzero without writing. Discovery only reads; it does not regenerate.

Only `discoverable` contracts appear. Each entry uses the H1 name, full frontmatter
`description` and a relative Contract link, sorted by id. Description links are
rebased from the contract to the index. Empty groups produce empty indexes.
Malformed metadata, missing names or duplicate ids across any statuses stop generation
before any index is written. Generation reads contract documents, not implementation
or test files, and does not certify structural or runtime correctness.

```markdown
- **<H1 name>**
  - Description: <Full description from frontmatter.>
  - Contract: [contract](components/<filename>.md)
```

Managed membership follows the presence of a contract in its standard group directory.
Hidden and deprecated contracts remain managed but absent from discovery indexes.
Special-purpose test indexes may remain hand-authored fixtures.
