This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
Only completed deployments are modelled at this stage; deployment simulation is not implemented.

Service names link to `/services/[slug]?environment=production` (or `staging`).
The details screen keeps the selected environment when switching, reloading and
returning to the list. It separates service health and current version from the
latest deployment result, and lists completed history newest first, with UTC times.
`worker` in staging demonstrates empty history; unknown slugs show a not-found page.

Run `pnpm db:migrate` after updating: the additive migration introduces an optional
version commit without changing existing records. `pnpm db:seed` fills missing
commits for predefined demo versions with illustrative hashes, preserves recorded
commits, and leaves existing environment state and deployment history intact.
Other versions without commit metadata display “Not recorded”.

Checks: `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`. If Turbopack cannot bind
its internal ports in a restricted environment, `pnpm build --webpack` and
`pnpm dev --webpack` use the supported alternative bundler.
