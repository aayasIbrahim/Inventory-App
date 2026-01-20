import React from 'react'
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from '@/lib/auth';
import { deleteProduct } from '@/lib/actions/product';

async function page() {
  //   const [totalCount, items] = await Promise.all([
  //   prisma.product.count({ where }),
  //   prisma.product.findMany({
  //     where,
  //     orderBy: { createdAt: "desc" },
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   }),
  // ]);
  const user=await getCurrentUser()
  const userId=user.id
  const product=await prisma.product.findMany({
    where:{
      userId
    }
  })

  return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Low Stock At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {product.map((product, key) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-900">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {product.lowStockAt || "-"}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                          await deleteProduct(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={product.id} />
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  )
}

export default page