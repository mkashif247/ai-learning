import { RoadmapRepository } from '../repositories/roadmap.repository';
import { CreateRoadmapDtoSchema } from '../types/roadmap.dto';
import { Roadmap } from '@prisma/client';

export class RoadmapService {
  static async createRoadmap(data: unknown): Promise<Roadmap> {
    const parsed = CreateRoadmapDtoSchema.parse(data);
    return RoadmapRepository.createRoadmap(parsed);
  }

  static async getUserRoadmaps(userId: string): Promise<Roadmap[]> {
    if (!userId) throw new Error('User ID is required');
    return RoadmapRepository.getRoadmapsByUserId(userId);
  }
}
