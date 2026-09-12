import { EngineInput, LineResult, SourceRef } from '../types.js';

export function calculatePayments(input: EngineInput): {
  line25a: LineResult;
  line25d: LineResult;
  line33: LineResult;
} {
  let totalWithholding = 0;
  const sources: SourceRef[] = [];

  for (const doc of input.documents) {
    if (doc.type === 'W2' && doc.w2) {
      const box2 = Math.round((doc.w2.box2FederalTaxWithheld ?? 0) * 100) / 100;
      totalWithholding += box2;
      sources.push({
        docId: doc.id,
        formType: 'W-2',
        boxOrLine: 'Box 2',
        description: `Federal tax withheld by ${doc.w2.employerName || 'Employer'} (EIN: ${doc.w2.employerEin || 'Unknown'})`,
      });
    }
  }

  const roundedWithholding = Math.round(totalWithholding * 100) / 100;

  const line25a: LineResult = {
    value: roundedWithholding,
    ruleId: 'RULE-TY2026-W2-WITHHOLDING',
    sources,
  };

  const line25d: LineResult = {
    value: roundedWithholding,
    ruleId: 'RULE-TY2026-TOTAL-WITHHOLDING',
    sources: [
      {
        boxOrLine: '1040 Line 25a',
        description: 'Federal income tax withheld from Form(s) W-2',
      },
    ],
  };

  const line33: LineResult = {
    value: roundedWithholding,
    ruleId: 'RULE-TY2026-TOTAL-PAYMENTS',
    sources: [
      {
        boxOrLine: '1040 Line 25d',
        description: 'Total payments and refundable credits',
      },
    ],
  };

  return { line25a, line25d, line33 };
}
