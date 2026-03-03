import { prisma } from '@/shared/lib/prisma';
import { CreateRoadmapDto } from '../types/roadmap.dto';
import { Roadmap } from '@prisma/client';

export class RoadmapRepository {
  static async createRoadmap(data: CreateRoadmapDto): Promise<Roadmap> {
    return prisma.roadmap.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId,
        nodes: {
          create: data.nodes,
        },
      },
      include: {
        nodes: true,
      },
    });
  }

  static async getRoadmapsByUserId(userId: string): Promise<Roadmap[]> {
    return prisma.roadmap.findMany({
      where: { userId },
      include: {
        nodes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
