import { FilingStatus, LineResult, SourceRef } from '../types.js';
import { TAX_BRACKETS_TY2026 } from '../params/ty2026.js';

export function calculateBracketTax(
  taxableIncome: number,
  filingStatus: FilingStatus
): { line16: LineResult } {
  if (taxableIncome <= 0) {
    return {
      line16: {
        value: 0,
        ruleId: 'RULE-TY2026-TAX-BRACKETS',
        sources: [
          {
            boxOrLine: '1040 Line 15',
            description: 'Taxable income is $0, tax liability is $0',
          },
        ],
      },
    };
  }

  const brackets = TAX_BRACKETS_TY2026[filingStatus];
  let totalTax = 0;
  const sources: SourceRef[] = [];

  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      const chunk = Math.min(taxableIncome, bracket.max) - bracket.min;
      const bracketTax = chunk * bracket.rate;
      totalTax += bracketTax;

      const ratePct = `${Math.round(bracket.rate * 100)}%`;
      const maxStr = bracket.max === Infinity ? 'above' : `$${bracket.max.toLocaleString()}`;
      sources.push({
        boxOrLine: `Bracket ${ratePct}`,
        description: `$${Math.round(chunk).toLocaleString()} taxed at ${ratePct} ($${bracket.min.toLocaleString()} to ${maxStr}): $${bracketTax.toFixed(2)}`,
      });
    }
  }

  // IRS rounding: Round to nearest whole dollar for 1040 tax line
  const roundedTax = Math.round(totalTax);

  const line16: LineResult = {
    value: roundedTax,
    ruleId: 'RULE-TY2026-TAX-BRACKETS',
    sources,
  };

  return { line16 };
}
