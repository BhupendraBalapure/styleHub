import Image from "next/image";
import { Camera, Heart } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { instagramPosts } from "@/lib/mock-data";

export function InstagramGallery() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="@stylehub"
          title="Follow the Look"
          description="Tag #StyleHub for a chance to be featured. Style, in the wild."
          className="mb-12"
        />

        <StaggerGroup className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <StaggerItem key={post.id}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={post.image}
                  alt="StyleHub on Instagram"
                  fill
                  sizes="(max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                    <Heart className="h-4 w-4 fill-white" />
                    {post.likes.toLocaleString()}
                  </span>
                </div>
                <Camera className="absolute right-2 top-2 h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
