import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 px-4">
      <div className="w-full max-w-md space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        
        <SignIn />

        <Link
          href="/"
          className="block text-center text-sm sm:text-base text-purple-600 hover:underline"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
}