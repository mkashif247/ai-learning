"use client";

import { useChat } from "ai/react";
import { Bot, Code2, Loader2,Send, User, X } from "lucide-react";
import { useState } from "react";

import { CodeEditor } from "@/components/editor/code-editor";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Topic } from "@/types";

interface PracticeModalProps {
  topic: Topic;
  roadmapTitle?: string;
  phaseTitle?: string;
  onClose: () => void;
}

export const PracticeModal = ({
  topic,
  roadmapTitle,
  phaseTitle,
  onClose,
}: PracticeModalProps) => {
  const [code, setCode] = useState(
    topic.practiceQuestions?.[0]?.starterCode ||
      "// Write your solution here\n",
  );
  const [output, setOutput] = useState("");

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/ai/tutor",
      body: {
        context: {
          roadmapTitle,
          currentPhase: phaseTitle,
          currentTopic: topic.title,
          code,
          language: "javascript", // Default to JS for now
        },
      },
    });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
            <Code2 className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              Practice Mode
            </h2>
            <p className="text-sm text-slate-400">{topic.title}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: AI Tutor */}
        <div className="w-[400px] flex flex-col border-r border-slate-800 bg-slate-900/50">
          <div className="p-4 border-b border-slate-800 bg-slate-900">
            <h3 className="font-medium text-slate-200 flex items-center gap-2">
              <Bot className="h-4 w-4 text-emerald-400" />
              AI Tutor
            </h3>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-800">
                  <Bot className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium">Ready to help!</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Ask me for hints, explanation, or help with your code.
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex gap-3",
                    m.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                      m.role === "user" ? "bg-violet-500" : "bg-emerald-600",
                    )}
                  >
                    {m.role === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-violet-500/10 text-violet-100"
                        : "bg-slate-800 text-slate-200",
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading ? <div className="flex items-center gap-2 text-slate-500 text-sm ml-11">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Thinking...
                </div> : null}
            </div>
          </ScrollArea>

          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 bg-slate-950 rounded-lg border border-slate-800 p-1 pl-3 focus-within:border-violet-500/50 transition-colors"
            >
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500"
                placeholder="Ask for help..."
                value={input}
                onChange={handleInputChange}
              />
              <Button
                size="sm"
                size="icon"
                type="submit"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="flex-1 flex flex-col bg-slate-950">
          <div className="flex-1 p-6 overflow-hidden">
            {topic.practiceQuestions?.[0] ? <div className="mb-6 bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                    Challenge
                  </span>
                  <h3 className="font-medium text-slate-200">
                    {topic.practiceQuestions[0].title || "Coding Practice"}
                  </h3>
                </div>
                <p className="text-sm text-slate-400">
                  {topic.practiceQuestions[0].question}
                </p>
              </div> : null}

            <div className="h-full pb-20">
              <CodeEditor
                initialCode={code}
                language="javascript"
                onRun={(newCode, result) => {
                  setCode(newCode);
                  setOutput(result);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
