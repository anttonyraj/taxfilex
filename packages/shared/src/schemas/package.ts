import { z } from 'zod';

export const ManifestItemSchema = z.object({
  formId: z.string(),
  pages: z.number().int().min(1),
  label: z.string(),
});

export const FilingPackageRecordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  returnId: z.string(),
  createdAt: z.string().datetime(),
  checksum: z.string(),
  manifest: z.array(ManifestItemSchema),
  // Vault-only encrypted PDF storage
  storedEnc: z.record(z.object({
    ciphertextBase64: z.string(),
    ivBase64: z.string(),
    tagBase64: z.string(),
  })).optional(),
});

export const EfileSubmissionRecordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  returnId: z.string(),
  provider: z.enum(['mock', 'partner']),
  submittedAt: z.string().datetime(),
  status: z.enum(['pending', 'transmitted', 'accepted', 'rejected']),
  ackCode: z.string().optional(),
  rejectCodes: z.array(z.string()).optional(),
  rawResponseRef: z.string().optional(),
});

export type ManifestItem = z.infer<typeof ManifestItemSchema>;
export type FilingPackageRecord = z.infer<typeof FilingPackageRecordSchema>;
export type EfileSubmissionRecord = z.infer<typeof EfileSubmissionRecordSchema>;
