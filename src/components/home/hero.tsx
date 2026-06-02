"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

const PANELS = [
  {
    label: "Women",
    href: "/shop?collection=women",
    image: categories.find((c) => c.slug === "women")!.image,
    eyebrow: "The Women's Edit",
  },
  {
    label: "Men",
    href: "/shop?collection=men",
    image: categories.find((c) => c.slug === "men")!.image,
    eyebrow: "The Men's Edit",
  },
];

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        {PANELS.map((panel, i) => (
          <motion.div
            key={panel.label}
            initial={{ opacity: 0, x: i === 0 ? -48 : 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}
            className={`group relative h-[50svh] overflow-hidden md:h-full ${
              i === 1 ? "md:border-l md:border-white/10" : ""
            }`}
          >
            <Link href={panel.href} className="block h-full w-full" aria-label={`Shop ${panel.label}`}>
              <Image
                src={panel.image}
                alt={`${panel.label}'s collection`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform ease-out [transition-duration:1200ms] group-hover:scale-[1.06]"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 transition-colors duration-500 group-hover:from-black/90" />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease }}
                >
                  <p className="mb-2 text-xs uppercase luxe-track text-gold">
                    {panel.eyebrow}
                  </p>
                  <h2 className="font-display text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-6xl">
                    {panel.label}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
                    Shop {panel.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                  <span className="mt-3 block h-px w-12 bg-gold transition-all duration-500 group-hover:w-28" />
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Center brand mark */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
        className="pointer-events-none absolute left-1/2 top-[14svh] -translate-x-1/2 text-center md:top-[20%]"
      >
        <p className="text-[10px] uppercase luxe-track text-white/70 sm:text-xs">
          Autumn / Winter 2026
        </p>
        <p className="mt-2 hidden font-display text-sm uppercase tracking-[0.35em] text-white/90 sm:block">
          The New Season
        </p>
      </motion.div>
    </section>
  );
}
