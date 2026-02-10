# LearnPath: Feature Roadmap & Implementation Plan

> This document outlines the features that will differentiate LearnPath, the specific problems each feature solves, and how we will implement them in phases.

---

## Core Philosophy: The "Learn → Practice → Validate" Loop

Every feature we build must reinforce this cycle:

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│   LEARN              PRACTICE              VALIDATE       │
│   (AI Roadmap)  →    (Code Editor)    →    (AI Mock)      │
│                                                           │
│   Personalized       Instant feedback      Proof of       │
│   curriculum         on YOUR code          competence     │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## Phase 1: Foundation (Current → 1 Month)

### 1.1 Personalized AI Roadmaps

| Problem Solved                          | Implementation                                                           |
| --------------------------------------- | ------------------------------------------------------------------------ |
| "I don't know what to learn next"       | AI generates a structured path based on goal, timeline, and skill level. |
| "Generic courses don't fit my schedule" | User sets hours/day; AI calculates realistic phases.                     |

**Technical Approach**:

- ✅ Already implemented: `src/app/api/ai/generate/route.ts`
- **Enhancement**: Add follow-up questions for deeper personalization (e.g., learning style, preferred resources).

---

### 1.2 In-Browser Code Editor + Execution

| Problem Solved                                 | Implementation                                 |
| ---------------------------------------------- | ---------------------------------------------- |
| "I can't run code without complex local setup" | Monaco Editor with browser-based JS execution. |
| "I just watch tutorials, I don't code"         | Every topic has a "Practice Now" button.       |

**Technical Approach**:

- ✅ Already implemented: `src/components/editor/code-editor.tsx`
- **Enhancement**: Add Python/TypeScript support via WebAssembly (Pyodide, Deno).

---

### 1.3 Context-Aware AI Tutor

| Problem Solved                        | Implementation                            |
| ------------------------------------- | ----------------------------------------- |
| "I'm stuck but don't know how to ask" | AI sees your current topic AND your code. |
| "ChatGPT gives generic answers"       | Tutor is primed with roadmap context.     |

**Technical Approach**:

- ✅ Already implemented: `src/app/api/ai/tutor/route.ts`
- **Enhancement**: Add "Explain this code" and "Generate example" buttons.

---

## Phase 2: Engagement & Retention (Month 2-3)

### 2.1 Streak & Progress Gamification

| Problem Solved                     | Implementation                       |
| ---------------------------------- | ------------------------------------ |
| "I lack motivation to study daily" | Daily streaks with visual rewards.   |
| "I don't see my progress"          | XP system, progress bars, level-ups. |

**Features**:

- Daily streak counter (1 day, 7 days, 30 days badges)
- Topic completion XP
- Leaderboard (optional, privacy-respecting)

---

### 2.2 Spaced Repetition Reviews

| Problem Solved                           | Implementation                                     |
| ---------------------------------------- | -------------------------------------------------- |
| "I forget what I learned last week"      | AI schedules concept reviews at optimal intervals. |
| "I only learn once, then never practice" | Flashcard-style reviews with code challenges.      |

**Features**:

- SM-2 algorithm for scheduling reviews
- Mix of quiz, code, and explanation challenges
- Notification reminders

---

### 2.3 Community Study Groups

| Problem Solved                   | Implementation                         |
| -------------------------------- | -------------------------------------- |
| "Learning alone is demotivating" | Join groups studying the same roadmap. |
| "I have no one to ask questions" | Real-time chat with peer learners.     |

**Features**:

- Auto-matching by roadmap and timezone
- Shared progress visibility (accountability)
- Peer code review requests

---

## Phase 3: Interview Readiness (Month 3-4)

### 3.1 AI Mock Interviews

| Problem Solved                        | Implementation                                       |
| ------------------------------------- | ---------------------------------------------------- |
| "I freeze during real interviews"     | Practice with AI interviewer anytime.                |
| "I don't know if my answers are good" | Real-time feedback on communication and correctness. |

**Features**:

- Behavioral interview simulation (STAR method coaching)
- Coding interview with live code execution
- System design whiteboard with AI critique

---

### 3.2 Company-Tailored Prep

| Problem Solved                        | Implementation                               |
| ------------------------------------- | -------------------------------------------- |
| "Every company asks different things" | Curated prep paths for FAANG, startups, etc. |
| "I don't know what to expect"         | Sample question banks by company.            |

**Features**:

- Company-specific roadmaps (Google, Meta, startups)
- Common question patterns
- Difficulty ratings aligned to real interview levels

---

### 3.3 Portfolio Project Generator

| Problem Solved               | Implementation                                   |
| ---------------------------- | ------------------------------------------------ |
| "I have no projects to show" | AI suggests projects based on target role.       |
| "My GitHub is empty"         | Guided project building with commit checkpoints. |

**Features**:

- Role-specific project ideas (frontend, backend, full-stack)
- Step-by-step build guide
- Auto-generated README and deployment guide

---

## Phase 4: Monetization & Scale (Month 4+)

### 4.1 Freemium Model

| Tier                | Features                                                               | Price    |
| ------------------- | ---------------------------------------------------------------------- | -------- |
| **Free**            | Full roadmaps, code editor, basic AI tutor, community                  | $0       |
| **Pro**             | Advanced AI (GPT-4o/Opus), unlimited mock interviews, priority support | $9/month |
| **Team/Enterprise** | Admin dashboard, custom roadmaps, bulk licenses                        | Custom   |

### 4.2 Certification (Optional Add-On)

| Problem Solved                           | Implementation                              |
| ---------------------------------------- | ------------------------------------------- |
| "My skills aren't validated"             | Proctored assessments with verified badges. |
| "Employers don't trust self-taught devs" | Shareable LinkedIn certificates.            |

---

## Success Metrics (KPIs)

| Metric                         | Target (Year 1)            |
| ------------------------------ | -------------------------- |
| Monthly Active Users (MAU)     | 50,000                     |
| Free-to-Pro Conversion         | 3-5%                       |
| Roadmap Completion Rate        | 40% (vs. 10% industry avg) |
| NPS (Net Promoter Score)       | 60+                        |
| Job Offer Rate (self-reported) | 30% of users seeking jobs  |

---

## Technical Stack

| Component      | Technology                                              |
| -------------- | ------------------------------------------------------- |
| Frontend       | Next.js 14+ (App Router), TypeScript, Tailwind CSS      |
| Backend        | Next.js API Routes, NestJS (future microservices)       |
| Database       | MongoDB (current), PostgreSQL (future)                  |
| AI             | Google Gemini (primary), OpenAI GPT (fallback)          |
| Code Execution | Browser-based (JS), Pyodide (Python), Judge0 (fallback) |
| Auth           | NextAuth.js                                             |
| Hosting        | Vercel (frontend), Railway/Fly.io (backend)             |

---

## Next Steps

1. **Immediate**: Fix lint errors in current codebase; ensure `npm run build` passes.
2. **Week 1-2**: Implement streak system and XP gamification.
3. **Week 3-4**: Add Python execution support.
4. **Month 2**: Launch community study groups MVP.
5. **Month 3**: AI Mock Interview beta.
