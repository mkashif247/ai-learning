"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Next.js app-level error page
 * Catches errors in route segments and displays a recovery UI
 */
export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps): React.JSX.Element {
  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: Logging the complete error to console is intentional for error reporting
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#06070b] p-8 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-red-500/6blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/10">
          <svg
            className="h-10 w-10 text-red-400/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            role="img"
            aria-label="Error icon"
          >
            <title>Error Details Placeholder</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div>
          <h1 className="mb-2 text-2xl font-semibold text-white/90">
            Something went wrong
          </h1>
          <p className="max-w-md text-sm text-white/35">
            An unexpected error occurred. You can try again or go back to the
            home page.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-white text-[#0a0b0f] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/90"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/3px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-white/15 hover:text-white/80 hover:bg-white/5]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
