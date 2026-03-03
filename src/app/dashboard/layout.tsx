import { ReactNode } from 'react';
import { Header } from '@/shared/components/layout/Header';

export default function DashboardLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 hidden md:block p-4 sticky top-16 h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-2">
            <a
              href="/dashboard"
              className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium"
            >
              Overview
            </a>
            <a
              href="/dashboard/roadmaps"
              className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
            >
              My Roadmaps
            </a>
            <a
              href="/dashboard/practice"
              className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
            >
              Practice Arena
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
