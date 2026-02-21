"use client";

import {
  ArrowLeft,
  BookOpen,
  Clock,
  Loader2,
  MessageSquare,
  Target,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { RoadmapView, TopicContent } from "@/components/roadmap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateProgress, formatDate, formatDuration } from "@/lib/utils";
import type { Phase, Roadmap, Topic } from "@/types";

interface RoadmapDetailClientProps {
  roadmap: Roadmap & { phases: Phase[] };
}

export default function RoadmapDetailClient({
  roadmap,
}: RoadmapDetailClientProps): React.JSX.Element {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showTutor, setShowTutor] = useState(false);
  const [tutorMessage, setTutorMessage] = useState("");
  const [tutorResponse, setTutorResponse] = useState("");
  const [tutorLoading, setTutorLoading] = useState(false);

  // Calculate progress
  let totalTopics = 0;
  let completedTopics = 0;
  let totalMinutes = 0;

  roadmap.phases.forEach((phase) => {
    phase.topics.forEach((topic) => {
      totalTopics++;
      totalMinutes += topic.estimatedMinutes;
      if (topic.status === "done") {
        completedTopics++;
      }
    });
  });

  const progress = calculateProgress(completedTopics, totalTopics);

  const handleDelete = async (): Promise<void> => {
    if (!confirm("Are you sure you want to delete this roadmap?")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/roadmaps/${roadmap._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        router.push("/roadmaps");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleTutorSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!tutorMessage.trim()) {
      return;
    }

    setTutorLoading(true);
    setTutorResponse("");

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: tutorMessage,
          context: {
            roadmapTitle: roadmap.title,
            currentTopic: selectedTopic?.title,
          },
        }),
      });

      const reader = res.body?.getReader();
      if (!reader) {
        return;
      }

      await readStream(reader, setTutorResponse);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Tutor error:", error);
      setTutorResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setTutorLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <RoadmapHeader
        roadmap={roadmap}
        deleting={deleting}
        onDelete={handleDelete}
        onToggleTutor={() => setShowTutor(!showTutor)}
      />

      <RoadmapStats
        progress={progress}
        completedTopics={completedTopics}
        totalTopics={totalTopics}
        phasesCount={roadmap.phases.length}
        totalMinutes={totalMinutes}
      />

      {showTutor ? (
        <>
          <TutorPanel
            tutorResponse={tutorResponse}
            tutorMessage={tutorMessage}
            tutorLoading={tutorLoading}
            setTutorMessage={setTutorMessage}
            handleTutorSubmit={handleTutorSubmit}
          />
        </>
      ) : null}

      <RoadmapView
        phases={roadmap.phases}
        roadmapId={roadmap._id}
        onTopicClick={(topic) => setSelectedTopic(topic)}
      />

      {selectedTopic ? (
        <TopicContent
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
        />
      ) : null}
    </div>
  );
}

// ── Shared Helpers and Subcomponents ──────────────────────────────────────────

async function readStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  setTutorResponse: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> {
  const decoder = new TextDecoder();
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    streamDone = done;
    if (!done) {
      const text = decoder.decode(value);
      setTutorResponse((prev) => prev + text);
    }
  }
}

function RoadmapHeader({
  roadmap,
  deleting,
  onDelete,
  onToggleTutor,
}: {
  roadmap: Roadmap;
  deleting: boolean;
  onDelete: () => void;
  onToggleTutor: () => void;
}): React.JSX.Element {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <Link href="/roadmaps">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            {roadmap.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Badge
              variant={
                roadmap.goal === "interview-prep" ? "default" : "secondary"
              }
            >
              {roadmap.goal === "interview-prep" ? (
                <Target className="h-3 w-3 mr-1" />
              ) : (
                <BookOpen className="h-3 w-3 mr-1" />
              )}
              {roadmap.goal === "interview-prep"
                ? "Interview Prep"
                : "Skill Learning"}
            </Badge>
            <span className="text-sm text-slate-400">{roadmap.targetRole}</span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm text-slate-500">
              Created {formatDate(roadmap.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleTutor}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          AI Tutor
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          disabled={deleting}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function RoadmapStats({
  progress,
  completedTopics,
  totalTopics,
  phasesCount,
  totalMinutes,
}: {
  progress: number;
  completedTopics: number;
  totalTopics: number;
  phasesCount: number;
  totalMinutes: number;
}): React.JSX.Element {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-100">{progress}%</div>
          <p className="text-xs text-slate-500">Overall Progress</p>
          <Progress value={progress} className="mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-100">
            {completedTopics}/{totalTopics}
          </div>
          <p className="text-xs text-slate-500">Topics Completed</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-100">{phasesCount}</div>
          <p className="text-xs text-slate-500">Phases</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-100 flex items-center gap-1">
            <Clock className="h-5 w-5 text-slate-400" />
            {formatDuration(totalMinutes)}
          </div>
          <p className="text-xs text-slate-500">Estimated Time</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TutorPanel({
  tutorResponse,
  tutorMessage,
  tutorLoading,
  setTutorMessage,
  handleTutorSubmit,
}: {
  tutorResponse: string;
  tutorMessage: string;
  tutorLoading: boolean;
  setTutorMessage: (v: string) => void;
  handleTutorSubmit: (e: React.FormEvent) => Promise<void>;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-violet-400" />
          AI Tutor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tutorResponse ? (
          <div className="p-4 rounded-lg bg-slate-800/50 text-sm text-slate-300 whitespace-pre-wrap">
            {tutorResponse}
          </div>
        ) : null}
        <form onSubmit={handleTutorSubmit} className="flex gap-2">
          <input
            type="text"
            value={tutorMessage}
            onChange={(e) => setTutorMessage(e.target.value)}
            placeholder="Ask me anything about this topic..."
            className="flex-1 h-10 rounded-lg border border-slate-700 bg-slate-800/50 px-4 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <Button type="submit" disabled={tutorLoading || !tutorMessage.trim()}>
            {tutorLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Ask"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
