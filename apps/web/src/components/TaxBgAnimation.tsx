'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  label?: string;
  alpha: number;
  maxAlpha: number;
  color: string;
}

export default function TaxBgAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const labels = [
      'W-2', '1099-INT', '1040_1a', 'TY2026', 'AES-256', 
      'RAM_PURGE', '1040_15', 'SCH_8812', 'REFUND_34', 
      '0_RETENTION', 'AGI_CALC', 'IRS_MeF'
    ];

    const colors = ['#10b981', '#06b6d4', '#34d399', '#38bdf8', '#fbbf24'];

    const particles: Particle[] = Array.from({ length: 32 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.4, // float upwards gently
      size: 1.5 + Math.random() * 2,
      label: Math.random() > 0.4 ? labels[i % labels.length] : undefined,
      alpha: Math.random() * 0.5 + 0.1,
      maxAlpha: 0.35 + Math.random() * 0.35,
      color: colors[i % colors.length],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw floating nodes & data streams
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Optional micro tax badge / code label
        if (p.label) {
          ctx.font = '10px monospace';
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.85;
          ctx.fillText(p.label, p.x + 6, p.y + 3);
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic ambient color gradients */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl rounded-full" />
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-10 -right-48 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-600/10 via-brand-accent/5 to-transparent blur-3xl rounded-full" />
      
      {/* Background gridlines */}
      <div className="absolute inset-0 tax-grid-bg opacity-30" />

      {/* Tax Dataflow Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
