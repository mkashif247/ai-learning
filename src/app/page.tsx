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
import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";

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
    <main className="min-h-screen bg-[#EBEBFA] font-sans selection:bg-black/10">
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
    <section className="relative min-h-screen flex flex-col lg:flex-row w-full pt-16 lg:pt-0">
      {/* Left side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 mb-8 w-fit backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-black/70" />
          <span className="text-xs font-medium text-black/60 tracking-widest uppercase">
            AI-Powered Learning
          </span>
        </div>

        <h1 className="text-6xl lg:text-8xl font-bold tracking-tight text-black flex flex-col gap-4 mb-8">
          <span>Master any</span>
          <span className="font-normal text-6xl lg:text-7xl">skill today.</span>
        </h1>

        <p className="text-xl text-black/60 mb-12 max-w-xl font-light leading-relaxed">
          Intelligent, adaptive roadmaps that cut the noise. Focus on exactly
          what you need to learn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link href="/register" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto h-14 px-10 text-base rounded-full bg-black text-white font-medium hover:bg-black/90 transition-all shadow-xl shadow-black/10"
            >
              Start Learning
            </button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto h-14 px-10 text-base rounded-full bg-transparent border-2 border-black/20 text-black hover:bg-black/5 font-medium transition-all"
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Right side SVG Background */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[50vh] lg:min-h-screen bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/bg.svg"
            alt="AI Network Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 w-full max-w-sm flex-col gap-6 p-8 rounded-3xl bg-white/20 border border-white/40 backdrop-blur-md shadow-2xl hidden lg:flex">
          <h3 className="text-3xl font-light text-white">Focus mode</h3>
          <p className="text-white/80">
            Immerse yourself in our distraction-free learning environment.
            Personalized paths and robust tracking.
          </p>
          <div className="h-2 w-24 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection(): React.JSX.Element {
  return (
    <section className="py-28 px-4 relative bg-[#EBEBFA] border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Stop jumping between platforms. Learn, practice, and track your
            progress in one unified experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-3xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all duration-300 shadow-xl shadow-black/5"
              >
                <div className="relative h-14 w-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black/10 transition-all duration-300">
                  <Icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-black/60 text-base leading-relaxed">
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
    <section className="py-28 px-4 relative bg-white border-t border-black/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-black/60">
            From goal to mastery in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-[28px] left-[20%] w-[60%] h-0.5 bg-black/5" />
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
          ].map((item) => (
            <div
              key={item.step}
              className="relative z-10 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-white border-4 border-[#EBEBFA] text-black text-xl font-bold flex items-center justify-center mb-8 shadow-xl shadow-black/5">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                {item.title}
              </h3>
              <p className="text-black/60 text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection(): React.JSX.Element {
  return (
    <section className="py-32 px-4 relative bg-[#EBEBFA]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />

      <div className="max-w-4xl mx-auto text-center px-6 py-16 rounded-3xl bg-white/40 border border-white/60 shadow-2xl shadow-black/5 backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 border border-black/10 mb-8 w-fit mx-auto">
          <Users className="h-4 w-4 text-black/70" />
          <span className="text-sm text-black/80 font-medium">
            Join thousands of learners
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 tracking-tight">
          Start Your Learning Journey
        </h2>
        <p className="text-xl text-black/60 mb-10 max-w-xl mx-auto font-light">
          Create your personalized roadmap in minutes. No credit card required.
        </p>
        <Link href="/register" className="inline-block">
          <button
            type="button"
            className="flex items-center gap-2 h-14 px-10 rounded-full bg-black text-white text-lg font-medium hover:bg-black/90 transition-all shadow-xl shadow-black/10"
          >
            Create Free Account
            <ChevronRight className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </section>
  );
}

function Footer(): React.JSX.Element {
  return (
    <footer className="py-12 px-4 bg-white border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black shadow-lg shadow-black/10">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-black tracking-tight">
              LearnPath
            </span>
          </div>
          <p className="text-sm text-black/50 font-medium">
            © {new Date().getFullYear()} LearnPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
