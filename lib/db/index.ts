import { DatabaseSync } from "node:sqlite";
import { drizzle } from "drizzle-orm/node-sqlite";

import { databasePath } from "./path";

const sqlite = new DatabaseSync(databasePath);

sqlite.exec("PRAGMA foreign_keys = ON");

export const db = drizzle({ client: sqlite });
