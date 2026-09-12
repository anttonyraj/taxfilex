export type FilingStatus =
  | 'SINGLE'
  | 'MARRIED_FILING_JOINTLY'
  | 'MARRIED_FILING_SEPARATELY'
  | 'HEAD_OF_HOUSEHOLD';

export interface Dependent {
  id: string;
  relationship: 'CHILD' | 'OTHER';
  monthsInHome: number;
  underAge17AtEndOfYear: boolean;
  isStudentUnder24?: boolean;
  hasSsn: boolean;
  isClaimedByUser: boolean;
}

export interface FilerInfo {
  ageOnDec31: number;
  isBlind: boolean;
  canBeClaimedAsDependent: boolean;
}

export interface ExtractedW2Box12 {
  code: string;
  amount: number;
}

export interface ExtractedW2 {
  id: string;
  employerName: string;
  employerEin: string;
  box1Wages: number;
  box2FederalTaxWithheld: number;
  box3SocialSecurityWages?: number;
  box4SocialSecurityTaxWithheld?: number;
  box5MedicareWages?: number;
  box6MedicareTaxWithheld?: number;
  box12Items?: ExtractedW2Box12[];
  box14Items?: { label: string; amount: number }[];
}

export interface ExtractedDoc {
  id: string;
  type: 'W2' | '1099INT' | '1099DIV' | '1099G' | 'SSA1099' | '1099R' | '1098E' | '1098T' | '1095A' | 'UNSUPPORTED' | 'UNKNOWN';
  w2?: ExtractedW2;
  unsupportedReason?: string;
}

export interface SourceRef {
  docId?: string;
  formType?: string;
  boxOrLine: string;
  description: string;
}

export type LineId =
  | '1040_1a'     // Total amount from Form(s) W-2, box 1
  | '1040_1z'     // Total wages, salaries, tips, etc.
  | '1040_9'      // Total income
  | '1040_11'     // Adjusted Gross Income (AGI)
  | '1040_12'     // Standard deduction
  | '1040_15'     // Taxable income (floored at 0)
  | '1040_16'     // Regular tax (from tax bracket tables)
  | '1040_19'     // Child tax credit or credit for other dependents
  | '1040_24'     // Total tax
  | '1040_25a'    // Federal income tax withheld from Form(s) W-2
  | '1040_25d'    // Total federal income tax withheld
  | '1040_33'     // Total payments
  | '1040_34'     // Overpayment (Refund)
  | '1040_37';    // Amount you owe (Balance due)

export interface LineResult {
  value: number;
  ruleId: string;
  sources: SourceRef[];
}

export interface ScopeFlag {
  code: string;
  severity: 'FATAL_OUT_OF_SCOPE' | 'WARNING';
  reason: string;
  suggestedAction: string;
}

export interface EngineInput {
  taxYear: 2026;
  filingStatus: FilingStatus;
  filer: FilerInfo;
  spouse?: FilerInfo;
  dependents: Dependent[];
  documents: ExtractedDoc[];
  answers: Record<string, unknown>;
  state?: string;
}

export interface ReturnResult {
  lines: Record<LineId, LineResult>;
  forms: string[];
  scopeFlags: ScopeFlag[];
  warnings: string[];
  engineVersion: string;
  computedAtIso: string;
}

export interface MissingInput {
  questionId: string;
  label: string;
  whyWeAsk: string;
  category: 'FILER' | 'SPOUSE' | 'DEPENDENTS' | 'DOCUMENTS';
  required: boolean;
}

export interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}
