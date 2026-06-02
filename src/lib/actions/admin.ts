"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Forbidden");
}

const toList = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().optional(),
  collection: z.enum(["men", "women", "accessories", "footwear"]),
  categoryName: z.string().min(1),
  stock: z.coerce.number().int().min(0),
});

function parseProduct(formData: FormData) {
  const parsed = productSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    compareAtPrice: formData.get("compareAtPrice") || undefined,
    collection: formData.get("collection"),
    categoryName: formData.get("categoryName"),
    stock: formData.get("stock"),
  });
  const images = toList(formData.get("images"));
  const sizes = toList(formData.get("sizes"));
  const colors = toList(formData.get("colors")).map((name) => ({
    name,
    hex: "#0F0F0F",
  }));
  return {
    ...parsed,
    compareAtPrice: parsed.compareAtPrice ?? null,
    images: images.length ? images : ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"],
    sizes: sizes.length ? sizes : ["One Size"],
    colors,
    isNew: formData.get("isNew") === "on",
    isBestSeller: formData.get("isBestSeller") === "on",
    isTrending: formData.get("isTrending") === "on",
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const data = parseProduct(formData);
  const slug = `${slugify(data.name)}-${Math.floor(Date.now() / 1000) % 100000}`;
  await prisma.product.create({ data: { ...data, slug } });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const data = parseProduct(formData);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name"));
  if (name.length < 2) return;
  await prisma.category.create({
    data: {
      name,
      slug: slugify(name),
      description: String(formData.get("description") || ""),
      image: String(formData.get("image") || "") || null,
    },
  });
  revalidatePath("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

const STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) return;
  await prisma.order.update({
    where: { id },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { status: status as any },
  });
  revalidatePath("/admin/orders");
}
