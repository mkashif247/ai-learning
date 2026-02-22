import {
  BookOpen,
  ChevronRight,
  Clock,
  Map as MapIcon,
  PlusCircle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const stats = [
    { label: "Active Roadmaps", value: "0", icon: MapIcon, color: "indigo" },
    { label: "Topics Completed", value: "0", icon: Target, color: "emerald" },
    { label: "Hours Learned", value: "0", icon: Clock, color: "amber" },
    {
      label: "Current Streak",
      value: "0 days",
      icon: TrendingUp,
      color: "blue",
    },
  ];

  return (
    <div className="space-y-8">
      <WelcomeHeader
        userName={session?.user?.name?.split(" ")[0] || "Learner"}
      />
      <StatsGrid stats={stats} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActiveRoadmaps />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <WeeklyProgress />
        </div>
      </div>
    </div>
  );
}

function WelcomeHeader({ userName }: { userName: string }): React.JSX.Element {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white/90 tracking-tight">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-white/35 mt-1">
          Track your progress and continue learning
        </p>
      </div>
      <Link href="/roadmaps/new">
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Roadmap
        </Button>
      </Link>
    </div>
  );
}

function StatsGrid({
  stats,
}: {
  stats: {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
  }[];
}): React.JSX.Element {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colorMap: Record<string, { bg: string; text: string }> = {
          indigo: {
            bg: "rgba(99, 102, 241, 0.1)",
            text: "#818cf8",
          },
          emerald: {
            bg: "rgba(16, 185, 129, 0.1)",
            text: "#34d399",
          },
          amber: {
            bg: "rgba(245, 158, 11, 0.1)",
            text: "#fbbf24",
          },
          blue: {
            bg: "rgba(59, 130, 246, 0.1)",
            text: "#60a5fa",
          },
        };

        const colors = colorMap[stat.color] ?? {
          bg: "rgba(59, 130, 246, 0.1)",
          text: "#60a5fa",
        };

        return (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: colors.bg }}
                >
                  <Icon className="h-5 w-5" style={{ color: colors.text }} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white/90">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/30">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ActiveRoadmaps(): React.JSX.Element {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Your Roadmaps</CardTitle>
          <CardDescription>Continue where you left off</CardDescription>
        </div>
        <Link href="/roadmaps">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center mx-auto mb-4">
            <MapIcon className="h-8 w-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-medium text-white/80 mb-2">
            No roadmaps yet
          </h3>
          <p className="text-sm text-white/35 mb-4 max-w-sm mx-auto">
            Create your first AI-powered roadmap to start your learning journey
          </p>
          <Link href="/roadmaps/new">
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Roadmap
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions(): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/roadmaps/new" className="block">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/80">
                Generate Roadmap
              </p>
              <p className="text-xs text-white/30">
                Create AI-powered learning path
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 cursor-default opacity-50">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/60">
              Browse Templates
            </p>
            <p className="text-xs text-white/25">Coming soon</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WeeklyProgress(): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">This Week</CardTitle>
        <CardDescription>Your learning progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/35">Topics Completed</span>
            <span className="text-white/70 font-medium">0/0</span>
          </div>
          <Progress value={0} />
        </div>
        <div className="text-center py-4">
          <Badge variant="secondary">Start learning to track progress</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
