'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Zap, Menu, X, ArrowRight, Play, Terminal } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Free W-2 Scanner', href: '/free-w2', badge: 'FREE' },
    { label: 'AI Agents (Soon)', href: '/agentic-ai', badge: 'Soon' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Live Demo', href: '/demo', badge: 'Interactive' },
    { label: 'Why TaxFilex', href: '/#why-taxfilex' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border-b border-emerald-500/10 py-1.5 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Zero Document Retention Architecture
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline">
            Multi-Year IRS Deterministic Compliance
          </span>
          <span className="text-slate-500 hidden md:inline">•</span>
          <Link
            href="/free-w2"
            className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 transition-all"
          >
            <Zap className="w-3 h-3 text-emerald-400 animate-bounce" />
            <span>Try Free W-2 AI Scanner</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand with animated logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Animated Logo Container */}
          <div className="relative flex items-center justify-center">
            {/* Outer pulsating glow aura */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40 blur-sm opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse" />
            
            {/* Logo Icon with subtle interactive tilt and metallic border */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 border border-white/20 overflow-hidden">
              {/* Inner diagonal sheen reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="text-slate-950 font-black text-lg tracking-tighter select-none relative z-10">TF</span>
              
              {/* Live operational micro-ping indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 border border-slate-950" />
              </span>
            </div>
          </div>

          {/* Correctly Aligned Typography & Caption */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 leading-none">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                TaxFile<span className="text-emerald-400">x</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                IRS Certified
              </span>
            </div>
            <span className="text-[10.5px] text-slate-400 font-medium tracking-wide mt-1 leading-none">
              AI Deterministic Tax Engine
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/anttonyraj/taxfilex"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="View source on GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>
          <Link
            href="/demo"
            className="px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            <span>Interactive Demo</span>
          </Link>
          <Link
            href="/return/upload"
            className="px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>Start Filing — $39</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/demo"
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-emerald-400"
          >
            Demo
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-center font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              Try Live Engine Demo
            </Link>
            <Link
              href="/return/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-center font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <span>Start Filing ($39 Flat)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
