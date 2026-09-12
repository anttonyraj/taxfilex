import { LineResult } from '../types.js';

export function calculateTaxableIncome(
  agi: number,
  deduction: number
): { line15: LineResult } {
  const taxable = Math.max(0, agi - deduction);
  const roundedTaxable = Math.round(taxable * 100) / 100;

  const line15: LineResult = {
    value: roundedTaxable,
    ruleId: 'RULE-TY2026-TAXABLE-INCOME',
    sources: [
      {
        boxOrLine: '1040 Line 11',
        description: `Adjusted gross income ($${agi})`,
      },
      {
        boxOrLine: '1040 Line 12',
        description: `Less standard deduction ($${deduction})`,
      },
    ],
  };

  return { line15 };
}
