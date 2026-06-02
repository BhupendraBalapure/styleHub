"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import { updateProfile } from "@/lib/actions/account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ProfileForm({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  const [state, action] = useActionState(updateProfile, undefined);

  return (
    <form action={action} className="max-w-md space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" defaultValue={name} className="h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} disabled className="h-11" />
        <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
      </div>
      <div className="space-y-2">
        <Label>Account type</Label>
        <p className="text-sm">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs uppercase tracking-wide">
            {role}
          </span>
        </p>
      </div>

      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      {state?.ok ? (
        <p className="flex items-center gap-1.5 text-sm text-gold">
          <Check className="h-4 w-4" /> Profile updated
        </p>
      ) : null}

      <SaveButton />
    </form>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Save changes
    </Button>
  );
}
