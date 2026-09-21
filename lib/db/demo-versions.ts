// Illustrative commits for the predefined demo versions, not a real repository.
export const demoVersions = [
  { version: "1.0.0", commit: "a1b2c3d", description: "Initial stable release.", scenario: "success" },
  { version: "1.1.0", commit: "e4f5a6b", description: "Performance improvements.", scenario: "success" },
  {
    version: "1.2.0",
    commit: "b7c8d9e",
    description: "Demo failure: health check will fail; the working version is preserved.",
    scenario: "health_check_failure",
  },
] as const;
