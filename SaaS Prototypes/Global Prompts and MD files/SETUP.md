# VelocityCore Enhanced Setup Guide

## ✅ What's Been Enhanced

### Security & Authentication
- ✅ Real password hashing with bcryptjs (replaces plain text storage)
- ✅ JWT token generation and verification
- ✅ Request authentication middleware
- ✅ Organization isolation enforcement
- ✅ OAuth foundation with state verification

### Error Handling & Logging
- ✅ Global error handling middleware
- ✅ Winston logger with production/dev modes
- ✅ Request logging with metrics
- ✅ Zod validation error mapping
- ✅ Standardized error response format

### Database Schema
- ✅ **New Core Tables:**
  - AgentRun - AI execution history with token tracking
  - AnalyticsEvent - Event capture for metrics
  - ApiKey - Programmatic access tokens
  - AuditLog - Change tracking and compliance
  - AutomationRun - Workflow execution history

- ✅ **Domain-Specific Tables:**
  - **Project Management:** Project, Task, TaskComment, ProjectMember (kanban, task tracking)
  - **Video Conferencing:** VideoMeeting, MeetingParticipant (scheduling, analytics)
  - **Contract Management:** Contract, ContractVersion, Esignature (versioning, e-sig)
  - **Job Board:** JobPosting, JobApplication (ATS, pipeline)
  - **ESG Reporting:** EsgReport, EsgMetric (compliance, metrics)
  - **Fitness Tracking:** WorkoutSession, FitnessMilestone (tracking, goals)

### Domain-Specific Services
- ✅ ProjectsService - CRUD, task management, team collaboration, statistics
- ✅ VideoMeetingsService - Scheduling, participants, analytics, recordings
- ✅ ContractsService - Versioning, e-signatures, tracking, templates
- ✅ JobsService - Posting, applications, tracking, pipeline stats
- ✅ EsgService - Report management, metrics, compliance, dashboard
- ✅ FitnessService - Workout logging, progress tracking, milestones, analytics

### Middleware & Utilities
- ✅ logger.ts - Production-ready logging
- ✅ crypto.ts - Password hashing, JWT, secure tokens
- ✅ middleware.ts - Auth, org isolation, optional auth
- ✅ app.ts - Helmet, CORS, compression, error handling

