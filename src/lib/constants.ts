// ============================================
// App Configuration
// ============================================

export const APP_CONFIG = {
  name: "LearnPath",
  description: "AI-Powered Learning Roadmaps",
  tagline: "The mentor you never had, powered by AI",
  url: "https://learnpath.dev",
} as const;

// ============================================
// Feature Limits (by tier)
// ============================================

export const LIMITS = {
  FREE_ROADMAPS_PER_MONTH: 3,
  FREE_TUTOR_MESSAGES_PER_DAY: 50,
  FREE_REVIEWS_PER_DAY: 10,
  MAX_HOURS_PER_DAY: 8,
  MIN_HOURS_PER_DAY: 0.5,
  MAX_CHAT_HISTORY: 10,
  CODE_EXECUTION_TIMEOUT_MS: 5_000,
  AI_REQUEST_TIMEOUT_MS: 30_000,
  MAX_CODE_OUTPUT_LENGTH: 10_000,
  MAX_TUTOR_CODE_LENGTH: 3_000,
} as const;

// ============================================
// XP Awards
// ============================================

export const XP_AWARDS = {
  TOPIC_EASY: 50,
  TOPIC_MEDIUM: 100,
  TOPIC_HARD: 200,
  PHASE_COMPLETE: 500,
  ROADMAP_COMPLETE: 2_000,
  DAILY_LOGIN: 10,
  STREAK_7_DAY: 100,
  STREAK_30_DAY: 500,
  STREAK_100_DAY: 2_000,
} as const;

// ============================================
// Level Thresholds
// ============================================

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: "Beginner" },
  { level: 5, xp: 1_000, title: "Apprentice" },
  { level: 10, xp: 5_000, title: "Practitioner" },
  { level: 20, xp: 20_000, title: "Developer" },
  { level: 50, xp: 100_000, title: "Expert" },
  { level: 100, xp: 500_000, title: "Master" },
] as const;

// ============================================
// Streak Configuration
// ============================================

export const STREAK_CONFIG = {
  MAX_FREEZES_PER_WEEK: 1,
  GRACE_PERIOD_HOURS: 12,
  MILESTONES: [7, 30, 100, 365],
} as const;

// ============================================
// API Rate Limiting
// ============================================

export const RATE_LIMITS = {
  AI_GENERATE_PER_MINUTE: 5,
  AI_TUTOR_PER_MINUTE: 10,
  AUTH_ATTEMPTS_PER_HOUR: 10,
} as const;
