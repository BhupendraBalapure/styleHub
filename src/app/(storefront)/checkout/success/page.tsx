"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrderStore } from "@/store/order";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/utils";

function SuccessContent() {
  const mounted = useMounted();
  const params = useSearchParams();
  const orderId = params.get("order");
  const order = useOrderStore((s) => s.orders.find((o) => o.id === orderId));

  if (!mounted) return null;

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Order not found</h1>
        <Button asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink"
      >
        <Check className="h-8 w-8" />
      </motion.div>

      <h1 className="mt-6 font-serif text-4xl">Thank you</h1>
      <p className="mt-3 text-muted-foreground">
        Your order has been placed. A confirmation has been sent to{" "}
        <span className="text-foreground">{order.email}</span>.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase luxe-track text-muted-foreground">
              Order number
            </p>
            <p className="font-serif text-xl">{order.id}</p>
          </div>
          <Package className="h-6 w-6 text-gold" />
        </div>

        <Separator className="my-5" />

        <ul className="space-y-4">
          {order.items.map((item) => (
            <li
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex items-center gap-3"
            >
              <div className="relative h-16 w-12 overflow-hidden rounded bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.color} · {item.size} · Qty {item.quantity}
                </p>
              </div>
              <span className="text-sm">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <Separator className="my-5" />

        <div className="space-y-1.5 text-sm">
          <Row label="Subtotal" value={formatPrice(order.subtotal)} />
          {order.discount > 0 ? (
            <Row label="Discount" value={`- ${formatPrice(order.discount)}`} />
          ) : null}
          <Row
            label="Shipping"
            value={order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
          />
          <Row label="Tax" value={formatPrice(order.tax)} />
          <div className="flex items-center justify-between pt-2 text-base font-medium">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <Separator className="my-5" />
        <p className="text-xs uppercase luxe-track text-muted-foreground">
          Shipping to
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{order.address}</p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/shop">Continue shopping</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/account/orders">View my orders</Link>
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container">
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
