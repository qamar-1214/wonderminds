"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-600">Error</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Something went wrong
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We encountered an unexpected error. Please try again or contact us
            if the problem persists.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <Button onClick={reset} className="btn-primary">
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
          </div>

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
