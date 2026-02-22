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
import { redirect } from "next/navigation";
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
import { connectDB, Roadmap } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// ── Data fetching helpers ─────────────────────────────────────────────────────

interface DashboardRoadmap {
  _id: string;
  title: string;
  goal: string;
  targetRole: string;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  totalMinutes: number;
}

async function getDashboardData(userId: string) {
  await connectDB();

  const roadmaps = await Roadmap.find({ userId })
    .select("title goal targetRole createdAt updatedAt phases")
    .sort({ updatedAt: -1 })
    .lean();

  let totalTopicsCompleted = 0;
  let totalTopicsAll = 0;
  let totalMinutesAll = 0;

  const roadmapsWithProgress: DashboardRoadmap[] = roadmaps.map((roadmap) => {
    let total = 0;
    let completed = 0;
    let minutes = 0;

    roadmap.phases?.forEach((phase) => {
      phase.topics?.forEach((topic) => {
        total++;
        minutes += topic.estimatedMinutes || 0;
        if (topic.status === "done") {
          completed++;
        }
      });
    });

    totalTopicsCompleted += completed;
    totalTopicsAll += total;
    totalMinutesAll += minutes;

    return {
      _id: roadmap._id.toString(),
      title: roadmap.title,
      goal: roadmap.goal,
      targetRole: roadmap.targetRole,
      createdAt: roadmap.createdAt,
      updatedAt: roadmap.updatedAt,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
      totalTopics: total,
      completedTopics: completed,
      totalMinutes: minutes,
    };
  });

  const hoursLearned = Math.round((totalMinutesAll / 60) * 10) / 10;

  return {
    roadmaps: roadmapsWithProgress,
    stats: {
      activeRoadmaps: roadmaps.length,
      topicsCompleted: totalTopicsCompleted,
      totalTopics: totalTopicsAll,
      hoursLearned,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { roadmaps, stats } = await getDashboardData(session.user.id);

  const statItems = [
    {
      label: "Active Roadmaps",
      value: String(stats.activeRoadmaps),
      icon: MapIcon,
      color: "indigo",
    },
    {
      label: "Topics Completed",
      value: String(stats.topicsCompleted),
      icon: Target,
      color: "emerald",
    },
    {
      label: "Hours Learned",
      value: String(stats.hoursLearned),
      icon: Clock,
      color: "amber",
    },
    {
      label: "Current Streak",
      value: stats.activeRoadmaps > 0 ? "1 day" : "0 days",
      icon: TrendingUp,
      color: "blue",
    },
  ];

  return (
    <div className="space-y-8">
      <WelcomeHeader userName={session.user.name?.split(" ")[0] || "Learner"} />
      <StatsGrid stats={statItems} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActiveRoadmaps roadmaps={roadmaps.slice(0, 3)} />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <WeeklyProgress
            completed={stats.topicsCompleted}
            total={stats.totalTopics}
          />
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

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

function ActiveRoadmaps({
  roadmaps,
}: {
  roadmaps: DashboardRoadmap[];
}): React.JSX.Element {
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
        {roadmaps.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center mx-auto mb-4">
              <MapIcon className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-white/80 mb-2">
              No roadmaps yet
            </h3>
            <p className="text-sm text-white/35 mb-4 max-w-sm mx-auto">
              Create your first AI-powered roadmap to start your learning
              journey
            </p>
            <Link href="/roadmaps/new">
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Roadmap
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {roadmaps.map((roadmap) => (
              <Link
                key={roadmap._id}
                href={`/roadmaps/${roadmap._id}`}
                className="block"
              >
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                    {roadmap.goal === "interview-prep" ? (
                      <Target className="h-5 w-5 text-indigo-400" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-indigo-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">
                      {roadmap.title}
                    </p>
                    <p className="text-xs text-white/30 mt-0.5">
                      {roadmap.completedTopics}/{roadmap.totalTopics} topics •{" "}
                      {formatDate(roadmap.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-20">
                      <Progress value={roadmap.progress} />
                    </div>
                    <span className="text-xs text-white/40 w-8 text-right">
                      {roadmap.progress}%
                    </span>
                    <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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

function WeeklyProgress({
  completed,
  total,
}: {
  completed: number;
  total: number;
}): React.JSX.Element {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Overall Progress</CardTitle>
        <CardDescription>Your learning progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/35">Topics Completed</span>
            <span className="text-white/70 font-medium">
              {completed}/{total}
            </span>
          </div>
          <Progress value={percent} />
        </div>
        {total === 0 ? (
          <div className="text-center py-4">
            <Badge variant="secondary">Start learning to track progress</Badge>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-white/30">
              {percent}% of all topics completed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
