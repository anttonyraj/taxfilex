import { z } from 'zod';

export const FilingStatusSchema = z.enum([
  'SINGLE',
  'MARRIED_FILING_JOINTLY',
  'MARRIED_FILING_SEPARATELY',
  'HEAD_OF_HOUSEHOLD',
]);

export const ReturnStatusSchema = z.enum([
  'draft',
  'needs_input',
  'computed',
  'reviewed',
  'package_ready',
  'efiled',
  'accepted',
  'rejected',
]);

export const DependentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  relationship: z.enum(['CHILD', 'OTHER']),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  underAge17AtEndOfYear: z.boolean(),
  monthsInHome: z.number().int().min(0).max(12),
  isStudentUnder24: z.boolean().optional(),
  hasSsn: z.boolean().default(true),
  isClaimedByUser: z.boolean().default(true),
  ssnEnc: z.object({
    ciphertextBase64: z.string(),
    ivBase64: z.string(),
    tagBase64: z.string(),
  }).optional(),
});

export const ScopeFlagSchema = z.object({
  code: z.string(),
  severity: z.enum(['FATAL_OUT_OF_SCOPE', 'WARNING']),
  reason: z.string(),
  suggestedAction: z.string(),
});

export const SourceRefSchema = z.object({
  docId: z.string().optional(),
  formType: z.string().optional(),
  boxOrLine: z.string(),
  description: z.string(),
});

export const LineResultSchema = z.object({
  value: z.number(),
  ruleId: z.string(),
  sources: z.array(SourceRefSchema),
});

export const ReturnResultSchema = z.object({
  lines: z.record(LineResultSchema),
  forms: z.array(z.string()),
  scopeFlags: z.array(ScopeFlagSchema),
  warnings: z.array(z.string()),
  engineVersion: z.string(),
  computedAtIso: z.string().datetime(),
});

export const TaxReturnRecordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  taxYear: z.literal(2026),
  status: ReturnStatusSchema,
  filingStatus: FilingStatusSchema,
  dependents: z.array(DependentSchema).default([]),
  answers: z.record(z.unknown()).default({}),
  scopeFlags: z.array(ScopeFlagSchema).default([]),
  engineVersion: z.string(),
  computedAt: z.string().datetime().optional(),
  result: z.object({
    federal: ReturnResultSchema,
    state: ReturnResultSchema.optional(),
  }).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type FilingStatus = z.infer<typeof FilingStatusSchema>;
export type ReturnStatus = z.infer<typeof ReturnStatusSchema>;
export type Dependent = z.infer<typeof DependentSchema>;
export type ScopeFlag = z.infer<typeof ScopeFlagSchema>;
export type SourceRef = z.infer<typeof SourceRefSchema>;
export type LineResult = z.infer<typeof LineResultSchema>;
export type ReturnResult = z.infer<typeof ReturnResultSchema>;
export type TaxReturnRecord = z.infer<typeof TaxReturnRecordSchema>;
