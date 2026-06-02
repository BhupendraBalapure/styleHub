export type CollectionSlug = "men" | "women" | "accessories" | "footwear";

export interface Category {
  id: string;
  name: string;
  slug: CollectionSlug;
  description: string;
  image: string;
  itemCount: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  /** Original price for showing a discount. */
  compareAtPrice?: number;
  /** First image is primary; second is used for the hover swap. */
  images: string[];
  collection: CollectionSlug;
  category: string;
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  stock: number;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  avatar: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minSubtotal?: number;
  description: string;
}
