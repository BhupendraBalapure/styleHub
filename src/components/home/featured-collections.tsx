import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { categories } from "@/lib/mock-data";

export function FeaturedCollections() {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading
        eyebrow="Curated Edits"
        title="Featured Collections"
        description="Four distinct worlds, one standard of craft. Find your next signature piece."
        className="mb-12"
      />

      <StaggerGroup className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {categories.map((category, i) => (
          <StaggerItem key={category.id} className={i === 0 ? "col-span-2 lg:col-span-1" : ""}>
            <Link
              href={`/shop?collection=${category.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform ease-out [transition-duration:900ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-xs uppercase luxe-track text-gold">
                  {category.itemCount} pieces
                </p>
                <div className="mt-1 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-white md:text-3xl">
                      {category.name}
                    </h3>
                    <p className="mt-1 max-w-[14rem] text-sm text-white/70">
                      {category.description}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
