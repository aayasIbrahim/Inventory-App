import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductDetails({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6 md:px-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8 space-y-6">

        {/* Header */}
        <div className="border-b pb-4 space-y-3">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              SKU: {product.sku || "N/A"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            {/* Back */}
            <Link
              href="/dashboard/inventory"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              ← Back
            </Link>

            {/* Edit */}
            <Link
              href={`/dashboard/inventory/edit/${product.id}`}
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
            >
              Edit Product
            </Link>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">

          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <p className="text-gray-500 text-xs sm:text-sm">Price</p>
            <p className="font-semibold text-purple-600 text-base sm:text-lg">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <p className="text-gray-500 text-xs sm:text-sm">Stock</p>
            <p className="font-semibold text-base sm:text-lg">
              {product.quantity} units
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <p className="text-gray-500 text-xs sm:text-sm">Low Stock At</p>
            <p className="font-semibold text-base sm:text-lg">
              {product.lowStockAt || "-"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <p className="text-gray-500 text-xs sm:text-sm">Created</p>
            <p className="font-semibold text-base sm:text-lg">
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
