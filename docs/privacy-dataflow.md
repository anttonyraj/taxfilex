# TaxFilex Privacy Data-Flow: "Process and Forget"

## Overview & Architecture Promise
TaxFilex is built on a non-negotiable architectural invariant: **Process and Forget**.
Uploaded tax documents (W-2s, 1099s, etc.) are read **once in memory**, classified, extracted, and discarded within seconds. Raw document files or images are **never written to a storage bucket, disk filesystem, server log, or persistent database**.

```
[ User Browser ]
       |
       | 1. Multipart POST (Memory buffer)
       v
[ Vercel Route Handler: /api/documents/process ]
       |
       | 2. In-Memory Image Preprocessing (sharp: rotate, de-skew, resize)
       | 3. Inline Bytes sent via HTTPS to Paid Gemini API (Zero-retention tier)
       v
[ Gemini API (Paid Tier) ]
       |
       | 4. Returns JSON: Extracted fields + confidence + bounding boxes
       v
[ Vercel Route Handler ]
       |
       | 5. Optional tiny crop cut (<= 20KB) in memory if user opted-in
       | 6. Original file buffer & page images GARBAGE COLLECTED / DROPPED
       | 7. Extracted field values encrypted with user's DEK
       v
[ Cloud Firestore ]
       Stores ONLY:
       - Encrypted extracted field JSON ({ box1: 52000, ... })
       - Document type & employer name label
       - NO PDF/IMAGE BYTES
```

## Lifecycle of User Data
1. **In the Browser**:
   - The user selects a PDF or image, or takes a photo.
   - The browser keeps the image object in client-side memory (`URL.createObjectURL` or memory buffer) exclusively for the instant verification/confirmation screen.
   - If the user closes the tab or finishes confirmation, the client memory is released.
2. **In Transit & In Serverless Function**:
   - Sent via TLS 1.3 to `/api/documents/process`.
   - Vercel Route Handler runs with `export const dynamic = 'force-dynamic'` and `no-store` cache headers.
   - Sharp processes the buffer in Node.js RAM.
   - Sent to Google GenAI on paid API tier (IRC §7216 compliant; inputs not retained for training).
   - On response, extracted values are validated and encrypted.
   - Memory references to the original file buffer are dereferenced and garbage collected immediately.
   - Function terminates; Vercel serverless worker destroys container memory on recycle.
3. **In the Database (Cloud Firestore)**:
   - Only encrypted structured data is stored: `{ type: "W2", label: "W-2 — ACME Corp", fieldsEnc: "..." }`.
   - Bounding box coordinates and confidence scores are stored to facilitate review.
   - Zero image files, zero raw PDF pages.

## Statutory Retention & Deletion Flow
- Return results and filing records are retained for the IRS-mandated period (3 years post-filing) for audit defense.
- At any time, users can execute "Delete Everything" or "Delete Everything Not Legally Required" via `/account/data`.
- Cryptographic shredding: Deleting the wrapped DEK in Firestore renders all encrypted payloads permanently unrecoverable.
