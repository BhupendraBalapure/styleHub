import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";

export function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </form>
  );
}
