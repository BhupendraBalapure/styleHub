"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/shared/rating-stars";
import { WishlistButton } from "@/components/product/wishlist-button";
import { QuickView } from "@/components/product/quick-view";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const [quickOpen, setQuickOpen] = useState(false);
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className={cn("group flex flex-col", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
          />
          {/* Hover swap image */}
          <Image
            src={product.images[1] ?? product.images[0]}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 scale-105 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew ? (
            <Badge className="bg-foreground text-background hover:bg-foreground">
              New
            </Badge>
          ) : null}
          {discount > 0 ? (
            <Badge className="bg-gold text-ink hover:bg-gold">-{discount}%</Badge>
          ) : null}
          {product.isBestSeller ? (
            <Badge
              variant="outline"
              className="border-white/40 bg-black/30 text-white backdrop-blur-sm"
            >
              Bestseller
            </Badge>
          ) : null}
        </div>

        {/* Wishlist */}
        <WishlistButton
          product={product}
          className="absolute right-3 top-3 h-9 w-9 bg-white/80 text-ink backdrop-blur-md transition hover:bg-white dark:bg-black/40 dark:text-white"
        />

        {/* Quick view */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setQuickOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-background/90 py-2.5 text-sm font-medium text-foreground shadow-luxe backdrop-blur-md transition hover:bg-background"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="font-medium leading-snug transition-colors hover:text-gold"
          >
            {product.name}
          </Link>
          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {product.category}
          </span>
          <RatingStars rating={product.rating} size={12} />
        </div>
      </div>

      <QuickView
        product={product}
        open={quickOpen}
        onOpenChange={setQuickOpen}
      />
    </div>
  );
}
