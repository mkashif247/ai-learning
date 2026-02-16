import {
  BookOpen,
  ChevronRight,
  Clock,
  Map,
  PlusCircle,
  Target,
} from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { authOptions } from "@/lib/auth";
import { connectDB, Roadmap } from "@/lib/db";
import { formatDate } from "@/lib/utils";

interface RoadmapItem {
  _id: string;
  title: string;
  goal: string;
  targetRole: string;
  timeline: { value: number; unit: string };
  createdAt: Date;
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

export default async function RoadmapsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }

  await connectDB();

  const roadmaps = await Roadmap.find({ userId: session.user.id })
    .select("title goal targetRole timeline createdAt phases")
    .sort({ createdAt: -1 })
    .lean();

  const roadmapsWithProgress: RoadmapItem[] = roadmaps.map((roadmap) => {
    let totalTopics = 0;
    let completedTopics = 0;

    roadmap.phases?.forEach((phase) => {
      phase.topics?.forEach((topic) => {
        totalTopics++;
        if (topic.status === "done") {
          completedTopics++;
        }
      });
    });

    return {
      _id: roadmap._id.toString(),
      title: roadmap.title,
      goal: roadmap.goal,
      targetRole: roadmap.targetRole,
      timeline: roadmap.timeline,
      createdAt: roadmap.createdAt,
      progress:
        totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
      totalTopics,
      completedTopics,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            My Roadmaps
          </h1>
          <p className="text-slate-400 mt-1">
            Manage and track your learning paths
          </p>
        </div>
        <Link href="/roadmaps/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Roadmap
          </Button>
        </Link>
      </div>

      {/* Roadmaps Grid */}
      {roadmapsWithProgress.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                <Map className="h-8 w-8 text-violet-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">
                No roadmaps yet
              </h3>
              <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
                Create your first AI-powered roadmap to start your learning
                journey
              </p>
              <Link href="/roadmaps/new">
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Roadmap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmapsWithProgress.map((roadmap) => (
            <Link key={roadmap._id} href={`/roadmaps/${roadmap._id}`}>
              <Card className="h-full hover:border-violet-500/30 transition-colors cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-100 truncate">
                        {roadmap.title}
                      </h3>
                      <p className="text-sm text-slate-400 truncate mt-1">
                        {roadmap.targetRole}
                      </p>
                    </div>
                    <Badge
                      variant={
                        roadmap.goal === "interview-prep"
                          ? "default"
                          : "secondary"
                      }
                      className="shrink-0"
                    >
                      {roadmap.goal === "interview-prep" ? (
                        <Target className="h-3 w-3 mr-1" />
                      ) : (
                        <BookOpen className="h-3 w-3 mr-1" />
                      )}
                      {roadmap.goal === "interview-prep"
                        ? "Interview"
                        : "Learning"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-200 font-medium">
                        {roadmap.progress}%
                      </span>
                    </div>
                    <Progress value={roadmap.progress} />
                    <p className="text-xs text-slate-500 mt-1">
                      {roadmap.completedTopics}/{roadmap.totalTopics} topics
                      completed
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {roadmap.timeline.value} {roadmap.timeline.unit}
                    </div>
                    <span>{formatDate(roadmap.createdAt)}</span>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-end text-sm text-violet-400 font-medium">
                    Continue
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
