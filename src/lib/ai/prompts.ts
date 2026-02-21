import { timelineToDays } from "@/lib/utils";
import type { RoadmapGenerationInput } from "@/types";

export const getRoadmapGenerationPrompt = (
  input: RoadmapGenerationInput,
): string => {
  const goalDescription =
    input.goal === "interview-prep"
      ? "preparing for technical interviews"
      : "learning and skill development";

  const timelineInDays = timelineToDays(
    input.timeline.value,
    input.timeline.unit,
  );

  const totalHours = timelineInDays * input.hoursPerDay;

  return `You are an expert learning path designer. Create a comprehensive, structured learning roadmap for the following:

**Goal:** ${goalDescription}
**Target Role:** ${input.targetRole}
**Technologies/Stack:** ${input.stack.join(", ")}
**Timeline:** ${input.timeline.value} ${input.timeline.unit}
**Daily Study Time:** ${input.hoursPerDay} hours/day
**Total Available Hours:** ${totalHours} hours
**Current Level:** ${input.skillLevel}

Generate a detailed roadmap in the following JSON structure:

{
  "title": "A descriptive title for this roadmap",
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase title",
      "description": "Brief description of what this phase covers",
      "order": 1,
      "topics": [
        {
          "id": "topic-1-1",
          "title": "Topic title",
          "description": "Brief description",
          "estimatedMinutes": 120,
          "order": 1,
          "content": "Detailed learning content explaining the topic (2-3 paragraphs with examples)",
          "resources": [
            { "title": "Resource name", "url": "https://example.com", "type": "docs|video|article|tutorial" }
          ],
          "practiceQuestions": [
            {
              "id": "q-1-1-1",
              "question": "Practice question or coding challenge",
              "type": "coding|quiz|open-ended",
              "difficulty": "easy|medium|hard",
              "starterCode": "// Optional starter code",
              "hints": ["Hint 1", "Hint 2"]
            }
          ]
        }
      ]
    }
  ]
}

Requirements:
1. Create ${Math.max(3, Math.min(8, Math.ceil(timelineInDays / 7)))} phases that progress from fundamentals to advanced
2. Each phase should have 3-6 topics
3. Total estimated time across all topics should roughly equal ${totalHours} hours
4. Include at least 1-2 practice questions per topic
5. For interview prep, focus on commonly asked questions and patterns
6. Provide real, functional resource URLs (official docs, MDN, FreeCodeCamp, YouTube tutorials)
7. Content should be detailed enough to learn from directly
8. Match difficulty to the ${input.skillLevel} level, progressively increasing

Return ONLY the valid JSON object, no markdown formatting or code blocks.`;
};

export const getTopicContentPrompt = (
  topicTitle: string,
  topicDescription: string,
  stack: string[],
): string => {
  return `Create detailed learning content for the following topic:

**Topic:** ${topicTitle}
**Description:** ${topicDescription}
**Technologies:** ${stack.join(", ")}

Provide a comprehensive explanation that includes:
1. Clear explanation of the concept
2. Why it's important
3. Practical examples with code where applicable
4. Common mistakes to avoid
5. Best practices

Format the response in clean markdown. Keep it educational and practical.`;
};

export const getTutorPrompt = (
  userMessage: string,
  context: {
    currentPhase?: string;
    currentTopic?: string;
    roadmapTitle?: string;
    code?: string;
    language?: string;
  },
): string => {
  let contextInfo = "";
  if (context.roadmapTitle) {
    contextInfo += `\nRoadmap: ${context.roadmapTitle}`;
  }
  if (context.currentPhase) {
    contextInfo += `\nCurrent Phase: ${context.currentPhase}`;
  }
  if (context.currentTopic) {
    contextInfo += `\nCurrent Topic: ${context.currentTopic}`;
  }
  if (context.code) {
    contextInfo += `\n\nThe user is currently working on the following code:\n\`\`\`${context.language || ""}\n${context.code}\n\`\`\`\n`;
  }

  return `You are an expert AI tutor helping a learner with their studies.${contextInfo}

The learner asks: "${userMessage}"

Provide a helpful, educational response. If they're asking about code, include examples. 
If they're confused, break it down step by step. Be encouraging and supportive.
Keep responses focused and practical. Use markdown formatting for clarity.`;
};
