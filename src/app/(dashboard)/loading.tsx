/**
 * Dashboard route group loading skeleton
 * Shows animated pulse placeholders while content loads
 */
export default function DashboardLoading(): React.JSX.Element {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-xl bg-white/4" />
        <div className="h-4 w-96 animate-pulse rounded-xl bg-white/3" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`stat-${String(i)}`}
            className="rounded-2xl border border-white/6 bg-white/2 p-5"
          >
            <div className="mb-3 h-4 w-20 animate-pulse rounded-lg bg-white/4" />
            <div className="h-8 w-16 animate-pulse rounded-lg bg-white/3" />
          </div>
        ))}
      </div>

      {/* Content cards skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`card-${String(i)}`}
            className="rounded-2xl border border-white/6 bg-white/2 p-6"
          >
            <div className="mb-4 h-5 w-32 animate-pulse rounded-lg bg-white/4" />
            <div className="mb-2 h-3 w-full animate-pulse rounded-lg bg-white/3" />
            <div className="mb-4 h-3 w-2/3 animate-pulse rounded-lg bg-white/3" />
            <div className="h-2 w-full animate-pulse rounded-full bg-white/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
