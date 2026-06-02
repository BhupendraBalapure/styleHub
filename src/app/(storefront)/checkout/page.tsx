import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container py-10 md:py-14">
      <h1 className="mb-8 font-serif text-4xl">Checkout</h1>
      <CheckoutView />
    </div>
  );
}
