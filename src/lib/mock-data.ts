import type {
  Category,
  Coupon,
  Product,
  ProductColor,
  Review,
} from "@/types";
import { avatar, unsplash } from "@/lib/images";

// ---------------------------------------------------------------------------
// Image id pools (sourced from live Unsplash listings)
// ---------------------------------------------------------------------------
const W = [
  "1515886657613-9f3515b0c78f",
  "1483985988355-763728e1935b",
  "1492707892479-7bc8d5a4ee93",
  "1532453288672-3a27e9be9efd",
  "1554412933-514a83d2f3c8",
  "1617922001439-4a2e6562f328",
  "1590330297626-d7aff25a0431",
  "1618244972963-dbee1a7edc95",
  "1623039497026-00af61471107",
  "1524255684952-d7185b509571",
  "1512101903502-7eb0c9022c74",
  "1616847220575-31b062a4cd05",
  "1612423284934-2850a4ea6b0f",
];
const M = [
  "1617137968427-85924c800a22",
  "1618886614638-80e3c103d31a",
  "1617114919297-3c8ddb01f599",
  "1488161628813-04466f872be2",
  "1617113930975-f9c7243ae527",
  "1527010154944-f2241763d806",
  "1617662408044-cda3ab7134c9",
  "1441984904996-e0b6ba687e04",
  "1618001789159-ffffe6f96ef2",
  "1559582798-678dfc71ccd8",
  "1507680434567-5739c80be1ac",
  "1479064555552-3ef4979f8908",
];
const A = [
  "1589363358751-ab05797e5629",
  "1682745230951-8a5aa9a474a0",
  "1705909237050-7a7625b47fac",
  "1591348278863-a8fb3887e2aa",
  "1584917865442-de89df76afd3",
  "1548036328-c9fa89d128fa",
  "1559563458-527698bf5295",
  "1589731119540-c4586781dae1",
  "1583623733237-4d5764a9dc82",
  "1594223274512-ad4803739b7c",
];
const F = [
  "1543652711-77eeb35ae548",
  "1596936273467-b3af0c82af7a",
  "1628136473110-6e95a86f4b81",
  "1596936273507-ba6fd97d2dea",
  "1598733400873-4afe97da3076",
  "1599059898816-d08dd9afb4b5",
  "1596936297609-a25fbc9dce0e",
  "1596936284072-09c5cfcd2357",
];
const EDITORIAL = [
  "1603189343302-e603f7add05a",
  "1574015974293-817f0ebebb74",
  "1562151270-c7d22ceb586a",
  "1596993100471-c3905dafa78e",
  "1553544260-f87e671974ee",
  "1580478491436-fd6a937acc9e",
  "1538329972958-465d6d2144ed",
  "1662532577856-e8ee8b138a8b",
  "1645996830739-8fe3df27c33f",
  "1541130292430-a832637ddc0d",
  "1613915617430-8ab0fd7c6baf",
  "1604284195847-88dc4b5a9faa",
];

// ---------------------------------------------------------------------------
// Shared option sets
// ---------------------------------------------------------------------------
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const SHOE_SIZES = ["38", "39", "40", "41", "42", "43", "44"];
const ONE_SIZE = ["One Size"];

