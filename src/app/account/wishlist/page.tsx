"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { useMounted } from "@/hooks/use-mounted";
import { getProductBySlug } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const mounted = useMounted();
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const addToBag = (slug: string) => {
    const product = getProductBySlug(slug);
    if (!product) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: product.sizes[0],
      color: product.colors[0]?.name ?? "",
      quantity: 1,
    });
    openCart();
    toast.success("Added to bag", { description: product.name });
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <p className="font-medium">Your wishlist is empty</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap the heart on any product to save it here.
        </p>
        <Link href="/shop" className="mt-3 inline-block text-sm font-medium text-gold hover:underline">
          Discover pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-xl">Wishlist ({items.length})</h2>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <li key={item.productId} className="group flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              <Link href={`/product/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <button
                onClick={() => remove(item.productId)}
                aria-label="Remove"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md transition hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <Link href={`/product/${item.slug}`} className="font-medium hover:text-gold">
                {item.name}
              </Link>
              <span className="font-medium">{formatPrice(item.price)}</span>
            </div>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => addToBag(item.slug)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to bag
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
