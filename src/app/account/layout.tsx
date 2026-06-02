import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AccountNav } from "@/components/account/account-nav";
import { SignOutButton } from "@/components/account/sign-out-button";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">
      {/* Slim header */}
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
            STYLE<span className="text-gold">HUB</span>
          </Link>
          <div className="flex items-center gap-4">
            {session.user.role === "ADMIN" ? (
              <Link
                href="/admin"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Admin
              </Link>
            ) : null}
            <Link
              href="/shop"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl">My Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back, {session.user.name ?? session.user.email}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-10 lg:self-start">
            <AccountNav />
            <div className="border-t border-border pt-4">
              <SignOutButton />
            </div>
          </aside>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
