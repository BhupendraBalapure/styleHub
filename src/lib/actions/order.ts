"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export interface OrderPayload {
  number: string;
  email: string;
  shippingAddress: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingMethod: string;
  couponCode?: string;
  items: {
    productId?: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
  }[];
}

/**
 * Persist an order to the database. Links it to the signed-in user when there
 * is a session; otherwise records it as a guest order.
 */
export async function createOrder(payload: OrderPayload) {
  const session = await auth();

  // Only attach productIds that actually exist in the DB.
  const ids = payload.items.map((i) => i.productId).filter(Boolean) as string[];
  const existing = ids.length
    ? new Set(
        (
          await prisma.product.findMany({
            where: { id: { in: ids } },
            select: { id: true },
          })
        ).map((p) => p.id)
      )
    : new Set<string>();

  try {
    await prisma.order.create({
      data: {
        number: payload.number,
        userId: session?.user?.id ?? null,
        email: payload.email,
        status: "PAID",
        subtotal: payload.subtotal,
        discount: payload.discount,
        shipping: payload.shipping,
        tax: payload.tax,
        total: payload.total,
        shippingMethod: payload.shippingMethod,
        couponCode: payload.couponCode ?? null,
        shippingAddress: payload.shippingAddress,
        items: {
          create: payload.items.map((i) => ({
            productId: i.productId && existing.has(i.productId) ? i.productId : null,
            name: i.name,
            image: i.image,
            price: i.price,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
        },
      },
    });
    return { ok: true as const };
  } catch {
    // Don't block the customer's confirmation on a persistence hiccup.
    return { ok: false as const };
  }
}
