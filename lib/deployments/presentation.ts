export const stateLabels = { healthy: "Healthy", unavailable: "Unavailable", not_deployed: "Not deployed" };
export const resultLabels = { failed: "Failed", succeeded: "Succeeded" };
export const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC",
});
