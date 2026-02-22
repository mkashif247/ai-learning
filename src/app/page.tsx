import {
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  Code,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Roadmaps",
    description:
      "Generate personalized learning paths based on your goals, timeline, and skill level.",
  },
  {
    icon: Target,
    title: "Interview Preparation",
    description:
      "Structured interview prep with focused topics, practice questions, and mock scenarios.",
  },
  {
    icon: Code,
    title: "In-Browser Practice",
    description:
      "Write, run, and test code directly in the platform. No setup required.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Track your learning journey with detailed analytics and AI-powered insights.",
  },
  {
    icon: Clock,
    title: "Time-Optimized",
    description:
      "Roadmaps adapted to your schedule — from 1 hour to 8 hours per day.",
  },
  {
    icon: BookOpen,
    title: "Rich Content",
    description:
      "Learn without leaving the platform. AI-generated explanations and curated resources.",
  },
];

export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#06070b]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}

function HeroSection(): React.JSX.Element {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-20 px-4 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-indigo-500/7] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/5] blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8] bg-white/3mb-10 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span className="text-xs font-medium text-white/50 tracking-widest uppercase">
            AI-Powered Learning
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white/95 mb-6 leading-[1.05]">
          Master any{" "}
          <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            skill
          </span>
          .
          <br />
          <span className="text-white/30">Zero complexity.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/35 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
          Intelligent, adaptive roadmaps that cut the noise. Focus on exactly
          what you need to learn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base">
              Start Learning
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-10 text-base"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#06070b] to-transparent pointer-events-none" />
    </section>
  );
}

function FeaturesSection(): React.JSX.Element {
  return (
    <section className="py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-4 tracking-tight">
            Everything You Need to Learn
          </h2>
          <p className="text-base text-white/35 max-w-xl mx-auto">
            Stop jumping between platforms. Learn, practice, and track your
            progress in one unified experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-white/2border border-white/6hover:border-white/[0.12hover:bg-white/4transition-all duration-500"
              >
                <div className="relative h-11 w-11 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center mb-5 group-hover:bg-indigo-500/15 transition-all duration-500">
                  <Icon className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-base font-medium text-white/85 mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection(): React.JSX.Element {
  return (
    <section className="py-28 px-4 relative">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-linear-to-r from-transparent via-white/8] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-base text-white/35">
            From goal to mastery in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Define Your Goal",
              description:
                "Tell us what you want to learn, your timeline, and how much time you can dedicate daily.",
            },
            {
              step: "02",
              title: "Get Your Roadmap",
              description:
                "AI generates a personalized learning path with topics, resources, and practice exercises.",
            },
            {
              step: "03",
              title: "Learn & Track",
              description:
                "Follow your roadmap, practice coding, and track your progress with AI guidance.",
            },
          ].map((item, index) => (
            <div key={item.step} className="relative">
              {index < 2 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-linear-to-r from-white/8] to-transparent" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/4border border-white/8] text-white/70 text-lg font-semibold mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-medium text-white/85 mb-2">
                  {item.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection(): React.JSX.Element {
  return (
    <section className="py-28 px-4 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-linear-to-r from-transparent via-white/8] to-transparent" />

      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/15 mb-8">
          <Users className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs text-emerald-300/80 font-medium">
            Join thousands of learners
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold text-white/90 mb-6 tracking-tight">
          Start Your Learning Journey Today
        </h2>
        <p className="text-base text-white/35 mb-10 max-w-lg mx-auto">
          Create your personalized roadmap in minutes. No credit card required.
        </p>
        <Link href="/register">
          <Button size="lg" className="text-base gap-2 h-12 px-8">
            Create Free Account
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function Footer(): React.JSX.Element {
  return (
    <footer className="py-12 px-4 border-t border-white/6]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-base font-semibold text-white/70">
              LearnPath
            </span>
          </div>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} LearnPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
