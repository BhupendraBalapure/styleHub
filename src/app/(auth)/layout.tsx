import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroImageAlt } from "@/lib/mock-data";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:block">
        <Image
          src={heroImageAlt}
          alt="StyleHub"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="font-serif text-2xl font-semibold">
            STYLE<span className="text-gold">HUB</span>
          </Link>
          <div>
            <p className="text-xs uppercase luxe-track text-gold">
              The Inner Circle
            </p>
            <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight">
              Where timeless style meets modern craft.
            </h2>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col">
        <div className="p-6 lg:hidden">
          <Link href="/" className="font-serif text-2xl font-semibold">
            STYLE<span className="text-gold">HUB</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
