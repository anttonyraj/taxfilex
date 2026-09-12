import { LineResult } from '../types.js';
import { UNDERPAYMENT_PENALTY_THRESHOLD } from '../params/ty2026.js';

export function calculateRefundOrBalance(
  regularTax: number,
  nonrefundableCredits: number,
  totalPayments: number
): {
  line24: LineResult;
  line34: LineResult;
  line37: LineResult;
  warnings: string[];
} {
  const totalTax = Math.max(0, regularTax - nonrefundableCredits);
  const roundedTotalTax = Math.round(totalTax * 100) / 100;

  const line24: LineResult = {
    value: roundedTotalTax,
    ruleId: 'RULE-TY2026-TOTAL-TAX',
    sources: [
      {
        boxOrLine: '1040 Line 16',
        description: `Regular tax liability ($${regularTax.toLocaleString()})`,
      },
      {
        boxOrLine: '1040 Line 19',
        description: `Less nonrefundable credits ($${nonrefundableCredits.toLocaleString()})`,
      },
    ],
  };

  const warnings: string[] = [];
  let overpayment = 0;
  let balanceDue = 0;

  if (totalPayments > roundedTotalTax) {
    overpayment = Math.round((totalPayments - roundedTotalTax) * 100) / 100;
  } else if (roundedTotalTax > totalPayments) {
    balanceDue = Math.round((roundedTotalTax - totalPayments) * 100) / 100;
  }

  const line34: LineResult = {
    value: overpayment,
    ruleId: 'RULE-TY2026-OVERPAYMENT',
    sources: [
      {
        boxOrLine: '1040 Line 33',
        description: `Total payments ($${totalPayments.toLocaleString()}) exceeding total tax ($${roundedTotalTax.toLocaleString()})`,
      },
    ],
  };

  const line37: LineResult = {
    value: balanceDue,
    ruleId: 'RULE-TY2026-BALANCE-DUE',
    sources: [
      {
        boxOrLine: '1040 Line 24',
        description: `Total tax ($${roundedTotalTax.toLocaleString()}) exceeding payments ($${totalPayments.toLocaleString()})`,
      },
    ],
  };

  if (balanceDue > UNDERPAYMENT_PENALTY_THRESHOLD) {
    warnings.push(
      `Estimated tax penalty warning: Balance due ($${balanceDue.toLocaleString()}) exceeds $${UNDERPAYMENT_PENALTY_THRESHOLD.toLocaleString()}. You may owe an estimated tax underpayment penalty (Form 2210) unless an exception applies.`
    );
  }

  return { line24, line34, line37, warnings };
}
