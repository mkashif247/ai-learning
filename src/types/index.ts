// Type definitions for the AI Learning Platform

// ============================================
// User Types
// ============================================
export interface User {
  _id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  email: string;
  password: string;
  name: string;
}

// ============================================
// Roadmap Types
// ============================================
export type RoadmapGoal = "interview-prep" | "skill-learning";
export type TimelineUnit = "days" | "weeks" | "months";
export type TopicStatus = "pending" | "in-progress" | "done";
export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Timeline {
  value: number;
  unit: TimelineUnit;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  type: "coding" | "quiz" | "open-ended";
  difficulty: "easy" | "medium" | "hard";
  starterCode?: string;
  solution?: string;
  hints?: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  status: TopicStatus;
  estimatedMinutes: number;
  content: string;
  resources: Resource[];
  practiceQuestions: PracticeQuestion[];
  order: number;
}

export interface Resource {
  title: string;
  url: string;
  type: "docs" | "video" | "article" | "tutorial";
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  order: number;
}

export interface Roadmap {
  _id: string;
  userId: string;
  title: string;
  goal: RoadmapGoal;
  targetRole: string;
  stack: string[];
  timeline: Timeline;
  hoursPerDay: number;
  skillLevel: SkillLevel;
  phases: Phase[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadmapGenerationInput {
  goal: RoadmapGoal;
  targetRole: string;
  stack: string[];
  timeline: Timeline;
  hoursPerDay: number;
  skillLevel: SkillLevel;
}

// ============================================
// Progress Types
// ============================================
export interface TopicProgress {
  topicId: string;
  status: TopicStatus;
  timeSpentMinutes: number;
  completedAt?: Date;
}

export interface RoadmapProgress {
  roadmapId: string;
  phasesCompleted: number;
  topicsCompleted: number;
  totalTopics: number;
  topicProgress: TopicProgress[];
  lastAccessedAt: Date;
}

// ============================================
// AI Types
// ============================================
export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface TutorContext {
  roadmapId: string;
  currentPhase?: string;
  currentTopic?: string;
  userProgress?: RoadmapProgress;
}

// ============================================
// API Types
// ============================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}
