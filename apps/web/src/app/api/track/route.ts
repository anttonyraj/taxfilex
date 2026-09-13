import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const clientData = await req.json().catch(() => ({}));

    // Extract IP address from request headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');

    // Extract Vercel edge geolocation headers
    let city = req.headers.get('x-vercel-ip-city') || '';
    let country = req.headers.get('x-vercel-ip-country') || '';
    let region = req.headers.get('x-vercel-ip-country-region') || '';

    // If city/country not in headers and IP is public, do a lightweight lookup
    if ((!city || !country) && ip !== '127.0.0.1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          signal: AbortSignal.timeout(1500),
        });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          city = city || geo.city || '';
          country = country || geo.country_name || geo.country || '';
          region = region || geo.region || '';
        }
      } catch {
        // Fallback silently if rate-limited or timeout
      }
    }

    const now = new Date();
    // Human-readable formatted date & time (EST and UTC)
    const formattedDate = now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    const visitorPayload = {
      type: 'visitor',
      timestamp: formattedDate + ' (EST)',
      isoTime: now.toISOString(),
      ip: ip,
      city: city || 'Unknown City',
      region: region || 'Unknown Region',
      country: country || 'Unknown Country',
      device: clientData.device || 'Unknown Device',
      screenResolution: clientData.screenResolution || 'N/A',
      browserAndOs: clientData.browserAndOs || 'N/A',
      path: clientData.path || '/',
      referrer: clientData.referrer || 'Direct Visit',
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl) {
      // Forward telemetry to Google Sheet Webhook asynchronously
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorPayload),
      }).catch((err) => {
        console.error('Failed to forward visitor to Google Sheet webhook:', err);
      });
    } else {
      console.log('[Visitor Telemetry - Local]', visitorPayload);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Visitor tracking error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
