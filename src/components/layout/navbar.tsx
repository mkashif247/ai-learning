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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              LearnPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {status === "authenticated" && session?.user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none p-1 pr-2 rounded-full hover:bg-white/5 transition-colors">
                      <Avatar className="h-8 w-8 border border-white/10">
                        <AvatarFallback className="bg-slate-900 text-xs text-slate-400">
                          {getInitials(session.user.name || "U")}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-3 w-3 text-slate-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-slate-950 border-slate-800"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-slate-200">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-slate-500">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="cursor-pointer text-slate-400 focus:text-white focus:bg-white/5"
                      >
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
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
                    className="text-slate-400 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-slate-950 hover:bg-slate-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
