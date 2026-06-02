"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Heart, Minus, Plus, Ruler, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RatingStars } from "@/components/shared/rating-stars";
import { VariantPicker } from "@/components/product/variant-picker";
import { SizeGuide } from "@/components/product/size-guide";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductInfo({ product }: { product: Product }) {
  const mounted = useMounted();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const wishItems = useWishlistStore((s) => s.items);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = mounted && wishItems.some((i) => i.productId === product.id);

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size,
      color,
      quantity: qty,
    });
    openCart();
    toast.success("Added to bag", {
      description: `${product.name} · ${size} · ${color}`,
    });
  };

  const handleWish = () => {
    toggleWish({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs uppercase luxe-track text-gold">
            {product.category}
          </p>
          {product.isNew ? <Badge className="bg-foreground text-background">New</Badge> : null}
          {discount > 0 ? <Badge className="bg-gold text-ink">-{discount}%</Badge> : null}
        </div>
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          {product.name}
        </h1>
        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
          showValue
        />
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-medium">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice ? (
          <span className="text-base text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        ) : null}
      </div>

      <p className="leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <VariantPicker
        sizes={product.sizes}
        colors={product.colors}
        size={size}
        color={color}
        onSizeChange={setSize}
        onColorChange={setColor}
      />

      <SizeGuide
        trigger={
          <button className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            <Ruler className="h-4 w-4" /> View size guide
          </button>
        }
      />

      {/* Quantity + actions */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-3 text-muted-foreground transition hover:text-foreground"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-medium">{qty}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              className="px-3 py-3 text-muted-foreground transition hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button size="lg" className="h-12 min-w-0 flex-1" onClick={handleAdd}>
            Add to Bag
            <span className="hidden sm:inline">
              {" "}
              · {formatPrice(product.price * qty)}
            </span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            aria-label="Add to wishlist"
            className="h-12 w-12 shrink-0 p-0"
            onClick={handleWish}
          >
            <Heart className={cn("h-5 w-5", wished && "fill-gold text-gold")} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {product.stock <= 10
            ? `Only ${product.stock} left — order soon`
            : "In stock, ready to ship"}
        </p>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 border-y border-border py-5 text-center">
        <Trust
          icon={Truck}
          label={`Free shipping over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`}
        />
        <Trust icon={Undo2} label="30-day returns" />
        <Trust icon={ShieldCheck} label="2-year guarantee" />
      </div>

      {/* Details */}
      <Accordion type="single" collapsible defaultValue="details">
        <AccordionItem value="details">
          <AccordionTrigger>Details &amp; Materials</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Crafted from premium, responsibly sourced materials. Dry clean only.
            Made in Italy. Model is 5&apos;10&quot; and wears a size S.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping &amp; Returns</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Complimentary standard shipping on orders over{" "}
            {formatPrice(FREE_SHIPPING_THRESHOLD)}. Express options available at
            checkout. Free returns within 30 days of delivery.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function Trust({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Icon className="h-5 w-5 text-gold" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
