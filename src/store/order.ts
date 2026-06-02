import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

export interface PlacedOrder {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingMethod: string;
  couponCode?: string;
}

interface OrderState {
  orders: PlacedOrder[];
  lastOrderId: string | null;
  addOrder: (order: PlacedOrder) => void;
  getOrder: (id: string) => PlacedOrder | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      lastOrderId: null,
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
          lastOrderId: order.id,
        })),
      getOrder: (id) => get().orders.find((o) => o.id === id),
    }),
    { name: "stylehub-orders" }
  )
);

/** Build a human-friendly order number (no Math.random reliance on uniqueness). */
export function makeOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  return `SH-${ts.slice(-6)}`;
}
