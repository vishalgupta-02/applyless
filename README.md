# Chrono

Chrono is a SaaS-first job application management system designed around
real application lifecycles and immutable timelines.

Instead of treating applications as editable rows, Chrono models them
as stateful systems with a complete history of transitions and actions.

---

## Why this exists

Job hunting involves dozens of applications, multiple stages, notes,
and long gaps in communication.

Most tools overwrite state and lose context.

Chrono preserves it.

---

## Core Concepts

### Application Lifecycle

Applications move through a strict, predefined lifecycle:

DRAFT → APPLIED → SCREENING → INTERVIEW → OFFER → REJECTED / GHOSTED

Invalid state jumps are rejected at the service layer.

---

### Timeline (Event Log)

Every significant action creates an immutable event:

- Application created
- Status changed
- Note added

The current state is derived from the latest event,
while the full timeline remains queryable.

---

## Tech Stack

- Frontend: Next.js (React)
- Backend: Node.js + Express
- Database: MongoDB
- ODM: Mongoose
- Auth: JWT (access + refresh tokens)
- Deployment: Vercel + Railway

---

## Architecture Overview

- Routes handle HTTP concerns only
- Services enforce business rules
- Repositories isolate database access
- Timeline is append-only by design

No state is overwritten silently.

---

## Database Design (MongoDB)

Chrono uses MongoDB with a snapshot + event-log pattern.

- JobApplication stores the current state for fast queries
- ApplicationEvent stores an immutable timeline of actions

This allows efficient dashboards while preserving full history.

State changes are validated in the service layer and recorded
as append-only events.

---

## Local Setup

```bash
git clone https://github.com/vishalgupta-02/Chrono.git
cd chrono

npm install
npm run dev
```
