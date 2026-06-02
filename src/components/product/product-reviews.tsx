import Image from "next/image";
import { RatingStars } from "@/components/shared/rating-stars";
import { productReviews } from "@/lib/mock-data";
import type { Product } from "@/types";

export function ProductReviews({ product }: { product: Product }) {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    // Deterministic mock distribution weighted toward the product rating.
    const weight =
      star === Math.round(product.rating)
        ? 0.62
        : Math.abs(star - product.rating) <= 1
          ? 0.16
          : 0.03;
    return { star, pct: Math.round(weight * 100) };
  });

  return (
    <section className="grid gap-10 lg:grid-cols-[300px_1fr]">
      {/* Summary */}
      <div className="space-y-5">
        <h2 className="font-serif text-2xl">Customer Reviews</h2>
        <div className="flex items-end gap-3">
          <span className="font-serif text-5xl">
            {product.rating.toFixed(1)}
          </span>
          <div className="pb-1.5">
            <RatingStars rating={product.rating} />
            <p className="mt-1 text-sm text-muted-foreground">
              {product.reviewCount} reviews
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-3 text-sm">
              <span className="w-3 text-muted-foreground">{d.star}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-9 text-right text-xs text-muted-foreground">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="divide-y divide-border">
        {productReviews.map((review) => (
          <article key={review.id} className="flex gap-4 py-6 first:pt-0">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image
                src={review.avatar}
                alt={review.author}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{review.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
                  </p>
                </div>
                <RatingStars rating={review.rating} size={13} />
              </div>
              <h3 className="mt-3 font-medium">{review.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {review.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
