/**
 * Roadmaps page loading skeleton
 */
export default function RoadmapsLoading(): React.JSX.Element {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-slate-800" />
          <div className="h-4 w-64 animate-pulse rounded-lg bg-slate-800/60" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-800" />
      </div>

      {/* Roadmap cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`roadmap-${String(i)}`}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="h-6 w-6 animate-pulse rounded bg-slate-800" />
              <div className="h-5 w-32 animate-pulse rounded bg-slate-800" />
            </div>
            <div className="mb-2 h-3 w-full animate-pulse rounded bg-slate-800/60" />
            <div className="mb-4 h-3 w-3/4 animate-pulse rounded bg-slate-800/60" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-slate-800/40" />
              <div className="h-2 w-24 animate-pulse rounded-full bg-slate-800/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
