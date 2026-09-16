import { db } from "./index";
import { services } from "./schema";

async function main() {
  await db
    .insert(services)
    .values([
      { slug: "api", name: "API" },
      { slug: "web", name: "Web" },
      { slug: "worker", name: "Worker" },
    ])
    .onConflictDoNothing({ target: services.slug });

  console.log("Seeded services.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
