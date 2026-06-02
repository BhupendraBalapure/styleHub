"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { RatingStars } from "@/components/shared/rating-stars";
import { reviews } from "@/lib/mock-data";

export function CustomerReviews() {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading
        eyebrow="Loved Worldwide"
        title="What Our Clients Say"
        description="A community of discerning customers across 40 countries."
        className="mb-12"
      />

      <Reveal>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                  <Quote className="h-8 w-8 text-gold/40" />
                  <RatingStars rating={review.rating} className="mt-4" />
                  <figcaption className="mt-3 font-medium">
                    {review.title}
                  </figcaption>
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    “{review.body}”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.location}
                      </p>
                    </div>
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </Reveal>
    </section>
  );
}
