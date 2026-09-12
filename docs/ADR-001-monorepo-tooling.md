# ADR-001: Monorepo Tooling and Architecture

## Context
TaxFilex is an individual income tax preparation product requiring:
- A pure, deterministic tax engine with zero external dependencies that can run both on serverless runtimes and client browsers.
- Server-side document processing with strict memory-only constraints.
- Shared domain schemas (Zod + TypeScript) shared across frontend, route handlers, and engine.
- PDF generation and MeF XML stubbing.
- A modern Next.js 16 frontend.

## Decision
We adopt a monorepo layout powered by `pnpm workspaces`:
- `/apps/web`: Next.js 16 App Router (UI, Route Handlers, Server Actions).
- `/packages/tax-engine`: Pure TypeScript, zero external runtime dependencies, deterministic tax math.
- `/packages/shared`: Zod schemas, data contracts, and cryptographic primitives (envelope encryption).
- `/packages/pipeline`: Document intake, preprocessing, and LLM extraction client.
- `/packages/forms`: Form field mappings (IRS 1040, state forms), MeF XML generator stub.
- `/docs`: Architectural Decision Records (ADRs), rule reference documents, scenario test definitions, and privacy architecture.

## Consequences
- Strict boundaries: `/packages/tax-engine` has zero dependencies on web or cloud frameworks. It can be compiled to pure JS and audited independently.
- Shared validation: Zod schemas in `/packages/shared` enforce strict typing across client inputs and server endpoints.
- Code reuse without leaking secrets or server dependencies into the client bundle.
