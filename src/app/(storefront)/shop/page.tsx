import type { Metadata } from "next";
import { ShopView } from "@/components/shop/shop-view";
import { categories } from "@/lib/mock-data";
import type { CollectionSlug } from "@/types";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full StyleHub collection — women's and men's apparel, accessories, and footwear.",
};

const VALID = new Set(categories.map((c) => c.slug));

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  const initial =
    collection && VALID.has(collection as CollectionSlug)
      ? (collection as CollectionSlug)
      : "all";

  const heading = categories.find((c) => c.slug === initial);

  return (
    <div className="container py-10 md:py-14">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase luxe-track text-gold">
          {heading ? heading.name : "The Collection"}
        </p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">
          {heading ? heading.name : "Shop All"}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {heading
            ? heading.description
            : "Every piece, considered. Filter by collection, size, and price to find your next signature."}
        </p>
      </header>

      <ShopView initialCollection={initial} />
    </div>
  );
}
