"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronLeft, Lock, Truck, Zap } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  cartTotals,
  useCartStore,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_RATES,
  type ShippingMethod,
} from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { makeOrderId, useOrderStore } from "@/store/order";
import { createOrder } from "@/lib/actions/order";
import { formatPrice, cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  address: z.string().min(4, "Enter your street address"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  zip: z.string().min(3, "Enter a valid postcode"),
  country: z.string().min(2, "Required"),
  phone: z.string().min(6, "Enter a valid phone number"),
  cardName: z.string().min(2, "Name on card"),
  cardNumber: z
    .string()
    .regex(/^[\d ]{12,19}$/, "Enter a valid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC"),
});

type FormValues = z.infer<typeof schema>;

const STEPS = ["Information", "Delivery", "Payment", "Review"] as const;

const STEP_FIELDS: Record<number, (keyof FormValues)[]> = {
  0: ["email", "firstName", "lastName", "address", "city", "state", "zip", "country", "phone"],
  1: [],
  2: ["cardName", "cardNumber", "expiry", "cvc"],
  3: [],
};

export function CheckoutView() {
  const mounted = useMounted();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.coupon);
  const method = useCartStore((s) => s.shippingMethod);
  const setMethod = useCartStore((s) => s.setShippingMethod);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);

  const totals = cartTotals(items, coupon, method);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      phone: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
    mode: "onTouched",
  });

  if (mounted && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Your bag is empty</h1>
        <p className="text-muted-foreground">
          Add a few pieces before checking out.
        </p>
        <Button asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const next = async () => {
    const valid = await form.trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const placeOrder = form.handleSubmit(async (values) => {
    const id = makeOrderId();
    const shippingAddress = `${values.address}, ${values.city}, ${values.state} ${values.zip}, ${values.country}`;

    // Keep a client-side copy so the confirmation page renders instantly.
    addOrder({
      id,
      createdAt: new Date().toISOString(),
      email: values.email,
      name: `${values.firstName} ${values.lastName}`,
      address: shippingAddress,
      items,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      shippingMethod: method,
      couponCode: coupon?.code,
    });

    // Persist to the database (links to the signed-in user if any).
    await createOrder({
      number: id,
      email: values.email,
      shippingAddress,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      shippingMethod: method,
      couponCode: coupon?.code,
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        image: i.image,
        price: i.price,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
      })),
    });

    clearCart();
    router.push(`/checkout/success?order=${id}`);
  });

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
      <div>
        {/* Stepper */}
        <ol className="mb-10 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition",
                  i < step
                    ? "bg-gold text-ink"
                    : i === step
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm sm:inline",
                  i === step ? "font-medium" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 ? (
                <span className="mx-1 h-px flex-1 bg-border" />
              ) : null}
            </li>
          ))}
        </ol>

        <Form {...form}>
          <form onSubmit={placeOrder}>
            {step === 0 ? (
              <section className="space-y-5">
                <h2 className="font-serif text-2xl">Contact &amp; Shipping</h2>
                <Field form={form} name="email" label="Email" type="email" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field form={form} name="firstName" label="First name" />
                  <Field form={form} name="lastName" label="Last name" />
                </div>
                <Field form={form} name="address" label="Address" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field form={form} name="city" label="City" />
                  <Field form={form} name="state" label="State / Region" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field form={form} name="zip" label="Postcode" />
                  <Field form={form} name="country" label="Country" />
                </div>
                <Field form={form} name="phone" label="Phone" />
              </section>
            ) : null}

            {step === 1 ? (
              <section className="space-y-5">
                <h2 className="font-serif text-2xl">Delivery Method</h2>
                <div className="space-y-3">
                  <DeliveryOption
                    active={method === "standard"}
                    onClick={() => setMethod("standard")}
                    icon={Truck}
                    title="Standard Delivery"
                    desc="3–5 business days"
                    price={
                      totals.subtotal >= FREE_SHIPPING_THRESHOLD
                        ? "Free"
                        : formatPrice(SHIPPING_RATES.standard)
                    }
                  />
                  <DeliveryOption
                    active={method === "express"}
                    onClick={() => setMethod("express")}
                    icon={Zap}
                    title="Express Delivery"
                    desc="1–2 business days"
                    price={formatPrice(SHIPPING_RATES.express)}
                  />
                </div>
              </section>
            ) : null}

            {step === 2 ? (
              <section className="space-y-5">
                <h2 className="font-serif text-2xl">Payment</h2>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 text-gold" />
                  This is a demo store — no real payment is processed.
                </p>
                <Field form={form} name="cardName" label="Name on card" />
                <Field
                  form={form}
                  name="cardNumber"
                  label="Card number"
                  placeholder="4242 4242 4242 4242"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field form={form} name="expiry" label="Expiry (MM/YY)" placeholder="08/28" />
                  <Field form={form} name="cvc" label="CVC" placeholder="123" />
                </div>
              </section>
            ) : null}

            {step === 3 ? (
              <section className="space-y-5">
                <h2 className="font-serif text-2xl">Review Your Order</h2>
                <div className="rounded-xl border border-border p-5 text-sm">
                  <p className="font-medium">Shipping to</p>
                  <p className="mt-1 text-muted-foreground">
                    {form.getValues("firstName")} {form.getValues("lastName")}
                    <br />
                    {form.getValues("address")}, {form.getValues("city")},{" "}
                    {form.getValues("state")} {form.getValues("zip")}
                    <br />
                    {form.getValues("country")} · {form.getValues("phone")}
                  </p>
                  <Separator className="my-4" />
                  <p className="font-medium">Delivery</p>
                  <p className="mt-1 capitalize text-muted-foreground">
                    {method} delivery
                  </p>
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex items-center gap-3 text-sm"
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
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.color} · {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Nav buttons */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={back}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
              ) : (
                <Button type="button" variant="ghost" asChild>
                  <Link href="/shop">
                    <ChevronLeft className="mr-1 h-4 w-4" /> Continue shopping
                  </Link>
                </Button>
              )}

              {step < STEPS.length - 1 ? (
                <Button type="button" size="lg" onClick={next}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" size="lg">
                  <Lock className="mr-2 h-4 w-4" />
                  Place Order · {formatPrice(totals.total)}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {(mounted ? items : []).map((item) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-3"
              >
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-medium leading-snug">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.color} · {item.size}
                  </p>
                  <span className="mt-auto text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <div className="space-y-2 text-sm">
            <SummaryRow label="Subtotal" value={formatPrice(totals.subtotal)} />
            {totals.discount > 0 ? (
              <SummaryRow
                label={`Discount${coupon ? ` (${coupon.code})` : ""}`}
                value={`- ${formatPrice(totals.discount)}`}
                accent
              />
            ) : null}
            <SummaryRow
              label="Shipping"
              value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
            />
            <SummaryRow label="Tax (est.)" value={formatPrice(totals.tax)} />
          </div>

          <Separator className="my-4" />
          <div className="flex items-center justify-between text-lg font-medium">
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Field({ form, name, label, type = "text", placeholder }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: { field: Record<string, unknown> }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className="h-11"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DeliveryOption({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
  price,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  price: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition",
        active ? "border-gold bg-gold/5" : "border-border hover:border-foreground/40"
      )}
    >
      <Icon className="h-5 w-5 text-gold" />
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <span className="font-medium">{price}</span>
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border",
          active ? "border-gold bg-gold text-ink" : "border-muted-foreground/40"
        )}
      >
        {active ? <Check className="h-3 w-3" /> : null}
      </span>
    </button>
  );
}

function SummaryRow({
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
