"use client";

import { useState ,} from "react";
import { createProduct } from "@/lib/actions/product";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation"

import Link from "next/link";

export default function AddProductForm() {
    const router= useRouter()
  const { pending } = useFormStatus();
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

 async function handleSubmit(formData: FormData) {
  const res = await createProduct(formData);

  if (!res.error) {
    router.push("/dashboard/inventory"); 
  } else {
    setServerError(res.error || null);
      setFieldErrors(res.fieldErrors || {})
  }
}
  

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="md:ml-64 p-4 md:p-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Add Product
              </h1>
              <p className="text-sm text-gray-500">
                Add a new product to your inventory
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto md:mx-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <form
              className="space-y-6"
              action={handleSubmit} // Server Action wrapper
            >
              {serverError && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter Product Name"
                />
                {fieldErrors.name && <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                  {fieldErrors.quantity && <p className="text-red-600 text-sm mt-1">{fieldErrors.quantity}</p>}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.0"
                  />
                  {fieldErrors.price && <p className="text-red-600 text-sm mt-1">{fieldErrors.price}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                  SKU (optional)
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter SKU"
                />
                {fieldErrors.sku && <p className="text-red-600 text-sm mt-1">{fieldErrors.sku}</p>}
              </div>

              <div>
                <label htmlFor="lowStockAt" className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock At (optional)
                </label>
                <input
                  type="number"
                  id="lowStockAt"
                  name="lowStockAt"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter low stock threshold"
                />
                {fieldErrors.lowStockAt && <p className="text-red-600 text-sm mt-1">{fieldErrors.lowStockAt}</p>}
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-5 pt-4">
                <Link
                  href="/dashboard/inventory"
                  className="flex-1 sm:flex-none px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-center transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={pending}
                  className="cursor-pointer flex-1 sm:flex-none px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-60"
                >
                  {pending ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
