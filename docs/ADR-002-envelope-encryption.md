# ADR-002: Envelope Encryption for User Financial Data and PII

## Context
Tax data contains highly sensitive Personally Identifiable Information (PII) including Social Security Numbers (SSNs), employer identifiers (EINs), wage amounts, and tax withholding figures. IRS Publication 4557 and FTC Safeguards require stringent data protection. Furthermore, our product promise mandates that raw documents are never stored, and extracted values are encrypted per user.

## Decision
We implement per-user envelope encryption:
1. **Master Key (KEK - Key Encryption Key)**: Stored in server environment variables or Cloud KMS (`TAXFILEX_MASTER_KEY`). 256-bit symmetric key.
2. **User Data Key (DEK - Data Encryption Key)**: A unique 256-bit AES key generated cryptographically for each user upon account creation.
3. **Key Wrapping**: The DEK is encrypted (wrapped) by the KEK using AES-256-GCM with a unique 96-bit IV and 128-bit authentication tag, and stored in `users/{uid}.encryption.wrappedDataKey`.
4. **Data Encryption**: All sensitive user fields (SSNs, extracted field JSON records, crops, return result data) are encrypted with the user's unwrapped DEK using AES-256-GCM.
5. **No Long-Term Retention of Unwrapped Keys**: The DEK is held in server memory only during the active request lifecycle and never persisted in plaintext.

## Consequences
- Compromise of the database alone does not reveal PII or financial amounts without the master key.
- Compromise of one user's key does not impact any other user.
- "Delete my data" flow can cryptographically shred all user data by securely wiping the wrapped DEK.
