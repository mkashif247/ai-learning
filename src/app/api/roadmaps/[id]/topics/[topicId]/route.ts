import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { connectDB, Roadmap } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string; topicId: string }>;
}

const updateStatusSchema = z.object({
  status: z.enum(["pending", "in-progress", "done"]),
});

// PATCH - Update topic status
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id, topicId } = await params;
    const body = await request.json();
    const result = updateStatusSchema.safeParse(body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      return NextResponse.json(
        { success: false, error: firstIssue?.message || "Validation failed" },
        { status: 400 },
      );
    }

    await connectDB();

    // Find and update the topic status
    const roadmap = await Roadmap.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id,
        "phases.topics.id": topicId,
      },
      {
        $set: { "phases.$[].topics.$[topic].status": result.data.status },
      },
      {
        arrayFilters: [{ "topic.id": topicId }],
        new: true,
      },
    );

    if (!roadmap) {
      return NextResponse.json(
        { success: false, error: "Topic not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update topic" },
      { status: 500 },
    );
  }
}
