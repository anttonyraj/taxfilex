import { EngineInput, LineResult, SourceRef } from '../types.js';

export function calculateGrossIncome(input: EngineInput): {
  line1a: LineResult;
  line1z: LineResult;
  line9: LineResult;
  line11: LineResult;
} {
  let totalWages = 0;
  const sources: SourceRef[] = [];

  for (const doc of input.documents) {
    if (doc.type === 'W2' && doc.w2) {
      const box1 = Math.round((doc.w2.box1Wages ?? 0) * 100) / 100;
      totalWages += box1;
      sources.push({
        docId: doc.id,
        formType: 'W-2',
        boxOrLine: 'Box 1',
        description: `Wages from ${doc.w2.employerName || 'Employer'} (EIN: ${doc.w2.employerEin || 'Unknown'})`,
      });
    }
  }

  const roundedWages = Math.round(totalWages * 100) / 100;

  const line1a: LineResult = {
    value: roundedWages,
    ruleId: 'RULE-TY2026-W2-WAGES',
    sources,
  };

  const line1z: LineResult = {
    value: roundedWages,
    ruleId: 'RULE-TY2026-TOTAL-WAGES',
    sources: [
      {
        boxOrLine: '1040 Line 1a',
        description: 'Sum of all W-2 Box 1 wages',
      },
    ],
  };

  const line9: LineResult = {
    value: roundedWages,
    ruleId: 'RULE-TY2026-TOTAL-INCOME',
    sources: [
      {
        boxOrLine: '1040 Line 1z',
        description: 'Total wages and other compensation',
      },
    ],
  };

  // Simple persona: No Schedule 1 adjustments in baseline Phase 1
  const line11: LineResult = {
    value: roundedWages,
    ruleId: 'RULE-TY2026-AGI',
    sources: [
      {
        boxOrLine: '1040 Line 9',
        description: 'Adjusted Gross Income (equals total income for simple W-2 filers)',
      },
    ],
  };

  return { line1a, line1z, line9, line11 };
}
