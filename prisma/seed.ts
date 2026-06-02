import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  categories,
  products,
  productReviews,
  coupons,
} from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding StyleHub database...");

  // Clean (order matters for FKs)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // Categories
  const categoryBySlug = new Map<string, string>();
  for (const c of categories) {
    const created = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image,
      },
    });
    categoryBySlug.set(c.slug, created.id);
  }
  console.log(`  ✓ ${categories.length} categories`);

  // Products + reviews
  for (const p of products) {
    const created = await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        images: p.images,
        collection: p.collection,
        categoryName: p.category,
        sizes: p.sizes,
        colors: JSON.parse(JSON.stringify(p.colors)),
        rating: p.rating,
        reviewCount: p.reviewCount,
        isNew: p.isNew ?? false,
        isBestSeller: p.isBestSeller ?? false,
        isTrending: p.isTrending ?? false,
        stock: p.stock,
        categoryId: categoryBySlug.get(p.collection) ?? null,
      },
    });

    await prisma.review.createMany({
      data: productReviews.map((r) => ({
        productId: created.id,
        author: r.author,
        avatar: r.avatar,
        rating: r.rating,
        title: r.title,
        body: r.body,
      })),
    });
  }
  console.log(`  ✓ ${products.length} products (+ reviews)`);

  // Coupons
  await prisma.coupon.createMany({
    data: coupons.map((c) => ({
      code: c.code,
      type: c.type,
      value: c.value,
      minSubtotal: c.minSubtotal ?? null,
      description: c.description,
    })),
  });
  console.log(`  ✓ ${coupons.length} coupons`);

  // Users
  const adminHash = await bcrypt.hash("admin12345", 10);
  const userHash = await bcrypt.hash("user12345", 10);

  await prisma.user.create({
    data: {
      name: "StyleHub Admin",
      email: "admin@stylehub.com",
      passwordHash: adminHash,
      role: Role.ADMIN,
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      name: "Demo Customer",
      email: "user@stylehub.com",
      passwordHash: userHash,
      role: Role.USER,
      addresses: {
        create: {
          fullName: "Demo Customer",
          line1: "12 Savile Row",
          city: "London",
          state: "England",
          zip: "W1S 3PQ",
          country: "United Kingdom",
          phone: "+44 20 7946 0000",
          isDefault: true,
        },
      },
    },
  });
  console.log("  ✓ admin@stylehub.com / admin12345  (ADMIN)");
  console.log("  ✓ user@stylehub.com / user12345   (USER)");

  // A sample order for the demo user
  const sample = products.slice(0, 2);
  const subtotal = sample.reduce((s, p) => s + p.price, 0);
  await prisma.order.create({
    data: {
      number: "SH-DEMO01",
      userId: demoUser.id,
      email: demoUser.email,
      status: "DELIVERED",
      subtotal,
      shipping: 0,
      tax: Math.round(subtotal * 0.08 * 100) / 100,
      total: subtotal + Math.round(subtotal * 0.08 * 100) / 100,
      shippingMethod: "standard",
      shippingAddress:
        "12 Savile Row, London, England W1S 3PQ, United Kingdom",
      items: {
        create: sample.map((p) => ({
          name: p.name,
          image: p.images[0],
          price: p.price,
          size: p.sizes[0],
          color: p.colors[0]?.name ?? "",
          quantity: 1,
        })),
      },
    },
  });
  console.log("  ✓ 1 sample order");

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
