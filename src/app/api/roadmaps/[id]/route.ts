import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB, Roadmap } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get single roadmap
export async function GET(
  request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectDB();

    const roadmap = await Roadmap.findOne({
      _id: id,
      userId: session.user.id,
    }).lean();

    if (!roadmap) {
      return NextResponse.json(
        { success: false, error: "Roadmap not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching roadmap:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch roadmap" },
      { status: 500 },
    );
  }
}

// DELETE - Delete roadmap
export async function DELETE(
  request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectDB();

    const result = await Roadmap.deleteOne({
      _id: id,
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Roadmap not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting roadmap:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete roadmap" },
      { status: 500 },
    );
  }
}
