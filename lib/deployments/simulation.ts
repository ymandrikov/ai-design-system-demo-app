import type { deployments } from "../db/schema";

type Deployment = typeof deployments.$inferSelect;
export const durationMs = 20_000;
const names = ["Queued", "Build", "Deploy", "Health check"] as const;

export function getProgress(deployment: Deployment, now: Date) {
  const elapsed = Math.max(0, (deployment.completedAt ?? now).getTime() - deployment.startedAt.getTime());
  const steps = names.map((name, index) => {
    const startedAt = new Date(deployment.startedAt.getTime() + index * 5_000);
    const completedAt = new Date(startedAt.getTime() + 5_000);
    const finished = elapsed >= (index + 1) * 5_000;
    const status = finished
      ? index === 3 && deployment.scenario === "health_check_failure"
        ? "failed"
        : "succeeded"
      : elapsed >= index * 5_000
        ? "active"
        : "pending";
    return {
      name,
      status,
      startedAt: status === "pending" ? null : startedAt,
      completedAt: finished ? completedAt : null,
    };
  });
  const logs = steps.flatMap((step) => [
    ...(step.startedAt ? [{ at: step.startedAt, level: "info", message: `${step.name} started.` }] : []),
    ...(step.completedAt
      ? [
          {
            at: step.completedAt,
            level: step.status === "failed" ? "error" : "info",
            message:
              step.status === "failed"
                ? "Health check failed: simulated unhealthy response. Previous working version preserved."
                : `${step.name} completed.`,
          },
        ]
      : []),
  ]);
  return {
    elapsedSeconds: Math.floor(elapsed / 1000),
    percent: Math.min(100, Math.floor((elapsed / durationMs) * 100)),
    stage: steps.find((step) => step.status === "active")?.name ?? "Health check",
    steps,
    logs,
  };
}
