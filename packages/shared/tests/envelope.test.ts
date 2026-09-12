import { describe, it, expect } from 'vitest';
import crypto from 'node:crypto';
import {
  generateUserKey,
  unwrapUserKey,
  encryptData,
  decryptData,
  decryptString,
  decryptJson,
  maskSsn,
  parseMasterKey,
} from '../src/crypto/envelope.js';

describe('Envelope Encryption', () => {
  const masterKey = crypto.randomBytes(32);

  it('generates a 256-bit DEK and valid wrapped record', () => {
    const { rawKey, wrappedRecord } = generateUserKey(masterKey);

    expect(rawKey.length).toBe(32);
    expect(wrappedRecord.encryptedDataKeyBase64).toBeTruthy();
    expect(wrappedRecord.ivBase64).toBeTruthy();
    expect(wrappedRecord.tagBase64).toBeTruthy();

    const unwrapped = unwrapUserKey(wrappedRecord, masterKey);
    expect(unwrapped).toEqual(rawKey);
  });

  it('fails to unwrap if wrong master key is used', () => {
    const { wrappedRecord } = generateUserKey(masterKey);
    const wrongMasterKey = crypto.randomBytes(32);

    expect(() => unwrapUserKey(wrappedRecord, wrongMasterKey)).toThrow(/verification failed|invalid key/i);
  });

  it('encrypts and decrypts strings, buffers, and JSON objects', () => {
    const { rawKey } = generateUserKey(masterKey);

    const testPayload = {
      w2Box1: 75000.5,
      employerEin: '00-1234567',
      employeeSsn: '900-00-1234',
    };

    const encrypted = encryptData(JSON.stringify(testPayload), rawKey);
    expect(encrypted.ciphertextBase64).toBeTruthy();

    const decryptedStr = decryptString(encrypted, rawKey);
    expect(decryptedStr).toBe(JSON.stringify(testPayload));

    const decryptedJson = decryptJson<typeof testPayload>(encrypted, rawKey);
    expect(decryptedJson).toEqual(testPayload);
  });

  it('fails decryption if ciphertext or tag is tampered with', () => {
    const { rawKey } = generateUserKey(masterKey);
    const encrypted = encryptData('Secret financial payload', rawKey);

    // Tamper with ciphertext
    const tamperedCiphertext = Buffer.from(encrypted.ciphertextBase64, 'base64');
    tamperedCiphertext[0] = (tamperedCiphertext[0] ?? 0) ^ 0xff;
    const tamperedPayload = {
      ...encrypted,
      ciphertextBase64: tamperedCiphertext.toString('base64'),
    };

    expect(() => decryptData(tamperedPayload, rawKey)).toThrow(/Decryption failed/i);
  });

  it('correctly masks SSNs for safe display', () => {
    expect(maskSsn('900001234')).toBe('***-**-1234');
    expect(maskSsn('900-00-1234')).toBe('***-**-1234');
    expect(maskSsn('1234')).toBe('***-**-1234');
    expect(maskSsn('12')).toBe('***-**-****');
  });

  it('parses master keys in hex, base64, or passphrase format', () => {
    const raw32 = crypto.randomBytes(32);
    const hex = raw32.toString('hex');
    const base64 = raw32.toString('base64');

    expect(parseMasterKey(hex)).toEqual(raw32);
    expect(parseMasterKey(base64)).toEqual(raw32);

    const passphraseKey = parseMasterKey('my-secure-production-passphrase');
    expect(passphraseKey.length).toBe(32);
  });
});
