import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseIdToken } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or malformed Authorization header' },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1]!;
    const decodedToken = await verifyFirebaseIdToken(idToken);

    return NextResponse.json({
      valid: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token', details: (error as Error).message },
      { status: 401 }
    );
  }
}
