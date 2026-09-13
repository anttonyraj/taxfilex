import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, category, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    const ticketId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toISOString();

    const payload = {
      timestamp,
      ticketId,
      name: name || 'Anonymous Taxpayer',
      email,
      phone: phone || 'N/A',
      category: category || 'General Support',
      message,
      source: 'TaxFilex Web Contact',
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.warn('Google Sheet webhook responded with non-200 status:', response.status);
        }
      } catch (webhookErr) {
        console.error('Error forwarding to Google Sheet webhook:', webhookErr);
      }
    } else {
      console.log('[Contact Submission - Local Fallback]', payload);
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: 'Inquiry received and logged successfully',
    });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Failed to process contact inquiry' },
      { status: 500 }
    );
  }
}
