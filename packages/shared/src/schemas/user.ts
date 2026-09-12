import { z } from 'zod';

export const WrappedKeyRecordSchema = z.object({
  encryptedDataKeyBase64: z.string(),
  ivBase64: z.string(),
  tagBase64: z.string(),
});

export const UserProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'DOB must be YYYY-MM-DD'),
  ssnEnc: z.object({
    ciphertextBase64: z.string(),
    ivBase64: z.string(),
    tagBase64: z.string(),
  }).optional(),
  phone: z.string().optional(),
  address: z.object({
    street1: z.string(),
    street2: z.string().optional(),
    city: z.string(),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  }).optional(),
  priorYearAgi: z.number().optional(),
  idvStatus: z.enum(['unverified', 'pending', 'verified', 'failed']).default('unverified'),
});

export const UserSettingsSchema = z.object({
  stateOfResidence: z.string().length(2),
  consent7216: z.boolean().default(false),
  marketingOptIn: z.boolean().default(false),
  vaultOptIn: z.boolean().default(false),
  keepFieldCrops: z.boolean().default(false),
});

export const UserDocumentSchema = z.object({
  uid: z.string(),
  profile: UserProfileSchema,
  settings: UserSettingsSchema,
  encryption: z.object({
    wrappedDataKey: WrappedKeyRecordSchema,
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserSettings = z.infer<typeof UserSettingsSchema>;
export type UserDocument = z.infer<typeof UserDocumentSchema>;
