"use client";

import { Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex w-full font-sans relative">
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-lg font-semibold text-white lg:text-black tracking-tight">
          LearnPath
        </span>
      </Link>

      {/* Left side (Hidden on mobile) */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-[#EBEBFA] flex-col justify-center items-start p-24">
        <div className="max-w-xl">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-black flex flex-col gap-4 mb-8">
            <span>LearnPath</span>
            <span className="font-normal text-4xl lg:text-5xl text-black/80">
              Welcome back
            </span>
          </h1>
          <p className="text-2xl font-medium text-black mb-4">
            The Mentor You Never Had, Powered by AI
          </p>
          <p className="text-lg text-black/70 leading-relaxed">
            Generate personalized learning roadmaps with AI. Master new skills,
            prepare for interviews, and track your progress.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center p-6 bg-black min-h-screen lg:min-h-0">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/bg.svg"
            alt="AI Network Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 w-full max-w-sm flex flex-col gap-10">
          <h2 className="text-5xl font-light text-white text-center">
            Hello there
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error ? (
              <div className="p-4 rounded-3xl bg-red-500/20 border border-red-500/30 text-white backdrop-blur-md text-sm text-center">
                {error}
              </div>
            ) : null}

            <div className="space-y-4">
              <Input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={loading}
              className="w-full mt-4"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
            </Button>
            <div className="text-center mt-2">
              <Link
                href="/register"
                className="text-white/70 hover:text-white text-sm transition-colors drop-shadow-md"
              >
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
