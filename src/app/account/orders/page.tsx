import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export default async function OrdersPage() {
  const session = await auth();
  const orders = await prisma.order.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <p className="font-medium">No orders yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          When you place an order, it&apos;ll appear here.
        </p>
        <Link href="/shop" className="mt-3 inline-block text-sm font-medium text-gold hover:underline">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div key={order.id} className="rounded-xl border border-border">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div>
              <p className="font-medium">{order.number}</p>
              <p className="text-sm text-muted-foreground">
                Placed {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-gold/40 text-gold">
                {order.status}
              </Badge>
              <span className="font-medium">{formatPrice(order.total)}</span>
            </div>
          </div>
          <ul className="divide-y divide-border">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-muted">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.color} · {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-4 text-sm text-muted-foreground">
            Shipping to: {order.shippingAddress}
          </div>
        </div>
      ))}
    </div>
  );
}
