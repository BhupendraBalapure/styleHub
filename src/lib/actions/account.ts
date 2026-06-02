"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return session.user.id;
}

const profileSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
});

export async function updateProfile(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData
) {
  try {
    const userId = await requireUser();
    const parsed = profileSchema.safeParse({ name: formData.get("name") });
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid" };
    }
    await prisma.user.update({
      where: { id: userId },
      data: { name: parsed.data.name },
    });
    revalidatePath("/account");
    return { ok: true };
  } catch {
    return { error: "Could not update profile." };
  }
}

const addressSchema = z.object({
  fullName: z.string().min(2, "Required"),
  line1: z.string().min(3, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  zip: z.string().min(3, "Required"),
  country: z.string().min(2, "Required"),
  phone: z.string().optional(),
});

export async function addAddress(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData
) {
  try {
    const userId = await requireUser();
    const parsed = addressSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid" };
    }
    const count = await prisma.address.count({ where: { userId } });
    await prisma.address.create({
      data: { ...parsed.data, userId, isDefault: count === 0 },
    });
    revalidatePath("/account/addresses");
    return { ok: true };
  } catch {
    return { error: "Could not save address." };
  }
}

export async function deleteAddress(formData: FormData) {
  const userId = await requireUser();
  const id = String(formData.get("id"));
  await prisma.address.deleteMany({ where: { id, userId } });
  revalidatePath("/account/addresses");
}

export async function setDefaultAddress(formData: FormData) {
  const userId = await requireUser();
  const id = String(formData.get("id"));
  await prisma.address.updateMany({
    where: { userId },
    data: { isDefault: false },
  });
  await prisma.address.updateMany({
    where: { id, userId },
    data: { isDefault: true },
  });
  revalidatePath("/account/addresses");
}