const NEUTRALS: ProductColor[] = [
  { name: "Onyx", hex: "#0F0F0F" },
  { name: "Ivory", hex: "#F5F1E8" },
  { name: "Camel", hex: "#C19A6B" },
];
const COOL: ProductColor[] = [
  { name: "Slate", hex: "#475569" },
  { name: "Midnight", hex: "#0B1220" },
  { name: "Stone", hex: "#A8A29E" },
];
const RICH: ProductColor[] = [
  { name: "Bordeaux", hex: "#5B1A22" },
  { name: "Forest", hex: "#1F3D2B" },
  { name: "Onyx", hex: "#0F0F0F" },
];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const categories: Category[] = [
  {
    id: "c-women",
    name: "Women",
    slug: "women",
    description: "Refined silhouettes for the modern wardrobe.",
    image: unsplash(W[3], 1200, 1500),
    itemCount: 6,
  },
  {
    id: "c-men",
    name: "Men",
    slug: "men",
    description: "Tailored essentials, impeccably cut.",
    image: unsplash(M[0], 1200, 1500),
    itemCount: 5,
  },
  {
    id: "c-accessories",
    name: "Accessories",
    slug: "accessories",
    description: "The finishing touch, in fine leather.",
    image: unsplash(A[0], 1200, 1500),
    itemCount: 5,
  },
  {
    id: "c-footwear",
    name: "Footwear",
    slug: "footwear",
    description: "Crafted to carry you, season after season.",
    image: unsplash(F[0], 1200, 1500),
    itemCount: 4,
  },
];

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export const products: Product[] = [
  // --- Women ---
  {
    id: "p-001",
    slug: "silk-slip-dress",
    name: "Silk Slip Dress",
    description:
      "A fluid bias-cut slip in pure mulberry silk. Cut to skim the body with a whisper of movement — the definitive evening piece.",
    price: 390,
    compareAtPrice: 480,
    images: [unsplash(W[1], 900, 1200), unsplash(W[0], 900, 1200)],
    collection: "women",
    category: "Dresses",
    sizes: APPAREL_SIZES,
    colors: RICH,
    rating: 4.8,
    reviewCount: 126,
    isNew: true,
    isTrending: true,
    stock: 24,
  },
  {
    id: "p-002",
    slug: "cashmere-wrap-coat",
    name: "Cashmere Wrap Coat",
    description:
      "An unstructured wrap coat in double-faced cashmere. Belted at the waist, with a collar that frames effortlessly.",
    price: 890,
    images: [unsplash(W[3], 900, 1200), unsplash(W[4], 900, 1200)],
    collection: "women",
    category: "Outerwear",
    sizes: APPAREL_SIZES,
    colors: NEUTRALS,
    rating: 4.9,
    reviewCount: 89,
    isBestSeller: true,
    stock: 12,
  },
  {
    id: "p-003",
    slug: "tailored-wool-blazer",
    name: "Tailored Wool Blazer",
    description:
      "A single-breasted blazer in Italian virgin wool, sculpted with a soft shoulder and a clean, elongating lapel.",
    price: 560,
    images: [unsplash(W[5], 900, 1200), unsplash(W[6], 900, 1200)],
    collection: "women",
    category: "Blazers",
    sizes: APPAREL_SIZES,
    colors: COOL,
    rating: 4.7,
    reviewCount: 64,
    isTrending: true,
    stock: 18,
  },
  {
    id: "p-004",
    slug: "pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    description:
      "Knife pleats in a featherweight crepe that catches the light with every step. Sits high, falls long.",
    price: 280,
    images: [unsplash(W[7], 900, 1200), unsplash(W[8], 900, 1200)],
    collection: "women",
    category: "Skirts",
    sizes: APPAREL_SIZES,
    colors: NEUTRALS,
    rating: 4.6,
    reviewCount: 41,
    isNew: true,
    stock: 30,
  },
  {
    id: "p-005",
    slug: "ribbed-knit-sweater",
    name: "Ribbed Knit Sweater",
    description:
      "A second-skin rib in extra-fine merino. Quietly luxurious, endlessly layerable.",
    price: 210,
    images: [unsplash(W[9], 900, 1200), unsplash(W[10], 900, 1200)],
    collection: "women",
    category: "Knitwear",
    sizes: APPAREL_SIZES,
    colors: NEUTRALS,
    rating: 4.8,
    reviewCount: 152,
    isBestSeller: true,
    stock: 40,
  },
  {
    id: "p-006",
    slug: "satin-evening-gown",
    name: "Satin Evening Gown",
    description:
      "A floor-sweeping column in liquid satin, cut on the bias for a sculpted, red-carpet line.",
    price: 720,
    compareAtPrice: 900,
    images: [unsplash(W[11], 900, 1200), unsplash(W[12], 900, 1200)],
    collection: "women",
    category: "Dresses",
    sizes: APPAREL_SIZES,
    colors: RICH,
    rating: 4.9,
    reviewCount: 73,
    isTrending: true,
    stock: 9,
  },
  // --- Men ---
  {
    id: "p-007",
    slug: "italian-wool-suit",
    name: "Italian Wool Suit",
    description:
      "A two-piece suit in S110s virgin wool from a storied Biella mill. Half-canvassed, with a natural shoulder.",
    price: 1290,
    images: [unsplash(M[0], 900, 1200), unsplash(M[1], 900, 1200)],
    collection: "men",
    category: "Suits",
    sizes: APPAREL_SIZES,
    colors: COOL,
    rating: 4.9,
    reviewCount: 58,
    isBestSeller: true,
    isTrending: true,
    stock: 14,
  },
  {
    id: "p-008",
    slug: "merino-roll-neck",
    name: "Merino Roll-Neck",
    description:
      "A fine-gauge roll-neck in 19.5-micron merino. The understated foundation of a considered wardrobe.",
    price: 240,
    images: [unsplash(M[2], 900, 1200), unsplash(M[4], 900, 1200)],
    collection: "men",
    category: "Knitwear",
    sizes: APPAREL_SIZES,
    colors: NEUTRALS,
    rating: 4.7,
    reviewCount: 96,
    isNew: true,
    stock: 33,
  },
  {
    id: "p-009",
    slug: "structured-overcoat",
    name: "Structured Overcoat",
    description:
      "A clean-lined overcoat in a wool-cashmere melton. Tailored through the body, with a concealed placket.",
    price: 950,
    images: [unsplash(M[5], 900, 1200), unsplash(M[6], 900, 1200)],
    collection: "men",
    category: "Outerwear",
    sizes: APPAREL_SIZES,
    colors: COOL,
    rating: 4.8,
    reviewCount: 47,
    isTrending: true,
    stock: 11,
  },
  {
    id: "p-010",
    slug: "oxford-cotton-shirt",
    name: "Oxford Cotton Shirt",
    description:
      "The everyday Oxford, rendered in long-staple cotton with a softly rolled button-down collar.",
    price: 160,
    images: [unsplash(M[7], 900, 1200), unsplash(M[8], 900, 1200)],
    collection: "men",
    category: "Shirts",
    sizes: APPAREL_SIZES,
    colors: NEUTRALS,
    rating: 4.6,
    reviewCount: 188,
    isBestSeller: true,
    stock: 52,
  },
  {
    id: "p-011",
    slug: "tailored-chino-trousers",
    name: "Tailored Chino Trousers",
    description:
      "A tapered chino in garment-dyed Italian cotton twill, finished with a clean, flat front.",
    price: 190,
    images: [unsplash(M[10], 900, 1200), unsplash(M[11], 900, 1200)],
    collection: "men",
    category: "Trousers",
    sizes: APPAREL_SIZES,
    colors: NEUTRALS,
    rating: 4.5,
    reviewCount: 71,
    isNew: true,
    stock: 38,
  },
  // --- Accessories ---
  {
    id: "p-012",
    slug: "leather-tote-bag",
    name: "Leather Tote Bag",
    description:
      "A structured tote in full-grain calf leather, finished by hand with edge-painted seams and a suede-lined interior.",
    price: 640,
    images: [unsplash(A[0], 900, 1100), unsplash(A[1], 900, 1100)],
    collection: "accessories",
    category: "Bags",
    sizes: ONE_SIZE,
    colors: NEUTRALS,
    rating: 4.9,
    reviewCount: 134,
    isBestSeller: true,
    isTrending: true,
    stock: 20,
  },
  {
    id: "p-013",
    slug: "quilted-shoulder-bag",
    name: "Quilted Shoulder Bag",
    description:
      "A diamond-quilted shoulder bag with a polished chain strap and a signature turn-lock clasp.",
    price: 780,
    compareAtPrice: 920,
    images: [unsplash(A[3], 900, 1100), unsplash(A[2], 900, 1100)],
    collection: "accessories",
    category: "Bags",
    sizes: ONE_SIZE,
    colors: RICH,
    rating: 4.8,
    reviewCount: 67,
    isNew: true,
    stock: 15,
  },
  {
    id: "p-014",
    slug: "structured-top-handle-bag",
    name: "Structured Top-Handle Bag",
    description:
      "An architectural top-handle bag in box calf, with a removable strap and gold-tone hardware.",
    price: 690,
    images: [unsplash(A[4], 900, 1100), unsplash(A[5], 900, 1100)],
    collection: "accessories",
    category: "Bags",
    sizes: ONE_SIZE,
    colors: NEUTRALS,
    rating: 4.7,
    reviewCount: 52,
    stock: 17,
  },
  {
    id: "p-015",
    slug: "signature-crossbody",
    name: "Signature Crossbody",
    description:
      "A compact crossbody in pebbled leather — pared back, practical, and unmistakably refined.",
    price: 520,
    images: [unsplash(A[6], 900, 1100), unsplash(A[7], 900, 1100)],
    collection: "accessories",
    category: "Bags",
    sizes: ONE_SIZE,
    colors: COOL,
    rating: 4.8,
    reviewCount: 98,
    isBestSeller: true,
    isTrending: true,
    stock: 26,
  },
  {
    id: "p-016",
    slug: "soft-leather-bucket-bag",
    name: "Soft Leather Bucket Bag",
    description:
      "A slouchy bucket bag in glove-soft nappa, gathered with a leather drawcord.",
    price: 580,
    images: [unsplash(A[8], 900, 1100), unsplash(A[9], 900, 1100)],
    collection: "accessories",
    category: "Bags",
    sizes: ONE_SIZE,
    colors: NEUTRALS,
    rating: 4.6,
    reviewCount: 39,
    stock: 22,
  },
  // --- Footwear ---
  {
    id: "p-017",
    slug: "suede-running-sneakers",
    name: "Suede Running Sneakers",
    description:
      "A retro-inspired runner in premium suede and breathable mesh, set on a cushioned, sculpted sole.",
    price: 320,
    images: [unsplash(F[0], 900, 1100), unsplash(F[1], 900, 1100)],
    collection: "footwear",
    category: "Sneakers",
    sizes: SHOE_SIZES,
    colors: NEUTRALS,
    rating: 4.8,
    reviewCount: 211,
    isBestSeller: true,
    isTrending: true,
    stock: 44,
  },
  {
    id: "p-018",
    slug: "leather-low-top-trainers",
    name: "Leather Low-Top Trainers",
    description:
      "A minimalist low-top in smooth Italian leather with a tonal sole — clean enough to dress up.",
    price: 290,
    images: [unsplash(F[2], 900, 1100), unsplash(F[4], 900, 1100)],
    collection: "footwear",
    category: "Sneakers",
    sizes: SHOE_SIZES,
    colors: NEUTRALS,
    rating: 4.7,
    reviewCount: 143,
    isNew: true,
    stock: 36,
  },
  {
    id: "p-019",
    slug: "premium-knit-runners",
    name: "Premium Knit Runners",
    description:
      "A featherlight runner in engineered knit that moves with the foot. Designed for the city, built to last.",
    price: 260,
    images: [unsplash(F[5], 900, 1100), unsplash(F[6], 900, 1100)],
    collection: "footwear",
    category: "Sneakers",
    sizes: SHOE_SIZES,
    colors: COOL,
    rating: 4.6,
    reviewCount: 88,
    stock: 29,
  },
  {
    id: "p-020",
    slug: "classic-court-sneakers",
    name: "Classic Court Sneakers",
    description:
      "The court silhouette, perfected — full-grain leather, a tonal heel tab, and a timeless cup sole.",
    price: 230,
    images: [unsplash(F[6], 900, 1100), unsplash(F[7], 900, 1100)],
    collection: "footwear",
    category: "Sneakers",
    sizes: SHOE_SIZES,
    colors: NEUTRALS,
    rating: 4.7,
    reviewCount: 176,
    isNew: true,
    isBestSeller: true,
    stock: 41,
  },
];

