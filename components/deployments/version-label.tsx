export function VersionLabel({ version }: { version: string }) {
  return <code className="rounded-md bg-muted px-2 py-1 text-xs">v{version}</code>;
}
