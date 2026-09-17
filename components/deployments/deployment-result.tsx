import { resultLabels } from "@/lib/deployments/presentation";

export function DeploymentResult({ result }: { result: keyof typeof resultLabels }) {
  return <span className={result === "failed" ? "font-medium text-destructive" : "font-medium"}>{resultLabels[result]}</span>;
}
