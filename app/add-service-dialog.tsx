"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    <Dialog
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
      <DialogTrigger id="add-service-trigger" render={<Button type="button" />}>
        Add service
      </DialogTrigger>
      <DialogContent initialFocus={inputRef} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add service</DialogTitle>
          <DialogDescription>
            Create a service with production and staging environments, ready for demo deployments.
          </DialogDescription>
        </DialogHeader>
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
          <div className="flex flex-col gap-md">
            <label htmlFor="service-name" className="text-sm font-medium">
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
              className="h-control w-full rounded-md border border-border-input bg-canvas px-lg text-sm text-content focus-visible:outline-(length:--focus-outline-width) focus-visible:outline-offset-(--focus-offset) focus-visible:outline-border-focus disabled:opacity-disabled aria-invalid:border-border-destructive"
            />
            <p id="service-name-hint" className="text-sm text-content-subtle">
              1–64 characters: Latin letters, numbers or hyphens.
            </p>
            {error && (
              <p id="service-name-error" role="alert" className="text-sm text-content-destructive">
                {error}
              </p>
            )}
          </div>
          <output className="sr-only">{pending ? "Creating service…" : ""}</output>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" disabled={pending} />}>Cancel</DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Creating…" : "Add service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