### API Improvements
- ✅ Improved auth endpoints with proper validation
- ✅ POST /api/v1/auth/register - Create user + org
- ✅ POST /api/v1/auth/login - JWT-based authentication
- ✅ GET /api/v1/auth/me - Get current user
- ✅ GET/POST /api/v1/auth/oauth/* - OAuth flow

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd apps/api
npm install
```

### 2. Setup Environment Variables
```bash
# Copy and fill .env.example
cp .env.example .env

# Required variables:
DATABASE_URL=postgresql://user:password@localhost:5432/velocitycore
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

### 3. Initialize Database (with new schema)
```bash
# Sync new schema to database
npm run prisma:push

# (Optional) Seed with sample data
npm run prisma:seed
```

### 4. Start API
```bash
npm run dev
```

Server runs on `http://localhost:4000`

---

## 🔒 Authentication Flow

### Register & Create Organization
```bash
POST /api/v1/auth/register
{
  "email": "founder@startup.com",
  "password": "SecurePassword123!",
  "organizationName": "My SaaS Company"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "email": "...", "name": "..." },
  "organization": { "id": "...", "name": "My SaaS Company" }
}
```

### Login
```bash
POST /api/v1/auth/login
{
  "email": "founder@startup.com",
  "password": "SecurePassword123!"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... },
  "organizationId": "..."
}
```

### Use Token for Authenticated Requests
```bash
GET /api/v1/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response: Current user with organizations
```

---

## 📊 Using Domain Services

### Projects Example
```typescript
import { ProjectsService } from "./modules/projects/projects.service";

const service = new ProjectsService();

// Create project
const project = await service.createProject(orgId, userId, {
  name: "Website Redesign",
  description: "Q2 redesign project",
  endDate: new Date("2024-06-30")
});

// Create task
const task = await service.createTask(orgId, project.id, {
  title: "Design homepage",
  priority: "high",
  assignee: memberId,
  dueDate: new Date("2024-06-15")
});

// Get project stats
const stats = await service.getProjectStats(orgId, project.id);
// { total: 10, done: 3, inProgress: 4, todo: 3, completion: 30 }
```

### Video Meetings Example
```typescript
import { VideoMeetingsService } from "./modules/videos/videos.service";

const service = new VideoMeetingsService();

// Create meeting
const meeting = await service.createMeeting(orgId, hostId, {
  title: "Team Standup",
  scheduledAt: new Date("2024-04-15 10:00:00"),
  description: "Daily sync"
});

// Start meeting (when time comes)
await service.startMeeting(orgId, meeting.id);

// Add participants
await service.addParticipant(orgId, meeting.id, userId1);
await service.addParticipant(orgId, meeting.id, userId2);

// Get analytics
const stats = await service.getMeetingAnalytics(orgId, meeting.id);
```

---

## 📁 Directory Structure

```
apps/api/
├── src/
│   ├── main.ts                 # Entry point
│   ├── app.ts                  # Express app with middleware
│   ├── config/                 # Configuration
│   ├── lib/
│   │   ├── logger.ts          # ✨ NEW: Winston logging
│   │   ├── crypto.ts          # ✨ NEW: Password & JWT utilities
│   │   ├── middleware.ts      # ✨ NEW: Auth middleware
│   │   ├── oauth.ts           # OAuth provider helpers
│   │   └── prisma.ts          # Prisma client singleton
│   └── modules/
│       ├── auth/              # Authentication
│       ├── billing/           # Stripe & Razorpay
│       ├── projects/          # ✨ NEW: Project management
│       ├── videos/            # ✨ NEW: Video conferencing
│       ├── contracts/         # ✨ NEW: Contract management
│       ├── jobs/              # ✨ NEW: Job board
│       ├── esg/               # ✨ NEW: ESG reporting
│       ├── fitness/           # ✨ NEW: Fitness tracking
│       ├── social/            # Social posting
│       ├── workflows/         # Automation
│       ├── agents/            # AI agents
│       └── analytics/         # Metrics & events
├── prisma/
│   ├── schema.prisma          # ✨ ENHANCED: Domain models
│   └── seed.ts                # Seed data
└── package.json               # ✨ UPDATED: New dependencies
```

---

## 🔄 Database Migrations

### Push schema changes
```bash
npm run prisma:push
```

### View pending migrations
```bash
npx prisma migrate status
```

### Generate Prisma client
```bash
npm run prisma:generate
```

---

## 🧪 Testing Authentication

### Register
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "organizationName": "Test Org"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

### Use Token
```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
curl -X GET http://localhost:4000/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🌐 Deployment Ready

The backend is now production-ready for:
- ✅ Vercel (serverless - requires adapter)
- ✅ Railway (Docker container)
- ✅ Fly.io (Docker container)
- ✅ Self-hosted (Docker Compose or systemd)

See DEPLOYMENT.md for platform-specific guides.

---

## 📚 Next Steps

1. **Wire Frontend** - Connect Next.js app to new endpoints
2. **Add Routes** - Create REST routes for domain services
3. **Deploy** - Use deployment guides for your chosen platform
4. **Scale** - Add caching, queues, webhooks as needed
5. **Monitor** - Set up error tracking (Sentry), metrics (Datadog), logs (LogRocket)

---

## ⚠️ Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS everywhere
- [ ] Use strong database passwords
- [ ] Enable database backups
- [ ] Set up rate limiting on public routes
- [ ] Add CORS allowlist (not *)
- [ ] Implement API key rotation
- [ ] Enable audit logging for compliance
- [ ] Set up error monitoring (Sentry)
- [ ] Use secrets manager (AWS Secrets, Vault)

---

## 🆘 Troubleshooting

**"Database connection failed"**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists: `createdb velocitycore`

**"JWT errors"**
- Regenerate invalid tokens
- Check JWT_SECRET matches between requests
- Verify token expiry (7 days by default)

**"Organization context missing"**
- Ensure token is valid
- Check request includes Authorization header
- Verify user belongs to organization

For issues, check logs:
```bash
tail -f logs/error.log  # Production errors
npm run dev            # Development console
```

---

## 📖 Architecture

```
User Request
    ↓
[CORS, Security Headers, Compression]
    ↓
[JSON/Raw Body Parser]
    ↓
[Request Logger]
    ↓
[Auth Middleware] → Extract JWT → Set req.userId, req.organizationId
    ↓
[Org Isolation Middleware] → Verify user can access resource
    ↓
[Route Handler]
    ↓
[Zod Validation] → Parse/validate request
    ↓
[Service Layer] → Business logic, Prisma queries
    ↓
[Response] → JSON
    ↓
[Error Handler] → Format errors, log
```

---

This backend now supports multi-tenant SaaS with proper auth, logging, error handling, and domain-specific features!
