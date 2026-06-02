"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function FrequentlyBought({
  products,
}: {
  products: Product[];
}) {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((p) => [p.id, true]))
  );
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const chosen = products.filter((p) => selected[p.id]);
  const total = chosen.reduce((sum, p) => sum + p.price, 0);

  const addAll = () => {
    chosen.forEach((p) =>
      addItem({
        productId: p.id,
        slug: p.slug,
        name: p.name,
        image: p.images[0],
        price: p.price,
        size: p.sizes[0],
        color: p.colors[0]?.name ?? "",
        quantity: 1,
      })
    );
    openCart();
    toast.success(`Added ${chosen.length} items to bag`);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="font-serif text-2xl">Frequently Bought Together</h2>
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {products.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <label className="group relative block cursor-pointer">
                <div className="relative h-28 w-[5.5rem] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    width={88}
                    height={112}
                    className="h-28 w-[5.5rem] object-cover"
                  />
                </div>
                <Checkbox
                  checked={selected[p.id]}
                  onCheckedChange={(v) =>
                    setSelected((prev) => ({ ...prev, [p.id]: Boolean(v) }))
                  }
                  className="absolute left-2 top-2 bg-background"
                />
              </label>
              {i < products.length - 1 ? (
                <Plus className="h-4 w-4 text-muted-foreground" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div className="text-sm text-muted-foreground">
            Total for {chosen.length}{" "}
            {chosen.length === 1 ? "item" : "items"}:{" "}
            <span className="text-base font-medium text-foreground">
              {formatPrice(total)}
            </span>
          </div>
          <Button onClick={addAll} disabled={chosen.length === 0}>
            Add selected to bag
          </Button>
        </div>
      </div>

      <ul className="mt-6 space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
        {products.map((p) => (
          <li key={p.id} className="flex items-center justify-between">
            <Link href={`/product/${p.slug}`} className="hover:text-foreground">
              {p.name}
            </Link>
            <span>{formatPrice(p.price)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
