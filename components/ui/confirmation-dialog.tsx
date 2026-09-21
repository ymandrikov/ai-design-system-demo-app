"use client";

import { RequestFeedback } from "@/components/ui/request-feedback";
import { useRef, type ReactNode } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@/components/ui/button";

export function ConfirmationDialog({
  open,
  onOpenChange,
  intent,
  triggerLabel,
  triggerIcon,
  fallbackFocus,
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
  triggerIcon?: ReactNode;
  fallbackFocus?: () => HTMLElement | null;
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
  const triggerRef = useRef<HTMLButtonElement>(null);
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
      <AlertDialog.Trigger
        render={
          <Button
            ref={triggerRef}
            type="button"
            variant={intent}
            size={triggerIcon ? "icon" : "default"}
            aria-label={triggerLabel}
            title={triggerIcon ? triggerLabel : undefined}
            disabled={pending}
          />
        }
      >
        {triggerIcon ? <span aria-hidden="true">{triggerIcon}</span> : triggerLabel}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 bg-backdrop" />
        <AlertDialog.Viewport className="fixed inset-0 flex items-center justify-center overflow-y-auto p-xl">
          <AlertDialog.Popup
            initialFocus={cancelRef}
            finalFocus={
              fallbackFocus ? () => (triggerRef.current?.isConnected ? triggerRef.current : fallbackFocus()) : undefined
            }
            className="flex max-h-full w-full max-w-dialog flex-col gap-2xl overflow-y-auto rounded-md border bg-canvas-overlay p-2xl text-content-overlay shadow-lg"
          >
            <div className="flex flex-col gap-md">
              <AlertDialog.Title className="text-md font-semibold">{title}</AlertDialog.Title>
              <AlertDialog.Description className="text-sm text-content-subtle">{description}</AlertDialog.Description>
            </div>
            {children}
            <RequestFeedback pending={pending} pendingLabel={pendingLabel} error={error} />
            <div className="flex flex-col items-end gap-lg sm:flex-row sm:justify-end">
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
