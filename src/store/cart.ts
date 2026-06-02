import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Coupon } from "@/types";

const FREE_SHIPPING_THRESHOLD = 500;
const STANDARD_SHIPPING = 25;

export type ShippingMethod = "standard" | "express";

const SHIPPING_RATES: Record<ShippingMethod, number> = {
  standard: STANDARD_SHIPPING,
  express: 45,
};

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  shippingMethod: ShippingMethod;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  setCoupon: (coupon: Coupon | null) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  clearCart: () => void;
}

const sameLine = (
  a: { productId: string; size: string; color: string },
  productId: string,
  size: string,
  color: string
) => a.productId === productId && a.size === size && a.color === color;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,
      shippingMethod: "standard",
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) =>
            sameLine(i, item.productId, item.size, item.color)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item.productId, item.size, item.color)
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !sameLine(i, productId, size, color)
          ),
        })),
      updateQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              sameLine(i, productId, size, color)
                ? { ...i, quantity: Math.max(0, quantity) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      setCoupon: (coupon) => set({ coupon }),
      setShippingMethod: (method) => set({ shippingMethod: method }),
      clearCart: () => set({ items: [], coupon: null }),
    }),
    { name: "stylehub-cart" }
  )
);

// ---- Derived selectors (pure helpers) -------------------------------------
export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function couponDiscount(subtotal: number, coupon: Coupon | null) {
  if (!coupon) return 0;
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
  if (coupon.type === "percent") return (subtotal * coupon.value) / 100;
  return Math.min(coupon.value, subtotal);
}

export function shippingCost(
  subtotal: number,
  method: ShippingMethod,
  discount = 0
) {
  if (subtotal - discount >= FREE_SHIPPING_THRESHOLD && method === "standard") {
    return 0;
  }
  return SHIPPING_RATES[method];
}

export function cartTotals(
  items: CartItem[],
  coupon: Coupon | null,
  method: ShippingMethod
) {
  const subtotal = cartSubtotal(items);
  const discount = couponDiscount(subtotal, coupon);
  const shipping = items.length ? shippingCost(subtotal, method, discount) : 0;
  const taxableBase = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableBase * 0.08 * 100) / 100;
  const total = taxableBase + shipping + tax;
  return { subtotal, discount, shipping, tax, total };
}

export { FREE_SHIPPING_THRESHOLD, SHIPPING_RATES };
