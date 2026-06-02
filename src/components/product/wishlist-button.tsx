"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function WishlistButton({
  product,
  className,
  size = 18,
}: {
  product: Product;
  className?: string;
  size?: number;
}) {
  const mounted = useMounted();
  const items = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const active = mounted && items.some((i) => i.productId === product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
    });
    toast(active ? "Removed from wishlist" : "Saved to wishlist", {
      description: product.name,
    });
  };

  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={handleToggle}
      className={cn(
        "flex items-center justify-center rounded-full transition-colors",
        className
      )}
    >
      <motion.span
        key={String(active)}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
      >
        <Heart
          width={size}
          height={size}
          className={cn(
            "transition-colors",
            active ? "fill-gold text-gold" : "text-current"
          )}
        />
      </motion.span>
    </button>
  );
}
