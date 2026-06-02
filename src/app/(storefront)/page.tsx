import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { TrendingProducts } from "@/components/home/trending-products";
import { NewArrivals } from "@/components/home/new-arrivals";
import { BestSellers } from "@/components/home/best-sellers";
import { BrandStory } from "@/components/home/brand-story";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <TrendingProducts />
      <NewArrivals />
      <BestSellers />
      <BrandStory />
      <CustomerReviews />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