// All product prices are authored in base units; convert to INR (₹).
const USD_TO_INR = 80;
for (const p of products) {
  p.price = p.price * USD_TO_INR;
  if (p.compareAtPrice) p.compareAtPrice = p.compareAtPrice * USD_TO_INR;
}

// ---------------------------------------------------------------------------
// Derived collections
// ---------------------------------------------------------------------------
export const trendingProducts = products.filter((p) => p.isTrending);
export const newArrivals = products.filter((p) => p.isNew);
export const bestSellers = products.filter((p) => p.isBestSeller);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, limit);
}

export function getProductsByCollection(collection: string) {
  return products.filter((p) => p.collection === collection);
}

// ---------------------------------------------------------------------------
// Reviews (customer testimonials)
// ---------------------------------------------------------------------------
export const reviews: Review[] = [
  {
    id: "r-1",
    author: "Isabella Moreau",
    avatar: avatar(5),
    location: "Paris, FR",
    rating: 5,
    title: "Impeccable craftsmanship",
    body: "The cashmere coat is the finest piece I own. The weight, the drape, the finishing — everything feels considered. This is luxury done quietly.",
    date: "2026-04-18",
  },
  {
    id: "r-2",
    author: "James Whitfield",
    avatar: avatar(12),
    location: "London, UK",
    rating: 5,
    title: "My new go-to house",
    body: "Ordered the Italian wool suit for a wedding. The fit was extraordinary straight out of the box. Delivery was fast and the packaging was beautiful.",
    date: "2026-04-02",
  },
  {
    id: "r-3",
    author: "Sofia Castellano",
    avatar: avatar(45),
    location: "Milan, IT",
    rating: 5,
    title: "Worth every cent",
    body: "I'm endlessly particular about leather goods and the tote exceeded my expectations. It has aged gorgeously over three months of daily use.",
    date: "2026-03-21",
  },
  {
    id: "r-4",
    author: "Aiden Park",
    avatar: avatar(33),
    location: "Seoul, KR",
    rating: 4,
    title: "Beautiful, runs slightly large",
    body: "The merino roll-neck is buttery soft. I'd size down for a closer fit, but the quality is undeniable. Will be back for more.",
    date: "2026-03-09",
  },
  {
    id: "r-5",
    author: "Maya Robinson",
    avatar: avatar(20),
    location: "New York, US",
    rating: 5,
    title: "The slip dress is perfection",
    body: "Real silk, real bias cut — it moves like liquid. I've had three compliments every time I wear it. StyleHub has earned a loyal customer.",
    date: "2026-02-27",
  },
  {
    id: "r-6",
    author: "Lucas Ferreira",
    avatar: avatar(8),
    location: "Lisbon, PT",
    rating: 5,
    title: "Customer service that cares",
    body: "Had a sizing question before ordering the sneakers and the team responded within the hour. The shoes themselves are stunning and supremely comfortable.",
    date: "2026-02-11",
  },
];

