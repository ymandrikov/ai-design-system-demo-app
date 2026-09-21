"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import type { Environment } from "@/lib/db/schema";
import { addService } from "./add-service-action";

export function AddServiceDialog({ environment }: { environment: Environment }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen, event) => {
        if (pending) {
          event.cancel();
          return;
        }
        setOpen(nextOpen);
        setName("");
        setError("");
      }}
    >
      <Dialog.Trigger id="add-service-trigger" render={<Button type="button" />}>
        Add service
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-foreground/(--alpha-medium)" />
        <Dialog.Viewport className="fixed inset-0 flex items-center justify-center overflow-y-auto p-xl">
          <Dialog.Popup
            initialFocus={inputRef}
            className="flex max-h-full w-full max-w-dialog-width flex-col gap-2xl overflow-y-auto rounded-m border bg-popover p-2xl text-popover-foreground shadow-l"
          >
            <div className="flex flex-col gap-m">
              <Dialog.Title className="text-l font-semibold">Add service</Dialog.Title>
              <Dialog.Description className="text-s text-muted-foreground">
                Create a service with production and staging environments, ready for demo deployments.
              </Dialog.Description>
            </div>
            <form
              className="flex flex-col gap-2xl"
              aria-busy={pending}
              onSubmit={(event) => {
                event.preventDefault();
                if (pending) {
                  return;
                }
                const formData = new FormData(event.currentTarget);
                setError("");
                startTransition(async () => {
                  try {
                    const result = await addService(formData);
                    if (result.error) {
                      setError(result.error);
                    } else if (result.href) {
                      startTransition(() => router.push(result.href));
                    }
                  } catch {
                    setError("Could not save the service. Check your connection and try again.");
                  }
                });
              }}
            >
              <input type="hidden" name="environment" value={environment} />
              <div className="flex flex-col gap-m">
                <label htmlFor="service-name" className="text-s font-medium">
                  Service name (required)
                </label>
                <input
                  ref={inputRef}
                  id="service-name"
                  name="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  required
                  maxLength={64}
                  pattern="[a-zA-Z0-9\-]{1,64}"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={pending}
                  aria-invalid={Boolean(error)}
                  aria-describedby={`service-name-hint${error ? " service-name-error" : ""}`}
                  className="h-control-m w-full rounded-m border border-input bg-background px-l text-s text-foreground focus-visible:outline-(length:--focus-outline-width) focus-visible:outline-offset-(--focus-offset) focus-visible:outline-ring disabled:opacity-disabled aria-invalid:border-border-destructive"
                />
                <p id="service-name-hint" className="text-s text-muted-foreground">
                  1–64 characters: Latin letters, numbers or hyphens.
                </p>
                {error && (
                  <p id="service-name-error" role="alert" className="text-s text-destructive-foreground">
                    {error}
                  </p>
                )}
              </div>
              <output className="sr-only">{pending ? "Creating service…" : ""}</output>
              <div className="flex flex-col items-end gap-l sm:flex-row sm:justify-end">
                <Dialog.Close render={<Button type="button" variant="outline" disabled={pending} />}>
                  Cancel
                </Dialog.Close>
                <Button type="submit" disabled={pending}>
                  {pending ? "Creating…" : "Add service"}
                </Button>
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
