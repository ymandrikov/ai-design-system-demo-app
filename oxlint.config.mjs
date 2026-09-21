import { defineConfig } from "oxlint";
import { designLint } from "@evilmartians/design-lint/preset";

const design = await designLint({
  tokenFiles: ["app/globals.css"],
  componentSources: ["@/components/ui/*", "@/components/layouts/*", "@/components/deployments/*"],
});

export default defineConfig({
  ...design,
  rules: {
    ...design.rules,
    curly: ["error", "all"],
  },
  plugins: ["nextjs", "react", "import", "jsx-a11y", "typescript", "unicorn", "oxc"],
  categories: {
    correctness: "error",
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
  },
  ignorePatterns: [".agents/**", ".claude/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
});
