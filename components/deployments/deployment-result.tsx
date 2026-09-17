import { Badge } from "@/components/ui/badge";
import { resultLabels } from "@/lib/deployments/presentation";

export function DeploymentResult({ result }: { result: keyof typeof resultLabels }) {
  return <Badge variant={result === "failed" ? "destructive" : "secondary"}>{resultLabels[result]}</Badge>;
}
