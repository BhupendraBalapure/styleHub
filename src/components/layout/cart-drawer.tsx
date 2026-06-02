"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  cartTotals,
  FREE_SHIPPING_THRESHOLD,
  useCartStore,
} from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { findCoupon } from "@/lib/mock-data";
import { formatPrice, clamp } from "@/lib/utils";

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const setOpen = useUIStore((s) => s.setCartOpen);

  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.coupon);
  const method = useCartStore((s) => s.shippingMethod);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const setCoupon = useCartStore((s) => s.setCoupon);

  const [code, setCode] = useState("");
  const { subtotal, discount, shipping, total } = cartTotals(
    items,
    coupon,
    method
  );

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeProgress = clamp((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 0, 100);

  const applyCoupon = () => {
    const found = findCoupon(code);
    if (!found) {
      toast.error("Invalid coupon code");
      return;
    }
    if (found.minSubtotal && subtotal < found.minSubtotal) {
      toast.error(
        `Spend ${formatPrice(found.minSubtotal)} to use ${found.code}`
      );
      return;
    }
    setCoupon(found);
    setCode("");
    toast.success(`Coupon ${found.code} applied`, {
      description: found.description,
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-serif text-xl">
            <ShoppingBag className="h-5 w-5" />
            Your Bag
            <span className="text-sm font-normal text-muted-foreground">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">
                Discover something you&apos;ll love.
              </p>
            </div>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b px-6 py-4">
              {remainingForFree > 0 ? (
                <p className="mb-2 text-xs text-muted-foreground">
                  Add{" "}
                  <span className="font-medium text-foreground">
                    {formatPrice(remainingForFree)}
                  </span>{" "}
                  more for free standard shipping
                </p>
              ) : (
                <p className="mb-2 text-xs text-gold">
                  You&apos;ve unlocked free standard shipping
                </p>
              )}
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{ width: `${freeProgress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md bg-muted"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium leading-snug">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.color} · {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Remove"
                          onClick={() =>
                            removeItem(item.productId, item.size, item.color)
                          }
                          className="text-muted-foreground transition hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="px-2 py-1.5 text-muted-foreground transition hover:text-foreground"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="px-2 py-1.5 text-muted-foreground transition hover:text-foreground"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-5">
              {/* Coupon */}
              {coupon ? (
                <div className="mb-4 flex items-center justify-between rounded-lg border border-gold/40 bg-gold/10 px-3 py-2">
                  <span className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-gold" />
                    {coupon.code}
                  </span>
                  <button
                    type="button"
                    aria-label="Remove coupon"
                    onClick={() => setCoupon(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="mb-4 flex gap-2">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Promo code"
                    className="h-10"
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <Button variant="outline" className="h-10" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
              )}

              <div className="space-y-1.5 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                {discount > 0 ? (
                  <Row
                    label="Discount"
                    value={`- ${formatPrice(discount)}`}
                    accent
                  />
                ) : null}
                <Row
                  label="Shipping"
                  value={shipping === 0 ? "Free" : formatPrice(shipping)}
                />
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Button asChild size="lg" onClick={() => setOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground"
                >
                  Continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-gold" : undefined}>{value}</span>
    </div>
  );
}
