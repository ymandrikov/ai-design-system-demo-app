This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Formatting

Run `pnpm fmt` to format files or `pnpm fmt:check` to check formatting without changes.
[Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) uses a 120-character print width from `.oxfmtrc.json`.
Print width is a wrapping target; long strings and other unbreakable content can exceed it.

## Linting

Run `pnpm lint` for Oxlint and
[@evilmartians/design-lint](https://github.com/evilmartians/design-lint).
The command explicitly loads `oxlint.config.mjs`, preserving the existing code rules
and adding design-token checks. Requires Node 22.18+ or 23.6+.

Tokens resolve through `app/globals.css`, including its imported token files.
Component checks cover `@/components/ui/*`, `@/components/layouts/*` and
`@/components/deployments/*`. Standard design-lint rules are used without custom
overrides. Text, border and hover colours use role-specific semantic tokens.
CSS declarations are not linted by this plugin.

Button, Badge and shared tab styles resolve their theme-dependent state colours
through semantic tokens; local `dark:` branches are forbidden by the linter.

## Local database

Deploy Board uses a local SQLite database at `data/deploy-board.sqlite`. Set
`DB_FILE_NAME` to use another file; the application and database commands use
the same value.

```bash
mkdir -p data
pnpm db:generate # create and save a migration after changing lib/db/schema.ts
pnpm db:migrate  # apply saved migrations
pnpm db:seed     # add demo services, environment versions and completed history (safe to re-run)
pnpm db:studio   # open Drizzle Studio
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Services screen

Open `/?environment=production` or `/?environment=staging`. Missing, invalid or
repeated environment parameters fall back to production. Data is queried from SQLite
on each request. Dates are shown in UTC.

The seed demonstrates API remaining healthy on v1.0.0 after a failed production
deployment, newer staging versions, successful history and an undeployed staging
worker with no history. Re-running the seed preserves existing state and history.
Deployments now include active progress and completed outcomes.

Service names link to `/services/[slug]?environment=production` (or `staging`).
The details screen keeps the selected environment when switching, reloading and
returning to the list. It separates service health and current version from the
latest deployment result, and lists deployment history newest first, with UTC completion times.
`worker` in staging demonstrates empty history; unknown slugs show a not-found page.

Run `pnpm db:migrate` after updating: the additive migration introduces an optional
version commit without changing existing records. `pnpm db:seed` fills missing
commits for predefined demo versions with illustrative hashes, preserves recorded
commits, and leaves existing environment state and deployment history intact.
Other versions without commit metadata display “Not recorded”.

Checks: `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`. If Turbopack cannot bind
its internal ports in a restricted environment, `pnpm build --webpack` and
`pnpm dev --webpack` use the supported alternative bundler.

## Adding services

On the Services screen, **Add service** opens a dialog with a required name
(1–64 Latin letters, digits or hyphens). The URL uses the lowercase name;
names are unique without regard to case. Creation saves the service, both
environments and the three demo versions together. Both environments start as
**Not deployed**, with no current version or history.

After creation, the service page opens in the selected environment. Cancel,
Escape and clicking outside close and reset the form. Saving prevents dismissal
and repeat submission; errors preserve the name.

Manual check: open the dialog in staging, cancel and reopen; create a service,
reload its page, and check both environments. Try the same name with different
casing and verify the inline error. Deploy 1.1.0, then 1.2.0: the failure must
preserve 1.1.0. Check keyboard focus and dismissal in light/dark themes and on a
narrow viewport.

## Starting deployments

On a service page, choose an environment and click **Deploy**. The form and Cancel
preserve `?environment=production|staging`. Run `pnpm db:migrate` and `pnpm db:seed`
after updating to add the simulation fields and predefined version descriptions.
Versions 1.0.0 and 1.1.0 succeed; 1.2.0 deterministically fails its health check.
Each stage (Queued, Build, Deploy, Health check) lasts five seconds. The history
refreshes once per second while active, including after a reload, and stops at completion.

`lib/deployments` provides `startDeployment`, `retryDeployment`,
`rollbackDeployment`, `getDeploymentDetails` and `getDeploymentForm`. Details include
server-calculated progress, stages, timestamped logs and available actions.
Retry creates a new record for a failed deployment. Rollback is available only for
the current latest successful deployment, with no active run, and targets the most
recent successful **different** version. Both preserve history and record their source.
After starting, retrying or rolling back, the UI opens `/deployments/[id]`.
History entries link to the same screen. It shows stages, duration and logs, refreshes
once per second while active, and retains the environment in the return-to-service
link. Rollback requires inline confirmation of the environment and both versions.
Loading, missing records, data errors and action errors have explicit feedback.

Reads and starts settle overdue work inside an immediate SQLite transaction.
Successful completion and the environment version update commit together; failure
keeps the working version. A partial unique index also prevents concurrent active
runs for the same service/environment. Scenarios are copied into each deployment.
Legacy completed records retain IDs, outcomes and completion times; the migration
assigns their demo start time to 20 seconds before completion.

Manual checks: deploy 1.1.0, reload while active, wait for success; deploy 1.2.0
and verify Failed with the previous current version and Healthy state unchanged.
Open two forms for the same pair before submitting: the second submission must
report the active deployment. Once finished, confirm history stops refreshing.
