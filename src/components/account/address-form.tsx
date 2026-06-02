"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Plus } from "lucide-react";
import { addAddress } from "@/lib/actions/account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function AddressForm() {
  const [state, action] = useActionState(addAddress, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="space-y-4 rounded-xl border border-border p-5"
    >
      <p className="font-medium">Add a new address</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="fullName" label="Full name" />
        <Field name="phone" label="Phone (optional)" />
      </div>
      <Field name="line1" label="Street address" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="city" label="City" />
        <Field name="state" label="State / Region" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="zip" label="Postcode" />
        <Field name="country" label="Country" defaultValue="India" />
      </div>

      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} defaultValue={defaultValue} className="h-11" />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      Save address
    </Button>
  );
}
