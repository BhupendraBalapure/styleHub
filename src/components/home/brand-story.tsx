import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { brandStoryImage, brandStoryImageAlt } from "@/lib/mock-data";

const STATS = [
  { value: "1998", label: "Founded in Milan" },
  { value: "40+", label: "Countries served" },
  { value: "100%", label: "Responsibly sourced" },
];

export function BrandStory() {
  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Images */}
        <Reveal direction="right" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={brandStoryImage}
              alt="The StyleHub atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden aspect-[3/4] w-40 overflow-hidden rounded-xl border-4 border-background bg-muted shadow-luxe sm:block md:w-52">
            <Image
              src={brandStoryImageAlt}
              alt="Craftsmanship detail"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal direction="left" delay={0.1}>
          <span className="text-xs font-medium uppercase luxe-track text-gold">
            Our Story
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl text-balance">
            Craft over noise, since 1998.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              StyleHub was born from a simple conviction: that true luxury is
              felt, not flaunted. We partner with the same family-run mills and
              ateliers that have defined European craftsmanship for generations.
            </p>
            <p>
              Every garment is designed to outlast trends and seasons — a
              wardrobe built on intention, not impulse. This is fashion with a
              conscience, and a quiet confidence.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-3xl text-gold md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <Button asChild size="lg" className="mt-10 h-12 px-8">
            <Link href="/shop">
              Explore the House
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
