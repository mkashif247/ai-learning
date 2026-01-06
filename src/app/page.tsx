import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Target,
  Brain,
  Code,
  TrendingUp,
  Clock,
  ChevronRight,
  Star,
  Users,
  BookOpen,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Roadmaps',
    description:
      'Generate personalized learning paths based on your goals, timeline, and skill level.',
  },
  {
    icon: Target,
    title: 'Interview Preparation',
    description:
      'Structured interview prep with focused topics, practice questions, and mock scenarios.',
  },
  {
    icon: Code,
    title: 'In-Browser Practice',
    description:
      'Write, run, and test code directly in the platform. No setup required.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Track your learning journey with detailed analytics and AI-powered insights.',
  },
  {
    icon: Clock,
    title: 'Time-Optimized',
    description:
      'Roadmaps adapted to your schedule - from 1 hour to 8 hours per day.',
  },
  {
    icon: BookOpen,
    title: 'Rich Content',
    description:
      'Learn without leaving the platform. AI-generated explanations and curated resources.',
  },
];

const stats = [
  { value: '10K+', label: 'Learners' },
  { value: '500+', label: 'Roadmaps' },
  { value: '95%', label: 'Success Rate' },
  { value: '4.9', label: 'Rating', icon: Star },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-violet-300">AI-Powered Learning Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6 leading-tight">
            Master Any Skill with{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Personalized Roadmaps
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Generate AI-powered learning paths, prepare for technical interviews, practice with
            real code, and track your progress — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-base gap-2">
                Start Learning Free
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-slate-100 mb-1">
                  {stat.value}
                  {stat.icon && <Star className="h-5 w-5 text-amber-400 fill-amber-400" />}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Stop jumping between platforms. Learn, practice, and track your progress in one
              unified experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 flex items-center justify-center mb-4 group-hover:from-violet-600/30 group-hover:to-indigo-600/30 transition-all">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-400">
              From goal to mastery in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Define Your Goal',
                description:
                  'Tell us what you want to learn, your timeline, and how much time you can dedicate daily.',
              },
              {
                step: '02',
                title: 'Get Your Roadmap',
                description:
                  'AI generates a personalized learning path with topics, resources, and practice exercises.',
              },
              {
                step: '03',
                title: 'Learn & Track',
                description:
                  'Follow your roadmap, practice coding, and track your progress with AI guidance.',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-violet-500/50 to-transparent" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xl font-bold mb-4 shadow-lg shadow-violet-500/25">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Users className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-300">Join thousands of learners</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Create your personalized roadmap in minutes. No credit card required.
          </p>
          <Link href="/register">
            <Button size="lg" className="text-base gap-2">
              Create Free Account
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-100">LearnPath</span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} LearnPath. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
