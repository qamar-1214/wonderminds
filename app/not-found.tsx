import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="btn-primary">
            <Link href="/">Go Home</Link>
          </Button>

          <div className="text-sm text-gray-500">
            <Link
              href="/contact"
              className="hover:text-violet-600 transition-colors"
            >
              Contact us if you need help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
