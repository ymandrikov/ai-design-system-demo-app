import path from "node:path";

export const databasePath = process.env.DB_FILE_NAME ?? path.join(process.cwd(), "data", "deploy-board.sqlite");
