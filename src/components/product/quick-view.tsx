"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { VariantPicker } from "@/components/product/variant-picker";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size,
      color,
      quantity: 1,
    });
    onOpenChange(false);
    openCart();
    toast.success("Added to bag", {
      description: `${product.name} · ${size} · ${color}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden p-0 sm:rounded-2xl">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-[3/4] bg-muted md:aspect-auto">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="space-y-2">
              <p className="text-xs uppercase luxe-track text-gold">
                {product.category}
              </p>
              <DialogTitle className="font-serif text-2xl leading-tight">
                {product.name}
              </DialogTitle>
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                showValue
              />
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-xl font-medium">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              ) : null}
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
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

            <div className="mt-auto flex flex-col gap-3 pt-2">
              <Button size="lg" className="w-full" onClick={handleAdd}>
                Add to Bag · {formatPrice(product.price)}
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                <Link href={`/product/${product.slug}`}>View full details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  return (
    <span
      className={cn(
        "text-xs",
        stock <= 10 ? "text-gold" : "text-muted-foreground"
      )}
    >
      {stock <= 10 ? `Only ${stock} left` : "In stock"}
    </span>
  );
}
