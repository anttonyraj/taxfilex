# Tax Rule Review Catalog (CPA Review)

This document tracks all statutory interpretations, inflation projection baselines, and conservative assumptions made in the TaxFilex engine for Tax Year 2026.

| Rule ID | Statutory Item | Baseline Reference | Conservative Interpretation / Assumption | Status |
| :--- | :--- | :--- | :--- | :--- |
| `RULE-TY2026-STD-DED` | TY2026 Standard Deduction | Projected from Rev. Proc. 2024-40 & 2025-32 chained to TY2026 | Single: $15,700; MFJ: $31,400; HOH: $23,550; MFS: $15,700. Additions for 65+/blind: $1,650 (married) / $2,050 (unmarried). | Pending IRS official TY2026 Rev Proc final publication |
| `RULE-TY2026-BRACKETS` | TY2026 Ordinary Tax Brackets | Projected 2026 statutory rates | 10%, 12%, 22%, 24%, 32%, 35%, 37% thresholds scaled per inflation index. | Verified against projected thresholds |
| `RULE-TY2026-CTC` | Child Tax Credit & ODC | IRC §24 / OBBBA | $2,000 per qualifying child under 17 with valid SSN; $500 Credit for Other Dependents. Phaseout threshold $400,000 (MFJ) / $200,000 (all others) at $50 per $1,000 excess. Non-refundable portion calculated on Form 1040 line 19. | Verified |
| `RULE-TY2026-DEP-DED` | Standard Deduction for Dependents | IRC §63(c)(5) | Greater of $1,350 or earned income + $450, not to exceed basic standard deduction. | Standard formula applied |
| `RULE-TY2026-UNDERPAY-FLAG` | Underpayment Penalty Flag | IRC §6654 | Balance due > $1,000 flags warning for estimated payment penalty review (computation referred/noted). | Implemented |
