"use client";

import {
  BookOpen,
  LayoutDashboard,
  Map as MapIcon,
  PlusCircle,
  Settings,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmaps", label: "My Roadmaps", icon: MapIcon },
  { href: "/roadmaps/new", label: "Create Roadmap", icon: PlusCircle },
  { href: "/learn", label: "Learning", icon: BookOpen },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = (): React.JSX.Element => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-white/6 bg-[rgba(8,10,15,0.5)] backdrop-blur-2xl hidden lg:block">
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
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/6 text-white/90 border border-white/6]"
                  : "text-white/40 hover:text-white/70 hover:bg-white/3]",
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px]",
                  isActive ? "text-indigo-400" : "text-white/30",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="rounded-xl liquid-glass p-4">
          <h4 className="text-sm font-medium text-white/70 mb-1">
            Upgrade Plan
          </h4>
          <p className="text-xs text-white/30 mb-3">
            Unlock unlimited AI features
          </p>
          <button
            type="button"
            className="w-full py-2 text-xs font-medium rounded-lg bg-white text-[#0a0b0f] hover:bg-white/90 transition-colors"
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};
