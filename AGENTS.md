<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commit messages

All commit messages must follow Conventional Commits: `<type>[optional scope][!]: <description>` (for example, `docs: require conventional commits`). Use `feat` for features, `fix` for bug fixes, and an appropriate type such as `docs`, `refactor`, `test`, or `chore` for other changes. Mark breaking changes with `!` before the colon or a `BREAKING CHANGE:` footer.

## Design-system work

For UI work, read [DESIGN.md](DESIGN.md) and use the installed
[design-system skill](.agents/skills/design-system/SKILL.md).
Route product selection and composition through `use`; route authorised reusable
design, token and contract work through `craft`. When both are needed and authorised,
follow craft → checks → use → checks, then return the results and evidence to the
calling project task for its overall completion. Component internals, business logic,
engineering methods and task approvals remain project-owned.
