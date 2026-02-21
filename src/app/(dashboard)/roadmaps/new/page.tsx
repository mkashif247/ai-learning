"use client";

import {
  BookOpen,
  ChevronRight,
  Clock,
  Loader2,
  Plus,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Goal = "interview-prep" | "skill-learning";
type TimelineUnit = "days" | "weeks" | "months";
type SkillLevel = "beginner" | "intermediate" | "advanced";

export default function NewRoadmapPage(): React.JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [goal, setGoal] = useState<Goal>("skill-learning");
  const [targetRole, setTargetRole] = useState("");
  const [stack, setStack] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState("");
  const [timelineValue, setTimelineValue] = useState(4);
  const [timelineUnit, setTimelineUnit] = useState<TimelineUnit>("weeks");
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("beginner");

  const addStack = (): void => {
    if (stackInput.trim() && !stack.includes(stackInput.trim())) {
      setStack([...stack, stackInput.trim()]);
      setStackInput("");
    }
  };

  const removeStack = (item: string): void => {
    setStack(stack.filter((s) => s !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStack();
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");

    if (stack.length === 0) {
      setError("Please add at least one technology/skill to learn");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          targetRole,
          stack,
          timeline: { value: timelineValue, unit: timelineUnit },
          hoursPerDay,
          skillLevel,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to generate roadmap");
        return;
      }

      router.push(`/roadmaps/${data.data.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
          Create Your Learning Roadmap
        </h1>
        <p className="text-slate-400">
          Tell us your goals and we&apos;ll generate a personalized learning
          path
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        ) : null}

        <GoalSelection goal={goal} setGoal={setGoal} />

        <TargetRoleSelection
          targetRole={targetRole}
          setTargetRole={setTargetRole}
        />

        <TechnologiesSelection
          stack={stack}
          stackInput={stackInput}
          setStackInput={setStackInput}
          handleKeyDown={handleKeyDown}
          addStack={addStack}
          removeStack={removeStack}
        />

        <TimelineSelection
          timelineValue={timelineValue}
          setTimelineValue={setTimelineValue}
          timelineUnit={timelineUnit}
          setTimelineUnit={setTimelineUnit}
          hoursPerDay={hoursPerDay}
          setHoursPerDay={setHoursPerDay}
        />

        <SkillLevelSelection
          skillLevel={skillLevel}
          setSkillLevel={setSkillLevel}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating your roadmap...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Roadmap
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

// ── Render Helpers ────────────────────────────────────────────────────────────

function GoalSelection({
  goal,
  setGoal,
}: {
  goal: Goal;
  setGoal: (g: Goal) => void;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">What&apos;s your goal?</CardTitle>
        <CardDescription>Choose your primary objective</CardDescription>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setGoal("skill-learning")}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            goal === "skill-learning"
              ? "border-violet-500 bg-violet-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <BookOpen
            className={`h-6 w-6 mb-2 ${
              goal === "skill-learning" ? "text-violet-400" : "text-slate-400"
            }`}
          />
          <h3 className="font-semibold text-slate-200">Learn New Skills</h3>
          <p className="text-sm text-slate-400 mt-1">
            Master a new technology or stack
          </p>
        </button>
        <button
          type="button"
          onClick={() => setGoal("interview-prep")}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            goal === "interview-prep"
              ? "border-violet-500 bg-violet-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <Target
            className={`h-6 w-6 mb-2 ${
              goal === "interview-prep" ? "text-violet-400" : "text-slate-400"
            }`}
          />
          <h3 className="font-semibold text-slate-200">Interview Prep</h3>
          <p className="text-sm text-slate-400 mt-1">
            Prepare for technical interviews
          </p>
        </button>
      </CardContent>
    </Card>
  );
}

function TargetRoleSelection({
  targetRole,
  setTargetRole,
}: {
  targetRole: string;
  setTargetRole: (role: string) => void;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Target Role</CardTitle>
        <CardDescription>What role are you aiming for?</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="e.g., Senior Frontend Developer, Full Stack Engineer"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          required
        />
      </CardContent>
    </Card>
  );
}

function TechnologiesSelection({
  stack,
  stackInput,
  setStackInput,
  handleKeyDown,
  addStack,
  removeStack,
}: {
  stack: string[];
  stackInput: string;
  setStackInput: (val: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  addStack: () => void;
  removeStack: (item: string) => void;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Technologies & Skills</CardTitle>
        <CardDescription>What do you want to learn or improve?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="e.g., React, Node.js, TypeScript"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" variant="secondary" onClick={addStack}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <Badge key={item} variant="secondary" className="gap-1 pr-1">
                {item}
                <button
                  type="button"
                  onClick={() => removeStack(item)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TimelineSelection({
  timelineValue,
  setTimelineValue,
  timelineUnit,
  setTimelineUnit,
  hoursPerDay,
  setHoursPerDay,
}: {
  timelineValue: number;
  setTimelineValue: (v: number) => void;
  timelineUnit: TimelineUnit;
  setTimelineUnit: (u: TimelineUnit) => void;
  hoursPerDay: number;
  setHoursPerDay: (h: number) => void;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Timeline</CardTitle>
        <CardDescription>How much time do you have?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={1}
                max={12}
                value={timelineValue}
                onChange={(e) => setTimelineValue(Number(e.target.value))}
                className="w-20"
              />
              <select
                value={timelineUnit}
                onChange={(e) =>
                  setTimelineUnit(e.target.value as TimelineUnit)
                }
                className="flex-1 h-11 rounded-lg border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-100"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Hours per day</Label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={8}
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="flex-1 accent-violet-500"
              />
              <div className="flex items-center gap-1 text-slate-200 min-w-[60px]">
                <Clock className="h-4 w-4 text-slate-400" />
                {hoursPerDay}h
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SkillLevelSelection({
  skillLevel,
  setSkillLevel,
}: {
  skillLevel: SkillLevel;
  setSkillLevel: (l: SkillLevel) => void;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Current Level</CardTitle>
        <CardDescription>Where are you starting from?</CardDescription>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-3 gap-3">
        {(["beginner", "intermediate", "advanced"] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setSkillLevel(level)}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              skillLevel === level
                ? "border-violet-500 bg-violet-500/10"
                : "border-slate-700 hover:border-slate-600"
            }`}
          >
            <span className="capitalize text-sm font-medium text-slate-200">
              {level}
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
