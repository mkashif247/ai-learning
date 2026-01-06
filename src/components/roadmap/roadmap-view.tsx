'use client';

import { useState } from 'react';
import { cn, formatDuration } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, Clock, Play, BookOpen, ExternalLink, ChevronRight } from 'lucide-react';
import type { Phase, Topic, TopicStatus } from '@/types';

interface RoadmapViewProps {
  phases: Phase[];
  roadmapId: string;
  onTopicClick: (topic: Topic, phaseId: string) => void;
}

export const RoadmapView = ({ phases, roadmapId, onTopicClick }: RoadmapViewProps) => {
  const [updatingTopic, setUpdatingTopic] = useState<string | null>(null);

  const calculatePhaseProgress = (phase: Phase): number => {
    const completed = phase.topics.filter((t) => t.status === 'done').length;
    return phase.topics.length > 0 ? Math.round((completed / phase.topics.length) * 100) : 0;
  };

  const updateTopicStatus = async (topicId: string, status: TopicStatus) => {
    setUpdatingTopic(topicId);
    try {
      await fetch(`/api/roadmaps/${roadmapId}/topics/${topicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      window.location.reload();
    } catch (error) {
      console.error('Failed to update topic:', error);
    } finally {
      setUpdatingTopic(null);
    }
  };

  const getStatusIcon = (status: TopicStatus, topicId: string) => {
    if (updatingTopic === topicId) {
      return <Circle className="h-5 w-5 text-zinc-600 animate-pulse" />;
    }
    switch (status) {
      case 'done':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-amber-500" />;
      default:
        return <Circle className="h-5 w-5 text-zinc-600" />;
    }
  };

  const cycleStatus = (current: TopicStatus): TopicStatus => {
    switch (current) {
      case 'pending':
        return 'in-progress';
      case 'in-progress':
        return 'done';
      case 'done':
        return 'pending';
    }
  };

  return (
    <div className="space-y-4">
      <Accordion type="multiple" defaultValue={phases.map((p) => p.id)} className="space-y-4">
        {phases.map((phase, phaseIndex) => {
          const progress = calculatePhaseProgress(phase);
          
          return (
            <AccordionItem
              key={phase.id}
              value={phase.id}
              className="border border-zinc-800 rounded-xl bg-zinc-900/30 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-zinc-900/50 transition-colors [&[data-state=open]]:bg-zinc-900/50">
                <div className="flex items-center gap-6 flex-1 text-left">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 font-mono text-sm">
                    {phaseIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-zinc-100 text-lg">{phase.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{phase.description}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 mr-4">
                    <div className="text-right">
                      <span className="text-sm font-medium text-zinc-200">{progress}%</span>
                    </div>
                    <div className="w-24">
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {phase.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={cn(
                        'group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer',
                        topic.status === 'done'
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : topic.status === 'in-progress'
                            ? 'bg-amber-500/5 border-amber-500/20'
                            : 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900'
                      )}
                      onClick={() => onTopicClick(topic, phase.id)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateTopicStatus(topic.id, cycleStatus(topic.status));
                        }}
                        className="shrink-0 p-1 rounded-full hover:bg-white/5 transition-colors"
                        disabled={updatingTopic === topic.id}
                      >
                        {getStatusIcon(topic.status, topic.id)}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={cn(
                              'font-medium text-base',
                              topic.status === 'done' ? 'text-zinc-500 line-through' : 'text-zinc-200'
                            )}
                          >
                            {topic.title}
                          </h4>
                          {topic.status === 'in-progress' && (
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] h-5 px-1.5">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-zinc-500 truncate">{topic.description}</p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 text-zinc-500">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDuration(topic.estimatedMinutes)}
                        </div>
                        <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
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

// ... TopicContent component can stay similar but updated class names ...
interface TopicContentProps {
  topic: Topic;
  onClose: () => void;
}

export const TopicContent = ({ topic, onClose }: TopicContentProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="text-zinc-400 border-zinc-700">
                  <Clock className="h-3 w-3 mr-1.5" />
                  {formatDuration(topic.estimatedMinutes)}
                </Badge>
                <Badge
                  className={cn(
                    topic.status === 'done' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    topic.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-zinc-800 text-zinc-400 border-zinc-700'
                  )}
                >
                  {topic.status === 'done' ? 'Completed' : topic.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-zinc-100">{topic.title}</h2>
              <p className="text-zinc-400 mt-2 text-base leading-relaxed">{topic.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
          {/* Learning Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <h3 className="text-lg font-medium text-zinc-100 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              Learning Material
            </h3>
            <div className="bg-zinc-800/30 rounded-xl p-6 border border-zinc-800/50">
               <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{topic.content}</p>
            </div>
          </div>

          {/* Resources */}
          {topic.resources && topic.resources.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-zinc-100 mb-4">Resources</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {topic.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-zinc-700">
                      <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
                        {resource.title}
                      </p>
                      <p className="text-xs text-zinc-500 capitalize">{resource.type}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Practice Questions */}
          {topic.practiceQuestions && topic.practiceQuestions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-zinc-100 mb-4">Practice Questions</h3>
              <div className="space-y-4">
                {topic.practiceQuestions.map((question, idx) => (
                  <Card key={idx} className="bg-zinc-900 border-zinc-800">
                    <div className="p-5">
                      <div className="flex items-center gap-2.5 mb-3">
                         <Badge
                          variant="outline"
                          className={cn(
                            "border",
                            question.difficulty === 'easy' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                            question.difficulty === 'medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                            'text-red-400 border-red-500/20 bg-red-500/10'
                          )}
                        >
                          {question.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                          {question.type}
                        </Badge>
                      </div>
                      <p className="text-zinc-200 text-base">{question.question}</p>
                      {question.hints && question.hints.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-zinc-800">
                          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Hint</p>
                          <p className="text-sm text-zinc-400">{question.hints[0]}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
