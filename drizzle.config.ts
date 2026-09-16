import { defineConfig } from "drizzle-kit";

import { databasePath } from "./lib/db/path";

export default defineConfig({
  dialect: "sqlite",
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dbCredentials: { url: databasePath },
});
