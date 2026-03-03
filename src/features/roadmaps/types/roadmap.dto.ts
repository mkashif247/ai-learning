import { z } from 'zod';

export const CreateRoadmapDtoSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  userId: z.string().uuid(),
  nodes: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number().int(),
      })
    )
    .min(1),
});

export type CreateRoadmapDto = z.infer<typeof CreateRoadmapDtoSchema>;
