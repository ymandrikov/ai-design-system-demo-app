import { Badge } from "@/components/ui/badge";

export function VersionLabel({ version }: { version: string }) {
  return (
    <Badge
      className={"bg-container-muted"} // oxlint-disable-line design/no-component-color-override -- design-system/gaps.md#g-02-versionlabel-overrides-badge-background
      variant="secondary"
      render={<code />}
    >
      v{version}
    </Badge>
  );
}
