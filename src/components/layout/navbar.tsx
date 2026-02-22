"use client";

import { ChevronDown, LogOut, Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

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

export const Navbar = (): React.JSX.Element => {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-[rgba(8,10,15,0.7)] backdrop-blur-2xl backdrop-saturate-150">
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
                    className="w-56 bg-[#0c0e14] border-white/10 backdrop-blur-2xl"
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

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-white/40 hover:text-white/80 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
