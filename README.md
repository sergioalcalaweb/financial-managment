# Financial Management Platform

A Next.js App Router MVP for multi-user monthly finance management with separated MXN and USD flows.

## Stack

- Next.js 16 App Router, React, TypeScript, TailwindCSS
- shadcn-style local UI primitives
- TanStack Query, React Hook Form, Zod, Zustand
- Prisma ORM with PostgreSQL
- JWT cookie sessions and role-based proxy protection

## Getting Started

```bash
pnpm install
cp .env.example .env
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

Set `DATABASE_URL` in `.env` to your PostgreSQL database before running migrations.

## Demo Accounts

After seeding:

- Admin: `admin@example.com` / `Password123`
- User: `user@example.com` / `Password123`

## MVP Modules

- Authentication and protected routes
- Dashboard with separated MXN/USD summaries
- Income capture
- Expense capture and recurring template foundation
- Investments, debts, reports, settings, and admin user screens
- Rules-based recommendations engine
