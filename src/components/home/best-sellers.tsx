import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { RatingStars } from "@/components/shared/rating-stars";
import { WishlistButton } from "@/components/product/wishlist-button";
import { bestSellers } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export function BestSellers() {
  return (
    <section className="bg-ink py-20 text-white md:py-28 dark:bg-secondary/40">
      <div className="container">
        <SectionHeading
          eyebrow="Customer Favorites"
          title="Best Sellers"
          description="Tried, tested, and adored — the pieces that define the house."
          className="mb-12 [&_h2]:text-white [&_p]:text-white/60"
        />

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.slice(0, 4).map((product, i) => (
            <StaggerItem key={product.id}>
              <Link
                href={`/product/${product.slug}`}
                className="group relative flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-gold/40"
              >
                <span className="absolute left-3 top-3 z-10 font-serif text-4xl leading-none text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-white/5">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-xs uppercase tracking-wider text-gold">
                    {product.category}
                  </p>
                  <h3 className="mt-1 font-medium leading-snug">
                    {product.name}
                  </h3>
                  <div className="mt-1.5">
                    <RatingStars rating={product.rating} size={12} />
                  </div>
                  <p className="mt-2 font-medium">{formatPrice(product.price)}</p>
                </div>
                <WishlistButton
                  product={product}
                  className="absolute right-3 top-3 h-8 w-8 text-white/70 hover:text-gold"
                  size={16}
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
