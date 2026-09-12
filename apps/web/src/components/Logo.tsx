'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  showCaption?: boolean;
  isLink?: boolean;
  href?: string;
  className?: string;
}

export default function Logo({
  size = 'md',
  showBadge = true,
  showCaption = true,
  isLink = true,
  href = '/',
  className = '',
}: LogoProps) {
  // Size metrics
  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const captionSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  const badgeSizes = {
    sm: 'text-[8px] px-1 py-0.2',
    md: 'text-[9px] px-1.5 py-0.5',
    lg: 'text-[10px] px-2 py-0.5',
  };

  const content = (
    <div className={`flex items-center gap-3 group select-none shrink-0 ${className}`}>
      {/* Dynamic Animated Emblem Container */}
      <div className={`relative flex items-center justify-center shrink-0 ${emblemSizes[size]}`}>
        {/* Layer 1: Ambient Pulsing Cyber Glow */}
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500/40 via-cyan-500/30 to-indigo-500/40 blur-md opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 animate-pulse" />

        {/* Layer 2: 360-Degree Rotating Conic Orbit Ring */}
        <div className="absolute -inset-[2px] rounded-2xl bg-[conic-gradient(from_0deg,#10b981,#06b6d4,#8b5cf6,#10b981)] opacity-75 group-hover:opacity-100 animate-spin-slow blur-[1px] transition-opacity duration-300" />

        {/* Layer 3: Counter-rotating orbital particle accent */}
        <div className="absolute -inset-[3px] rounded-2xl border border-dashed border-emerald-400/30 opacity-40 group-hover:opacity-80 animate-spin-slow-reverse pointer-events-none" />

        {/* Layer 4: High-Tech Shield / Squircle Glass Matrix */}
        <div className="relative w-full h-full rounded-xl bg-slate-950/95 border border-emerald-400/40 p-1 flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:border-emerald-300/80 group-hover:shadow-emerald-400/30 group-hover:scale-105 transition-all duration-300 overflow-hidden">
          {/* Animated Laser Sweep across the emblem */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent -translate-x-full animate-laser-sweep pointer-events-none" />

          {/* Precision High-Tech SVG Emblem */}
          <svg
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-300"
          >
            <defs>
              {/* Primary Vibrant Gradient */}
              <linearGradient id="tfx-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>

              {/* Accent Gold/Cyan Gradient */}
              <linearGradient id="tfx-grad-accent" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>

              {/* Luminous Core Glow Filter */}
              <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Circuit Grid Backdrop */}
            <line x1="6" y1="22" x2="38" y2="22" stroke="#10b981" strokeWidth="0.75" strokeDasharray="1.5 2" opacity="0.35" />
            <line x1="22" y1="6" x2="22" y2="38" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="1.5 2" opacity="0.35" />

            {/* Stylized Interlocking 'T' Crossbar (Tax Foundation) */}
            <path
              d="M7 11.5C7 10.12 8.12 9 9.5 9H34.5C35.88 9 37 10.12 37 11.5C37 12.88 35.88 14 34.5 14H25V17H19V14H9.5C8.12 14 7 12.88 7 11.5Z"
              fill="url(#tfx-grad-main)"
            />

            {/* Dynamic Kinetic 'X' Stem 1 (Diagonal Left to Right - Execution / Filing) */}
            <path
              d="M11 35C10.2 35 9.5 34.1 9.9 33.3L19.5 18H24.5L14.5 34.2C13.9 34.7 13.2 35 11 35Z"
              fill="url(#tfx-grad-accent)"
              opacity="0.95"
            />

            {/* Dynamic Kinetic 'X' Stem 2 (Diagonal Right to Left - Mathematics / Verification) */}
            <path
              d="M33 35C33.8 35 34.5 34.1 34.1 33.3L24.5 18H19.5L29.5 34.2C30.1 34.7 30.8 35 33 35Z"
              fill="url(#tfx-grad-main)"
            />

            {/* Intersecting High-Voltage Quantum Nexus Core */}
            <polygon
              points="22,17 26,22 22,27 18,22"
              fill="#ffffff"
              filter="url(#core-glow)"
              className="animate-pulse"
            />
            <polygon
              points="22,18.5 24.5,22 22,25.5 19.5,22"
              fill="#06b6d4"
            />

            {/* Circuit Terminal Ledger Nodes */}
            <circle cx="8" cy="11.5" r="1.8" fill="#ffffff" />
            <circle cx="36" cy="11.5" r="1.8" fill="#38bdf8" />
            <circle cx="11" cy="33.5" r="1.8" fill="#34d399" />
            <circle cx="33" cy="33.5" r="1.8" fill="#818cf8" />
          </svg>

          {/* Live Operational Status Micro-Pulse */}
          <span className="absolute top-1 right-1 flex h-2 w-2 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          </span>
        </div>
      </div>

      {/* Typography & Brand Wordmark */}
      <div className="flex flex-col justify-center whitespace-nowrap">
        <div className="flex items-center gap-2 leading-none">
          {/* Main Wordmark with Shimmer & Glow */}
          <span className={`font-black tracking-tight text-white transition-all duration-300 flex items-center ${titleSizes[size]}`}>
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-emerald-200">
              TaxFile
            </span>
            {/* Supercharged Neon 'X' */}
            <span className="relative inline-block ml-0.5">
              <span className="bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-black drop-shadow-[0_0_12px_rgba(16,185,129,0.8)] group-hover:drop-shadow-[0_0_18px_rgba(6,182,212,1)] group-hover:scale-110 inline-block transition-transform duration-300">
                X
              </span>
              {/* Micro-sparkle on the tip of the X */}
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
            </span>
          </span>

          {/* Official Verification Micro-Badge */}
          {showBadge && (
            <div className={`flex items-center gap-1 font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full leading-none group-hover:border-emerald-400/60 group-hover:bg-emerald-500/20 transition-all ${badgeSizes[size]}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>IRS Certified</span>
            </div>
          )}
        </div>

        {/* Micro-Caption / Architecture Subhead */}
        {showCaption && (
          <span className={`text-slate-400 font-medium tracking-wide mt-1 leading-none group-hover:text-slate-300 transition-colors ${captionSizes[size]}`}>
            AI Deterministic Tax Engine
          </span>
        )}
      </div>
    </div>
  );

  if (isLink) {
    return (
      <Link href={href} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
