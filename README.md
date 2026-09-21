# Deploy Board

Deploy Board is a local deployment simulator for exploring how to organise a design
system for AI agents. You can follow component selection rules, shared implementations
and recorded exceptions in a working app. It accompanies _Design system guardrails
for AI-built interfaces_.

- **Contracts.** Components, layouts and patterns document when to use them and which
  decisions they own.
- **Agent workflow.** The design-system skill separates selecting existing components
  with `use` from maintaining the shared system with `craft`.
- **Lint checks.** [Evil Martians' design-lint](https://github.com/evilmartians/design-lint)
  checks semantic token use and component styling rules through `pnpm lint`.
- **Exceptions.** Local overrides carry a reason and a journal entry. Two deliberate
  rule violations show how unresolved gaps are recorded.

For example, a section in the deployment summary requests smaller supporting text
through an explicit exception:

```tsx
<BorderedCard.Section
  designSystemException={{
    reason: "Keep deployment metadata and explanations at 14px without a typography-only wrapper.",
    className: "text-sm",
  }}
>
  {/* Deployment metadata renders at 14px; the section keeps its padding and gap. */}
</BorderedCard.Section>
```

See the [consumer](app/deployments/[id]/page.tsx) and its
[journal entry](design-system/gaps.md#e-01-deployment-supporting-typography).

> This repository demonstrates an approach to organising design systems for AI agents.
> It is not a guide to developing Next.js applications. Development was deliberately
> carried out exclusively through AI agents. The app does not perform real deployments.

## Contents

- [Run locally](#run-locally)
- [Try the demo](#try-the-demo)
- [Read the design system](#read-the-design-system)
- [Code map](#code-map)
- [Development](#development)
- [License](#license)

## Run locally

Install Node.js 24+, then choose pnpm or npm.

### With pnpm

Use pnpm 12.4.2:

```sh
git clone https://github.com/ymandrikov/ai-design-system-demo-app.git
cd ai-design-system-demo-app
pnpm approve-builds esbuild --yes
pnpm install --frozen-lockfile
mkdir -p data
pnpm db:migrate
pnpm db:seed
pnpm dev
```

The approval command allows esbuild's install script in `pnpm-workspace.yaml`.

### With npm

Use the npm version bundled with Node.js:

```sh
git clone https://github.com/ymandrikov/ai-design-system-demo-app.git
cd ai-design-system-demo-app
npm install
mkdir -p data
npm run db:migrate
npm run db:seed
npm run dev
```

The repository tracks `pnpm-lock.yaml`. npm resolves dependencies from `package.json`
and creates its own `package-lock.json`, so installed versions may differ.

### Open the app

Open [localhost:3000](http://localhost:3000). The seed creates `api`, `web` and
`worker` services with separate production and staging histories. Re-running it
preserves existing environment state and history and restores missing demo services.

The SQLite database lives at `data/deploy-board.sqlite`. To use another file, set
`DB_FILE_NAME` for both the database commands and the app. Its parent directory must exist.
No external database or deployment credentials are needed.

## Try the demo

Open this repository in your coding agent. Ask it about the code, request a change,
or explore improvements together. Try any of these prompts in any order, or bring
your own task. The repository's instructions should guide the agent without you
having to repeat the design-system rules in each request.

### Understand a decision

```text
Why do adding and deleting a service use different dialogs?
```

Look for an explanation based on the components' purposes and contracts, with links
to the code that uses them.

### Change a screen

```text
Add a description to the Services page explaining that production and staging
have separate versions and deployment histories.
```

Check whether the agent uses an existing component's API for this small change.

### Change the design system

```text
Make secondary text more readable by increasing its contrast in both light and
dark themes. First show me which parts of the app this would affect.
```

Look for a change to the shared colour rules, followed by checks of the affected
components and screens in both themes.

### Find a useful refactoring

```text
Explore the interface and suggest one useful refactoring. Explain the problem
and what the change would improve. Don't change anything yet.
```

Check whether the proposal addresses a concrete problem. Discuss the tradeoffs,
then ask the agent to implement it if you agree. Notice whether it distinguishes
screen changes from changes to shared components and records any system gaps it finds.

## Read the design system

Start with [DESIGN.md](DESIGN.md) for shared rules and the
[design-system skill](.agents/skills/design-system/SKILL.md) for the agent workflow.
Browse the [components](design-system/COMPONENTS.md), [layouts](design-system/LAYOUTS.md),
[patterns](design-system/PATTERNS.md) and [tokens](design-system/tokens/README.md).

### Selecting a component

The [ConfirmationDialog contract](design-system/components/confirmation-dialog.md)
distinguishes confirmation from form entry. Compare
[DeleteServiceDialog](app/delete-service-dialog.tsx), which uses ConfirmationDialog,
with [AddServiceDialog](app/add-service-dialog.tsx), which composes Dialog around a form.

### Keeping rules in components

[ConfirmationDialog](components/ui/confirmation-dialog.tsx) owns button order,
destructive styling, initial focus and pending feedback. Its consumers supply the
action and its consequences. Compare the service deletion dialog with the
[deployment actions](app/deployments/[id]/deployment-actions.tsx).

### Recording exceptions and gaps

[BorderedCard.Section](components/ui/bordered-card.tsx) uses the
[exception helper](lib/with-design-system-exception.tsx) to accept styling overrides
with a required reason. The opening example is recorded as
[E-01](design-system/gaps.md#e-01-deployment-supporting-typography).
Only components that adopt the helper expose `designSystemException`.

[G-01 and G-02](design-system/gaps.md) remain open on purpose. They cover a raw colour
in the deployment summary and a Badge background override in
[VersionLabel](components/deployments/version-label.tsx). Their lint suppressions and
journal entries document unresolved decisions, not approved patterns to copy.

The article includes illustrative snippets. Use the repository's contracts and
consumers for its actual component APIs. The article's pre-commit and CI checks are
not configured here; run the checks below yourself.

## Code map

The app uses Next.js App Router, TypeScript, SQLite, Drizzle, shadcn and Tailwind.
Pages load data and compose the UI. Components receive data through props; deployment
rules live outside React and Next.js.

| Area                                  | Start reading                                                              |
| ------------------------------------- | -------------------------------------------------------------------------- |
| Services and environment selection    | [app/page.tsx](app/page.tsx)                                               |
| Service summary and history           | [app/services/[slug]/page.tsx](app/services/[slug]/page.tsx)               |
| Version selection                     | [app/services/[slug]/deploy/page.tsx](app/services/[slug]/deploy/page.tsx) |
| Progress, logs and deployment actions | [app/deployments/[id]/page.tsx](app/deployments/[id]/page.tsx)             |
| Deployment rules                      | [lib/deployments/index.ts](lib/deployments/index.ts)                       |
| Service queries                       | [lib/db/queries.ts](lib/db/queries.ts)                                     |

[simulation.ts](lib/deployments/simulation.ts) calculates progress from server time.
There is no background worker. Reads and deployment actions use `withDeploymentState`
to save overdue completions in a transaction before proceeding, so a read can write
to the database. A successful completion updates the environment's current version;
a failure preserves it. A database constraint prevents concurrent active deployments
for the same service and environment.

## Development

Run these checks from the repository root:

```sh
pnpm fmt:check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

`pnpm fmt` formats files with Oxfmt. `pnpm lint` runs Oxlint and
[@evilmartians/design-lint](https://github.com/evilmartians/design-lint) using
[oxlint.config.mjs](oxlint.config.mjs). Design-lint checks semantic token use and
component styling rules. It does not lint CSS declarations. `pnpm build` does not
run linting or the [contract checker](.agents/skills/design-system/scripts/check-contract.mjs).
See [design verification](DESIGN.md#verification) for contract and index checks.

If Turbopack cannot bind its internal ports in a restricted environment, use
`pnpm dev --webpack` or `pnpm build --webpack`.

After changing [the database schema](lib/db/schema.ts), run `pnpm db:generate` to
create a migration, then `pnpm db:migrate` to apply it. After pulling changes, apply
saved migrations and run `pnpm db:seed` to update demo versions. Use `pnpm db:studio`
to inspect the database.

### Manual checks

There are no automated tests yet. After making changes, check the relevant flows:

- Switch environments and confirm their versions and histories stay separate.
  The seeded `worker` in staging starts undeployed.
- Deploy `1.1.0`, reload during the run, and wait for success. Each of the four
  stages takes five seconds. Active pages refresh once per second and stop at completion.
- Deploy `1.2.0` and confirm its failed health check preserves the working version.
  Retry the failure, or roll back a successful deployment to the most recent
  successful different version. Both actions should create new history entries.
- Try deploying from two tabs. Only one run per service and environment may be active.
- Add and delete a service. Check validation, confirmation and cancellation.
  Deletion removes both environments and all history, including active runs.

Check keyboard focus, both system colour schemes and narrow layouts. More scenarios
are in [DESIGN.md](DESIGN.md#verification).

## License

[MIT](LICENSE).
