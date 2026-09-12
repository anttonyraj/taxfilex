# ADR-003: Deterministic Tax Engine and Complete Line Traceability

## Context
Tax math must be 100% deterministic, verifiable, and explainable to users, CPAs, and IRS examiners. LLMs must never perform tax calculations. Every calculated dollar amount on a return must be auditable back to its legal tax rule and its originating source document or taxpayer answer.

## Decision
1. **Pure Engine Architecture**:
   - `/packages/tax-engine` is pure TypeScript with zero external dependencies.
   - Entry point: `compute(input: EngineInput): ReturnResult`.
   - Function signature is referentially transparent (no network I/O, no filesystem, no clock dependence).
2. **Line Item Traceability**:
   - Every computed line in `ReturnResult.lines[LineId]` is represented as:
     ```typescript
     export interface LineResult {
       value: number;
       ruleId: string;
       sources: SourceRef[];
     }
     ```
   - Each `SourceRef` links to a specific document ID, box label (e.g. `W-2 Box 1 (Wages)`), user answer ID, or intermediate computed line.
3. **No LLM Math**:
   - Tax calculation, standard deduction, tax brackets, credits, and withholding are calculated solely in pure TypeScript rule functions.
   - LLMs are utilized only for document classification, OCR parsing, question tone rephrasing, and plain-language explanation generation using already-computed trace numbers.

## Consequences
- Every field in the UI can offer a "Where did this number come from?" drill-down.
- Visual IRS form population in `/packages/forms` directly maps `ReturnResult.lines` to form fields.
- 100% reproducible test scenarios across Golden Test datasets.
