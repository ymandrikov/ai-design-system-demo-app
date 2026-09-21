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
      {pending && <p className="text-s text-muted-foreground">{pendingLabel}</p>}
      {error && (
        <p role="alert" className="text-s text-destructive-foreground">
          {error}
        </p>
      )}
    </div>
  );
}
