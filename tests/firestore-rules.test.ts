import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Firestore Security Rules Static Analysis & Policy Check', () => {
  const rulesPath = path.resolve(__dirname, '../firestore.rules');
  const rulesContent = fs.readFileSync(rulesPath, 'utf-8');

  it('enforces rules_version 2 and service cloud.firestore', () => {
    expect(rulesContent).toContain("rules_version = '2'");
    expect(rulesContent).toContain('service cloud.firestore');
  });

  it('contains a default-deny rule for all unhandled documents', () => {
    expect(rulesContent).toMatch(/match \/\{document=\*\*\} \{\s*allow read, write: if false;\s*\}/);
  });

  it('restricts user document and subcollections strictly to request.auth.uid == userId', () => {
    expect(rulesContent).toMatch(/match \/users\/\{userId\} \{/);
    expect(rulesContent).toMatch(/allow read, write: if request\.auth != null && request\.auth\.uid == userId;/);
  });

  it('covers subcollections under users/{userId}', () => {
    expect(rulesContent).toMatch(/match \/\{subcollection=\*\*\} \{/);
  });
});
