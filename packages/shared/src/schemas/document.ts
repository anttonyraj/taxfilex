import { z } from 'zod';

export const DocumentTypeSchema = z.enum([
  'W2',
  '1099INT',
  '1099DIV',
  '1099G',
  'SSA1099',
  '1099R',
  '1098E',
  '1098T',
  '1095A',
  'PRIOR_RETURN',
  'UNSUPPORTED',
  'UNKNOWN',
]);

export const DocumentIssueTypeSchema = z.enum([
  'duplicate',
  'ssn_mismatch',
  'unreadable',
  'unsupported_boxes',
  'wrong_tax_year',
  'low_confidence',
]);

export const BoundingBoxSchema = z.object({
  top: z.number(),
  left: z.number(),
  width: z.number(),
  height: z.number(),
  page: z.number().default(1),
});

export const ExtractedFieldItemSchema = z.object({
  value: z.union([z.string(), z.number(), z.boolean()]),
  confidence: z.number().min(0).max(1),
  bbox: BoundingBoxSchema.optional(),
  confirmedByUser: z.boolean().default(false),
});

export const ExtractedDocumentRecordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  returnId: z.string(),
  type: DocumentTypeSchema,
  label: z.string(), // e.g. "W-2 — ACME Corp"
  pageCount: z.number().int().min(1),
  processedAt: z.string().datetime(),
  classificationConfidence: z.number().min(0).max(1),
  contentHash: z.string(), // SHA-256 hash of extracted fields for duplicate detection
  // IMPORTANT: NO document bytes and NO storage path!
  fieldsEnc: z.object({
    ciphertextBase64: z.string(),
    ivBase64: z.string(),
    tagBase64: z.string(),
  }),
  cropsEnc: z.record(z.object({
    ciphertextBase64: z.string(),
    ivBase64: z.string(),
    tagBase64: z.string(),
  })).optional(),
  issues: z.array(DocumentIssueTypeSchema).default([]),
});

export type DocumentType = z.infer<typeof DocumentTypeSchema>;
export type DocumentIssueType = z.infer<typeof DocumentIssueTypeSchema>;
export type ExtractedFieldItem = z.infer<typeof ExtractedFieldItemSchema>;
export type ExtractedDocumentRecord = z.infer<typeof ExtractedDocumentRecordSchema>;
