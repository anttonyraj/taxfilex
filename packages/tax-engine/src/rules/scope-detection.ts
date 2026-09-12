import { EngineInput, ScopeFlag } from '../types.js';

export function detectScope(input: EngineInput): ScopeFlag[] {
  const flags: ScopeFlag[] = [];

  // Check unsupported document types
  for (const doc of input.documents) {
    if (doc.type === 'UNSUPPORTED' || doc.type === 'UNKNOWN') {
      flags.push({
        code: 'DOC_UNSUPPORTED',
        severity: 'FATAL_OUT_OF_SCOPE',
        reason: doc.unsupportedReason || 'An unsupported document type was uploaded.',
        suggestedAction: 'Refer to a CPA or full-service tax professional for specialized tax schedules.',
      });
    }

    // Check W-2 Box 12 unsupported codes
    if (doc.type === 'W2' && doc.w2?.box12Items) {
      for (const item of doc.w2.box12Items) {
        // Example: Code R (Archer MSA), Code Q (Combat pay), etc. can be supported or flagged if complex
        if (['K', 'Z'].includes(item.code.toUpperCase())) {
          flags.push({
            code: 'W2_BOX12_UNSUPPORTED',
            severity: 'FATAL_OUT_OF_SCOPE',
            reason: `W-2 Box 12 Code ${item.code} requires specialized excise tax forms (Form 5329 / Section 409A).`,
            suggestedAction: 'Refer to a certified tax advisor.',
          });
        }
      }
    }
  }

  // Check answers indicating complex situations
  if (input.answers['hasScheduleC'] === true || input.answers['hasBusinessIncome'] === true) {
    flags.push({
      code: 'SCOPE_BUSINESS_INCOME',
      severity: 'FATAL_OUT_OF_SCOPE',
      reason: 'Self-employment or business income (Schedule C) is out of scope for the simple W-2 filer MVP.',
      suggestedAction: 'Refer to a small business tax preparation specialist.',
    });
  }

  if (input.answers['hasRentalIncome'] === true) {
    flags.push({
      code: 'SCOPE_RENTAL_INCOME',
      severity: 'FATAL_OUT_OF_SCOPE',
      reason: 'Rental property income (Schedule E) is not supported in the simple W-2 MVP.',
      suggestedAction: 'Refer to a tax professional handling real estate.',
    });
  }

  if (input.answers['isNonresidentAlien'] === true) {
    flags.push({
      code: 'SCOPE_NONRESIDENT',
      severity: 'FATAL_OUT_OF_SCOPE',
      reason: 'Nonresident aliens filing Form 1040-NR are not supported in the standard 1040 MVP.',
      suggestedAction: 'Refer to an international tax specialist.',
    });
  }

  return flags;
}
