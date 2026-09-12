import { describe, it, expect } from 'vitest';
import {
  calculateGrossIncome,
  calculateStandardDeduction,
  calculateTaxableIncome,
  calculateBracketTax,
  calculateChildTaxCredit,
  calculatePayments,
  calculateRefundOrBalance,
  detectScope,
  missingInputs,
  EngineInput,
} from '../../src/index.js';

describe('Tax Engine Unit Rules', () => {
  it('calculates gross wages from multiple W-2s and retains source trace', () => {
    const input: EngineInput = {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 30, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-1',
          type: 'W2',
          w2: {
            id: 'w2-1',
            employerName: 'ACME Corp',
            employerEin: '00-1111111',
            box1Wages: 45000,
            box2FederalTaxWithheld: 5000,
          },
        },
        {
          id: 'w2-2',
          type: 'W2',
          w2: {
            id: 'w2-2',
            employerName: 'Beta LLC',
            employerEin: '00-2222222',
            box1Wages: 15000,
            box2FederalTaxWithheld: 1200,
          },
        },
      ],
      answers: {},
    };

    const { line1a, line1z, line9, line11 } = calculateGrossIncome(input);
    expect(line1a.value).toBe(60000);
    expect(line1a.sources.length).toBe(2);
    expect(line1a.sources[0]?.description).toContain('ACME Corp');
    expect(line1a.sources[1]?.description).toContain('Beta LLC');
    expect(line1z.value).toBe(60000);
    expect(line9.value).toBe(60000);
    expect(line11.value).toBe(60000);
  });

  it('calculates standard deduction for Single, MFJ, and 65+/blind additions', () => {
    // Single baseline
    const singleInput: EngineInput = {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 30, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [],
      answers: {},
    };
    expect(calculateStandardDeduction(singleInput, 50000).line12.value).toBe(15700);

    // Single age 66 (+2,050)
    const single65Input: EngineInput = {
      ...singleInput,
      filer: { ageOnDec31: 66, isBlind: false, canBeClaimedAsDependent: false },
    };
    expect(calculateStandardDeduction(single65Input, 50000).line12.value).toBe(15700 + 2050);

    // Single age 66 AND blind (+4,100)
    const single65BlindInput: EngineInput = {
      ...singleInput,
      filer: { ageOnDec31: 66, isBlind: true, canBeClaimedAsDependent: false },
    };
    expect(calculateStandardDeduction(single65BlindInput, 50000).line12.value).toBe(15700 + 4100);

    // MFJ baseline ($31,400)
    const mfjInput: EngineInput = {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 40, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 40, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [],
      answers: {},
    };
    expect(calculateStandardDeduction(mfjInput, 80000).line12.value).toBe(31400);

    // MFJ with one spouse 65+ (+1,650)
    const mfjSeniorInput: EngineInput = {
      ...mfjInput,
      spouse: { ageOnDec31: 67, isBlind: false, canBeClaimedAsDependent: false },
    };
    expect(calculateStandardDeduction(mfjSeniorInput, 80000).line12.value).toBe(31400 + 1650);
  });

  it('limits standard deduction for dependents (IRC §63(c)(5))', () => {
    const dependentInput: EngineInput = {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 19, isBlind: false, canBeClaimedAsDependent: true },
      dependents: [],
      documents: [],
      answers: {},
    };

    // Earned income = $500 -> min $1,350 applies
    expect(calculateStandardDeduction(dependentInput, 500).line12.value).toBe(1350);

    // Earned income = $3,000 -> $3,000 + $450 = $3,450
    expect(calculateStandardDeduction(dependentInput, 3000).line12.value).toBe(3450);

    // Earned income = $20,000 -> capped at standard deduction ($15,700)
    expect(calculateStandardDeduction(dependentInput, 20000).line12.value).toBe(15700);
  });

  it('calculates progressive ordinary tax brackets accurately', () => {
    // Single: first $12,400 at 10%
    expect(calculateBracketTax(12400, 'SINGLE').line16.value).toBe(1240);

    // Single: $50,400 taxable income -> 12,400 * 0.10 + (50,400 - 12,400) * 0.12 = 1,240 + 4,560 = 5,800
    expect(calculateBracketTax(50400, 'SINGLE').line16.value).toBe(5800);

    // Single: $0 taxable income
    expect(calculateBracketTax(0, 'SINGLE').line16.value).toBe(0);
  });

  it('computes Child Tax Credit and ODC with statutory phaseout', () => {
    const deps = [
      {
        id: 'child-1',
        relationship: 'CHILD' as const,
        monthsInHome: 12,
        underAge17AtEndOfYear: true,
        hasSsn: true,
        isClaimedByUser: true,
      },
      {
        id: 'parent-1',
        relationship: 'OTHER' as const,
        monthsInHome: 12,
        underAge17AtEndOfYear: false,
        hasSsn: true,
        isClaimedByUser: true,
      },
    ];

    // No phaseout under $200k for Single
    const resNoPhaseout = calculateChildTaxCredit(deps, 'SINGLE', 80000, 10000);
    expect(resNoPhaseout.line19.value).toBe(2500); // $2,000 child + $500 ODC
    expect(resNoPhaseout.qualifyingChildrenCount).toBe(1);
    expect(resNoPhaseout.otherDependentsCount).toBe(1);

    // Phaseout for Single: AGI = $210,000 -> $10,000 excess -> 10 steps * $50 = $500 reduction
    const resPhaseout = calculateChildTaxCredit(deps, 'SINGLE', 210000, 10000);
    expect(resPhaseout.line19.value).toBe(2000); // 2500 - 500 = 2000

    // Nonrefundable limitation: if tax liability is $1,200, credit limited to $1,200
    const resTaxLimit = calculateChildTaxCredit(deps, 'SINGLE', 80000, 1200);
    expect(resTaxLimit.line19.value).toBe(1200);
  });

  it('computes refund, balance due, and underpayment warning', () => {
    // Refund scenario: Tax $4,000, Withholding $5,500 -> Refund $1,500
    const refundRes = calculateRefundOrBalance(4000, 0, 5500);
    expect(refundRes.line34.value).toBe(1500);
    expect(refundRes.line37.value).toBe(0);
    expect(refundRes.warnings.length).toBe(0);

    // Balance due scenario: Tax $5,000, Withholding $3,500 -> Balance Due $1,500 (> $1,000 warning)
    const balanceRes = calculateRefundOrBalance(5000, 0, 3500);
    expect(balanceRes.line34.value).toBe(0);
    expect(balanceRes.line37.value).toBe(1500);
    expect(balanceRes.warnings.some((w) => w.includes('Estimated tax penalty warning'))).toBe(true);
  });

  it('detects out-of-scope conditions cleanly', () => {
    const scopeInput: EngineInput = {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 30, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'doc-unsupported',
          type: 'UNSUPPORTED',
          unsupportedReason: 'Form 1099-B Crypto Sales uploaded',
        },
      ],
      answers: {
        hasBusinessIncome: true,
      },
    };

    const flags = detectScope(scopeInput);
    expect(flags.length).toBe(2);
    expect(flags.some((f) => f.code === 'DOC_UNSUPPORTED')).toBe(true);
    expect(flags.some((f) => f.code === 'SCOPE_BUSINESS_INCOME')).toBe(true);
  });

  it('identifies missing inputs accurately', () => {
    const missing = missingInputs({});
    expect(missing.some((m) => m.questionId === 'filingStatus')).toBe(true);
    expect(missing.some((m) => m.questionId === 'documents')).toBe(true);
  });
});
