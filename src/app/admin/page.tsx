import { Boxes, IndianRupee, ShoppingCart, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [orders, productCount, customerCount, items] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.product.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.orderItem.groupBy({
      by: ["name"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
  ]);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Orders grouped by collection? Use order count by status for the chart.
  const statuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
  const chartData = statuses.map((s) => ({
    label: s.slice(0, 3),
    value: orders.filter((o) => o.status === s).length,
  }));

  const recent = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={IndianRupee} label="Total revenue" value={formatPrice(revenue)} />
        <Stat icon={ShoppingCart} label="Orders" value={String(orders.length)} />
        <Stat icon={Boxes} label="Products" value={String(productCount)} />
        <Stat icon={Users} label="Customers" value={String(customerCount)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border p-6 lg:col-span-2">
          <h2 className="mb-4 font-serif text-lg">Orders by status</h2>
          <RevenueChart data={chartData} />
        </div>

        <div className="rounded-xl border border-border p-6">
          <h2 className="mb-4 font-serif text-lg">Top products</h2>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sales yet.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it, i) => (
                <li key={it.name} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-muted-foreground">{i + 1}.</span>
                    {it.name}
                  </span>
                  <span className="font-medium">{it._sum.quantity ?? 0} sold</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border p-6">
        <h2 className="mb-4 font-serif text-lg">Recent orders</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{o.number}</p>
                  <p className="text-muted-foreground">{o.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(o.total)}</p>
                  <span className="text-xs uppercase tracking-wide text-gold">{o.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border p-5">
      <Icon className="h-5 w-5 text-gold" />
      <p className="mt-3 text-2xl font-medium">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