export const productReviews: Review[] = [
  {
    id: "pr-1",
    author: "Elena V.",
    avatar: avatar(25),
    location: "Verified Buyer",
    rating: 5,
    title: "Exceeded expectations",
    body: "The fabric quality is exceptional and the fit is true to the size guide. Highly recommend.",
    date: "2026-05-12",
  },
  {
    id: "pr-2",
    author: "Marcus T.",
    avatar: avatar(14),
    location: "Verified Buyer",
    rating: 5,
    title: "Beautifully made",
    body: "You can feel the difference in the construction. Worth the investment.",
    date: "2026-04-29",
  },
  {
    id: "pr-3",
    author: "Priya S.",
    avatar: avatar(48),
    location: "Verified Buyer",
    rating: 4,
    title: "Gorgeous, minor note",
    body: "Color is a touch deeper than the photos but I actually prefer it. Shipping was quick.",
    date: "2026-04-15",
  },
];

// ---------------------------------------------------------------------------
// Instagram gallery
// ---------------------------------------------------------------------------
export const instagramPosts = EDITORIAL.map((id, i) => ({
  id: `ig-${i}`,
  image: unsplash(id, 600, 600),
  likes: 1200 + i * 137,
  href: "https://instagram.com",
}));

// ---------------------------------------------------------------------------
// Hero + brand imagery
// ---------------------------------------------------------------------------
export const heroImage = unsplash(EDITORIAL[0], 1920, 2400);
export const heroImageAlt = unsplash(EDITORIAL[1], 1200, 1500);
export const brandStoryImage = unsplash(EDITORIAL[2], 1200, 1500);
export const brandStoryImageAlt = unsplash(EDITORIAL[9], 1000, 1300);

// ---------------------------------------------------------------------------
// Coupons (used by the cart)
// ---------------------------------------------------------------------------
export const coupons: Coupon[] = [
  {
    code: "STYLE10",
    type: "percent",
    value: 10,
    description: "10% off your order",
  },
  {
    code: "LUXE50",
    type: "fixed",
    value: 4000,
    minSubtotal: 32000,
    description: "₹4,000 off orders over ₹32,000",
  },
  {
    code: "WELCOME15",
    type: "percent",
    value: 15,
    minSubtotal: 20000,
    description: "15% off orders over ₹20,000",
  },
];

export function findCoupon(code: string) {
  return coupons.find((c) => c.code.toLowerCase() === code.toLowerCase().trim());
}
