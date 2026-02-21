"use client";

import {
  BookOpen,
  LayoutDashboard,
  Map,
  PlusCircle,
  Settings,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmaps", label: "My Roadmaps", icon: Map },
  { href: "/roadmaps/new", label: "Create Roadmap", icon: PlusCircle },
  { href: "/learn", label: "Learning", icon: BookOpen },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = (): React.JSX.Element => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-slate-800 bg-slate-950 hidden lg:block">
      <nav className="p-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-900",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-violet-400" : "text-slate-500",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card - Refined */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <h4 className="text-sm font-medium text-slate-200 mb-1">
            Upgrade Plan
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Unlock unlimited AI features
          </p>
          <button className="w-full py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-900 hover:bg-white transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};
