import { EngineInput, MissingInput } from './types.js';

export function missingInputs(input: Partial<EngineInput>): MissingInput[] {
  const missing: MissingInput[] = [];

  if (!input.filingStatus) {
    missing.push({
      questionId: 'filingStatus',
      label: 'What was your marital status on December 31, 2026?',
      whyWeAsk: 'Your filing status determines your standard deduction amount and tax bracket thresholds.',
      category: 'FILER',
      required: true,
    });
  }

  if (!input.filer) {
    missing.push({
      questionId: 'filerInfo',
      label: 'Were you age 65 or older or legally blind during 2026?',
      whyWeAsk: 'Filers who are 65+ or blind qualify for an increased standard deduction under IRS rules.',
      category: 'FILER',
      required: true,
    });
  }

  if (input.filingStatus === 'MARRIED_FILING_JOINTLY' && !input.spouse) {
    missing.push({
      questionId: 'spouseInfo',
      label: "What is your spouse's age and blindness status?",
      whyWeAsk: 'Joint filers receive additional standard deduction amounts if either spouse is 65+ or blind.',
      category: 'SPOUSE',
      required: true,
    });
  }

  if (!input.documents || input.documents.length === 0) {
    missing.push({
      questionId: 'documents',
      label: 'Please upload your Form W-2.',
      whyWeAsk: 'Your W-2 contains your reported wages and federal income tax withholding for 2026.',
      category: 'DOCUMENTS',
      required: true,
    });
  }

  return missing;
}
