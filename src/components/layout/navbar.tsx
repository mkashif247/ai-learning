"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Map as MapIcon,
  Menu,
  PlusCircle,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmaps", label: "My Roadmaps", icon: MapIcon },
  { href: "/roadmaps/new", label: "Create Roadmap", icon: PlusCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Navbar = (): React.JSX.Element => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change (render-phase state update)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, handleKeyDown]);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-black/40 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-white/90 tracking-tight">
                LearnPath
              </span>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav
              session={session}
              status={status}
              getInitials={getInitials}
            />

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-white/40 hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen ? (
        <MobileMenu
          session={session}
          status={status}
          pathname={pathname}
          onClose={() => setMobileMenuOpen(false)}
        />
      ) : null}
    </>
  );
};

// ── Desktop Nav ──────────────────────────────────────────────────────────────

function DesktopNav({
  session,
  status,
  getInitials,
}: {
  session: ReturnType<typeof useSession>["data"];
  status: string;
  getInitials: (name: string) => string;
}): React.JSX.Element {
  return (
    <div className="hidden md:flex items-center gap-3">
      {status === "authenticated" && session?.user ? (
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/40 hover:text-white/80"
            >
              Dashboard
            </Button>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 outline-none p-1 pr-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Avatar className="h-8 w-8 border border-white/10">
                  <AvatarFallback className="bg-white/10 text-xs text-white/50">
                    {getInitials(session.user.name || "U")}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3 w-3 text-white/30" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-black/80 border-white/10 backdrop-blur-2xl"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white/80">
                    {session.user.name}
                  </p>
                  <p className="text-xs leading-none text-white/30">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer text-white/50 focus:text-white/90 focus:bg-white/10"
                >
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400/80 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white/40 hover:text-white/80"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-[#0a0b0f] hover:bg-white/90 shadow-sm shadow-white/10">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  session,
  status,
  pathname,
  onClose,
}: {
  session: ReturnType<typeof useSession>["data"];
  status: string;
  pathname: string;
  onClose: () => void;
}): React.JSX.Element {
  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm border-none shadow-none cursor-default w-full h-full"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
        aria-label="Close menu"
      />

      {/* Panel */}
      <div className="absolute top-16 right-0 bottom-0 w-72 bg-black/90 backdrop-blur-2xl border-l border-white/10 p-6 animate-in slide-in-from-right duration-200">
        {status === "authenticated" && session?.user ? (
          <div className="flex flex-col h-full">
            {/* User info */}
            <div className="flex items-center gap-3 pb-6 border-b border-white/10">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm text-white/50 font-medium">
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white/80 truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-white/30 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 py-4 space-y-1">
              {mobileNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-white/40 hover:text-white/70 hover:bg-white/5",
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

            {/* Sign out */}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-4">
            <Link href="/login" className="block">
              <Button
                variant="ghost"
                className="w-full text-white/40 hover:text-white/80"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="block">
              <Button className="w-full bg-white text-[#0a0b0f] hover:bg-white/90">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
