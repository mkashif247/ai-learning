import { NextRequest, NextResponse } from 'next/server';
import { RoadmapService } from '@/features/roadmaps/services/roadmap.service';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const roadmap = await RoadmapService.createRoadmap(body);
    return NextResponse.json({ success: true, data: roadmap }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
  }
}
