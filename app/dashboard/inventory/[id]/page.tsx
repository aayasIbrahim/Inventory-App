import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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
        <div className="border-b pb-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
            {product.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            SKU: {product.sku || "N/A"}
          </p>
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
