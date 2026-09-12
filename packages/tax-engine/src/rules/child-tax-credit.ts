import { Dependent, FilingStatus, LineResult, SourceRef } from '../types.js';
import { CTC_PARAMS_TY2026 } from '../params/ty2026.js';

export function calculateChildTaxCredit(
  dependents: Dependent[],
  filingStatus: FilingStatus,
  agi: number,
  regularTax: number
): {
  line19: LineResult;
  qualifyingChildrenCount: number;
  otherDependentsCount: number;
  tentativeCredit: number;
} {
  let qualifyingChildrenCount = 0;
  let otherDependentsCount = 0;
  const sources: SourceRef[] = [];

  for (const dep of dependents) {
    if (!dep.isClaimedByUser) continue;

    // IRC §24(c): Under 17, must have SSN
    if (dep.relationship === 'CHILD' && dep.underAge17AtEndOfYear && dep.hasSsn) {
      qualifyingChildrenCount++;
      sources.push({
        docId: dep.id,
        boxOrLine: 'Schedule 8812',
        description: `Qualifying child for Child Tax Credit ($${CTC_PARAMS_TY2026.QUALIFYING_CHILD_AMOUNT})`,
      });
    } else {
      // Credit for Other Dependents (ODC)
      otherDependentsCount++;
      sources.push({
        docId: dep.id,
        boxOrLine: 'Schedule 8812',
        description: `Qualifying dependent for Credit for Other Dependents ($${CTC_PARAMS_TY2026.OTHER_DEPENDENT_AMOUNT})`,
      });
    }
  }

  const initialCredit =
    qualifyingChildrenCount * CTC_PARAMS_TY2026.QUALIFYING_CHILD_AMOUNT +
    otherDependentsCount * CTC_PARAMS_TY2026.OTHER_DEPENDENT_AMOUNT;

  if (initialCredit === 0) {
    return {
      line19: {
        value: 0,
        ruleId: 'RULE-TY2026-CTC-ODC',
        sources: [
          {
            boxOrLine: '1040 Line 19',
            description: 'No qualifying dependents for Child Tax Credit or Credit for Other Dependents',
          },
        ],
      },
      qualifyingChildrenCount: 0,
      otherDependentsCount: 0,
      tentativeCredit: 0,
    };
  }

  // Phaseout calculation (IRC §24(b))
  const threshold = CTC_PARAMS_TY2026.PHASEOUT_THRESHOLD[filingStatus];
  let reduction = 0;

  if (agi > threshold) {
    const excess = agi - threshold;
    const steps = Math.ceil(excess / CTC_PARAMS_TY2026.PHASEOUT_STEP);
    reduction = steps * CTC_PARAMS_TY2026.PHASEOUT_REDUCTION;
    sources.push({
      boxOrLine: 'IRC §24(b) Phaseout',
      description: `AGI ($${agi.toLocaleString()}) exceeds phaseout threshold ($${threshold.toLocaleString()}) by $${excess.toLocaleString()}. Credit reduced by $${reduction.toLocaleString()} ($50 per $1,000 excess).`,
    });
  }

  const creditAfterPhaseout = Math.max(0, initialCredit - reduction);

  // Line 19 is the nonrefundable portion, limited to regular tax liability (Line 16)
  const nonrefundableAllowed = Math.min(regularTax, creditAfterPhaseout);

  if (nonrefundableAllowed < creditAfterPhaseout) {
    sources.push({
      boxOrLine: '1040 Line 16 Limit',
      description: `Nonrefundable credit limited to tax liability of $${regularTax.toLocaleString()} (tentative allowed: $${creditAfterPhaseout.toLocaleString()})`,
    });
  }

  const line19: LineResult = {
    value: nonrefundableAllowed,
    ruleId: 'RULE-TY2026-CTC-ODC',
    sources,
  };

  return {
    line19,
    qualifyingChildrenCount,
    otherDependentsCount,
    tentativeCredit: creditAfterPhaseout,
  };
}
