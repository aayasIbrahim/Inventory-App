"use server";
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

type ActionResponse = {
  error?: string;
  fieldErrors?: Partial<{
    name: string;
    price: string;
    quantity: string;
    lowStockAt: string;
    sku: string;
    error:string;
  }>;
};

export async function createProduct(formData: FormData): Promise<ActionResponse> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
    return { error: "Unauthorized" }; // stop execution after redirect
  }

  // Parse form data safely
  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ActionResponse["fieldErrors"] = {};
    parsed.error.issues.forEach((issue) => {
      if (issue.path[0]) fieldErrors[issue.path[0] as keyof typeof fieldErrors] = issue.message;
    });

    return {
      error: "Invalid input",
      fieldErrors,
    };
  }

  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });

    redirect("/dashboard/inventory"); 
   
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong. Please try again." };
  }
}
