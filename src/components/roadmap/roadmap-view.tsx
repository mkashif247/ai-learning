"use client";

import {
  CheckCircle,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";

import { PracticeModal } from "@/components/learning/practice-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Phase, Topic } from "@/types";

// ============================================
// RoadmapView
// ============================================

interface RoadmapViewProps {
  phases: Phase[];
  roadmapId: string;
  onTopicClick: (topic: Topic, phaseId: string) => void;
}

export const RoadmapView = ({
  phases,
  onTopicClick,
}: RoadmapViewProps): React.JSX.Element => {
  const [practicingTopic, setPracticingTopic] = useState<Topic | null>(null);
  const [_updatingTopic, _setUpdatingTopic] = useState<string | null>(null);

  const getStatusIcon = (status: string): React.JSX.Element => {
    if (status === "done") {
      return <CheckCircle className="h-5 w-5 text-emerald-400" />;
    }
    if (status === "in-progress") {
      return <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />;
    }
    return <Circle className="h-5 w-5 text-slate-600" />;
  };

  return (
    <div className="space-y-4">
      {practicingTopic ? (
        <PracticeModal
          topic={practicingTopic}
          roadmapTitle="Learning Roadmap"
          onClose={() => setPracticingTopic(null)}
        />
      ) : null}

      <Accordion
        type="multiple"
        defaultValue={phases.map((p) => p.id)}
        className="space-y-4"
      >
        {phases.map((phase) => {
          const completedCount = phase.topics.filter(
            (t) => t.status === "done",
          ).length;
          const totalCount = phase.topics.length;

          return (
            <AccordionItem
              key={phase.id}
              value={phase.id}
              className="rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {phase.description}
                    </p>
                  </div>
                  <span className="text-sm text-slate-500 shrink-0 ml-4">
                    {completedCount}/{totalCount} topics
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {phase.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={cn(
                        "group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                        topic.status === "done"
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : "bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900",
                        topic.status === "in-progress" &&
                          "bg-amber-500/5 border-amber-500/20",
                      )}
                      onClick={() => onTopicClick(topic, phase.id)}
                    >
                      <div className="shrink-0">
                        {_updatingTopic === topic.id ? (
                          <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                        ) : (
                          getStatusIcon(topic.status)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-200 truncate">
                          {topic.title}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">
                          {topic.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPracticingTopic(topic);
                        }}
                        className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-violet-400 hover:bg-zinc-700 transition-colors ml-2"
                        title="Practice Code"
                      >
                        <Code2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-4 shrink-0 text-zinc-500">
                        <span className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          {topic.estimatedMinutes}m
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

// ============================================
// TopicContent
// ============================================

interface TopicContentProps {
  topic: Topic;
  onClose: () => void;
  onPractice?: () => void;
}

export const TopicContent = ({
  topic,
  onClose,
  onPractice,
}: TopicContentProps): React.JSX.Element => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-filter backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">
                {topic.title}
              </h2>
              <p className="text-zinc-400 mt-2 text-base leading-relaxed">
                {topic.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {onPractice ? (
                <Button
                  onClick={onPractice}
                  className="gap-2 bg-violet-600 hover:bg-violet-700 text-white"
                >
                  <Code2 className="h-4 w-4" />
                  Practice
                </Button>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
              {topic.content || "Content coming soon..."}
            </div>
          </div>

          {/* Resources */}
          {topic.resources.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                Resources
              </h3>
              <div className="space-y-2">
                {topic.resources.map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <span className="text-sm font-medium text-violet-400">
                      {resource.title}
                    </span>
                    <span className="text-xs text-zinc-500 ml-auto">
                      {resource.type}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
