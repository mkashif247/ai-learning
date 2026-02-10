# LearnPath: Complete Implementation Plan

> **Purpose**: This document serves as the single source of truth for implementing LearnPath. It contains detailed specifications for every feature, edge case handling, architecture decisions, and progress checkpoints. No code snippets—only full specifications.

---

## Table of Contents

1. [Engineering Principles](#1-engineering-principles)
2. [Architecture Overview](#2-architecture-overview)
3. [Phase 1: Core Learning Experience](#3-phase-1-core-learning-experience)
4. [Phase 2: Engagement & Retention](#4-phase-2-engagement--retention)
5. [Phase 3: Interview Preparation](#5-phase-3-interview-preparation)
6. [Phase 4: Monetization](#6-phase-4-monetization)
7. [Cross-Cutting Concerns](#7-cross-cutting-concerns)
8. [Progress Checkpoints](#8-progress-checkpoints)

---

## 1. Engineering Principles

### 1.1 Core Philosophy: KISS (Keep It Simple, Stupid)

| Principle                    | Application                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| **No Over-Engineering**      | Build for 10x current scale, not 1000x. Add complexity only when needed. |
| **Simplicity First**         | Prefer readable code over clever code. Future you is the audience.       |
| **Lightweight Dependencies** | Every npm package must justify its bundle size impact.                   |
| **Progressive Enhancement**  | Core features work without JavaScript; enhance with it.                  |

### 1.2 Decision Framework

Before adding any feature or dependency, answer:

1. **Is this solving a real user problem?** (Not a theoretical one)
2. **Can we achieve 80% of the value with 20% of the effort?**
3. **Will a junior developer understand this in 6 months?**
4. **Does this add more than 50KB to the bundle?** (If yes, reconsider)

### 1.3 Package Selection Criteria

| Criteria           | Threshold                           |
| ------------------ | ----------------------------------- |
| Weekly Downloads   | > 100,000                           |
| Bundle Size        | < 50KB gzipped (preferably < 20KB)  |
| Last Updated       | Within 6 months                     |
| TypeScript Support | Required (native or @types)         |
| Open Issues        | < 100 unresolved for major features |

### 1.4 Current Approved Packages

| Category      | Package             | Bundle Size     | Justification                        |
| ------------- | ------------------- | --------------- | ------------------------------------ |
| UI Components | Radix UI primitives | ~5KB each       | Unstyled, accessible, tree-shakeable |
| Styling       | Tailwind CSS        | 0KB runtime     | Compile-time only                    |
| Forms         | React Hook Form     | ~9KB            | Best DX, minimal re-renders          |
| Validation    | Zod                 | ~12KB           | TypeScript-first, runtime validation |
| Icons         | Lucide React        | ~0.5KB per icon | Tree-shakeable, consistent           |
| Code Editor   | Monaco Editor       | ~3MB (lazy)     | Industry standard, lazy-loaded       |
| AI SDK        | Vercel AI SDK       | ~15KB           | Streaming, provider-agnostic         |
| Auth          | NextAuth.js         | ~20KB           | Standard, OAuth support              |
| Database      | Mongoose            | ~150KB          | MongoDB ODM, only on server          |

**Packages to Avoid**:

- Moment.js (use date-fns or native Intl)
- Lodash (use native methods)
- Axios (use native fetch)
- Redux (use Zustand for simpler cases, or React Context)
- Styled-components (runtime CSS-in-JS adds latency)

---

## 2. Architecture Overview

### 2.1 System Design

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                          │
├─────────────────────────────────────────────────────────────────────┤
│  Next.js App Router (React Server Components + Client Components)   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Pages/      │  │  Components/ │  │  Hooks/      │              │
│  │  Layouts     │  │  UI + Domain │  │  Data        │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API LAYER (Server)                            │
├─────────────────────────────────────────────────────────────────────┤
│  Next.js Route Handlers (/app/api/*)                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Auth        │  │  AI          │  │  Roadmaps    │              │
│  │  /auth/*     │  │  /ai/*       │  │  /roadmaps/* │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       SERVICES LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│  /src/lib/                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  ai/         │  │  db/         │  │  auth/       │              │
│  │  providers   │  │  models      │  │  config      │              │
│  │  prompts     │  │  queries     │  │  session     │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  MongoDB     │  │  Google AI   │  │  OAuth       │              │
│  │  Atlas       │  │  (Gemini)    │  │  Providers   │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Directory Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Auth pages (login, register)
│   ├── (dashboard)/          # Protected pages
│   │   ├── roadmaps/         # Roadmap listing and detail
│   │   ├── practice/         # Code practice environment
│   │   └── profile/          # User settings
│   ├── api/                  # API Route Handlers
│   │   ├── ai/               # AI endpoints (generate, tutor)
│   │   ├── auth/             # NextAuth handlers
│   │   └── roadmaps/         # CRUD operations
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # React Components
│   ├── ui/                   # Generic UI (Button, Card, etc.)
│   ├── layout/               # Navbar, Sidebar, Footer
│   ├── roadmap/              # Roadmap-specific components
│   ├── editor/               # Code editor components
│   └── learning/             # Practice modal, tutoring
├── lib/                      # Utilities and Services
│   ├── ai/                   # AI provider config, prompts
│   ├── auth/                 # NextAuth config
│   ├── db/                   # MongoDB connection, models
│   └── utils.ts              # Helper functions
├── types/                    # TypeScript definitions
│   └── index.ts              # Shared interfaces
└── hooks/                    # Custom React hooks (future)
```

### 2.3 Data Flow

```
User Action → Component → API Route → Service → Database/AI
     ↓              ↓           ↓           ↓
  (click)      (fetch)     (validate)   (execute)
     ↓              ↓           ↓           ↓
  Response ← Component ← API Route ← Service ← Result
```

---

## 3. Phase 1: Core Learning Experience

### 3.1 Feature: AI Roadmap Generation

**Status**: ✅ Implemented (needs enhancement)

**User Story**: As a learner, I want to generate a personalized learning roadmap based on my goals and timeline.

#### 3.1.1 Current Implementation

| Component            | Location                                 | Status      |
| -------------------- | ---------------------------------------- | ----------- |
| API Endpoint         | `/app/api/ai/generate/route.ts`          | ✅ Complete |
| Prompt Engineering   | `/lib/ai/prompts.ts`                     | ✅ Complete |
| Provider Abstraction | `/lib/ai/providers.ts`                   | ✅ Complete |
| UI Form              | `/app/(dashboard)/roadmaps/new/page.tsx` | ✅ Complete |

#### 3.1.2 Enhancement: Onboarding Questions

**Objective**: Improve roadmap personalization by asking follow-up questions.

**New Fields to Add**:

| Field               | Type         | Options                           | Impact on Roadmap                |
| ------------------- | ------------ | --------------------------------- | -------------------------------- |
| Learning Style      | Select       | Visual, Reading, Hands-on         | Affects resource types suggested |
| Prior Experience    | Multi-select | List of technologies              | Skips redundant topics           |
| Target Company Type | Select       | FAANG, Startup, Agency, Freelance | Adjusts technical depth          |
| Preferred Resources | Multi-select | Docs, Video, Interactive          | Filters resource links           |

**Edge Cases**:

| Edge Case                      | Handling                                          |
| ------------------------------ | ------------------------------------------------- |
| User selects 0 hours/day       | Minimum 0.5 hours enforced; show warning          |
| User selects 24 hours/day      | Maximum 8 hours enforced; show warning            |
| Timeline too short for content | AI adjusts phases; warns user about intensity     |
| No technologies selected       | Show error; require at least 1                    |
| AI returns malformed JSON      | Retry once; if fails, show generic error and log  |
| AI rate limited                | Queue request; show "generating..." with progress |

**Database Schema Update**:

| Field              | Type        | Required | Default           |
| ------------------ | ----------- | -------- | ----------------- |
| learningStyle      | String enum | No       | 'hands-on'        |
| priorExperience    | String[]    | No       | []                |
| targetCompanyType  | String enum | No       | 'general'         |
| preferredResources | String[]    | No       | ['docs', 'video'] |

---

### 3.2 Feature: In-Browser Code Editor

**Status**: ✅ Implemented (needs enhancement)

**User Story**: As a learner, I want to write and run code directly in the browser without any setup.

#### 3.2.1 Current Implementation

| Component             | Location                             | Status      |
| --------------------- | ------------------------------------ | ----------- |
| Editor Component      | `/components/editor/code-editor.tsx` | ✅ Complete |
| Monaco Dynamic Import | Uses `next/dynamic`                  | ✅ Complete |
| JS Execution          | Browser `AsyncFunction`              | ✅ Complete |

#### 3.2.2 Enhancement: Multi-Language Support

**Priority Order**:

1. **JavaScript** (Current) - Browser-native
2. **TypeScript** - Transpile in browser via `typescript` package
3. **Python** - Pyodide (WebAssembly Python)
4. **SQL** - sql.js (SQLite in WebAssembly)

**Implementation Strategy**:

| Language   | Method                      | Bundle Impact | Load Strategy             |
| ---------- | --------------------------- | ------------- | ------------------------- |
| JavaScript | Native `eval`               | 0KB           | Immediate                 |
| TypeScript | `typescript` + esbuild-wasm | ~2MB          | Lazy on first use         |
| Python     | Pyodide                     | ~10MB         | Lazy on first use, cached |
| SQL        | sql.js                      | ~1MB          | Lazy on first use         |

**Edge Cases**:

| Edge Case              | Handling                                            |
| ---------------------- | --------------------------------------------------- |
| Infinite loop          | Timeout after 5 seconds; terminate; show warning    |
| Memory exhaustion      | Catch OOM error; show "Code used too much memory"   |
| Syntax error           | Catch and display error line/column in output       |
| Network-dependent code | Show warning that fetch/XMLHttpRequest may not work |
| Large output (>10KB)   | Truncate; show "Output truncated..."                |
| Browser not supported  | Feature detection; fallback to "Copy to clipboard"  |

**User Experience**:

| State                    | UI Feedback                                   |
| ------------------------ | --------------------------------------------- |
| Loading language runtime | Progress bar with "Loading Python runtime..." |
| Executing                | Spinner on Run button; button disabled        |
| Success                  | Green checkmark; output displayed             |
| Error                    | Red X; error message in output                |
| Timeout                  | Yellow warning; "Execution timed out"         |

---

### 3.3 Feature: Context-Aware AI Tutor

**Status**: ✅ Implemented (needs enhancement)

**User Story**: As a learner, I want to ask the AI tutor questions about my current topic and code.

#### 3.3.1 Current Implementation

| Component           | Location                                  | Status      |
| ------------------- | ----------------------------------------- | ----------- |
| API Endpoint        | `/app/api/ai/tutor/route.ts`              | ✅ Complete |
| Prompt with Context | `/lib/ai/prompts.ts`                      | ✅ Complete |
| Chat UI             | `/components/learning/practice-modal.tsx` | ✅ Complete |

#### 3.3.2 Enhancement: Richer Interaction

**New Features**:

| Feature           | Trigger                             | Behavior                                         |
| ----------------- | ----------------------------------- | ------------------------------------------------ |
| Explain Selection | User selects code, clicks "Explain" | AI explains the selected lines                   |
| Generate Example  | Click "Show Example"                | AI generates a working example for current topic |
| Fix My Code       | Click "Debug Help"                  | AI analyzes code, suggests fixes                 |
| Quiz Me           | Click "Quiz"                        | AI generates a quick question on topic           |

**Prompt Engineering Improvements**:

| Scenario                  | Prompt Addition                                    |
| ------------------------- | -------------------------------------------------- |
| User asks vague question  | "Ask clarifying questions before answering."       |
| User code has obvious bug | "Point out the bug gently, then guide to fix."     |
| User is frustrated        | "Respond with encouragement first, then help."     |
| User asks off-topic       | "Politely redirect to the current learning topic." |

**Edge Cases**:

| Edge Case                    | Handling                                    |
| ---------------------------- | ------------------------------------------- |
| Empty message sent           | Ignore; don't call API                      |
| Very long code (>5000 chars) | Truncate to last 3000 chars; warn user      |
| AI takes too long (>30s)     | Timeout; show "AI is busy, try again"       |
| Offensive user input         | AI provider handles; log for review         |
| Chat history too long        | Keep last 10 messages; summarize older ones |

**Rate Limiting**:

| User Type | Limit       | Window  |
| --------- | ----------- | ------- |
| Free User | 50 messages | Per day |
| Pro User  | Unlimited   | N/A     |

---

## 4. Phase 2: Engagement & Retention

### 4.1 Feature: Streak System

**Status**: 🔲 Not Started

**User Story**: As a learner, I want to maintain a daily streak to stay motivated.

#### 4.1.1 Specification

**Streak Logic**:

| Action                      | Streak Impact                              |
| --------------------------- | ------------------------------------------ |
| Complete 1+ topics in a day | Streak continues                           |
| Complete 0 topics           | Streak breaks (unless freeze active)       |
| Use Streak Freeze           | Streak preserved for 1 day (1 freeze/week) |

**Database Schema**:

| Field              | Type    | Description               |
| ------------------ | ------- | ------------------------- |
| currentStreak      | Number  | Days in current streak    |
| longestStreak      | Number  | All-time best             |
| lastActiveDate     | Date    | For calculating breaks    |
| streakFreezes      | Number  | Available freezes (max 1) |
| freezeUsedThisWeek | Boolean | Resets weekly             |

**Edge Cases**:

| Edge Case                                       | Handling                                     |
| ----------------------------------------------- | -------------------------------------------- |
| Timezone differences                            | Calculate streak in user's local timezone    |
| User completes at 11:59 PM, then 12:01 AM       | Counts as 2 days (uses local date)           |
| Server downtime                                 | Grace period of 12 hours before streak break |
| User creates account, does nothing              | Streak is 0, not broken                      |
| User uses freeze, then completes topic same day | Freeze is refunded                           |

**UI Elements**:

| Element          | Location         | Behavior                                          |
| ---------------- | ---------------- | ------------------------------------------------- |
| Streak Counter   | Dashboard header | Shows 🔥 icon + number                            |
| Streak Calendar  | Profile page     | Heatmap of activity                               |
| Streak Milestone | Modal            | Celebrate 7, 30, 100 day milestones               |
| Streak Warning   | Dashboard        | "Don't break your streak! Complete 1 topic today" |

---

### 4.2 Feature: XP & Leveling System

**Status**: 🔲 Not Started

**User Story**: As a learner, I want to earn XP and level up to see my progress.

#### 4.2.1 Specification

**XP Awards**:

| Action                  | XP Earned     |
| ----------------------- | ------------- |
| Complete topic (easy)   | 50 XP         |
| Complete topic (medium) | 100 XP        |
| Complete topic (hard)   | 200 XP        |
| Complete phase          | 500 XP bonus  |
| Complete roadmap        | 2000 XP bonus |
| Daily login             | 10 XP         |
| 7-day streak milestone  | 100 XP bonus  |

**Level Thresholds** (Exponential curve):

| Level | XP Required | Title        |
| ----- | ----------- | ------------ |
| 1     | 0           | Beginner     |
| 5     | 1,000       | Apprentice   |
| 10    | 5,000       | Practitioner |
| 20    | 20,000      | Developer    |
| 50    | 100,000     | Expert       |
| 100   | 500,000     | Master       |

**Database Schema**:

| Field     | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| totalXP   | Number | Lifetime XP earned                      |
| level     | Number | Calculated from XP                      |
| xpHistory | Array  | Log of XP earned (action, amount, date) |

**Edge Cases**:

| Edge Case                       | Handling                                |
| ------------------------------- | --------------------------------------- |
| User completes same topic twice | No duplicate XP; already marked done    |
| XP awarded but DB save fails    | Retry 3 times; queue for later if fails |
| Level calculation discrepancy   | Recalculate on each login               |

---

### 4.3 Feature: Spaced Repetition Reviews

**Status**: 🔲 Not Started

**User Story**: As a learner, I want to review past topics at optimal intervals to retain knowledge.

#### 4.3.1 Specification

**Algorithm**: SM-2 (SuperMemo 2)

**Scheduling Logic**:

| Response Quality             | Next Review            |
| ---------------------------- | ---------------------- |
| Perfect recall (5)           | Current interval × 2.5 |
| Correct with hesitation (4)  | Current interval × 2   |
| Correct with difficulty (3)  | Current interval × 1.5 |
| Incorrect but remembered (2) | Current interval × 1   |
| Incorrect (1)                | Review tomorrow        |
| Complete blackout (0)        | Review today again     |

**Review Types**:

| Type           | Format                                    | Duration |
| -------------- | ----------------------------------------- | -------- |
| Flashcard      | Q: Concept name, A: Definition            | 30 sec   |
| Code Challenge | Write function to do X                    | 5 min    |
| Quiz           | Multiple choice on concept                | 1 min    |
| Explain        | Explain concept in your words (AI grades) | 2 min    |

**Database Schema**:

| Field          | Type     | Description                    |
| -------------- | -------- | ------------------------------ |
| topicId        | ObjectId | Reference to topic             |
| userId         | ObjectId | Reference to user              |
| nextReviewDate | Date     | When to show again             |
| easeFactor     | Number   | SM-2 ease factor (default 2.5) |
| interval       | Number   | Days until next review         |
| repetitions    | Number   | Times reviewed                 |
| lastReviewDate | Date     | For tracking                   |

**Edge Cases**:

| Edge Case                    | Handling                                |
| ---------------------------- | --------------------------------------- |
| User skips review            | Reschedule for next day; don't penalize |
| User has 50+ overdue reviews | Show max 10/day; batch rest             |
| Topic content changed        | Mark review as "updated"; show notice   |

---

## 5. Phase 3: Interview Preparation

### 5.1 Feature: AI Mock Interviews

**Status**: 🔲 Not Started

**User Story**: As a learner, I want to practice technical interviews with AI feedback.

#### 5.1.1 Specification

**Interview Types**:

| Type          | Duration | Format                       |
| ------------- | -------- | ---------------------------- |
| Behavioral    | 15 min   | Voice/text chat, STAR format |
| Coding        | 45 min   | Live code + explain approach |
| System Design | 30 min   | Diagram + text discussion    |

**Behavioral Interview Flow**:

1. AI asks behavioral question (e.g., "Tell me about a time...")
2. User responds (text or voice transcription)
3. AI evaluates using STAR rubric
4. AI provides feedback on structure, specificity, relevance
5. Repeat 3-5 questions

**Coding Interview Flow**:

1. AI presents problem statement
2. User clarifies requirements (AI responds)
3. User codes solution
4. User explains approach (text/voice)
5. AI runs tests, checks correctness
6. AI provides feedback on code quality, efficiency, communication

**System Design Interview Flow**:

1. AI presents design prompt (e.g., "Design Twitter")
2. User asks clarifying questions
3. User draws diagram (integration with Excalidraw or similar)
4. User explains components
5. AI challenges design decisions
6. AI provides feedback on scalability, trade-offs, completeness

**Edge Cases**:

| Edge Case                     | Handling                                         |
| ----------------------------- | ------------------------------------------------ |
| User goes silent for 2+ min   | AI prompts: "Would you like a hint?"             |
| User's code has runtime error | AI notes but allows continuation                 |
| User gives up                 | AI offers option to see solution and explanation |
| Voice transcription fails     | Fallback to text input                           |
| Interview exceeds time        | Warn at 5 min remaining; hard stop at limit      |

---

### 5.2 Feature: Company-Specific Prep Paths

**Status**: 🔲 Not Started

**User Story**: As a learner, I want a roadmap tailored to my target company's interview process.

#### 5.2.1 Specification

**Supported Companies (Initial)**:

| Company            | Focus Areas                                    |
| ------------------ | ---------------------------------------------- |
| Google             | Algorithms (hard), System Design, Behavioral   |
| Meta               | Algorithms (medium-hard), Mobile, Behavioral   |
| Amazon             | Leadership Principles, System Design, OOP      |
| Microsoft          | Algorithms (medium), System Design, Behavioral |
| Startups (General) | Full-stack projects, Culture fit, Speed        |

**Data Sources**:

| Source                        | Update Frequency |
| ----------------------------- | ---------------- |
| LeetCode tagged questions     | Monthly          |
| Glassdoor interview reports   | Quarterly        |
| AI-generated similar problems | On-demand        |
| User-submitted (verified)     | Ongoing          |

**Edge Cases**:

| Edge Case                       | Handling                                       |
| ------------------------------- | ---------------------------------------------- |
| Company not in list             | Show "General FAANG" path; allow request       |
| Interview process changed       | Flag old data; prioritize user reports         |
| User targets multiple companies | Allow selecting primary; suggest shared topics |

---

## 6. Phase 4: Monetization

### 6.1 Feature: Freemium Tier System

**Status**: 🔲 Not Started

#### 6.1.1 Tier Comparison

| Feature               | Free                | Pro ($9/mo)   | Team ($29/seat/mo) |
| --------------------- | ------------------- | ------------- | ------------------ |
| AI Roadmap Generation | ✅ (3/month)        | ✅ Unlimited  | ✅ Unlimited       |
| Code Editor           | ✅                  | ✅            | ✅                 |
| AI Tutor Messages     | 50/day              | Unlimited     | Unlimited          |
| Streak & XP           | ✅                  | ✅            | ✅                 |
| Spaced Repetition     | ✅ (10 reviews/day) | Unlimited     | Unlimited          |
| Mock Interviews       | ❌                  | ✅ (10/month) | ✅ Unlimited       |
| Company Prep Paths    | ❌                  | ✅            | ✅                 |
| Priority AI (GPT-4o)  | ❌                  | ✅            | ✅                 |
| Team Dashboard        | ❌                  | ❌            | ✅                 |
| Custom Roadmaps       | ❌                  | ❌            | ✅                 |

#### 6.1.2 Payment Integration

**Provider**: Stripe

**Implementation**:

| Component      | Approach                                   |
| -------------- | ------------------------------------------ |
| Checkout       | Stripe Checkout (hosted)                   |
| Billing Portal | Stripe Customer Portal (hosted)            |
| Webhooks       | Handle subscription events                 |
| Database       | Store stripeCustomerId, subscriptionStatus |

**Edge Cases**:

| Edge Case              | Handling                                  |
| ---------------------- | ----------------------------------------- |
| Payment fails          | Retry 3 times over 7 days; then downgrade |
| User cancels mid-cycle | Access until period end                   |
| User disputes charge   | Pause access; investigate                 |
| Currency conversion    | Stripe handles; show local currency       |

---

## 7. Cross-Cutting Concerns

### 7.1 Error Handling Strategy

**Principle**: Never show raw errors to users. Always provide actionable next steps.

| Error Type        | User Message                                | Internal Action                          |
| ----------------- | ------------------------------------------- | ---------------------------------------- |
| Validation error  | "Please check your input: [specific field]" | Log for analytics                        |
| API rate limit    | "Our AI is busy. Please wait 30 seconds."   | Log; alert if frequent                   |
| Database error    | "Something went wrong. Try again."          | Log full error; alert on-call            |
| AI provider error | "AI is temporarily unavailable. Try again." | Fallback to backup provider if available |
| Auth error        | "Please sign in again."                     | Clear session; redirect                  |

### 7.2 Logging & Monitoring

**Local Development**:

- Console logs only; no external services

**Production**:

| Concern        | Tool             | Why                           |
| -------------- | ---------------- | ----------------------------- |
| Error Tracking | Sentry           | Industry standard; free tier  |
| Analytics      | Plausible        | Privacy-friendly; open-source |
| Uptime         | BetterUptime     | Free tier; Slack alerts       |
| Performance    | Vercel Analytics | Built-in; free                |

### 7.3 Security Checklist

| Concern         | Implementation                                       |
| --------------- | ---------------------------------------------------- |
| SQL Injection   | Not applicable (MongoDB)                             |
| NoSQL Injection | Use Mongoose; validate all input with Zod            |
| XSS             | React escapes by default; no dangerouslySetInnerHTML |
| CSRF            | NextAuth handles; SameSite cookies                   |
| Rate Limiting   | API routes protect with simple in-memory limiter     |
| Secrets         | Environment variables only; never in code            |
| Auth            | NextAuth with secure session handling                |

### 7.4 Performance Targets

| Metric                   | Target        | How to Achieve                     |
| ------------------------ | ------------- | ---------------------------------- |
| First Contentful Paint   | < 1s          | Server components; minimal JS      |
| Largest Contentful Paint | < 2.5s        | Optimized images; lazy load        |
| Time to Interactive      | < 3s          | Code splitting; defer non-critical |
| Lighthouse Score         | > 90          | Audit quarterly                    |
| API Response Time        | < 500ms (p95) | Database indexes; caching          |
| AI Response Start        | < 1s          | Streaming responses                |

### 7.5 Scaling Strategy (When Needed)

**Current**: Single Vercel deployment (sufficient for 10k users)

**Stage 1 (10k-50k users)**:

- Add database indexes
- Implement API response caching (Redis)
- CDN for static assets (already via Vercel)

**Stage 2 (50k-200k users)**:

- Database read replicas
- Edge functions for low-latency API
- Rate limiting per user

**Stage 3 (200k+ users)**:

- Dedicated AI inference (self-hosted or dedicated tier)
- Database sharding by user region
- Microservices for heavy features (mock interviews)

**Anti-Patterns to Avoid**:

- Don't add Redis until you have a caching problem
- Don't use microservices until monolith becomes painful
- Don't add Kubernetes until you have dedicated DevOps

---

## 8. Progress Checkpoints

### Checkpoint 1: MVP Polish (Current → 2 Weeks)

- [ ] Fix all TypeScript lint errors in codebase
- [ ] Ensure `npm run build` passes
- [ ] Add error boundaries to all pages
- [ ] Add loading states to all data-fetching components
- [ ] Test full flow: signup → generate roadmap → view → practice

### Checkpoint 2: Engagement Features (Weeks 3-6)

- [ ] Implement streak system
- [ ] Implement XP/leveling system
- [ ] Add streak/XP display to dashboard
- [ ] Implement daily topic suggestion
- [ ] Add confetti/celebration animations

### Checkpoint 3: Enhanced Learning (Weeks 7-10)

- [ ] Add TypeScript execution support
- [ ] Add Python execution support (Pyodide)
- [ ] Implement spaced repetition engine
- [ ] Add "Explain Selection" feature to tutor
- [ ] Implement rate limiting for free tier

### Checkpoint 4: Interview Prep (Weeks 11-14)

- [ ] Design mock interview UI
- [ ] Implement behavioral interview flow
- [ ] Implement coding interview flow
- [ ] Add 3 company-specific prep paths
- [ ] Gather beta feedback from 10 users

### Checkpoint 5: Monetization (Weeks 15-18)

- [ ] Integrate Stripe Checkout
- [ ] Implement tier-based feature gating
- [ ] Set up subscription webhooks
- [ ] Add billing portal link
- [ ] Launch Pro tier to beta users

### Checkpoint 6: Scale Preparation (Ongoing)

- [ ] Add database indexes based on query analysis
- [ ] Set up Sentry for error tracking
- [ ] Set up uptime monitoring
- [ ] Document all API endpoints
- [ ] Write contributing guide for open-source

---

## Appendix A: Environment Variables

| Variable                       | Required        | Description                           |
| ------------------------------ | --------------- | ------------------------------------- |
| `NEXTAUTH_URL`                 | Yes             | App URL (e.g., http://localhost:3000) |
| `NEXTAUTH_SECRET`              | Yes             | Random string for session encryption  |
| `MONGODB_URI`                  | Yes             | MongoDB connection string             |
| `AI_PROVIDER`                  | Yes             | 'google' or 'openai'                  |
| `GOOGLE_GENERATIVE_AI_API_KEY` | If using Google | Gemini API key                        |
| `OPENAI_API_KEY`               | If using OpenAI | OpenAI API key                        |
| `STRIPE_SECRET_KEY`            | For payments    | Stripe secret key                     |
| `STRIPE_WEBHOOK_SECRET`        | For payments    | Stripe webhook signing secret         |

---

## Appendix B: API Endpoint Reference

| Endpoint                              | Method  | Auth | Purpose              |
| ------------------------------------- | ------- | ---- | -------------------- |
| `/api/auth/*`                         | Various | No   | NextAuth handlers    |
| `/api/ai/generate`                    | POST    | Yes  | Generate roadmap     |
| `/api/ai/tutor`                       | POST    | Yes  | Chat with AI tutor   |
| `/api/roadmaps`                       | GET     | Yes  | List user's roadmaps |
| `/api/roadmaps`                       | POST    | Yes  | Create roadmap       |
| `/api/roadmaps/[id]`                  | GET     | Yes  | Get roadmap detail   |
| `/api/roadmaps/[id]/topics/[topicId]` | PATCH   | Yes  | Update topic status  |

---

_Document Version: 1.0_
_Last Updated: 2026-02-09_
