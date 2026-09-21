export function RequestFeedback({
  pending,
  pendingLabel,
  error,
}: {
  pending: boolean;
  pendingLabel: string;
  error?: string;
}) {
  return (
    <div aria-live="polite" className={pending || error ? undefined : "sr-only"}>
      {pending && <p className="text-sm text-content-subtle">{pendingLabel}</p>}
      {error && (
        <p role="alert" className="text-sm text-content-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
