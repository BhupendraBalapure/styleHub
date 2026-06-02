"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories, heroImage } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const tiles = categories.map((c) => ({
  label: c.name,
  href: `/shop?collection=${c.slug}`,
  image: c.image,
  eyebrow: "The Edit",
}));

export function Hero() {
  return (
    <section className="w-full bg-ink">
      <div className="grid grid-cols-2 gap-1.5 md:h-[100svh] md:grid-cols-4 md:grid-rows-2">
        {/* Big statement banner */}
        <BannerTile
          index={0}
          href="/shop"
          image={heroImage}
          className="col-span-2 aspect-[16/10] sm:aspect-[2/1] md:col-span-2 md:row-span-2 md:aspect-auto"
          big
        />

        {/* Collection banners */}
        {tiles.map((t, i) => (
          <BannerTile
            key={t.label}
            index={i + 1}
            href={t.href}
            image={t.image}
            label={t.label}
            eyebrow={t.eyebrow}
            className="aspect-[3/4] md:aspect-auto"
          />
        ))}
      </div>
    </section>
  );
}

function BannerTile({
  href,
  image,
  label,
  eyebrow,
  className,
  big = false,
  index,
}: {
  href: string;
  image: string;
  label?: string;
  eyebrow?: string;
  className?: string;
  big?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      className={cn("group relative overflow-hidden bg-muted", className)}
    >
      <Link href={href} className="block h-full w-full" aria-label={big ? "Shop the collection" : `Shop ${label}`}>
        <Image
          src={image}
          alt={big ? "StyleHub Autumn/Winter 2026" : `${label} collection`}
          fill
          priority={index < 3}
          sizes={big ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          className="object-cover object-center transition-transform ease-out [transition-duration:1100ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/40 transition-colors duration-500 group-hover:from-black/85" />

        {big ? (
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-10 lg:p-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
            >
              <p className="mb-3 text-xs uppercase luxe-track text-gold">
                Autumn / Winter 2026
              </p>
              <h1 className="max-w-lg font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                Quiet Luxury,
                <br />
                <span className="gold-gradient-text">Boldly Worn.</span>
              </h1>
              <div className="mt-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 group-hover:bg-gold">
                  Shop the Collection
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
            <p className="text-[10px] uppercase luxe-track text-gold">{eyebrow}</p>
            <h3 className="mt-0.5 font-display text-xl uppercase tracking-tight sm:text-2xl">
              {label}
            </h3>
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/85">
              Shop
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
          </div>
        )}
      </Link>
    </motion.div>
  );
}
