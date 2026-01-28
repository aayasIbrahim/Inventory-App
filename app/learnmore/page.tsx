import Link from "next/link";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Demo Access
        </h2>

        <p className="text-gray-600 text-center mb-6">
          You can explore the dashboard using our demo account.
        </p>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Demo Email:</span>{" "}
            inventory@gmail.com
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Demo Password:</span>{" "}
         12345678
          </p>
        </div>

        <Link
          href="/sign-in"
          className="block w-full text-center bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Login with Demo Account
        </Link>

        <p className="text-xs text-gray-400 text-center mt-4">
          * Demo data is read-only
        </p>
      </div>
    </div>
  );
}