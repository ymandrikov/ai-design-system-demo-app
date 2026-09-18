import { Badge } from "@/components/ui/badge";

export function VersionLabel({ version }: { version: string }) {
  return (
    <Badge variant="secondary" render={<code />}>
      v{version}
    </Badge>
  );
}
