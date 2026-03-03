import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

export const GeneratedNodeSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().int(),
});

export const GeneratedRoadmapSchema = z.object({
  title: z.string(),
  description: z.string(),
  nodes: z.array(GeneratedNodeSchema),
});

export type GeneratedRoadmap = z.infer<typeof GeneratedRoadmapSchema>;

export class AIService {
  private static getGeminiClient(): GoogleGenerativeAI {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable. Check your .env setup.'
      );
    }
    return new GoogleGenerativeAI(apiKey);
  }

  static async generateRoadmap(
    topic: string,
    level: string = 'Beginner'
  ): Promise<GeneratedRoadmap> {
    const provider = process.env.AI_PROVIDER || 'google';

    if (provider !== 'google') {
      throw new Error(
        `AI Provider '${provider}' is not currently implemented in this MVP. Only 'google' is supported.`
      );
    }

    const genAI = this.getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = `You are an expert technical mentor for the "LearnPath" platform. The user wants to learn about "${topic}" at a "${level}" skill level.
Create a highly structured learning roadmap to eliminate their tutorial hell.
Respond ONLY in valid JSON matching this exact schema:
{
  "title": "A catchy roadmap title",
  "description": "Short description of what the user will achieve",
  "nodes": [
    { "title": "Node 1 Title", "description": "What to learn first and practice instructions", "order": 1 },
    { "title": "Node 2 Title", "description": "What to learn next", "order": 2 }
  ]
}
Ensure there are between 4 and 8 nodes, strictly ordered starting from 1.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const parsed = JSON.parse(responseText);
      return GeneratedRoadmapSchema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse AI JSON response:', responseText, error);
      throw new Error('AI returned an invalid response format that could not be parsed.');
    }
  }
}
