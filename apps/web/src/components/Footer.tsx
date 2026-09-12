import React from 'react';
import Link from 'next/link';
import { Shield, Lock, CheckCircle2, Terminal, ArrowUpRight, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 relative z-10">
      {/* Upper Status Ribbon */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              IRS MeF Gateway: TY2026 Active
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              RAM-Only Shredder: Operational
            </span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">
              100% Pure Deterministic Math
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Engine Version:</span>
            <code className="text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] font-mono">
              v2026.1.0-deterministic
            </code>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-lg">
                TF
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                TaxFile<span className="text-emerald-400">x</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The modern, auditable tax engine for individuals. Upload your W-2 and tax forms; our pure mathematical rules compute your return with zero document retention.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero File Persistence</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>AES-256 Envelope Keys</span>
              </div>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Product & Engine
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/agentic-ai" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  The Agentic AI Suite
                  <span className="text-[10px] text-emerald-400 font-mono">6 AGENTS</span>
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Live Interactive Demo
                  <span className="text-[10px] text-cyan-400 font-mono">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  $39 Flat Pricing
                </Link>
              </li>
              <li>
                <Link href="/#why-taxfilex" className="hover:text-emerald-400 transition-colors">
                  Why TaxFilex
                </Link>
              </li>
              <li>
                <Link href="/#supported-forms" className="hover:text-emerald-400 transition-colors">
                  Supported Forms & Schedules
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Security & Privacy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#security" className="hover:text-emerald-400 transition-colors">
                  Process & Forget Model
                </Link>
              </li>
              <li>
                <Link href="/faq#privacy" className="hover:text-emerald-400 transition-colors">
                  Zero Document Retention
                </Link>
              </li>
              <li>
                <Link href="/faq#math" className="hover:text-emerald-400 transition-colors">
                  Deterministic Math Guarantee
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Security Audits & Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Support & Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                  Help Center & FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/docs/rule-review" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Tax Rule Reference <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © 2026 TaxFilex Technologies Inc. Built strictly for US Tax Year 2026.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/anttonyraj/taxfilex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub (anttonyraj/taxfilex)</span>
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">No ads. No data brokers. No document hoarding.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
