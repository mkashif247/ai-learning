import { generateText } from "ai";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { getAIModel, getRoadmapGenerationPrompt } from "@/lib/ai";
import { authOptions } from "@/lib/auth";
import { connectDB, Roadmap } from "@/lib/db";
import type { Phase, RoadmapGoal, SkillLevel, TimelineUnit } from "@/types";

const generateSchema = z.object({
  goal: z.enum(["interview-prep", "skill-learning"]),
  targetRole: z.string().min(2),
  stack: z.array(z.string()).min(1),
  timeline: z.object({
    value: z.number().min(1),
    unit: z.enum(["days", "weeks", "months"]),
  }),
  hoursPerDay: z.number().min(1).max(24),
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
});

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const result = generateSchema.safeParse(body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      return NextResponse.json(
        { success: false, error: firstIssue?.message || "Validation failed" },
        { status: 400 },
      );
    }

    const input = result.data as {
      goal: RoadmapGoal;
      targetRole: string;
      stack: string[];
      timeline: { value: number; unit: TimelineUnit };
      hoursPerDay: number;
      skillLevel: SkillLevel;
    };

    // Generate roadmap using AI
    const prompt = getRoadmapGenerationPrompt(input);
    const model = getAIModel();

    const { text } = await generateText({
      model,
      prompt,
      temperature: 0.7,
    });

    // Parse AI response
    let roadmapData: { title: string; phases: Phase[] };
    try {
      // Clean response - remove markdown code blocks if present
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      roadmapData = JSON.parse(cleanedText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate roadmap. Please try again.",
        },
        { status: 500 },
      );
    }

    // Save to database
    await connectDB();

    const roadmap = await Roadmap.create({
      userId: session.user.id,
      title: roadmapData.title,
      goal: input.goal,
      targetRole: input.targetRole,
      stack: input.stack,
      timeline: input.timeline,
      hoursPerDay: input.hoursPerDay,
      skillLevel: input.skillLevel,
      phases: roadmapData.phases.map((phase, pIndex) => ({
        ...phase,
        order: pIndex + 1,
        topics: phase.topics.map((topic, tIndex) => ({
          ...topic,
          status: "pending",
          order: tIndex + 1,
        })),
      })),
    });

    return NextResponse.json({
      success: true,
      data: {
        id: roadmap._id.toString(),
        title: roadmap.title,
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate roadmap" },
      { status: 500 },
    );
  }
}
