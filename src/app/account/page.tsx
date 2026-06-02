import Link from "next/link";
import { ArrowRight, Heart, MapPin, Package } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export default async function AccountOverview() {
  const session = await auth();
  const userId = session!.user.id;

  const [orderCount, addressCount, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.address.count({ where: { userId } }),
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { items: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Package} label="Orders" value={String(orderCount)} href="/account/orders" />
        <StatCard icon={MapPin} label="Saved addresses" value={String(addressCount)} href="/account/addresses" />
        <StatCard icon={Heart} label="Wishlist" value="View" href="/account/wishlist" />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl">Recent orders</h2>
          <Link
            href="/account/orders"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-12 text-center">
            <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop" className="mt-2 inline-block text-sm font-medium text-gold hover:underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {recentOrders.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between rounded-xl border border-border p-4"
              >
                <div>
                  <p className="font-medium">{o.number}</p>
                  <p className="text-sm text-muted-foreground">
                    {o.items.length} item{o.items.length === 1 ? "" : "s"} ·{" "}
                    {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(o.total)}</p>
                  <span className="text-xs uppercase tracking-wide text-gold">
                    {o.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-border p-5 transition-colors hover:border-gold/50"
    >
      <Icon className="h-5 w-5 text-gold" />
      <p className="mt-3 text-2xl font-medium">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Link>
  );
}
