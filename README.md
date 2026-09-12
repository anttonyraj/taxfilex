# TaxFilex (taxfilex.com)

Privacy-first US individual income-tax filing product for Tax Year 2026 (filing season 2027).
**"Upload your W-2. We do the rest."**

## Architectural Invariants
1. **Process and Forget**: Uploaded documents are read once in server memory, classified/extracted via Gemini (paid tier), and destroyed within seconds. Zero raw file bytes are ever persisted to disk, cloud buckets, databases, or logs.
2. **Deterministic Tax Math**: LLMs **never** compute tax math. The pure, zero-dependency tax engine in `/packages/tax-engine` performs all statutory calculations with full audit traceability (`ruleId` + `sources`).
3. **Envelope Encryption by Default**: All sensitive financial amounts and SSNs are stored encrypted with a unique per-user 256-bit AES-GCM data key wrapped by a server master key.
4. **Out-of-Scope Detection**: Complex tax situations (Schedule C, rental property, K-1, 1099-B, multi-state) are immediately detected and referred out.

## Monorepo Layout
- `/apps/web`: Next.js 16 (App Router), React 19, Tailwind CSS, shadcn/ui, Route Handlers.
- `/packages/tax-engine`: Pure TypeScript, deterministic, versioned TY2026 tax engine.
- `/packages/shared`: Shared Zod schemas, data contracts, and envelope encryption helpers.
- `/packages/pipeline`: Document intake, sharp preprocessing, and extraction pipeline.
- `/packages/forms`: Form 1040 / state PDF form field maps and MeF XML stub.
- `/docs`: Architecture Decision Records, rule references, and 25+ golden test scenarios.

## Quick Start & Local Development

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Tests
```bash
# Run all unit tests across packages
pnpm test

# Run the 25+ scenario Golden Test harness in tax-engine
pnpm --filter @taxfilex/tax-engine test:golden
```

### 3. Start Firebase Emulators
```bash
# Starts Auth on :9099, Firestore on :8080, Emulator UI on :4000
firebase emulators:start
```

### 4. Run Web Application
```bash
pnpm --filter @taxfilex/web dev
```
Open [http://localhost:3001](http://localhost:3001) to view the application.

## Documentation Reference
- [ADR-001: Monorepo Tooling](file:///docs/ADR-001-monorepo-tooling.md)
- [ADR-002: Envelope Encryption](file:///docs/ADR-002-envelope-encryption.md)
- [ADR-003: Tax Engine Traceability](file:///docs/ADR-003-tax-engine-traceability.md)
- [Privacy Data-Flow & Zero Retention](file:///docs/privacy-dataflow.md)
- [CPA Rule Review Catalog](file:///docs/rule-review.md)
- [TY2026 Forms Status](file:///docs/forms-status.md)
