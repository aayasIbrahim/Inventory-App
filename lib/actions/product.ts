
"use server"
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function deleteProduct(formdata: FormData) {
  const user = await getCurrentUser();
  const userId = user.id;
  const id = String(formdata.get("id") || "");
  await prisma.product.deleteMany({
    where: {
      id: id,
      userId: userId,
    },
  });
}
const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});
export async function createProduct(formdata: FormData) {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formdata.get("name"),
    price: formdata.get("price"),
    quantity: formdata.get("quantity"),
    sku: formdata.get("sku") || undefined,
    lowStockAt: formdata.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });
    redirect("/dashboard/inventory");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create product.");
  }
}
