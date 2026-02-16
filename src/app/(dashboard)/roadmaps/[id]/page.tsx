import { notFound,redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB, Roadmap } from "@/lib/db";

import RoadmapDetailClient from "./client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  await connectDB();

  const roadmap = await Roadmap.findOne({
    _id: id,
    userId: session.user.id,
  }).lean();

  if (!roadmap) {
    notFound();
  }

  // Serialize for client component
  const serializedRoadmap = JSON.parse(JSON.stringify(roadmap));

  return <RoadmapDetailClient roadmap={serializedRoadmap} />;
}
