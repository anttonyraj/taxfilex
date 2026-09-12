import { FilingStatus, TaxBracket } from '../types.js';

export const ENGINE_VERSION = '2026.1.0-mvp';

/**
 * Standard Deduction for TY2026
 * Statutory citation: IRC §63(c), projected following IRS Rev. Proc. 2024-40 & 2025-32 chained to 2026.
 */
export const STANDARD_DEDUCTION_TY2026: Record<FilingStatus, number> = {
  // IRC §63(c)(2)(C) - Single filer baseline
  SINGLE: 15700,
  // IRC §63(c)(2)(A) - Married Filing Jointly (2x Single)
  MARRIED_FILING_JOINTLY: 31400,
  // IRC §63(c)(2)(C) - Married Filing Separately
  MARRIED_FILING_SEPARATELY: 15700,
  // IRC §63(c)(2)(B) - Head of Household
  HEAD_OF_HOUSEHOLD: 23550,
};

/**
 * Additional standard deduction for age 65+ and/or blindness (per condition, per person)
 * Statutory citation: IRC §63(f)
 */
export const ADDITIONAL_STANDARD_DEDUCTION_TY2026 = {
  // Married (MFJ or MFS) - per condition (IRC §63(f)(1),(2))
  MARRIED: 1650,
  // Unmarried (Single or HOH) - per condition (IRC §63(f)(3))
  UNMARRIED: 2050,
};

/**
 * Dependent Standard Deduction limitation
 * Statutory citation: IRC §63(c)(5)
 * Deduction cannot exceed greater of $1,350 or (earned income + $450), up to regular standard deduction.
 */
export const DEPENDENT_STANDARD_DEDUCTION_TY2026 = {
  MIN_DEDUCTION: 1350,
  EARNED_INCOME_ADDITION: 450,
};

/**
 * Tax Brackets for Ordinary Income TY2026
 * Statutory citation: IRC §1(j), indexed for inflation.
 */
export const TAX_BRACKETS_TY2026: Record<FilingStatus, TaxBracket[]> = {
  SINGLE: [
    { rate: 0.10, min: 0, max: 12400 },
    { rate: 0.12, min: 12400, max: 50400 },
    { rate: 0.22, min: 50400, max: 107350 },
    { rate: 0.24, min: 107350, max: 204600 },
    { rate: 0.32, min: 204600, max: 259900 },
    { rate: 0.35, min: 259900, max: 650400 },
    { rate: 0.37, min: 650400, max: Infinity },
  ],
  MARRIED_FILING_JOINTLY: [
    { rate: 0.10, min: 0, max: 24800 },
    { rate: 0.12, min: 24800, max: 100800 },
    { rate: 0.22, min: 100800, max: 214700 },
    { rate: 0.24, min: 214700, max: 409200 },
    { rate: 0.32, min: 409200, max: 519800 },
    { rate: 0.35, min: 519800, max: 780500 },
    { rate: 0.37, min: 780500, max: Infinity },
  ],
  MARRIED_FILING_SEPARATELY: [
    { rate: 0.10, min: 0, max: 12400 },
    { rate: 0.12, min: 12400, max: 50400 },
    { rate: 0.22, min: 50400, max: 107350 },
    { rate: 0.24, min: 107350, max: 204600 },
    { rate: 0.32, min: 204600, max: 259900 },
    { rate: 0.35, min: 259900, max: 390250 },
    { rate: 0.37, min: 390250, max: Infinity },
  ],
  HEAD_OF_HOUSEHOLD: [
    { rate: 0.10, min: 0, max: 17700 },
    { rate: 0.12, min: 17700, max: 67500 },
    { rate: 0.22, min: 67500, max: 107350 },
    { rate: 0.24, min: 107350, max: 204600 },
    { rate: 0.32, min: 204600, max: 259900 },
    { rate: 0.35, min: 259900, max: 650400 },
    { rate: 0.37, min: 650400, max: Infinity },
  ],
};

/**
 * Child Tax Credit & Credit for Other Dependents parameters TY2026
 * Statutory citation: IRC §24
 */
export const CTC_PARAMS_TY2026 = {
  // IRC §24(a) - $2,000 per qualifying child
  QUALIFYING_CHILD_AMOUNT: 2000,
  // IRC §24(h)(4) - $500 nonrefundable credit for other dependents
  OTHER_DEPENDENT_AMOUNT: 500,
  // IRC §24(b)(2) - Phaseout threshold by filing status
  PHASEOUT_THRESHOLD: {
    MARRIED_FILING_JOINTLY: 400000,
    SINGLE: 200000,
    HEAD_OF_HOUSEHOLD: 200000,
    MARRIED_FILING_SEPARATELY: 200000,
  } as Record<FilingStatus, number>,
  // IRC §24(b)(1) - $50 reduction for each $1,000 (or fraction thereof)
  PHASEOUT_STEP: 1000,
  PHASEOUT_REDUCTION: 50,
};

/**
 * Statutory Underpayment Penalty threshold
 * Statutory citation: IRC §6654(e)(1)
 * No penalty if balance due on return is less than $1,000.
 */
export const UNDERPAYMENT_PENALTY_THRESHOLD = 1000;
