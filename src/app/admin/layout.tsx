import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/account/sign-out-button";
import { Badge } from "@/components/ui/badge";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/account");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
              STYLE<span className="text-gold">HUB</span>
            </Link>
            <Badge variant="outline" className="border-gold/40 text-gold">
              Admin
            </Badge>
          </div>
          <Link
            href="/account"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            My account
          </Link>
        </div>
      </header>

      <div className="container py-10">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-10 lg:self-start">
            <AdminNav />
            <div className="hidden border-t border-border pt-4 lg:block">
              <SignOutButton />
            </div>
          </aside>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
