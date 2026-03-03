import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/features/ai/services/ai.service';
import { RoadmapRepository } from '@/features/roadmaps/repositories/roadmap.repository';
import { auth } from '@/auth';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { topic, level } = await req.json();
    if (!topic) {
      return NextResponse.json({ success: false, error: 'Topic is required' }, { status: 400 });
    }

    // 1. Generate content using the AI Provider configured in .env
    const generatedData = await AIService.generateRoadmap(topic, level || 'Beginner');

    // 2. Wrap it up and store it in the database
    const roadmap = await RoadmapRepository.createRoadmap({
      title: generatedData.title,
      description: generatedData.description,
      userId: session.user.id,
      nodes: generatedData.nodes.map((n) => ({
        title: n.title,
        description: n.description,
        order: n.order,
      })),
    });

    return NextResponse.json({ success: true, data: roadmap }, { status: 201 });
  } catch (error: unknown) {
    console.error('AI Generation Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, error: 'Unknown error occurred during AI generation' },
      { status: 500 }
    );
  }
}
