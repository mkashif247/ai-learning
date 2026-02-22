import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Custom 404 Not Found page
 */
export default function NotFoundPage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black p-8 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="text-8xl font-bold text-white/4">404</div>
        <div>
          <h1 className="mb-2 text-2xl font-semibold text-white/90">
            Page not found
          </h1>
          <p className="max-w-md text-sm text-white/35">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-white text-[#0a0b0f] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
