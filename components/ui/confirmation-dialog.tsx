"use client";

import { useRef, type ReactNode } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@/components/ui/button";

export function ConfirmationDialog({
  open,
  onOpenChange,
  intent,
  triggerLabel,
  title,
  description,
  children,
  confirmLabel,
  onConfirm,
  pending = false,
  pendingLabel = "Working…",
  error,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intent: "destructive" | "default";
  triggerLabel: string;
  title: string;
  description: string;
  children?: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  pending?: boolean;
  pendingLabel?: string;
  error?: string;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirm = (
    <Button type="button" variant={intent} disabled={pending} onClick={onConfirm}>
      {confirmLabel}
    </Button>
  );
  const cancel = (
    <AlertDialog.Close render={<Button ref={cancelRef} type="button" variant="outline" disabled={pending} />}>
      Cancel
    </AlertDialog.Close>
  );

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(nextOpen, event) => {
        if (pending) {
          event.cancel();
        } else {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialog.Trigger render={<Button type="button" variant={intent} disabled={pending} />}>
        {triggerLabel}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 bg-foreground/(--alpha-medium)" />
        <AlertDialog.Viewport className="fixed inset-0 flex items-center justify-center overflow-y-auto p-xl">
          <AlertDialog.Popup
            initialFocus={cancelRef}
            className="flex max-h-full w-full max-w-dialog-width flex-col gap-2xl overflow-y-auto rounded-m border bg-popover p-2xl text-popover-foreground shadow-l"
          >
            <div className="flex flex-col gap-m">
              <AlertDialog.Title className="text-l font-semibold">{title}</AlertDialog.Title>
              <AlertDialog.Description className="text-s text-muted-foreground">{description}</AlertDialog.Description>
            </div>
            {children}
            <div aria-live="polite" className={pending || error ? undefined : "sr-only"}>
              {pending && <p className="text-s text-muted-foreground">{pendingLabel}</p>}
              {error && (
                <p role="alert" className="text-s text-destructive-foreground">
                  {error}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-l sm:flex-row sm:justify-end">
              {intent === "destructive" ? (
                <>
                  {confirm}
                  {cancel}
                </>
              ) : (
                <>
                  {cancel}
                  {confirm}
                </>
              )}
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
