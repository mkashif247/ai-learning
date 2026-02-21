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
    // TODO: Log to Sentry in production
    // eslint-disable-next-line no-console
    console.error("[AppError]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10">
        <svg
          className="h-10 w-10 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <div>
        <h1 className="mb-2 text-2xl font-bold text-slate-100">
          Something went wrong
        </h1>
        <p className="max-w-md text-sm text-slate-400">
          An unexpected error occurred. You can try again or go back to the home
          page.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
