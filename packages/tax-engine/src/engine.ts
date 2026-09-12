import { EngineInput, ReturnResult, LineId, LineResult } from './types.js';
import { ENGINE_VERSION } from './params/ty2026.js';
import { calculateGrossIncome } from './rules/gross-income.js';
import { calculateStandardDeduction } from './rules/standard-deduction.js';
import { calculateTaxableIncome } from './rules/taxable-income.js';
import { calculateBracketTax } from './rules/tax-brackets.js';
import { calculateChildTaxCredit } from './rules/child-tax-credit.js';
import { calculatePayments } from './rules/payments.js';
import { calculateRefundOrBalance } from './rules/refund-balance.js';
import { detectScope } from './rules/scope-detection.js';

export function compute(input: EngineInput): ReturnResult {
  const lines: Partial<Record<LineId, LineResult>> = {};
  const forms: string[] = ['1040'];
  const allWarnings: string[] = [];

  // 1. Gross income & AGI
  const income = calculateGrossIncome(input);
  lines['1040_1a'] = income.line1a;
  lines['1040_1z'] = income.line1z;
  lines['1040_9'] = income.line9;
  lines['1040_11'] = income.line11;

  const agi = income.line11.value;
  const earnedIncome = income.line1z.value;

  // 2. Standard deduction
  const deductionResult = calculateStandardDeduction(input, earnedIncome);
  lines['1040_12'] = deductionResult.line12;
  const totalDeduction = deductionResult.line12.value;

  // 3. Taxable income
  const taxableResult = calculateTaxableIncome(agi, totalDeduction);
  lines['1040_15'] = taxableResult.line15;
  const taxableIncome = taxableResult.line15.value;

  // 4. Regular tax liability
  const bracketResult = calculateBracketTax(taxableIncome, input.filingStatus);
  lines['1040_16'] = bracketResult.line16;
  const regularTax = bracketResult.line16.value;

  // 5. Child Tax Credit & Credit for Other Dependents
  const ctcResult = calculateChildTaxCredit(
    input.dependents,
    input.filingStatus,
    agi,
    regularTax
  );
  lines['1040_19'] = ctcResult.line19;
  if (input.dependents.length > 0) {
    forms.push('Schedule 8812');
  }

  // 6. Payments and Withholding
  const paymentsResult = calculatePayments(input);
  lines['1040_25a'] = paymentsResult.line25a;
  lines['1040_25d'] = paymentsResult.line25d;
  lines['1040_33'] = paymentsResult.line33;
  const totalPayments = paymentsResult.line33.value;

  // 7. Refund or Balance Due
  const refundBalanceResult = calculateRefundOrBalance(
    regularTax,
    ctcResult.line19.value,
    totalPayments
  );
  lines['1040_24'] = refundBalanceResult.line24;
  lines['1040_34'] = refundBalanceResult.line34;
  lines['1040_37'] = refundBalanceResult.line37;
  allWarnings.push(...refundBalanceResult.warnings);

  // 8. Scope detection
  const scopeFlags = detectScope(input);

  return {
    lines: lines as Record<LineId, LineResult>,
    forms,
    scopeFlags,
    warnings: allWarnings,
    engineVersion: ENGINE_VERSION,
    computedAtIso: '2026-12-31T23:59:59.000Z', // Pure deterministic timestamp placeholder
  };
}
