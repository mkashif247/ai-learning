import { streamText } from "ai";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { getAIModel, getTutorPrompt } from "@/lib/ai";
import { authOptions } from "@/lib/auth";

const tutorSchema = z.object({
  message: z.string().min(1),
  context: z
    .object({
      roadmapTitle: z.string().optional(),
      currentPhase: z.string().optional(),
      currentTopic: z.string().optional(),
      code: z.string().optional(),
      language: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: Request): Promise<NextResponse | Response> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const result = tutorSchema.safeParse(body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      return NextResponse.json(
        { success: false, error: firstIssue?.message || "Validation failed" },
        { status: 400 },
      );
    }

    const { message, context } = result.data;
    const prompt = getTutorPrompt(message, context || {});
    const model = getAIModel();

    const { textStream } = streamText({
      model,
      prompt,
      temperature: 0.7,
    });

    // Return streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller): Promise<void> {
        for await (const chunk of textStream) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Tutor error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get response" },
      { status: 500 },
    );
  }
}
