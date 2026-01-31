import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // ✅ SERVER ACTION
  async function updateProduct(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    await prisma.product.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        quantity: Number(formData.get("quantity")),
        price: Number(formData.get("price")),
        sku: (formData.get("sku") as string) || null,
        lowStockAt: formData.get("lowStockAt")
          ? Number(formData.get("lowStockAt"))
          : null,
      },
    });

    redirect("/dashboard/inventory");
  }

  // ✅ FETCH PRODUCT
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return notFound();

  // ✅ CONVERT PRISMA DECIMAL → PLAIN JS
  const safeProduct = {
    ...product,
    price: product.price.toNumber(),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="md:ml-64 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Edit Product
          </h1>
          <p className="text-sm text-gray-500">
            Update product information
          </p>
        </div>

        <div className="max-w-2xl mx-auto md:mx-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <form className="space-y-6" action={updateProduct}>
              {/* hidden id */}
              <input type="hidden" name="id" value={safeProduct.id} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  name="name"
                  defaultValue={safeProduct.name}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={safeProduct.quantity}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    defaultValue={safeProduct.price}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  SKU (optional)
                </label>
                <input
                  name="sku"
                  defaultValue={safeProduct.sku ?? ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Low Stock At
                </label>
                <input
                  type="number"
                  name="lowStockAt"
                  defaultValue={safeProduct.lowStockAt ?? ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Link
                  href="/dashboard/inventory"
                  className="px-6 py-3 bg-gray-200 rounded-lg text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
