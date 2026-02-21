import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB, Roadmap } from "@/lib/db";

// GET - List user's roadmaps
export async function GET(): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();

    const roadmaps = await Roadmap.find({ userId: session.user.id })
      .select("title goal targetRole timeline createdAt phases")
      .sort({ createdAt: -1 })
      .lean();

    // Calculate progress for each roadmap
    const roadmapsWithProgress = roadmaps.map((roadmap) => {
      let totalTopics = 0;
      let completedTopics = 0;

      roadmap.phases.forEach((phase) => {
        phase.topics.forEach((topic) => {
          totalTopics++;
          if (topic.status === "done") {
            completedTopics++;
          }
        });
      });

      return {
        _id: roadmap._id,
        title: roadmap.title,
        goal: roadmap.goal,
        targetRole: roadmap.targetRole,
        timeline: roadmap.timeline,
        createdAt: roadmap.createdAt,
        progress:
          totalTopics > 0
            ? Math.round((completedTopics / totalTopics) * 100)
            : 0,
        totalTopics,
        completedTopics,
      };
    });

    return NextResponse.json({
      success: true,
      data: roadmapsWithProgress,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching roadmaps:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch roadmaps" },
      { status: 500 },
    );
  }
}
