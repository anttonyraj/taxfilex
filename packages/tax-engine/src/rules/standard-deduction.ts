import { EngineInput, LineResult, SourceRef } from '../types.js';
import {
  STANDARD_DEDUCTION_TY2026,
  ADDITIONAL_STANDARD_DEDUCTION_TY2026,
  DEPENDENT_STANDARD_DEDUCTION_TY2026,
} from '../params/ty2026.js';

export function calculateStandardDeduction(
  input: EngineInput,
  earnedIncome: number
): { line12: LineResult } {
  const baseDeduction = STANDARD_DEDUCTION_TY2026[input.filingStatus];
  const sources: SourceRef[] = [
    {
      boxOrLine: 'Filing Status',
      description: `Basic standard deduction for ${input.filingStatus}: $${baseDeduction}`,
    },
  ];

  let additionalDeduction = 0;
  const isMarried =
    input.filingStatus === 'MARRIED_FILING_JOINTLY' ||
    input.filingStatus === 'MARRIED_FILING_SEPARATELY';
  const additionalPerCondition = isMarried
    ? ADDITIONAL_STANDARD_DEDUCTION_TY2026.MARRIED
    : ADDITIONAL_STANDARD_DEDUCTION_TY2026.UNMARRIED;

  // Primary filer age 65+
  if (input.filer.ageOnDec31 >= 65) {
    additionalDeduction += additionalPerCondition;
    sources.push({
      boxOrLine: 'Filer Age',
      description: `Additional standard deduction for filer age 65+: $${additionalPerCondition}`,
    });
  }

  // Primary filer blind
  if (input.filer.isBlind) {
    additionalDeduction += additionalPerCondition;
    sources.push({
      boxOrLine: 'Filer Blindness',
      description: `Additional standard deduction for filer blindness: $${additionalPerCondition}`,
    });
  }

  // Spouse age 65+ and blind (only for MFJ)
  if (input.filingStatus === 'MARRIED_FILING_JOINTLY' && input.spouse) {
    if (input.spouse.ageOnDec31 >= 65) {
      additionalDeduction += additionalPerCondition;
      sources.push({
        boxOrLine: 'Spouse Age',
        description: `Additional standard deduction for spouse age 65+: $${additionalPerCondition}`,
      });
    }
    if (input.spouse.isBlind) {
      additionalDeduction += additionalPerCondition;
      sources.push({
        boxOrLine: 'Spouse Blindness',
        description: `Additional standard deduction for spouse blindness: $${additionalPerCondition}`,
      });
    }
  }

  let totalDeduction = baseDeduction + additionalDeduction;

  // Dependent limitation check (IRC §63(c)(5))
  if (input.filer.canBeClaimedAsDependent) {
    const dependentCalc = Math.max(
      DEPENDENT_STANDARD_DEDUCTION_TY2026.MIN_DEDUCTION,
      earnedIncome + DEPENDENT_STANDARD_DEDUCTION_TY2026.EARNED_INCOME_ADDITION
    );
    const cappedDeduction = Math.min(totalDeduction, dependentCalc);
    sources.push({
      boxOrLine: 'IRC §63(c)(5)',
      description: `Dependent standard deduction limit: greater of $${DEPENDENT_STANDARD_DEDUCTION_TY2026.MIN_DEDUCTION} or earned income + $${DEPENDENT_STANDARD_DEDUCTION_TY2026.EARNED_INCOME_ADDITION} ($${dependentCalc}), capped at normal deduction ($${totalDeduction})`,
    });
    totalDeduction = cappedDeduction;
  }

  const line12: LineResult = {
    value: totalDeduction,
    ruleId: 'RULE-TY2026-STANDARD-DEDUCTION',
    sources,
  };

  return { line12 };
}
