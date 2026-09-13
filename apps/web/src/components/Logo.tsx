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
  // Sizing tokens
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
      {/* Faceted Crystal Vault Shield with T-F-X Nexus Star */}
      <div className={`relative flex items-center justify-center shrink-0 ${emblemSizes[size]}`}>
        {/* Layer 1: Ambient Emerald-Cyan Pulsing Glow Halo */}
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500/35 via-cyan-500/30 to-teal-400/35 blur-md opacity-65 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 animate-pulse" />

        {/* Layer 2: Rotating Subtle Orbit Highlight */}
        <div className="absolute -inset-[2px] rounded-2xl bg-[conic-gradient(from_0deg,#10b981,#06b6d4,#10b981)] opacity-40 group-hover:opacity-85 animate-spin-slow blur-[1px] transition-opacity duration-300" />

        {/* Layer 3: The Crystal Shield Vector Glass Housing */}
        <div className="relative w-full h-full flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          {/* Animated Laser Sweep Sheen Across the Crystal Facets */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-20">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent -translate-x-full animate-laser-sweep" />
          </div>

          {/* Precision Faceted Crystal Vault Shield & T-F-X Nexus Star SVG */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] transition-all duration-300"
          >
            <defs>
              {/* Outer Shield Frame Gradient */}
              <linearGradient id="shieldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="45%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              {/* Facet Light Glow 1 */}
              <linearGradient id="facetTopL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
              </linearGradient>

              {/* Facet Light Glow 2 */}
              <linearGradient id="facetTopR" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.12" />
              </linearGradient>

              {/* Facet Bottom Bevel */}
              <linearGradient id="facetBottom" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
              </linearGradient>

              {/* T-F-X Star Luminous Neon Stroke */}
              <linearGradient id="tfxStarNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#34D399" />
                <stop offset="75%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              {/* Radiant Center Sparkle Glow */}
              <radialGradient id="nexusCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="40%" stopColor="#67E8F9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </radialGradient>

              {/* Filter for Cyber Bloom Glow */}
              <filter id="crystalBloom" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- FACETED CRYSTAL VAULT SHIELD BODY --- */}
            {/* Outer Shield Boundary Outline */}
            <path
              d="M50 6 L88 20 L80 56 L50 94 L20 56 L12 20 Z"
              fill="#030712"
              fillOpacity="0.9"
              stroke="url(#shieldRim)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Inner Shield Bevel Rim */}
            <path
              d="M50 14 L80 25 L73 52 L50 84 L27 52 L20 25 Z"
              stroke="#06B6D4"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              fill="none"
              strokeLinejoin="round"
            />

            {/* Faceted Crystal Gem Triangles (Left Side) */}
            <polygon points="50,6 12,20 20,25 50,14" fill="url(#facetTopL)" />
            <polygon points="12,20 20,56 27,52 20,25" fill="url(#facetTopL)" opacity="0.7" />
            <polygon points="20,56 50,94 50,84 27,52" fill="url(#facetBottom)" />

            {/* Faceted Crystal Gem Triangles (Right Side) */}
            <polygon points="50,6 88,20 80,25 50,14" fill="url(#facetTopR)" />
            <polygon points="88,20 80,56 73,52 80,25" fill="url(#facetTopR)" opacity="0.7" />
            <polygon points="80,56 50,94 50,84 73,52" fill="url(#facetBottom)" />

            {/* Internal Crystal Ridge Lines */}
            <line x1="50" y1="6" x2="50" y2="14" stroke="#67E8F9" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="50" y1="84" x2="50" y2="94" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="12" y1="20" x2="20" y2="25" stroke="#34D399" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="88" y1="20" x2="80" y2="25" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.6" />

            {/* --- CENTRAL T-F-X NEXUS STAR --- */}
            {/* 8-Point Outer Star Contour */}
            <path
              d="M50 16 L56 34 L76 34 L60 46 L66 66 L50 54 L34 66 L40 46 L24 34 L44 34 Z"
              stroke="url(#tfxStarNeon)"
              strokeWidth="2.4"
              strokeLinejoin="round"
              fill="#071824"
              fillOpacity="0.75"
              filter="url(#crystalBloom)"
            />

            {/* Letter 'T' & 'F' Architectural Framework */}
            {/* Top Bar of 'T' & 'F' */}
            <path
              d="M36 34 H64"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Vertical Stem of 'T' & 'F' */}
            <path
              d="M50 34 V64"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Mid Bar of 'F' */}
            <path
              d="M50 44 H62"
              stroke="#38BDF8"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Crossing Diagonals of 'X' */}
            {/* Diagonal Stroke 1 (Top-Left to Bottom-Right) */}
            <path
              d="M37 36 L63 62"
              stroke="url(#shieldRim)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            {/* Diagonal Stroke 2 (Top-Right to Bottom-Left) */}
            <path
              d="M63 36 L37 62"
              stroke="url(#shieldRim)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />

            {/* Central Radiant Nexus Diamond (Luminous Core) */}
            <polygon
              points="50,42 56,48 50,54 44,48"
              fill="url(#nexusCoreGlow)"
              className="animate-pulse"
            />
            <polygon
              points="50,45 53,48 50,51 47,48"
              fill="#FFFFFF"
            />

            {/* Precision Circuit Terminal Nodes on Star Tips */}
            <circle cx="50" cy="16" r="2" fill="#FFFFFF" />
            <circle cx="76" cy="34" r="2" fill="#38BDF8" />
            <circle cx="66" cy="66" r="2" fill="#34D399" />
            <circle cx="50" cy="80" r="1.8" fill="#10B981" />
            <circle cx="34" cy="66" r="2" fill="#34D399" />
            <circle cx="24" cy="34" r="2" fill="#38BDF8" />
          </svg>

          {/* Live Operational Status Micro-Pulse */}
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 z-30">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-85" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34D399]" />
          </span>
        </div>
      </div>

      {/* Typography & Brand Wordmark */}
      <div className="flex flex-col justify-center whitespace-nowrap">
        <div className="flex items-center gap-2 leading-none">
          {/* Main Wordmark with Metallic Lustre */}
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
