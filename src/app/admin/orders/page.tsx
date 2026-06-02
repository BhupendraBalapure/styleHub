import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, user: true },
  });

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl">Orders ({orders.length})</h2>

      {orders.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40 text-left text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">Order</th>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Items</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-secondary/30">
                  <td className="p-3">
                    <p className="font-medium">{o.number}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-3">
                    <p>{o.user?.name ?? "Guest"}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{o.items.length}</td>
                  <td className="p-3 font-medium">{formatPrice(o.total)}</td>
                  <td className="p-3">
                    <form action={updateOrderStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={o.id} />
                      <select
                        name="status"
                        defaultValue={o.status}
                        className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-background">
                            {s}
                          </option>
                        ))}
                      </select>
                      <Button type="submit" size="sm" variant="outline">
                        Update
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
