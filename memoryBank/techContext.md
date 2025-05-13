# Tech Context

## Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui
- **Code Editor:** Monaco Editor

## Backend
- **API:** Next.js API routes (can migrate to standalone service)
- **ORM:** Prisma
- **Database:** PostgreSQL

## AI Integration
- **Provider:** OpenRouter API
- **Usage:** Project plan generation, feedback (future: code analysis)

## Authentication
- **Library:** NextAuth.js
- **Adapter:** PrismaAdapter for persistent user/account/session storage
- **Session:** JWT-based, with custom fields (accessToken, githubId, etc.)
- **Provider:** GitHub App OAuth with advanced scopes (`repo`, `pull_request:write`, `metadata:read`, etc.)
- **Error Handling:** Custom error page for NextAuth errors
- **Type Safety:** Custom TypeScript types for session/JWT extensions

## Admin Tools
- **Dashboard:** Protected admin routes for roadmap management

## Other Tools
- **Version Control:** Git (GitHub)
- **Testing:** Jest, React Testing Library (future)
- **Deployment:** Vercel (preferred), Docker (optional)

## Constraints
- MVP scope: Only features required for core learning flow
- All roadmap data managed by admin (no live scraping)
- Simple code editor for MVP (syntax coloring, error display)
