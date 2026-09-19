export const stateLabels = { healthy: "Healthy", unavailable: "Unavailable", not_deployed: "Not deployed" };
export const resultLabels = { failed: "Failed", succeeded: "Succeeded" };
export const environmentLabels = { production: "Production", staging: "Staging" };
export const deploymentKindLabels = { deploy: "Deploy", retry: "Retry", rollback: "Rollback" };
export const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});
