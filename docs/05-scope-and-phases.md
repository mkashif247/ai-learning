# LearnPath: Complete Scope & Phases — 0 to Production

> **Purpose**: The single master document that defines **everything** we will build and **exactly when** we build it. Each phase is small enough to complete in 1–2 focused AI-assisted sprints, stable enough to demo/deploy at the end, and production-grade in quality.
>
> **AI Development Strategy**: Every phase ends with a **deployable checkpoint**. We build vertically (full features end-to-end) not horizontally (all pages then all APIs). This lets AI tools like Antigravity generate, test, and ship one complete slice at a time.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack (Locked)](#2-tech-stack-locked)
3. [Current State Audit](#3-current-state-audit)
4. [Development Principles](#4-development-principles)
5. [Phase 0 — Stabilize & Ship Foundation](#5-phase-0--stabilize--ship-foundation)
6. [Phase 1 — Core Learning Loop (MVP)](#6-phase-1--core-learning-loop-mvp)
7. [Phase 2 — Engagement & Retention](#7-phase-2--engagement--retention)
8. [Phase 3 — Interview Preparation](#8-phase-3--interview-preparation)
9. [Phase 4 — Monetization & Premium](#9-phase-4--monetization--premium)
10. [Phase 5 — Scale, Polish & Launch](#10-phase-5--scale-polish--launch)
11. [Full Feature Matrix](#11-full-feature-matrix)
12. [Risk Register](#12-risk-register)
13. [Definition of Done (Global)](#13-definition-of-done-global)

---

## 1. Project Overview

| Field             | Detail                                                                      |
| ----------------- | --------------------------------------------------------------------------- |
| **Product**       | LearnPath — AI-powered tech learning platform                               |
| **Tagline**       | "The mentor you never had, powered by AI"                                   |
| **Mission**       | Democratize tech education with free, personalized, practice-first learning |
| **Target Users**  | Career changers, junior developers, CS students                             |
| **Revenue Model** | Freemium (Free core → $9/mo Pro → $29/seat Team)                            |
| **Deployment**    | Vercel (frontend + API) · MongoDB Atlas (database)                          |

### What Makes LearnPath Different

```
┌──────────────────────────────────────────────────────────────────┐
│                    THE LEARNPATH LOOP                             │
│                                                                  │
│   🎯 LEARN           💻 PRACTICE          ✅ VALIDATE            │
│   AI Roadmap    →    Code Editor     →    AI Mock Interview      │
│   Personalized       Instant feedback     Proof of competence    │
│                                                                  │
│   ↑──────────── Spaced Repetition ──────────────↓                │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack (Locked)

> **IMPORTANT**: These choices are final. Every phase builds on this stack. No additions unless justified by the decision framework in `04-implementation-plan.md`.

| Layer             | Technology                                 | Version           |
| ----------------- | ------------------------------------------ | ----------------- |
| **Framework**     | Next.js (App Router)                       | 16.x              |
| **Language**      | TypeScript (strict)                        | 5.x               |
| **Styling**       | Tailwind CSS                               | 4.x               |
| **UI Primitives** | Radix UI                                   | Latest            |
| **Database**      | MongoDB Atlas + Mongoose                   | 9.x               |
| **Auth**          | NextAuth.js                                | 4.x               |
| **AI Provider**   | Google Gemini (primary), OpenAI (fallback) | via Vercel AI SDK |
| **Code Editor**   | Monaco Editor (lazy-loaded)                | 4.x               |
| **Validation**    | Zod                                        | 4.x               |
| **Forms**         | React Hook Form                            | Latest            |
| **Icons**         | Lucide React                               | Latest            |
| **Hosting**       | Vercel                                     | —                 |
| **Payments**      | Stripe (Phase 4)                           | —                 |

---

## 3. Current State Audit

### ✅ What's Already Built

| Feature                | Files                                                                                  | Status  |
| ---------------------- | -------------------------------------------------------------------------------------- | ------- |
| AI Roadmap Generation  | `src/app/api/ai/generate/route.ts`, `src/lib/ai/prompts.ts`, `src/lib/ai/providers.ts` | Working |
| In-Browser Code Editor | `src/components/editor/code-editor.tsx` (Monaco + JS execution)                        | Working |
| Context-Aware AI Tutor | `src/app/api/ai/tutor/route.ts`, `src/components/learning/practice-modal.tsx`          | Working |
| Authentication         | `src/app/(auth)/`, `src/lib/auth/`, NextAuth config                                    | Working |
| Roadmap CRUD           | `src/app/api/roadmaps/`, `src/app/(dashboard)/roadmaps/`                               | Working |
| Landing Page           | `src/app/page.tsx`                                                                     | Working |
| UI Components          | `src/components/ui/` (11 components), `src/components/layout/`                         | Working |
| Database Models        | `src/lib/db/` (4 files)                                                                | Working |
| Middleware             | `src/middleware.ts`                                                                    | Working |

### 🔲 What's NOT Built Yet

- Streak & gamification system
- XP & leveling
- Spaced repetition engine
- Community / study groups
- AI mock interviews
- Company-specific prep paths
- Portfolio project generator
- Stripe payments & tier gating
- Error boundaries & production error handling
- Performance optimization & monitoring
- SEO & meta tags
- Testing (zero tests currently)

---

## 4. Development Principles

### AI-First Development Rules

These rules make every phase fast and predictable with AI coding assistants:

| #   | Rule                                 | Why                                                                   |
| --- | ------------------------------------ | --------------------------------------------------------------------- |
| 1   | **One feature = one vertical slice** | AI generates entire feature (DB → API → UI) in one session            |
| 2   | **Schema first, always**             | Define Mongoose model before any code — AI uses it as context         |
| 3   | **Small files (< 200 lines)**        | AI reads/edits small files perfectly; large files cause drift         |
| 4   | **Types are the spec**               | TypeScript interfaces = the AI's instruction manual                   |
| 5   | **Test after each feature**          | Verify in browser before moving on; catch bugs while context is fresh |
| 6   | **Commit at every checkpoint**       | Every green state gets a commit; easy to rollback                     |
| 7   | **No premature abstraction**         | Build it twice before abstracting. AI handles repetition cheaply      |

### AI Session Template

Every feature follows this workflow:

```
1. Define types/interfaces in src/types/
2. Create/update Mongoose model in src/lib/db/
3. Build API route in src/app/api/
4. Build UI component in src/components/
5. Wire into page in src/app/(dashboard)/
6. Test manually in browser
7. Commit with conventional commit message
```

---

## 5. Phase 0 — Stabilize & Ship Foundation

> **Goal**: Make the existing code production-grade. Fix all warnings, add error handling, ensure `npm run build` passes cleanly, and deploy a working baseline.
>
> **Effort**: 2–3 AI sessions (1–2 days)
>
> **Deploy Gate**: ✅ Clean build · ✅ All pages load · ✅ Auth flow complete · ✅ Roadmap generation works

### 📋 Tasks

#### 0.1 Build & Lint Health

- [ ] Fix all TypeScript strict-mode errors
- [ ] Fix all ESLint warnings/errors
- [ ] Ensure `pnpm run build` completes with zero errors
- [ ] Verify `pnpm run dev` starts cleanly

#### 0.2 Error Boundaries & Loading States

- [ ] Add React Error Boundary component (`src/components/ui/error-boundary.tsx`)
- [ ] Add global error boundary to root layout (`src/app/layout.tsx`)
- [ ] Add loading states (skeleton UI) to all data-fetching pages:
  - `src/app/(dashboard)/dashboard/page.tsx`
  - `src/app/(dashboard)/roadmaps/page.tsx`
  - `src/app/(dashboard)/roadmaps/[id]/page.tsx`

#### 0.3 Environment & Configuration

- [ ] Validate all env variables on startup (`src/lib/env.ts` — Zod schema)
- [ ] Create `.env.example` with all required variables documented
- [ ] Add `src/lib/constants.ts` for app-wide magic numbers

#### 0.4 SEO & Meta

- [ ] Add proper `<title>` and `<meta>` to all pages using Next.js Metadata API
- [ ] Add Open Graph tags for social sharing
- [ ] Add `robots.txt` and `sitemap.xml` to `public/`

#### 0.5 First Deploy

- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Verify production deployment works
- [ ] Add custom domain (if available)

### 📁 Files Created / Modified

| Action | File                                   |
| ------ | -------------------------------------- |
| NEW    | `src/components/ui/error-boundary.tsx` |
| NEW    | `src/lib/env.ts`                       |
| NEW    | `src/lib/constants.ts`                 |
| NEW    | `.env.example`                         |
| NEW    | `public/robots.txt`                    |
| NEW    | `public/sitemap.xml`                   |
| MODIFY | `src/app/layout.tsx`                   |
| MODIFY | All page files (add metadata exports)  |

---

## 6. Phase 1 — Core Learning Loop (MVP)

> **Goal**: Complete the Learn → Practice → Review cycle. A user can sign up, generate a roadmap, practice topics with code, and chat with the AI tutor — all polished and production-ready.
>
> **Effort**: 4–5 AI sessions (3–4 days)
>
> **Deploy Gate**: ✅ Full user journey works · ✅ AI tutor context-aware · ✅ Code execution safe · ✅ Mobile responsive

### 📋 Tasks

#### 1.1 Enhanced Onboarding Questions

- [ ] Add new fields to roadmap generation form:
  - Learning style (Visual / Reading / Hands-on)
  - Prior experience (multi-select technologies)
  - Target company type (FAANG / Startup / Agency / Freelance)
  - Preferred resources (Docs / Video / Interactive)
- [ ] Update Mongoose `Roadmap` model with new fields
- [ ] Update AI prompt in `src/lib/ai/prompts.ts` to use new context
- [ ] Add form validation with Zod + React Hook Form

#### 1.2 Roadmap Detail Page Polish

- [ ] Redesign roadmap view with collapsible phases (Radix Accordion)
- [ ] Add progress percentage per phase and overall
- [ ] Add "Start Practice" button per topic → opens code editor
- [ ] Add topic completion toggle (mark as done)
- [ ] Mobile-responsive layout

#### 1.3 Code Editor Enhancements

- [ ] Add output console panel below editor
- [ ] Add "Reset Code" button (restore starter code)
- [ ] Add execution timeout (5 second limit)
- [ ] Add infinite loop detection
- [ ] Handle runtime errors gracefully (display in console panel)
- [ ] Add syntax error highlighting

#### 1.4 AI Tutor Enhancements

- [ ] Add "Explain Selection" — select code, click explain
- [ ] Add "Show Example" — generate working example for current topic
- [ ] Add "Debug Help" — analyze user's code for bugs
- [ ] Implement chat history limit (last 10 messages, summarize older)
- [ ] Add rate limiting display (X messages remaining today)

#### 1.5 Dashboard Page

- [ ] Build dashboard landing page showing:
  - Active roadmaps with progress bars
  - "Continue Learning" CTA (resume last topic)
  - Quick stats (topics completed, total time)
- [ ] Add "Create New Roadmap" card

### 📁 New Files

| File                                         | Purpose                        |
| -------------------------------------------- | ------------------------------ |
| `src/components/roadmap/phase-accordion.tsx` | Collapsible phase with topics  |
| `src/components/roadmap/topic-card.tsx`      | Individual topic with actions  |
| `src/components/roadmap/progress-bar.tsx`    | Phase/overall progress         |
| `src/components/editor/console-panel.tsx`    | Output display for code editor |
| `src/components/learning/tutor-actions.tsx`  | Explain/Example/Debug buttons  |
| `src/app/(dashboard)/dashboard/page.tsx`     | Dashboard home (redesign)      |

---

## 7. Phase 2 — Engagement & Retention

> **Goal**: Make users come back every day. Streak system, XP/levels, and spaced repetition keep learners engaged and actually retaining knowledge.
>
> **Effort**: 5–6 AI sessions (4–5 days)
>
> **Deploy Gate**: ✅ Streaks tracking correctly · ✅ XP awarding on actions · ✅ Review queue working · ✅ Celebrations animating

### 📋 Tasks

#### 2.1 Streak System

- [ ] Create `UserProgress` Mongoose model:
  - `currentStreak`, `longestStreak`, `lastActiveDate`
  - `streakFreezes`, `freezeUsedThisWeek`
- [ ] Build streak calculation logic (timezone-aware) in `src/lib/streaks.ts`
- [ ] API route: `POST /api/progress/streak` (record daily activity)
- [ ] API route: `POST /api/progress/streak/freeze` (use a freeze)
- [ ] Streak counter component in dashboard header
- [ ] Streak calendar heatmap on profile page
- [ ] Milestone celebration modals (7, 30, 100 days)
- [ ] "Don't break your streak!" warning notification

#### 2.2 XP & Leveling System

- [ ] Add XP fields to `UserProgress` model:
  - `totalXP`, `level`, `xpHistory[]`
- [ ] XP award logic in `src/lib/xp.ts`:
  - Topic completion: 50/100/200 XP (easy/medium/hard)
  - Phase completion: 500 XP bonus
  - Roadmap completion: 2000 XP bonus
  - Daily login: 10 XP
  - 7-day streak: 100 XP bonus
- [ ] Level thresholds (exponential curve, 6 titles)
- [ ] API route: `POST /api/progress/xp` (award XP)
- [ ] XP bar + level badge component
- [ ] Level-up celebration animation
- [ ] Prevent duplicate XP (idempotent awards)

#### 2.3 Spaced Repetition Engine

- [ ] Create `ReviewCard` Mongoose model:
  - `topicId`, `userId`, `nextReviewDate`, `easeFactor`
  - `interval`, `repetitions`, `lastReviewDate`
- [ ] SM-2 algorithm implementation in `src/lib/spaced-repetition.ts`
- [ ] API route: `GET /api/reviews` (today's due reviews)
- [ ] API route: `POST /api/reviews/[id]/grade` (submit review grade)
- [ ] Review types: Flashcard, Code Challenge, Quiz, Explain
- [ ] Review queue page: `src/app/(dashboard)/reviews/page.tsx`
- [ ] Daily review count badge on dashboard
- [ ] Auto-create review cards when topics are completed

#### 2.4 Notification & Reminder System

- [ ] In-app notification center component
- [ ] Daily "streak at risk" notification (local, time-based)
- [ ] "Reviews due" notification
- [ ] Email reminders via a simple webhook (Resend or similar — Phase 5)

### 📁 New Files

| File                                                | Purpose                      |
| --------------------------------------------------- | ---------------------------- |
| `src/lib/db/models/user-progress.ts`                | Streak + XP Mongoose model   |
| `src/lib/db/models/review-card.ts`                  | Spaced repetition model      |
| `src/lib/streaks.ts`                                | Streak calculation logic     |
| `src/lib/xp.ts`                                     | XP award & level calculation |
| `src/lib/spaced-repetition.ts`                      | SM-2 algorithm               |
| `src/app/api/progress/streak/route.ts`              | Streak API                   |
| `src/app/api/progress/xp/route.ts`                  | XP API                       |
| `src/app/api/reviews/route.ts`                      | Review queue API             |
| `src/app/api/reviews/[id]/grade/route.ts`           | Grade a review               |
| `src/app/(dashboard)/reviews/page.tsx`              | Review queue page            |
| `src/components/gamification/streak-counter.tsx`    | Streak display               |
| `src/components/gamification/streak-calendar.tsx`   | Activity heatmap             |
| `src/components/gamification/xp-bar.tsx`            | XP progress bar              |
| `src/components/gamification/level-badge.tsx`       | Level display                |
| `src/components/gamification/celebration-modal.tsx` | Milestone popups             |
| `src/components/review/review-card.tsx`             | Review card UI               |
| `src/components/review/review-queue.tsx`            | Review session flow          |

---

## 8. Phase 3 — Interview Preparation

> **Goal**: Users can practice technical interviews with AI. Behavioral, coding, and system design mock interviews with real-time feedback.
>
> **Effort**: 6–8 AI sessions (5–7 days)
>
> **Deploy Gate**: ✅ Behavioral interview works · ✅ Coding interview with execution · ✅ Feedback is actionable · ✅ Company paths available

### 📋 Tasks

#### 3.1 AI Mock Interview Engine

- [ ] Create `InterviewSession` Mongoose model:
  - `userId`, `type` (behavioral/coding/system-design)
  - `questions[]`, `responses[]`, `feedback[]`
  - `duration`, `score`, `createdAt`
- [ ] Interview orchestration logic in `src/lib/interview.ts`
- [ ] AI prompts for each interview type in `src/lib/ai/interview-prompts.ts`
- [ ] API route: `POST /api/interviews/start` (begin session)
- [ ] API route: `POST /api/interviews/[id]/respond` (submit answer)
- [ ] API route: `POST /api/interviews/[id]/end` (get final feedback)

#### 3.2 Behavioral Interview UI

- [ ] Interview page: `src/app/(dashboard)/interviews/page.tsx`
- [ ] Active interview view: `src/app/(dashboard)/interviews/[id]/page.tsx`
- [ ] Question display with timer
- [ ] Text response area (with optional voice-to-text — future)
- [ ] STAR method coach sidebar (Situation, Task, Action, Result)
- [ ] Real-time AI feedback after each answer
- [ ] Final summary report with scores

#### 3.3 Coding Interview UI

- [ ] Problem statement panel (left)
- [ ] Monaco code editor (center)
- [ ] Output + AI feedback panel (right)
- [ ] "Run Code" → execute against test cases
- [ ] "Submit Solution" → AI grades correctness + code quality
- [ ] Timer with warnings at 5 min remaining
- [ ] Hint system (progressive hints, costs XP or free for Pro)

#### 3.4 Company-Specific Prep Paths

- [ ] Create `CompanyPath` model (seeded data, not user-generated):
  - `company`, `focusAreas[]`, `difficulty`, `questionBank[]`
  - `interviewProcess` (description), `tips[]`
- [ ] Seed data for 5 companies: Google, Meta, Amazon, Microsoft, Startups
- [ ] Company selection page: `src/app/(dashboard)/interviews/companies/page.tsx`
- [ ] Company detail page with prep roadmap
- [ ] Link company questions to mock interview sessions

#### 3.5 Portfolio Project Generator

- [ ] AI prompt: generate project ideas based on target role + skill level
- [ ] API route: `POST /api/projects/generate`
- [ ] Project idea card component
- [ ] Step-by-step build guide generation
- [ ] "Add to Portfolio" — saves project + README template

### 📁 New Files

| File                                                       | Purpose                 |
| ---------------------------------------------------------- | ----------------------- |
| `src/lib/db/models/interview-session.ts`                   | Interview model         |
| `src/lib/db/models/company-path.ts`                        | Company prep data       |
| `src/lib/interview.ts`                                     | Interview orchestration |
| `src/lib/ai/interview-prompts.ts`                          | Interview AI prompts    |
| `src/app/api/interviews/start/route.ts`                    | Start interview         |
| `src/app/api/interviews/[id]/respond/route.ts`             | Submit answer           |
| `src/app/api/interviews/[id]/end/route.ts`                 | End + feedback          |
| `src/app/api/projects/generate/route.ts`                   | Generate project ideas  |
| `src/app/(dashboard)/interviews/page.tsx`                  | Interview hub           |
| `src/app/(dashboard)/interviews/[id]/page.tsx`             | Active interview        |
| `src/app/(dashboard)/interviews/companies/page.tsx`        | Company selection       |
| `src/app/(dashboard)/interviews/companies/[slug]/page.tsx` | Company detail          |
| `src/components/interview/question-panel.tsx`              | Question display        |
| `src/components/interview/response-area.tsx`               | Answer input            |
| `src/components/interview/feedback-panel.tsx`              | AI feedback             |
| `src/components/interview/timer.tsx`                       | Interview timer         |
| `src/components/interview/star-coach.tsx`                  | STAR method sidebar     |
| `src/components/interview/coding-workspace.tsx`            | Coding interview layout |
| `src/components/projects/project-card.tsx`                 | Project idea display    |

---

## 9. Phase 4 — Monetization & Premium

> **Goal**: Implement Stripe payments, feature gating per tier, and billing management. Free users get the core experience; Pro users get unlimited AI and interviews.
>
> **Effort**: 4–5 AI sessions (3–4 days)
>
> **Deploy Gate**: ✅ Stripe checkout works · ✅ Tiers gate features correctly · ✅ Webhooks handle all events · ✅ Billing portal accessible

### 📋 Tasks

#### 4.1 Stripe Integration

- [ ] Install Stripe SDK (`stripe` package)
- [ ] Create Stripe products + prices in Stripe Dashboard:
  - Pro: $9/month
  - Team: $29/seat/month
- [ ] API route: `POST /api/billing/checkout` (create Checkout session)
- [ ] API route: `POST /api/billing/portal` (create Customer Portal session)
- [ ] API route: `POST /api/webhooks/stripe` (handle events)
- [ ] Webhook events to handle:
  - `checkout.session.completed` → activate subscription
  - `customer.subscription.updated` → update tier
  - `customer.subscription.deleted` → downgrade to free
  - `invoice.payment_failed` → mark at-risk

#### 4.2 User Tier System

- [ ] Add to User model:
  - `stripeCustomerId`, `subscriptionId`
  - `subscriptionStatus`, `tier` (free/pro/team)
  - `currentPeriodEnd`
- [ ] Tier checking middleware: `src/lib/tier.ts`
- [ ] Feature gate utility: `canAccess(user, feature) → boolean`
- [ ] Feature limits per tier:

| Feature              | Free    | Pro       | Team      |
| -------------------- | ------- | --------- | --------- |
| AI Roadmaps          | 3/month | Unlimited | Unlimited |
| AI Tutor Messages    | 50/day  | Unlimited | Unlimited |
| Mock Interviews      | ❌      | 10/month  | Unlimited |
| Company Prep         | ❌      | ✅        | ✅        |
| Spaced Repetition    | 10/day  | Unlimited | Unlimited |
| Priority AI (GPT-4o) | ❌      | ✅        | ✅        |

#### 4.3 Upgrade UI

- [ ] Pricing page: `src/app/pricing/page.tsx`
- [ ] Upgrade prompt component (shown when hitting limits)
- [ ] "Pro" badge on user avatar
- [ ] Billing settings page: `src/app/(dashboard)/settings/billing/page.tsx`
- [ ] Usage meter component (messages used / limit)

### 📁 New Files

| File                                            | Purpose                        |
| ----------------------------------------------- | ------------------------------ |
| `src/lib/tier.ts`                               | Tier checking + feature gating |
| `src/app/api/billing/checkout/route.ts`         | Stripe Checkout                |
| `src/app/api/billing/portal/route.ts`           | Stripe Customer Portal         |
| `src/app/api/webhooks/stripe/route.ts`          | Stripe webhooks                |
| `src/app/pricing/page.tsx`                      | Public pricing page            |
| `src/app/(dashboard)/settings/billing/page.tsx` | Billing management             |
| `src/components/billing/upgrade-prompt.tsx`     | Upgrade CTA                    |
| `src/components/billing/usage-meter.tsx`        | Usage display                  |
| `src/components/billing/pro-badge.tsx`          | Pro indicator                  |

---

## 10. Phase 5 — Scale, Polish & Launch

> **Goal**: Production hardening. Performance optimization, monitoring, testing, documentation, and public launch preparation.
>
> **Effort**: 5–7 AI sessions (4–6 days)
>
> **Deploy Gate**: ✅ Lighthouse 90+ · ✅ Sentry tracking errors · ✅ Key flows tested · ✅ Docs complete · ✅ Ready for Product Hunt

### 📋 Tasks

#### 5.1 Performance Optimization

- [ ] Audit with Lighthouse — target 90+ on all metrics
- [ ] Add `loading.tsx` skeletons to every route group
- [ ] Lazy-load Monaco Editor (already done — verify still optimal)
- [ ] Image optimization: convert all assets to WebP, add `next/image`
- [ ] Add `React.lazy()` for heavy components (interview workspace, etc.)
- [ ] Database: add indexes on frequently queried fields
  - `users.email` (unique)
  - `roadmaps.userId`
  - `reviewCards.userId + nextReviewDate`
  - `interviewSessions.userId`
  - `userProgress.userId` (unique)

#### 5.2 Monitoring & Observability

- [ ] Integrate Sentry for error tracking (client + server)
- [ ] Set up Vercel Analytics (built-in, free)
- [ ] Add health check endpoint: `GET /api/health`
- [ ] Add structured logging utility: `src/lib/logger.ts`
- [ ] Set up uptime monitoring (BetterUptime or UptimeRobot, free tier)

#### 5.3 Testing

- [ ] Set up Vitest for unit tests
- [ ] Unit tests for critical logic:
  - `src/lib/streaks.ts` — streak calculation edge cases
  - `src/lib/xp.ts` — XP award + level calculation
  - `src/lib/spaced-repetition.ts` — SM-2 algorithm
  - `src/lib/tier.ts` — feature gating logic
- [ ] Integration tests for key API routes:
  - Roadmap CRUD
  - Streak recording
  - XP awarding
  - Interview flow
- [ ] E2E smoke test: signup → generate roadmap → practice → complete topic

#### 5.4 Documentation

- [ ] Update `README.md` with:
  - Project description
  - Local development setup
  - Environment variables reference
  - Deployment instructions
- [ ] API documentation (simple markdown, one file per route group)
- [ ] Contributing guide: `CONTRIBUTING.md`
- [ ] Changelog: `CHANGELOG.md`

#### 5.5 Launch Preparation

- [ ] Custom domain + SSL configured
- [ ] Social preview images (Open Graph)
- [ ] Product Hunt listing draft
- [ ] Landing page copy finalized
- [ ] Privacy Policy + Terms of Service pages
- [ ] Email collection for waitlist (if launching with invite-only)
- [ ] Analytics events for key actions:
  - User signup
  - Roadmap generated
  - Topic completed
  - Interview started
  - Upgrade to Pro

### 📁 New Files

| File                                   | Purpose              |
| -------------------------------------- | -------------------- |
| `src/lib/logger.ts`                    | Structured logging   |
| `src/app/api/health/route.ts`          | Health check         |
| `src/app/privacy/page.tsx`             | Privacy policy       |
| `src/app/terms/page.tsx`               | Terms of service     |
| `tests/unit/streaks.test.ts`           | Streak unit tests    |
| `tests/unit/xp.test.ts`                | XP unit tests        |
| `tests/unit/spaced-repetition.test.ts` | SM-2 tests           |
| `tests/unit/tier.test.ts`              | Feature gating tests |
| `tests/integration/roadmaps.test.ts`   | Roadmap API tests    |
| `tests/integration/interviews.test.ts` | Interview API tests  |
| `CONTRIBUTING.md`                      | Contribution guide   |
| `CHANGELOG.md`                         | Release changelog    |

---

## 11. Full Feature Matrix

| #   | Feature                              | Phase | Priority    | Status | Complexity |
| --- | ------------------------------------ | ----- | ----------- | ------ | ---------- |
| 1   | TypeScript strict mode & clean build | 0     | 🔴 Critical | 🔲     | Low        |
| 2   | Error boundaries & loading states    | 0     | 🔴 Critical | 🔲     | Low        |
| 3   | Environment validation               | 0     | 🔴 Critical | 🔲     | Low        |
| 4   | SEO & meta tags                      | 0     | 🟡 Medium   | 🔲     | Low        |
| 5   | First Vercel deployment              | 0     | 🔴 Critical | 🔲     | Low        |
| 6   | Enhanced onboarding questions        | 1     | 🟢 High     | 🔲     | Medium     |
| 7   | Roadmap detail page redesign         | 1     | 🟢 High     | 🔲     | Medium     |
| 8   | Code editor enhancements             | 1     | 🟢 High     | 🔲     | Medium     |
| 9   | AI tutor enhancements                | 1     | 🟢 High     | 🔲     | Medium     |
| 10  | Dashboard home page                  | 1     | 🟢 High     | 🔲     | Low        |
| 11  | Streak system                        | 2     | 🟢 High     | 🔲     | Medium     |
| 12  | XP & leveling                        | 2     | 🟢 High     | 🔲     | Medium     |
| 13  | Spaced repetition engine             | 2     | 🟡 Medium   | 🔲     | High       |
| 14  | Notification system                  | 2     | 🟡 Medium   | 🔲     | Medium     |
| 15  | AI mock interviews (behavioral)      | 3     | 🟡 Medium   | 🔲     | High       |
| 16  | AI mock interviews (coding)          | 3     | 🟡 Medium   | 🔲     | High       |
| 17  | Company-specific prep paths          | 3     | 🟡 Medium   | 🔲     | Medium     |
| 18  | Portfolio project generator          | 3     | 🟡 Medium   | 🔲     | Medium     |
| 19  | Stripe integration                   | 4     | 🟡 Medium   | 🔲     | Medium     |
| 20  | Tier-based feature gating            | 4     | 🟡 Medium   | 🔲     | Medium     |
| 21  | Pricing & billing UI                 | 4     | 🟡 Medium   | 🔲     | Low        |
| 22  | Performance optimization             | 5     | 🟢 High     | 🔲     | Medium     |
| 23  | Monitoring (Sentry + Analytics)      | 5     | 🟢 High     | 🔲     | Low        |
| 24  | Automated testing                    | 5     | 🟡 Medium   | 🔲     | Medium     |
| 25  | Documentation                        | 5     | 🟡 Medium   | 🔲     | Low        |
| 26  | Launch prep                          | 5     | 🔴 Critical | 🔲     | Low        |

---

## 12. Risk Register

| Risk                             | Impact   | Probability | Mitigation                                                   |
| -------------------------------- | -------- | ----------- | ------------------------------------------------------------ |
| **AI API cost explosion**        | High     | Medium      | Rate limiting per tier; use Gemini Flash for free tier       |
| **Monaco Editor slow on mobile** | Medium   | High        | Lazy load; consider CodeMirror for mobile                    |
| **Stripe webhook reliability**   | High     | Low         | Idempotent handlers; retry logic; alert on failure           |
| **MongoDB performance at scale** | High     | Medium      | Indexes from day 1; monitor query performance                |
| **User churn after signup**      | High     | High        | Streak system + email reminders + onboarding flow            |
| **AI hallucinations in tutor**   | Medium   | Medium      | Constrained prompts; user feedback button                    |
| **Scope creep**                  | High     | High        | This document is the scope. If it's not here, it's not in v1 |
| **Security breach (user data)**  | Critical | Low         | NextAuth + Zod validation + no raw queries                   |

---

## 13. Definition of Done (Global)

Every feature is **done** when it meets ALL of these criteria:

- [ ] **Functional**: Feature works as specified in this document
- [ ] **Type-Safe**: No TypeScript `any` types; strict mode passes
- [ ] **Validated**: All inputs validated with Zod schemas
- [ ] **Error-Handled**: Errors caught and user-friendly messages shown
- [ ] **Responsive**: Works on mobile (375px), tablet (768px), desktop (1280px)
- [ ] **Accessible**: Proper ARIA labels, keyboard navigation, color contrast
- [ ] **Build-Clean**: `pnpm run build` passes with zero errors or warnings
- [ ] **Committed**: Conventional commit message (e.g., `feat: add streak system`)
- [ ] **Deployed**: Successfully deployed to Vercel preview/production

---

## Timeline Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       LEARNPATH DEVELOPMENT TIMELINE                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Phase 0 ─────── Phase 1 ─────── Phase 2 ─────── Phase 3 ──────────── │
│  Stabilize       Core MVP        Engagement       Interview Prep       │
│  [1-2 days]      [3-4 days]      [4-5 days]       [5-7 days]          │
│                                                                         │
│  ──────── Phase 4 ─────── Phase 5 ──────────────────────────────────── │
│           Monetization     Scale & Launch                               │
│           [3-4 days]       [4-6 days]                                   │
│                                                                         │
│  Total Estimated: 4-6 weeks (with AI-assisted development)             │
│  Total Estimated: 8-12 weeks (manual development)                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

_Document Version: 1.0_
_Created: 2026-02-22_
_Master Scope Document — LearnPath: 0 to Production_
