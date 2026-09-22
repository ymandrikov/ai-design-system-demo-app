# Deploy Board

Deploy Board is a local deployment simulator for exploring how a design system guides
AI agents. A working app lets you trace UI decisions from contracts to components and
recorded exceptions. It is the reference app for the
[ai-design-system](https://github.com/ymandrikov/ai-design-system) skill and
accompanies _Design system guardrails for AI-built interfaces_.

- **Contracts.** Components, layouts and patterns define when to use them and which
  decisions they own.
- **Agent workflows.** `use` composes existing capabilities; `craft` maintains the
  shared system under explicit authority.
- **Design checks.** [Evil Martians' design-lint](https://github.com/evilmartians/design-lint)
  checks semantic token use and component styling rules. Two deliberate violations
  demonstrate how unresolved gaps are recorded.
- **Deployment simulation.** Separate production and staging histories, successful
  and failed runs, retries and rollbacks — without deployment credentials.

> This app does not perform real deployments. It was developed exclusively through
> AI agents to demonstrate design-system organisation, not to teach Next.js development.

## Contents

- [Run locally](#run-locally)
- [Try the demo](#try-the-demo)
- [Design-system workflows](#design-system-workflows)
- [Project structure](#project-structure)
- [Development](#development)
- [License](#license)

## Run locally

Use Node.js 24+ and pnpm 12.4.2. If you only have npm, install pnpm first:

```sh
npm install --global pnpm@12.4.2
```

From the project root:

```sh
pnpm approve-builds esbuild --yes
pnpm install --frozen-lockfile
pnpm run setup
pnpm dev
```

Open [localhost:3000](http://localhost:3000). For subsequent starts, run only
`pnpm dev`. See [local setup details](#local-setup-details) for database settings
and troubleshooting.

## Try the demo

Open the repository in your coding agent. Start by tracing an existing decision:

```text
Why do adding and deleting a service use different dialogs?
```

Compare the answer with the [ConfirmationDialog contract](design-system/components/confirmation-dialog.md),
[DeleteServiceDialog](app/delete-service-dialog.tsx) and [AddServiceDialog](app/add-service-dialog.tsx).
Then try a screen change:

```text
Add a description to the Services page explaining that production and staging
have separate versions and deployment histories.
```

Check whether the agent uses existing component APIs and follows the repository's
instructions without being reminded of the design-system rules.

## Design-system workflows

[DESIGN.md](DESIGN.md) defines the app's design rules; the installed
[design-system skill](.agents/skills/design-system/SKILL.md) from
[ai-design-system](https://github.com/ymandrikov/ai-design-system) guides agent work.

| Workflow | Purpose                                                                |
| -------- | ---------------------------------------------------------------------- |
| `use`    | Select and compose existing components, layouts, patterns and tokens.  |
| `craft`  | Make authorised changes to shared design, contracts, tokens and rules. |

A page request alone does not authorise shared component or rule changes. When both
workflows are authorised, follow **craft → checks → use → checks**.

- [Discovery](.agents/skills/design-system/reference/discovery.md): recommend existing capabilities without editing files.
- [Analysis](.agents/skills/design-system/reference/analyze.md): identify extraction, consolidation and reuse opportunities.
- [Verification](.agents/skills/design-system/reference/verify.md): check contracts and the affected interface.
- [Triage](.agents/skills/design-system/reference/triage.md): review recorded gaps and recommend next work.

### Exceptions and system improvements

Record local exceptions and missing capabilities in the [journal](design-system/gaps.md).
An entry documents a decision or gap; it does not grant permission for an exception
or repair. Only components adopting the [exception helper](lib/with-design-system-exception.tsx)
expose `designSystemException`, with a required reason: [E-01](design-system/gaps.md#e-01-deployment-supporting-typography)
shows an authorised use. G-01 and G-02 remain deliberately unresolved, not patterns
to copy. Review recurring needs through triage, then authorise a shared solution
through `craft`; see the [gap procedure](.agents/skills/design-system/reference/gaps.md).

## Project structure

The app uses Next.js App Router, TypeScript, SQLite, Drizzle, shadcn and Tailwind.
Pages load data and compose UI; components receive props; deployment rules live
outside React and Next.js.

```text
app/                     Routes, data loading and Server Actions
components/ui/           Shared UI components
components/layouts/      Reusable layouts
components/deployments/  Deployment-specific UI
lib/deployments/         Simulation, completion, retry and rollback rules
lib/db/                  Schema, queries, migrations and seed data
design-system/           Contracts, tokens, indexes and decision journals
.agents/skills/          Installed agent workflows
```

Start with [DESIGN.md](DESIGN.md) for design rules and [AGENTS.md](AGENTS.md) for
project conventions. Browse the [components](design-system/COMPONENTS.md),
[layouts](design-system/LAYOUTS.md), [patterns](design-system/PATTERNS.md) and
[tokens](design-system/tokens/README.md); contract details live in the
[formats](.agents/skills/design-system/reference/formats.md) and
[shared model](.agents/skills/design-system/reference/model.md).

[Simulation](lib/deployments/simulation.ts) uses server time, with no background
worker. [Request handling](lib/deployments/index.ts) persists overdue completions
before proceeding, so reads can write to the database. Success updates the current
version; failure preserves it. Only one deployment per service–environment pair
may be active, enforced by server logic and a database constraint.

## Development

Run checks from the repository root:

```sh
pnpm fmt:check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

`pnpm fmt` formats files with Oxfmt. `pnpm lint` runs Oxlint and design-lint via
[oxlint.config.mjs](oxlint.config.mjs); it does not lint CSS declarations.
`pnpm build` runs neither linting nor contract checks. The article's pre-commit and
CI checks are not configured here, and its illustrative snippets do not replace
the repository's actual contracts and APIs.

### Contract checks

The checker validates contract structure, links, index membership and source
snapshots. Regenerate indexes after creating, moving, removing or changing contracts,
including their status. Review source changes against the contract before refreshing
`sourcesHash`; a new hash records that review, not a fix. Structural checks do not
prove behavioural or visual correctness. See [project verification](DESIGN.md#verification),
[index commands](.agents/skills/design-system/assets/inventory.md) and the
[contract audit](.agents/skills/design-system/reference/contract.md#ordinary-audit).

### Local setup details

The project uses the committed `pnpm-lock.yaml`. The `approve-builds` command allows
esbuild's install script in `pnpm-workspace.yaml`.

`pnpm run setup` applies database migrations, then seeds `api`, `web` and `worker`;
`worker` starts undeployed in staging. Re-running it preserves environment state
and history, restores missing demo services and updates predefined versions.

SQLite uses `data/deploy-board.sqlite`; no external database is needed. To use another
file, set `DB_FILE_NAME` for both database commands and the app, and create its parent
directory. The default `data/` directory is included in the repository.

If Turbopack cannot bind internal ports in a restricted environment, use
`pnpm dev --webpack` or `pnpm build --webpack`.

### Database changes

After changing the [schema](lib/db/schema.ts), run `pnpm db:generate`, then
`pnpm db:migrate`. After pulling changes, apply saved migrations and run
`pnpm db:seed` to update demo versions. Use `pnpm db:studio` to inspect the database.

### Manual checks

There are no automated tests yet. Check the flows affected by your change:

- **Environments:** versions and histories stay separate when switching.
- **Success:** deploy `1.1.0` and reload during the run. Four stages take five seconds
  each; active pages refresh once per second and stop at completion.
- **Failure and recovery:** `1.2.0` fails its health check and preserves the working
  version. Retry and rollback create new history entries; rollback of the latest
  successful current deployment uses the most recent successful different version.
- **Concurrency:** two tabs cannot start simultaneous runs for the same service and environment.
- **Services:** verify add/delete validation, confirmation and cancellation.
  Deletion removes both environments and all history, including active runs.

Check keyboard focus, both system colour schemes and narrow layouts. See
[DESIGN.md](DESIGN.md#verification) for the remaining UI checks.

## License

[MIT](LICENSE).
