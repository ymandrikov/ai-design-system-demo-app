"use client";

import { RequestFeedback } from "@/components/ui/request-feedback";
import { useRef, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
    <AlertDialogAction type="button" variant={intent} disabled={pending} onClick={onConfirm}>
      {confirmLabel}
    </AlertDialogAction>
  );
  const cancel = (
    <AlertDialogCancel ref={cancelRef} type="button" disabled={pending}>
      Cancel
    </AlertDialogCancel>
  );

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen, event) => {
        if (pending) {
          event.cancel();
        } else {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogTrigger
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
      </AlertDialogTrigger>
      <AlertDialogContent
        initialFocus={cancelRef}
        finalFocus={
          fallbackFocus ? () => (triggerRef.current?.isConnected ? triggerRef.current : fallbackFocus()) : undefined
        }
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <RequestFeedback pending={pending} pendingLabel={pendingLabel} error={error} />
        <AlertDialogFooter>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
