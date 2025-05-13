# System Patterns

## Architecture Overview
- **Frontend:** Next.js (React), Tailwind CSS, shadcn/ui, Monaco Editor
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **AI Integration:** OpenRouter API for project plan generation and feedback
- **Authentication:** NextAuth.js with GitHub App (OAuth), PrismaAdapter, JWT sessions, advanced repo/PR scopes, custom session fields, and robust error handling.
- **Admin Dashboard:** Protected routes for roadmap management

## Key Design Patterns
- **Separation of Concerns:** UI, business logic, and data access are modularized.
- **Modularity:** Each feature (roadmap, progress, project, feedback) is a separate module.
- **DRY & Reusability:** Shared components and hooks for repeated logic.
- **KISS:** Simple, self-explanatory code and flows.
- **YAGNI:** Only build features needed for the MVP.

## Core Flows

### Authentication Flow
1. User visits `/login` and signs in with GitHub (OAuth via GitHub App).
2. NextAuth.js uses PrismaAdapter to persist user/account/session data.
3. Custom sign-in logic links GitHub accounts to existing users by email.
4. JWT session includes GitHub access/refresh tokens and user IDs.
5. Authenticated users are redirected to the dashboard; sign-out returns to home.
6. Errors are routed to `/auth/error` with user-friendly messages and retry options.

### User Flow
1. Sign up / Login
2. Select roadmap
3. Log learning progress
4. Generate project plan (AI)
5. Work on modules in code editor
6. Submit module for feedback
7. Review feedback and iterate

### Admin Flow
1. Login as admin
2. Add/edit roadmaps
3. Monitor user progress

## Diagrams

```mermaid
flowchart TD
    A[User Auth] --> B[Select Roadmap]
    B --> C[Log Progress]
    C --> D[Generate Project Plan (AI)]
    D --> E[Show Project Modules]
    E --> F[Code in Editor]
    F --> G[Submit Module]
    G --> H[AI Feedback]
    H --> E
