import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { promoBannerImage } from "@/lib/mock-data";

export function PromoBanner() {
  return (
    <Reveal>
      <Link
        href="/shop"
        className="group relative block h-36 overflow-hidden rounded-2xl bg-ink sm:h-44 md:h-52"
      >
        <Image
          src={promoBannerImage}
          alt="The Autumn/Winter 2026 collection"
          fill
          sizes="100vw"
          className="object-cover object-center transition-transform ease-out [transition-duration:1100ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-center gap-2 p-6 sm:p-10">
          <p className="text-[10px] uppercase luxe-track text-gold sm:text-xs">
            Just Landed
          </p>
          <h3 className="max-w-md font-display text-xl uppercase leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            The A/W 2026 Collection
          </h3>
          <span className="mt-0.5 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-white sm:text-sm">
            Shop New In
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
          <span className="block h-px w-10 bg-gold transition-all duration-500 group-hover:w-24" />
        </div>
      </Link>
    </Reveal>
  );
}
