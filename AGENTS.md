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

## Preliminary architecture

Deploy Board is a local demo application for demonstrating how a design system
evolves with AI skills. It does not perform real deployments.

### Stack and structure

- Next.js App Router and TypeScript.
- SQLite and Drizzle for data storage.
- shadcn as an editable UI foundation, with Tailwind for styling.
- Semantic tokens define consistent visual decisions.

Main directories:

- `app/` — routes, server-side data loading, and Server Actions.
- `components/ui/` — shared components based on shadcn.
- `components/layouts/` — reusable layouts.
- `components/deployments/` — deployment-specific UI.
- `lib/deployments/` — rules for starting, progressing, completing, and rolling back deployments.
- `lib/db/` — Drizzle schema, queries, migrations, and seed data.
- `design-system/` — contracts, rules, and token descriptions.
- `DESIGN.md` — the design-system entry point.

Create directories and abstractions as the need arises.

### Responsibility boundaries

UI receives data through props and does not access the database directly.
Deployment rules are independent of React and Next.js.
Server Actions validate inputs and call server logic.

Modify shadcn components directly. Add wrappers only when they have a distinct
responsibility.
Pages own composition; shared components own their styling.
A specific screen does not automatically become a reusable pattern.

The design system serves only this application.
A separate package and monorepo are not required.

### Page readability

Pages describe UI composition and consume ready-to-use domain values.
Move an operation into the appropriate module when understanding its result requires
the reader to do any of the following:

- Trace a chain of loading, searching and matching related entities.
- Decode a formula, unit conversion or handling of boundary values.
- Reconstruct a business rule from conditions, priorities and fallback values.

Name the function or returned field for its result, such as `rollbackVersion` or
`elapsedSeconds`. Reuse existing logic first; extraction is justified by the criteria
above, not by the number of lines.
Keep simple presence checks, display-label choices and direct field access next to
JSX when they contain none of that logic.

### Model and simulation

The core entities are service, service version, service environment, and deployment.
The current version and history are independent for each service–environment pair.
Only one active deployment is allowed per pair; server logic and the database
enforce this constraint.

Versions are predefined with a commit, description, and simulation scenario.
Progress is calculated from server time without a background worker.
The client polls the server once per second while a deployment is active.
The server persists any completion that has become due when handling a request,
including before starting a new deployment.

A successful deployment updates the environment's current version.
A failed deployment preserves the previous working version.
Service state and deployment outcome are distinct concepts.
A rollback creates a new deployment of the previous successful version and
preserves history.

### Development and checks

The application and design system evolve sequentially through tasks from the owner.
Do not implement future stages ahead of time.

Do not add automated tests yet.
Use type checking, builds, linting, and manual scenario verification.
The owner will set up design-lint separately.

These decisions are preliminary: refine them as new requirements emerge.
