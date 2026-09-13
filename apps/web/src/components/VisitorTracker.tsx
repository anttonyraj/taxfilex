'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double tracking exact same path in quick succession
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    const trackVisit = async () => {
      try {
        const width = window.innerWidth || window.screen.width || 0;
        const height = window.innerHeight || window.screen.height || 0;

        // Device classification
        let device = 'Laptop / Desktop';
        const ua = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
          device = 'Mobile';
        } else if (/tablet|ipad|playbook|silk/i.test(ua) || (width <= 1024 && width >= 600)) {
          device = 'Tablet';
        } else if (width < 768) {
          device = 'Mobile';
        }

        // Browser & OS detection
        let browser = 'Unknown Browser';
        if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
        else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
        else if (ua.includes('firefox')) browser = 'Firefox';
        else if (ua.includes('edg')) browser = 'Edge';

        let os = 'Unknown OS';
        if (ua.includes('windows')) os = 'Windows';
        else if (ua.includes('macintosh') || ua.includes('mac os')) os = 'macOS';
        else if (ua.includes('android')) os = 'Android';
        else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ios')) os = 'iOS';
        else if (ua.includes('linux')) os = 'Linux';

        const payload = {
          path: pathname,
          device,
          screenResolution: `${window.screen.width}x${window.screen.height} (viewport: ${width}x${height})`,
          browserAndOs: `${browser} on ${os}`,
          referrer: document.referrer || 'Direct Visit',
          language: navigator.language || 'en-US',
        };

        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      } catch {
        // Silently suppress client tracking errors to avoid affecting user experience
      }
    };

    // Defer tracking slightly so it never interferes with initial page load / paint
    const timer = setTimeout(trackVisit, 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
