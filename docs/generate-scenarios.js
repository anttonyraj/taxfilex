import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute } from '../packages/tax-engine/dist/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scenariosDir = path.join(__dirname, 'scenarios');

if (!fs.existsSync(scenariosDir)) {
  fs.mkdirSync(scenariosDir, { recursive: true });
}

// 25 distinct scenarios
const scenarioDefs = [
  {
    scenarioId: '01-single-simple-w2',
    description: 'Single filer with 1 W-2, standard deduction, refund',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 28, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-01',
          type: 'W2',
          w2: {
            id: 'w2-01',
            employerName: 'Synthetic Alpha Inc',
            employerEin: '00-0000001',
            box1Wages: 55000,
            box2FederalTaxWithheld: 6200,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '02-single-high-wage-balance-due',
    description: 'Single filer with 1 W-2, underwithheld, balance due',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 34, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-02',
          type: 'W2',
          w2: {
            id: 'w2-02',
            employerName: 'Synthetic Beta LLC',
            employerEin: '00-0000002',
            box1Wages: 95000,
            box2FederalTaxWithheld: 11000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '03-single-dual-w2s',
    description: 'Single filer with 2 W-2s from job change during year',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 31, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-03a',
          type: 'W2',
          w2: {
            id: 'w2-03a',
            employerName: 'First Employer Co',
            employerEin: '00-0000003',
            box1Wages: 32000,
            box2FederalTaxWithheld: 3400,
          },
        },
        {
          id: 'w2-03b',
          type: 'W2',
          w2: {
            id: 'w2-03b',
            employerName: 'Second Employer Co',
            employerEin: '00-0000004',
            box1Wages: 48000,
            box2FederalTaxWithheld: 5600,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '04-single-three-w2s-refund',
    description: 'Single filer with 3 small part-time W-2s, full refund',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 22, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-04a',
          type: 'W2',
          w2: {
            id: 'w2-04a',
            employerName: 'Part-Time Job 1',
            employerEin: '00-0000005',
            box1Wages: 8000,
            box2FederalTaxWithheld: 600,
          },
        },
        {
          id: 'w2-04b',
          type: 'W2',
          w2: {
            id: 'w2-04b',
            employerName: 'Part-Time Job 2',
            employerEin: '00-0000006',
            box1Wages: 6000,
            box2FederalTaxWithheld: 450,
          },
        },
        {
          id: 'w2-04c',
          type: 'W2',
          w2: {
            id: 'w2-04c',
            employerName: 'Part-Time Job 3',
            employerEin: '00-0000007',
            box1Wages: 5000,
            box2FederalTaxWithheld: 350,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '05-single-senior-65plus',
    description: 'Single filer age 67, receiving additional standard deduction for seniors',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 67, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-05',
          type: 'W2',
          w2: {
            id: 'w2-05',
            employerName: 'Consulting Senior Corp',
            employerEin: '00-0000008',
            box1Wages: 42000,
            box2FederalTaxWithheld: 3800,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '06-single-blind-filer',
    description: 'Single filer who is legally blind, receiving additional standard deduction',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 45, isBlind: true, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-06',
          type: 'W2',
          w2: {
            id: 'w2-06',
            employerName: 'Accessible Tech Corp',
            employerEin: '00-0000009',
            box1Wages: 60000,
            box2FederalTaxWithheld: 6000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '07-single-senior-and-blind',
    description: 'Single filer age 68 and blind (receives double additional deduction)',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 68, isBlind: true, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-07',
          type: 'W2',
          w2: {
            id: 'w2-07',
            employerName: 'Senior Adv Tech',
            employerEin: '00-0000010',
            box1Wages: 50000,
            box2FederalTaxWithheld: 4500,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '08-single-claimed-as-dependent',
    description: 'Single college student claimed as dependent on parents return (IRC §63(c)(5))',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 20, isBlind: false, canBeClaimedAsDependent: true },
      dependents: [],
      documents: [
        {
          id: 'w2-08',
          type: 'W2',
          w2: {
            id: 'w2-08',
            employerName: 'Campus Bookstore',
            employerEin: '00-0000011',
            box1Wages: 7500,
            box2FederalTaxWithheld: 500,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '09-mfj-dual-income-refund',
    description: 'Married Filing Jointly with two earners and a standard refund',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 38, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 37, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-09a',
          type: 'W2',
          w2: {
            id: 'w2-09a',
            employerName: 'Primary Filer Employer',
            employerEin: '00-0000012',
            box1Wages: 72000,
            box2FederalTaxWithheld: 7800,
          },
        },
        {
          id: 'w2-09b',
          type: 'W2',
          w2: {
            id: 'w2-09b',
            employerName: 'Spouse Employer',
            employerEin: '00-0000013',
            box1Wages: 58000,
            box2FederalTaxWithheld: 5900,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '10-mfj-single-earner',
    description: 'Married Filing Jointly with one spouse working and standard deduction',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 42, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 41, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-10',
          type: 'W2',
          w2: {
            id: 'w2-10',
            employerName: 'Sole Family Provider LLC',
            employerEin: '00-0000014',
            box1Wages: 92000,
            box2FederalTaxWithheld: 8200,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '11-mfj-both-spouses-seniors',
    description: 'MFJ where both spouses are 65+ (receiving 2 x $1,650 additional deduction)',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 67, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 66, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-11',
          type: 'W2',
          w2: {
            id: 'w2-11',
            employerName: 'Senior Advisory Inc',
            employerEin: '00-0000015',
            box1Wages: 65000,
            box2FederalTaxWithheld: 4500,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '12-mfj-one-senior-one-blind',
    description: 'MFJ where primary is 65+ and spouse is legally blind',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 68, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 62, isBlind: true, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-12',
          type: 'W2',
          w2: {
            id: 'w2-12',
            employerName: 'United Health Services',
            employerEin: '00-0000016',
            box1Wages: 78000,
            box2FederalTaxWithheld: 6000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '13-mfj-one-qualifying-child-ctc',
    description: 'MFJ with 1 qualifying child under 17, receiving full $2,000 CTC',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 35, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 34, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        {
          id: 'dep-child-1',
          relationship: 'CHILD',
          monthsInHome: 12,
          underAge17AtEndOfYear: true,
          hasSsn: true,
          isClaimedByUser: true,
        },
      ],
      documents: [
        {
          id: 'w2-13',
          type: 'W2',
          w2: {
            id: 'w2-13',
            employerName: 'Family Solutions Corp',
            employerEin: '00-0000017',
            box1Wages: 85000,
            box2FederalTaxWithheld: 7200,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '14-mfj-two-qualifying-children-ctc',
    description: 'MFJ with 2 qualifying children under 17, receiving $4,000 CTC',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 39, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 38, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        {
          id: 'dep-14a',
          relationship: 'CHILD',
          monthsInHome: 12,
          underAge17AtEndOfYear: true,
          hasSsn: true,
          isClaimedByUser: true,
        },
        {
          id: 'dep-14b',
          relationship: 'CHILD',
          monthsInHome: 12,
          underAge17AtEndOfYear: true,
          hasSsn: true,
          isClaimedByUser: true,
        },
      ],
      documents: [
        {
          id: 'w2-14',
          type: 'W2',
          w2: {
            id: 'w2-14',
            employerName: 'Midwest Logistics',
            employerEin: '00-0000018',
            box1Wages: 110000,
            box2FederalTaxWithheld: 9500,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '15-mfj-three-children-tax-limit',
    description: 'MFJ with 3 children where tentative CTC ($6,000) exceeds tax liability',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 30, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 29, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'c1', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
        { id: 'c2', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
        { id: 'c3', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-15',
          type: 'W2',
          w2: {
            id: 'w2-15',
            employerName: 'Community Goods Inc',
            employerEin: '00-0000019',
            box1Wages: 50000,
            box2FederalTaxWithheld: 2000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '16-mfj-ctc-partial-phaseout',
    description: 'MFJ with high income exceeding $400,000 threshold, partial CTC phaseout',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 48, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 47, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'c16', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-16',
          type: 'W2',
          w2: {
            id: 'w2-16',
            employerName: 'Executive Consulting Partners',
            employerEin: '00-0000020',
            box1Wages: 415000,
            box2FederalTaxWithheld: 85000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '17-mfj-ctc-complete-phaseout',
    description: 'MFJ with income high enough to completely phase out CTC ($450,000 AGI)',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 52, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 50, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'c17', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-17',
          type: 'W2',
          w2: {
            id: 'w2-17',
            employerName: 'Enterprise Leadership Corp',
            employerEin: '00-0000021',
            box1Wages: 450000,
            box2FederalTaxWithheld: 95000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '18-single-one-child-ctc',
    description: 'Single parent with 1 qualifying child, full $2,000 CTC',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 32, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'c18', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-18',
          type: 'W2',
          w2: {
            id: 'w2-18',
            employerName: 'Design Studios Inc',
            employerEin: '00-0000022',
            box1Wages: 65000,
            box2FederalTaxWithheld: 5500,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '19-single-other-dependent-odc',
    description: 'Single filer claiming elderly parent as dependent ($500 ODC)',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 41, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'p19', relationship: 'OTHER', monthsInHome: 12, underAge17AtEndOfYear: false, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-19',
          type: 'W2',
          w2: {
            id: 'w2-19',
            employerName: 'Metro Regional Hospital',
            employerEin: '00-0000023',
            box1Wages: 70000,
            box2FederalTaxWithheld: 7500,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '20-single-one-child-one-other-dependent',
    description: 'Single filer claiming 1 child under 17 and 1 college student ($2,500 total credits)',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 44, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'c20', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
        { id: 's20', relationship: 'OTHER', monthsInHome: 12, underAge17AtEndOfYear: false, isStudentUnder24: true, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-20',
          type: 'W2',
          w2: {
            id: 'w2-20',
            employerName: 'City School District',
            employerEin: '00-0000024',
            box1Wages: 82000,
            box2FederalTaxWithheld: 8000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '21-hoh-one-child-w2',
    description: 'Head of Household filer with 1 child, receiving HOH standard deduction and CTC',
    input: {
      taxYear: 2026,
      filingStatus: 'HEAD_OF_HOUSEHOLD',
      filer: { ageOnDec31: 33, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'c21', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-21',
          type: 'W2',
          w2: {
            id: 'w2-21',
            employerName: 'Retail Operations Group',
            employerEin: '00-0000025',
            box1Wages: 52000,
            box2FederalTaxWithheld: 3900,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '22-hoh-two-children-dual-w2s',
    description: 'Head of Household with 2 qualifying children and two W-2s',
    input: {
      taxYear: 2026,
      filingStatus: 'HEAD_OF_HOUSEHOLD',
      filer: { ageOnDec31: 36, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [
        { id: 'c22a', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
        { id: 'c22b', relationship: 'CHILD', monthsInHome: 12, underAge17AtEndOfYear: true, hasSsn: true, isClaimedByUser: true },
      ],
      documents: [
        {
          id: 'w2-22a',
          type: 'W2',
          w2: {
            id: 'w2-22a',
            employerName: 'Primary Day Job',
            employerEin: '00-0000026',
            box1Wages: 45000,
            box2FederalTaxWithheld: 3200,
          },
        },
        {
          id: 'w2-22b',
          type: 'W2',
          w2: {
            id: 'w2-22b',
            employerName: 'Weekend Evening Job',
            employerEin: '00-0000027',
            box1Wages: 18000,
            box2FederalTaxWithheld: 1300,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '23-mfs-standard-filer',
    description: 'Married Filing Separately with 1 W-2 and separate standard deduction',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_SEPARATELY',
      filer: { ageOnDec31: 29, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-23',
          type: 'W2',
          w2: {
            id: 'w2-23',
            employerName: 'BioTech Labs Inc',
            employerEin: '00-0000028',
            box1Wages: 62000,
            box2FederalTaxWithheld: 7000,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '24-single-zero-balance-exact',
    description: 'Single filer where withholding exactly matches tax liability ($0 refund, $0 due)',
    input: {
      taxYear: 2026,
      filingStatus: 'SINGLE',
      filer: { ageOnDec31: 27, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-24',
          type: 'W2',
          w2: {
            id: 'w2-24',
            employerName: 'Perfect Precision LLC',
            employerEin: '00-0000029',
            box1Wages: 28100, // Taxable = 28100 - 15700 = 12400 -> Tax = 12400 * 0.10 = 1240
            box2FederalTaxWithheld: 1240,
          },
        },
      ],
      answers: {},
    },
  },
  {
    scenarioId: '25-mfj-large-balance-due-underpayment-warning',
    description: 'MFJ with large underwithholding triggering underpayment penalty warning (> $1,000)',
    input: {
      taxYear: 2026,
      filingStatus: 'MARRIED_FILING_JOINTLY',
      filer: { ageOnDec31: 46, isBlind: false, canBeClaimedAsDependent: false },
      spouse: { ageOnDec31: 45, isBlind: false, canBeClaimedAsDependent: false },
      dependents: [],
      documents: [
        {
          id: 'w2-25',
          type: 'W2',
          w2: {
            id: 'w2-25',
            employerName: 'Capital Growth Partners',
            employerEin: '00-0000030',
            box1Wages: 160000,
            box2FederalTaxWithheld: 10000,
          },
        },
      ],
      answers: {},
    },
  },
];

for (const def of scenarioDefs) {
  const result = compute(def.input);
  const expected = {
    lines: {
      '1040_1a': result.lines['1040_1a'].value,
      '1040_11': result.lines['1040_11'].value,
      '1040_12': result.lines['1040_12'].value,
      '1040_15': result.lines['1040_15'].value,
      '1040_16': result.lines['1040_16'].value,
      '1040_19': result.lines['1040_19'].value,
      '1040_24': result.lines['1040_24'].value,
      '1040_25a': result.lines['1040_25a'].value,
      '1040_33': result.lines['1040_33'].value,
      '1040_34': result.lines['1040_34'].value,
      '1040_37': result.lines['1040_37'].value,
    },
    forms: result.forms,
    scopeFlagCodes: result.scopeFlags.map((f) => f.code),
    warningsCount: result.warnings.length,
  };

  const fullScenario = {
    scenarioId: def.scenarioId,
    description: def.description,
    input: def.input,
    expected,
  };

  const filePath = path.join(scenariosDir, `${def.scenarioId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(fullScenario, null, 2), 'utf-8');
  console.log(`Generated ${def.scenarioId}.json`);
}

console.log('All 25 scenario files generated successfully!');
