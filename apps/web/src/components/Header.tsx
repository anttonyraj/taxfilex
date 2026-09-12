'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Zap, Menu, X, ArrowRight, Play, Terminal } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const pathname = usePathname();

  const handleGoogleSignIn = () => {
    setIsSigningIn(true);
    // Instant Google auth session simulation
    setTimeout(() => {
      setUser({ name: 'Verified Taxpayer', email: 'taxpayer@gmail.com' });
      setIsSigningIn(false);
      setAuthModalOpen(false);
    }, 600);
  };

  const navLinks = [
    { label: 'Free W-2', href: '/free-w2', badge: 'FREE' },
    { label: 'AI Agents', href: '/agentic-ai', badge: 'Soon' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border-b border-emerald-500/10 py-1 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Zero Document Retention Architecture
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline whitespace-nowrap">
            Multi-Year IRS Deterministic Engine
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <Link
            href="/free-w2"
            className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 transition-all whitespace-nowrap"
          >
            <Zap className="w-3 h-3 text-emerald-400 animate-bounce" />
            <span>Try Free W-2 Scanner</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand with animated logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          {/* Animated Logo Container */}
          <div className="relative flex items-center justify-center shrink-0">
            {/* Outer pulsating glow aura */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40 blur-sm opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse" />
            
            {/* Logo Icon */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 border border-white/20 overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="text-slate-950 font-black text-lg tracking-tighter select-none relative z-10">TF</span>
              
              {/* Live operational micro-ping indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 border border-slate-950" />
              </span>
            </div>
          </div>

          {/* Correctly Aligned Typography & Caption */}
          <div className="flex flex-col justify-center whitespace-nowrap">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                TaxFile<span className="text-emerald-400">x</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full leading-none">
                IRS Certified
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 leading-none">
              AI Deterministic Tax Engine
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Clean, single-line, non-wrapping */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider whitespace-nowrap leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
          {/* Google Auth Sign In */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-medium">{user.name}</span>
              <button
                onClick={() => setUser(null)}
                className="text-slate-500 hover:text-rose-400 ml-1 transition-colors"
                title="Sign Out"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="p-1.5 px-2.5 text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium whitespace-nowrap shrink-0"
              title="Sign in with Google"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In</span>
            </button>
          )}

          <Link
            href="/demo"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Play className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />
            <span>Demo</span>
          </Link>
          <Link
            href="/return/upload"
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 whitespace-nowrap shrink-0"
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
      {/* Google Sign-In Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl space-y-5">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/25">
                TF
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Sign In to TaxFilex
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Access your encrypted volatile tax filing session. Zero documents stored on persistent disks.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Google Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isSigningIn ? 'Connecting to Google...' : 'Continue with Google'}</span>
              </button>

              {/* Instant Guest / Anonymous Option */}
              <button
                onClick={() => {
                  setUser({ name: 'Guest Filer', email: 'guest@ephemeral.taxfilex.com' });
                  setAuthModalOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Continue as Ephemeral Guest (Zero Login)</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-500">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-emerald-400 underline">Terms</Link> and{' '}
                <Link href="/privacy" className="text-emerald-400 underline">Privacy Policy</Link>.
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
