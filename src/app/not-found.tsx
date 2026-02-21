import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Custom 404 Not Found page
 */
export default function NotFoundPage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 p-8 text-center">
      <div className="text-8xl font-bold text-slate-800">404</div>
      <div>
        <h1 className="mb-2 text-2xl font-bold text-slate-100">
          Page not found
        </h1>
        <p className="max-w-md text-sm text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
