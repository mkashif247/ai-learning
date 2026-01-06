import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import type { RoadmapGoal, SkillLevel, TimelineUnit, TopicStatus } from '@/types';

// ============================================
// Sub-document interfaces
// ============================================
interface IResource {
  title: string;
  url: string;
  type: 'docs' | 'video' | 'article' | 'tutorial';
}

interface IPracticeQuestion {
  id: string;
  question: string;
  type: 'coding' | 'quiz' | 'open-ended';
  difficulty: 'easy' | 'medium' | 'hard';
  starterCode?: string;
  solution?: string;
  hints?: string[];
}

interface ITopic {
  id: string;
  title: string;
  description: string;
  status: TopicStatus;
  estimatedMinutes: number;
  content: string;
  resources: IResource[];
  practiceQuestions: IPracticeQuestion[];
  order: number;
}

interface IPhase {
  id: string;
  title: string;
  description: string;
  topics: ITopic[];
  order: number;
}

interface ITimeline {
  value: number;
  unit: TimelineUnit;
}

// ============================================
// Main Roadmap interface
// ============================================
export interface IRoadmap extends Document {
  userId: Types.ObjectId;
  title: string;
  goal: RoadmapGoal;
  targetRole: string;
  stack: string[];
  timeline: ITimeline;
  hoursPerDay: number;
  skillLevel: SkillLevel;
  phases: IPhase[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Schemas
// ============================================
const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ['docs', 'video', 'article', 'tutorial'],
      required: true,
    },
  },
  { _id: false }
);

const practiceQuestionSchema = new Schema<IPracticeQuestion>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    type: {
      type: String,
      enum: ['coding', 'quiz', 'open-ended'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    starterCode: { type: String },
    solution: { type: String },
    hints: [{ type: String }],
  },
  { _id: false }
);

const topicSchema = new Schema<ITopic>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'done'],
      default: 'pending',
    },
    estimatedMinutes: { type: Number, required: true },
    content: { type: String, default: '' },
    resources: [resourceSchema],
    practiceQuestions: [practiceQuestionSchema],
    order: { type: Number, required: true },
  },
  { _id: false }
);

const phaseSchema = new Schema<IPhase>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    topics: [topicSchema],
    order: { type: Number, required: true },
  },
  { _id: false }
);

const timelineSchema = new Schema<ITimeline>(
  {
    value: { type: Number, required: true },
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months'],
      required: true,
    },
  },
  { _id: false }
);

const roadmapSchema = new Schema<IRoadmap>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    goal: {
      type: String,
      enum: ['interview-prep', 'skill-learning'],
      required: true,
    },
    targetRole: { type: String, required: true },
    stack: [{ type: String }],
    timeline: { type: timelineSchema, required: true },
    hoursPerDay: { type: Number, required: true, min: 1, max: 24 },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    phases: [phaseSchema],
  },
  {
    timestamps: true,
  }
);

// Compound index for user queries
roadmapSchema.index({ userId: 1, createdAt: -1 });

const Roadmap: Model<IRoadmap> =
  mongoose.models.Roadmap || mongoose.model<IRoadmap>('Roadmap', roadmapSchema);

export default Roadmap;
