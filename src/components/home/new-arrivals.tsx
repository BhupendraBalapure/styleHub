"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ProductCard } from "@/components/product/product-card";
import { newArrivals } from "@/lib/mock-data";

export function NewArrivals() {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading
        eyebrow="Just Landed"
        title="New Arrivals"
        description="The latest additions to the collection — fresh from the atelier."
        className="mb-12"
      />

      <Reveal>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {newArrivals.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/4"
              >
                <ProductCard product={product} />
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
