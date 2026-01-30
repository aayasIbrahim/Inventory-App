import React from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { deleteProduct } from "@/lib/actions/product";
import Pagination from "@/components/Pagination";
import Link from "next/link";

async function inventory({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="p-4 md:p-0">
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Inventory
        </h1>
        <p className="text-sm text-gray-500">
          Manage your products and track inventory levels.
        </p>
      </div>

      <div className="space-y-6">
        {/* Search Bar - Full width on mobile */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <form
            className="flex flex-col sm:flex-row gap-2"
            action="/dashboard/inventory"
            method="GET"
          >
            <input
              name="q"
              defaultValue={q}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Search
            </button>
          </form>
        </div>

        {/* Mobile View: List of Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-xs text-gray-500">
                    SKU: {product.sku || "N/A"}
                  </p>
                </div>
                <p className="font-semibold text-purple-600">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50 my-3 text-sm">
                <div>
                  <span className="text-gray-500 block">Stock</span>
                  <span className="font-medium">{product.quantity} units</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Low Stock At</span>
                  <span className="font-medium">
                    {product.lowStockAt || "-"}
                  </span>
                </div>
              </div>

              <form
                action={async (formData: FormData) => {
                  "use server";
                  await deleteProduct(formData);
                }}
              >
                <input type="hidden" name="id" value={product.id} />
                <button className="w-full py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100">
                  Delete Product
                </button>
              </form>
              <Link
                href={`/dashboard/inventory/${product.id}`}
                className="text-blue-600 hover:underline mr-3"
              >
                View
              </Link>

              <Link
                href={`/dashboard/inventory/${product.id}/edit`}
                className="text-purple-600 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Low Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.lowStockAt || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <ul className="flex items-center gap-4">
                        <li>
                          <form
                            action={async (formData: FormData) => {
                              "use server";
                              await deleteProduct(formData);
                            }}
                          >
                            <input type="hidden" name="id" value={product.id} />
                            <button className="text-red-600 hover:text-red-900 font-medium">
                              Delete
                            </button>
                          </form>
                        </li>

                        <li>
                          <Link
                            href={`/dashboard/inventory/${product.id}`}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            View
                          </Link>
                        </li>

                        <li>
                          <Link
                            href={`/dashboard/inventory/${product.id}/edit`}
                            className="text-purple-600 hover:underline font-medium"
                          >
                            Edit
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Container */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/dashboard/inventory"
              searchParams={{ q, pageSize: String(pageSize) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default inventory;
