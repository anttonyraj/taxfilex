import crypto from 'node:crypto';

export interface WrappedKeyRecord {
  encryptedDataKeyBase64: string;
  ivBase64: string;
  tagBase64: string;
}

export interface EncryptedPayload {
  ciphertextBase64: string;
  ivBase64: string;
  tagBase64: string;
}

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH_BYTES = 32; // 256 bits
const IV_LENGTH_BYTES = 12; // 96 bits for GCM
const TAG_LENGTH_BYTES = 16; // 128 bits for GCM auth tag

/**
 * Ensures a valid 32-byte master key buffer from a raw buffer or hex/base64 string.
 */
export function parseMasterKey(rawKey: string | Buffer): Buffer {
  if (Buffer.isBuffer(rawKey)) {
    if (rawKey.length !== KEY_LENGTH_BYTES) {
      throw new Error(`Master key buffer must be exactly ${KEY_LENGTH_BYTES} bytes`);
    }
    return rawKey;
  }

  // Check if hex (64 chars) or base64 (44 chars with padding) or UTF-8
  if (/^[0-9a-fA-F]{64}$/.test(rawKey)) {
    return Buffer.from(rawKey, 'hex');
  }

  const base64Buf = Buffer.from(rawKey, 'base64');
  if (base64Buf.length === KEY_LENGTH_BYTES) {
    return base64Buf;
  }

  // Derive via SHA-256 if arbitrary passphrase string provided
  return crypto.createHash('sha256').update(rawKey).digest();
}

/**
 * Generates a fresh 256-bit cryptographically secure user Data Encryption Key (DEK)
 * and wraps it with the server Master Key (KEK).
 */
export function generateUserKey(masterKeyInput: string | Buffer): {
  rawKey: Buffer;
  wrappedRecord: WrappedKeyRecord;
} {
  const masterKey = parseMasterKey(masterKeyInput);
  const rawKey = crypto.randomBytes(KEY_LENGTH_BYTES);
  const wrappedRecord = wrapUserKey(rawKey, masterKey);

  return { rawKey, wrappedRecord };
}

/**
 * Wraps a user Data Encryption Key (DEK) using the Master Key (KEK) via AES-256-GCM.
 */
export function wrapUserKey(dek: Buffer, masterKey: Buffer): WrappedKeyRecord {
  if (dek.length !== KEY_LENGTH_BYTES) {
    throw new Error(`DEK must be ${KEY_LENGTH_BYTES} bytes`);
  }

  const iv = crypto.randomBytes(IV_LENGTH_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, masterKey, iv, {
    authTagLength: TAG_LENGTH_BYTES,
  });

  const encrypted = Buffer.concat([cipher.update(dek), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    encryptedDataKeyBase64: encrypted.toString('base64'),
    ivBase64: iv.toString('base64'),
    tagBase64: tag.toString('base64'),
  };
}

/**
 * Unwraps the user's DEK from its stored wrapped record using the Master Key.
 */
export function unwrapUserKey(wrappedRecord: WrappedKeyRecord, masterKeyInput: string | Buffer): Buffer {
  const masterKey = parseMasterKey(masterKeyInput);
  const iv = Buffer.from(wrappedRecord.ivBase64, 'base64');
  const tag = Buffer.from(wrappedRecord.tagBase64, 'base64');
  const ciphertext = Buffer.from(wrappedRecord.encryptedDataKeyBase64, 'base64');

  if (iv.length !== IV_LENGTH_BYTES) {
    throw new Error('Invalid IV length in wrapped key record');
  }
  if (tag.length !== TAG_LENGTH_BYTES) {
    throw new Error('Invalid authentication tag length in wrapped key record');
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, masterKey, iv, {
    authTagLength: TAG_LENGTH_BYTES,
  });
  decipher.setAuthTag(tag);

  try {
    const dek = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    if (dek.length !== KEY_LENGTH_BYTES) {
      throw new Error('Unwrapped key does not match 256-bit requirement');
    }
    return dek;
  } catch (err) {
    throw new Error(`Failed to unwrap DEK: verification failed or invalid key: ${(err as Error).message}`);
  }
}

/**
 * Encrypts arbitrary data (string or Buffer) with the user's unwrapped DEK.
 */
export function encryptData(plaintext: string | Buffer, userKey: Buffer): EncryptedPayload {
  if (userKey.length !== KEY_LENGTH_BYTES) {
    throw new Error(`User key must be ${KEY_LENGTH_BYTES} bytes`);
  }

  const iv = crypto.randomBytes(IV_LENGTH_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, userKey, iv, {
    authTagLength: TAG_LENGTH_BYTES,
  });

  const inputBuffer = Buffer.isBuffer(plaintext) ? plaintext : Buffer.from(plaintext, 'utf-8');
  const ciphertext = Buffer.concat([cipher.update(inputBuffer), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    ciphertextBase64: ciphertext.toString('base64'),
    ivBase64: iv.toString('base64'),
    tagBase64: tag.toString('base64'),
  };
}

/**
 * Decrypts an EncryptedPayload using the user's unwrapped DEK.
 */
export function decryptData(payload: EncryptedPayload, userKey: Buffer): Buffer {
  if (userKey.length !== KEY_LENGTH_BYTES) {
    throw new Error(`User key must be ${KEY_LENGTH_BYTES} bytes`);
  }

  const iv = Buffer.from(payload.ivBase64, 'base64');
  const tag = Buffer.from(payload.tagBase64, 'base64');
  const ciphertext = Buffer.from(payload.ciphertextBase64, 'base64');

  const decipher = crypto.createDecipheriv(ALGORITHM, userKey, iv, {
    authTagLength: TAG_LENGTH_BYTES,
  });
  decipher.setAuthTag(tag);

  try {
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  } catch (err) {
    throw new Error(`Decryption failed: data corrupted or authentication tag mismatch: ${(err as Error).message}`);
  }
}

/**
 * Decrypts an EncryptedPayload and parses as UTF-8 string.
 */
export function decryptString(payload: EncryptedPayload, userKey: Buffer): string {
  return decryptData(payload, userKey).toString('utf-8');
}

/**
 * Decrypts an EncryptedPayload and parses as JSON.
 */
export function decryptJson<T = unknown>(payload: EncryptedPayload, userKey: Buffer): T {
  const jsonStr = decryptString(payload, userKey);
  return JSON.parse(jsonStr) as T;
}

/**
 * Masks a Social Security Number for safe UI presentation (e.g. ***-**-1234).
 */
export function maskSsn(rawSsn: string): string {
  const cleaned = rawSsn.replace(/\D/g, '');
  if (cleaned.length < 4) {
    return '***-**-****';
  }
  const lastFour = cleaned.slice(-4);
  return `***-**-${lastFour}`;
}
