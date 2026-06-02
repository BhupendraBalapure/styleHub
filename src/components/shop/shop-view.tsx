"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/shared/product-grid";
import { products as allProducts } from "@/lib/mock-data";
import { formatPrice, cn } from "@/lib/utils";
import type { CollectionSlug } from "@/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const COLLECTIONS: { label: string; value: CollectionSlug | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Accessories", value: "accessories" },
  { label: "Footwear", value: "footwear" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "38", "39", "40", "41", "42", "43", "44", "One Size"];
const MAX_PRICE = 1300;

export function ShopView({
  initialCollection = "all",
}: {
  initialCollection?: CollectionSlug | "all";
}) {
  const [collection, setCollection] = useState<CollectionSlug | "all">(
    initialCollection
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(MAX_PRICE);
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (collection !== "all" && p.collection !== collection) return false;
      if (p.price > price) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort(
          (a, b) => Number(!!b.isNew) - Number(!!a.isNew)
        );
        break;
    }
    return list;
  }, [collection, sizes, price, sort]);

  const toggleSize = (size: string) =>
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const resetFilters = () => {
    setSizes([]);
    setPrice(MAX_PRICE);
  };

  const Filters = (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase luxe-track text-muted-foreground">
          Collection
        </p>
        <div className="flex flex-col gap-1">
          {COLLECTIONS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCollection(c.value)}
              className={cn(
                "w-fit text-left text-sm transition-colors",
                collection === c.value
                  ? "font-medium text-gold"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase luxe-track text-muted-foreground">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={cn(
                "rounded-md border px-2.5 py-1.5 text-xs transition",
                sizes.includes(s)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase luxe-track text-muted-foreground">
            Max Price
          </p>
          <span className="text-sm font-medium">{formatPrice(price)}</span>
        </div>
        <Slider
          value={[price]}
          min={100}
          max={MAX_PRICE}
          step={10}
          onValueChange={(v) => setPrice(v[0])}
        />
      </div>

      <Button variant="ghost" onClick={resetFilters} className="text-muted-foreground">
        <X className="mr-1.5 h-4 w-4" /> Reset filters
      </Button>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      {/* Desktop filters */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">{Filters}</div>
      </aside>

      <div>
        <div className="mb-8 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>

          <div className="flex items-center gap-2">
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                {Filters}
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-24 text-center">
            <p className="font-medium">No pieces match your filters</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your selection.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
