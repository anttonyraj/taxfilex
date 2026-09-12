'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Cpu,
  Trash2,
  Check,
  Eye,
  Terminal,
  HelpCircle,
  Clock,
  Sparkles,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Play,
} from 'lucide-react';

export default function HomePage() {
  // Hero interactive profile switcher
  const [activeProfile, setActiveProfile] = useState<'single' | 'family' | 'freelance'>('single');

  // How it works active step tab
  const [activeStep, setActiveStep] = useState<number>(0);

  // Math lineage line inspector state
  const [activeLine, setActiveLine] = useState<'1a' | '12' | '15' | '16' | '19' | '34'>('34');

  // Interactive FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const profiles = {
    single: {
      title: 'Single Tech Worker (W-2)',
      w2Wages: 124500,
      withholding: 19800,
      filingStatus: 'Single',
      dependents: 0,
      standardDeduction: 16100,
      taxableIncome: 108400,
      regularTax: 18420,
      ctc: 0,
      refund: 1380,
      formulaNote: 'Bracket tax on $108,400 using TY2026 single brackets minus $19,800 withholding',
    },
    family: {
      title: 'Married with 2 Kids (MFJ)',
      w2Wages: 168000,
      withholding: 18500,
      filingStatus: 'Married Filing Jointly',
      dependents: 2,
      standardDeduction: 32200,
      taxableIncome: 135800,
      regularTax: 19480,
      ctc: 4000,
      refund: 3020,
      formulaNote: 'Tax $19,480 - $4,000 Child Tax Credit (IRC § 24) = $15,480 net tax. Withholding $18,500 = $3,020 Refund.',
    },
    freelance: {
      title: 'Consultant (W-2 + 1099-NEC)',
      w2Wages: 94000,
      withholding: 14200,
      filingStatus: 'Single',
      dependents: 0,
      standardDeduction: 16100,
      taxableIncome: 77900,
      regularTax: 11840,
      ctc: 0,
      refund: 2360,
      formulaNote: 'Pure deterministic calculation across multiple schedules with real-time SE & withholding credit',
    },
  };

  const curProfile = profiles[activeProfile];

  const steps = [
    {
      num: '01',
      title: 'In-Memory Document Ingestion',
      subtitle: 'Process & Forget Architecture',
      desc: 'Drag & drop your W-2 or 1099 PDF/image. The document is parsed directly in volatile server RAM. No persistent disk writes. No cloud storage buckets.',
      badge: '0 Bytes Persisted',
      icon: FileText,
      graphic: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-200">W2_2026_Employer_Acme.pdf</span>
            </div>
            <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              PARSED IN RAM
            </span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5 text-slate-400">
            <div className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Extracted Payload (Envelope Encrypted):
            </div>
            <div>• Box 1 (Wages): <span className="text-emerald-400 font-bold">$124,500.00</span></div>
            <div>• Box 2 (Federal Tax Withheld): <span className="text-emerald-400 font-bold">$19,800.00</span></div>
            <div>• Box 4/6 (FICA/Medicare): <span className="text-slate-300">$7,719.00 / $1,805.25</span></div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Raw PDF automatically shredded from volatile RAM in: <strong>00:03s</strong></span>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'Deterministic Rule Engine',
      subtitle: 'Zero AI Hallucinations in Tax Math',
      desc: 'AI handles OCR parsing; our mathematically certified tax engine calculates your return. Every equation adheres strictly to IRS statutory parameters.',
      badge: '100% Deterministic',
      icon: Cpu,
      graphic: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Rule: calculateTaxableIncome()</span>
              <span className="text-emerald-400">STATUS: VERIFIED</span>
            </div>
            <div className="p-2 rounded bg-slate-900 text-slate-300">
              <code>Line 15 = max(0, AGI ($124,500) - StdDeduction ($16,100))</code>
            </div>
            <div className="text-slate-400">
              Result: <span className="text-emerald-400 font-bold">$108,400.00</span> (Taxable Base)
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Rule: calculateBracketTax() [TY2026]</span>
              <span className="text-cyan-400">BRACKETS: 10%, 12%, 22%, 24%</span>
            </div>
            <div className="text-slate-400">
              Regular Tax: <span className="text-cyan-400 font-bold">$18,420.00</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Inspectable Audit Lineage',
      subtitle: 'Every Line Has a Verifiable Proof',
      desc: 'Never wonder where a number came from. Click any line on your Form 1040 to inspect its exact inputs, statutory formula, and source documents.',
      badge: 'Full Traceability',
      icon: Eye,
      graphic: (
        <div className="space-y-2.5 font-mono text-xs">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center justify-between font-semibold text-emerald-300">
              <span>Form 1040 Line 34 — Overpayment (Refund)</span>
              <span className="text-base font-bold">$1,380.00</span>
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-1 font-sans">
              Calculated as: Total Payments ($19,800.00) - Total Tax ($18,420.00)
            </p>
          </div>
          <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-[11px] space-y-1 text-slate-300">
            <div className="text-slate-400">Audit Dependencies:</div>
            <div className="flex items-center justify-between">
              <span>• Line 25d (Total Federal Withheld)</span>
              <span className="text-emerald-400">$19,800.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• Line 24 (Total Tax Liability)</span>
              <span className="text-slate-300">$18,420.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• Line 19 (Child Tax Credit)</span>
              <span className="text-slate-400">$0.00</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'IRS MeF e-File & Instant Purge',
      subtitle: 'Zero Residue in Cloud Storage',
      desc: 'Transmit directly to the IRS Modernized e-File (MeF) gateway with cryptographic receipt tokens. Once filed, your volatile session is shredded completely.',
      badge: 'Cryptographic Purge',
      icon: Trash2,
      graphic: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-200">IRS MeF Transmission</span>
            </div>
            <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              ACCEPTED (200 OK)
            </span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-slate-400">
            <div>Receipt Submission ID: <code className="text-cyan-400">IRS-2026-98842109-MEF</code></div>
            <div>Envelope Key Status: <span className="text-rose-400 font-bold">CRYPTO-SHREDDED</span></div>
            <div>Database Documents Retained: <span className="text-emerald-400 font-bold">0 FILES</span></div>
          </div>
          <div className="p-2 rounded bg-slate-900/60 text-slate-500 text-[10px] text-center">
            Zero telemetry sold. Zero tax data shared with ad networks.
          </div>
        </div>
      ),
    },
  ];

  const faqs = [
    {
      q: 'How does the "Zero Document Retention" architecture work?',
      a: 'When you upload tax forms (such as W-2 or 1099), our ingestion pipeline reads and extracts the numeric fields entirely in temporary volatile server memory (RAM). Once extracted, the raw file is cryptographically shredded and discarded. No raw PDF, image, or document ever touches a persistent disk or cloud storage bucket.',
    },
    {
      q: 'Why deterministic math instead of pure AI?',
      a: 'Large Language Models (LLMs) are great at reading messy documents, but notoriously prone to math hallucinations. Tax calculations must be exact down to the penny. TaxFilex separates the two: AI extracts the form fields, but our pure, certified, and audited rule engine executes 100% deterministic tax formulas.',
    },
    {
      q: 'Are state returns included in the $39 flat price?',
      a: 'Yes. $39 includes your complete Federal return and one State return. Unlike TurboTax or H&R Block, there are no surprise $80 state filing charges, no deduction tiers, and no upsells for claiming student loans or investment income.',
    },
    {
      q: 'What tax years does TaxFilex support?',
      a: 'TaxFilex features a multi-year deterministic rule engine supporting current and future tax years (including TY2024, TY2025, and TY2026+). The pure mathematical AST architecture isolates year-specific tax rules, standard deductions, and phaseouts into versioned mathematical libraries without code changes.',
    },
  ];

  return (
    <main className="relative z-10">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-500/10 mb-8 animate-pulse-subtle">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
            AI Deterministic Tax Engine • Autonomous Agents (Soon)
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-300 font-mono">Zero Document Retention</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1]">
          Agentic AI Precision.{' '}
          <span className="text-gradient-emerald block sm:inline">
            Zero Document Retention.
          </span>{' '}
          <span className="text-gradient-cyan">
            Certified Tax Math.
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
          Six autonomous AI agents orchestrate your tax filing — extracting forms in volatile RAM, optimizing every legal deduction, and verifying audit immunity. All backed by 100% deterministic mathematical execution.
          <span className="text-emerald-400 font-semibold"> No files stored. No math hallucinations. No surprise fees.</span>
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-2xl">
          <Link
            href="/free-w2"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>⚡ Try Free W-2 AI Scanner</span>
          </Link>
          <Link
            href="/return/upload"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Start Filing — $39 Flat</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            <span>Live Demo</span>
          </Link>
        </div>

        <div className="mt-4 text-xs text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Federal + 1 State Included
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Zero Upsells
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Complete Audit Lineage
          </span>
        </div>

        {/* ---------------------------------------------------- */}
        {/* HERO VISUAL CONSOLE (Decyra-inspired Tax Pipeline) */}
        {/* ---------------------------------------------------- */}
        <div className="mt-16 w-full max-w-5xl text-left">
          {/* Profile Switcher Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/90 rounded-t-2xl px-4 py-3">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider mr-2 hidden sm:inline">
                Live Scenario:
              </span>
              {(['single', 'family', 'freelance'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveProfile(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeProfile === key
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {profiles[key].title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                Pure Deterministic Output
              </span>
            </div>
          </div>

          {/* Console Body: 3-column Dataflow Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-x border-b border-slate-800/80 rounded-b-2xl bg-slate-950/80 backdrop-blur-xl divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
            {/* Column 1: Document OCR Ingestion */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  1. Volatile Ingestion
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  RAM ONLY
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 text-[11px]">Parsed Tax Form:</div>
                <div className="text-slate-200 font-semibold flex items-center justify-between">
                  <span>W-2 Wages (Box 1):</span>
                  <span className="text-emerald-400 font-bold">
                    ${curProfile.w2Wages.toLocaleString()}.00
                  </span>
                </div>
                <div className="text-slate-200 flex items-center justify-between">
                  <span>Fed Withholding (Box 2):</span>
                  <span className="text-cyan-400 font-bold">
                    ${curProfile.withholding.toLocaleString()}.00
                  </span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Filing Status:</span>
                  <span className="text-slate-200">{curProfile.filingStatus}</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Dependents:</span>
                  <span className="text-slate-200">{curProfile.dependents}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300/90 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Raw document image purged from RAM upon tokenization.</span>
              </div>
            </div>

            {/* Column 2: Math Engine Execution */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  2. Engine Calculations
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  TY2026 STATUTORY
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Line 11 (AGI):</span>
                  <span className="text-slate-200 font-bold">
                    ${curProfile.w2Wages.toLocaleString()}.00
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Line 12 (Std Deduction):</span>
                  <span className="text-slate-200 font-bold">
                    -${curProfile.standardDeduction.toLocaleString()}.00
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Line 15 (Taxable Income):</span>
                  <span className="text-cyan-400 font-bold">
                    ${curProfile.taxableIncome.toLocaleString()}.00
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Line 16 (Regular Tax):</span>
                  <span className="text-slate-200 font-bold">
                    ${curProfile.regularTax.toLocaleString()}.00
                  </span>
                </div>

                {curProfile.ctc > 0 && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-emerald-300">Line 19 (Child Tax Credit):</span>
                    <span className="text-emerald-400 font-bold">
                      -${curProfile.ctc.toLocaleString()}.00
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Column 3: Live Form 1040 Refund & Purge */}
            <div className="p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    3. Form 1040 Line 34
                  </span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    IRS VERIFIED
                  </span>
                </div>

                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-cyan-950/30 border border-emerald-500/40 text-center relative overflow-hidden">
                  <div className="text-xs text-slate-400 font-mono mb-1">
                    ESTIMATED FEDERAL REFUND
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight glow-text-emerald">
                    ${curProfile.refund.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 font-mono">
                    Direct Deposit to Bank Account
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-400 leading-relaxed font-sans">
                  {curProfile.formulaNote}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <Link
                  href="/demo"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Customize in Live Engine Sandbox</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6 AUTONOMOUS AGENTS SHOWCASE */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
              THE AGENTIC SUITE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Six Specialized Autonomous Tax Agents
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl leading-relaxed">
              Moving beyond passive questionnaires. Our multi-agent architecture orchestrates document extraction, credit discovery, and audit immunity before zeroing RAM.
            </p>
          </div>
          <div>
            <Link
              href="/agentic-ai"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-colors"
            >
              <span>Explore Agent Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/agentic-ai#roster"
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-800 space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                AGENT_01
              </span>
              <span className="text-[10px] text-slate-500 font-mono">RAM SHREDDER</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              TaxVault™
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-document retention agent. Ingests raw PDFs in volatile memory and zeroes out RAM segments (0x00) the moment tokens are generated.
            </p>
          </Link>

          <Link
            href="/agentic-ai#roster"
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-800 space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                AGENT_02
              </span>
              <span className="text-[10px] text-slate-500 font-mono">SUB-SECOND OCR</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              TaxVision™
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-format computer vision engine. Reads crumpled W-2s, 1099s, and payroll statements with EIN checksum verification in 2 seconds.
            </p>
          </Link>

          <Link
            href="/agentic-ai#roster"
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-800 space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                AGENT_03
              </span>
              <span className="text-[10px] text-slate-500 font-mono">REFUND OPTIMIZER</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              DeductionHunter™
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exhaustively computes all 40+ statutory credit rules (IRC § 24, standard deduction thresholds) to maximize your legal payout.
            </p>
          </Link>

          <Link
            href="/agentic-ai#roster"
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-800 space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                AGENT_04
              </span>
              <span className="text-[10px] text-slate-500 font-mono">DIF WATCHDOG</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              AuditShield™
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pre-screens your return against IRS Discriminant Information Function models to eliminate audit red flags before transmission.
            </p>
          </Link>

          <Link
            href="/agentic-ai#roster"
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-800 space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                AGENT_05
              </span>
              <span className="text-[10px] text-slate-500 font-mono">NEXUS SOLVER</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
              CrossJurisdiction™
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solves multi-state remote work, reciprocity agreements, and out-of-state wage allocations without double taxation.
            </p>
          </Link>

          <Link
            href="/agentic-ai#roster"
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-800 space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                AGENT_06
              </span>
              <span className="text-[10px] text-slate-500 font-mono">IRS GATEWAY</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              MeF Dispatcher™
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Validates 1,200+ IRS XML business schemas, digitally signs the return, and handshakes directly with IRS servers in 4 seconds.
            </p>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* THE PROBLEM SECTION (Decyra-style Contrast) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
            THE PROBLEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Traditional Tax Preparation Is Fundamentally Broken.
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            The tax code is just math. But legacy software turns it into a manipulative hostage negotiation to milk fees and sell your private financial records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel-interactive p-8 rounded-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 font-bold text-xl">
              01
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Dark Patterns & $180 Surprise Fees
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              They advertise "Free Filing" until you spend 40 minutes entering your data, only to hit a paywall because you had student loan interest or contributed to an HSA.
            </p>
          </div>

          <div className="glass-panel-interactive p-8 rounded-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 font-bold text-xl">
              02
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Your Financial Documents Are Retained & Sold
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Legacy tax preparers store your tax returns forever to target you with loans, credit cards, and insurance ads. You are the product, not the customer.
            </p>
          </div>

          <div className="glass-panel-interactive p-8 rounded-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 font-bold text-xl">
              03
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Black-Box Math & Zero Traceability
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              You're handed a final refund number with zero explanation. If the IRS audits you, good luck deciphering why a line item was calculated that way.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* HOW IT WORKS (Animated 4-Step Interactive Showcase) */}
      {/* ---------------------------------------------------- */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How TaxFilex Operates in 4 Deterministic Steps
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            From document upload to accepted IRS e-file in under three minutes, with absolute mathematical verification.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isActive
                    ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                    STEP {step.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                </div>
                <div className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span>{steps[activeStep].badge}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {steps[activeStep].title}
            </h3>

            <div className="text-lg font-medium text-emerald-300">
              {steps[activeStep].subtitle}
            </div>

            <p className="text-slate-300 text-base leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
              <span className="text-xs text-slate-500 font-mono">
                Step {activeStep + 1} of 4
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs text-slate-400 font-mono flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  taxfilex-engine-pipeline --step={steps[activeStep].num}
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>
              {steps[activeStep].graphic}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* INTERACTIVE FORMULA & LINEAGE INSPECTOR */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
            AUDIT & VERIFIABILITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Every Dollar Backed by Auditable Math.
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Inspect the exact statutory formulas and IRC legal code citations governing every single line on your Form 1040 return.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Line item selector */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-semibold uppercase text-slate-400 px-2 mb-2 font-mono">
                Click to inspect Form 1040 Line:
              </div>
              {[
                { id: '1a', title: 'Line 1a: Total W-2 Wages', code: 'IRC § 61' },
                { id: '12', title: 'Line 12: Standard Deduction', code: 'IRC § 63(c)' },
                { id: '15', title: 'Line 15: Taxable Income', code: 'Line 11 - Line 12' },
                { id: '16', title: 'Line 16: Regular Tax', code: 'IRC § 1(j)' },
                { id: '19', title: 'Line 19: Child Tax Credit', code: 'IRC § 24' },
                { id: '34', title: 'Line 34: Overpayment (Refund)', code: 'Payments - Tax' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveLine(item.id as any)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-mono transition-all flex items-center justify-between ${
                    activeLine === item.id
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{item.title}</span>
                  <span className="text-[10px] text-slate-500">{item.code}</span>
                </button>
              ))}
            </div>

            {/* Line details inspector panel */}
            <div className="lg:col-span-8 p-6 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold text-sm">
                    {activeLine === '1a' && '1040_Line_1a: Total Amount from Form(s) W-2, Box 1'}
                    {activeLine === '12' && '1040_Line_12: Standard Deduction or Itemized Deductions'}
                    {activeLine === '15' && '1040_Line_15: Taxable Income'}
                    {activeLine === '16' && '1040_Line_16: Tax (Statutory Bracket Schedule)'}
                    {activeLine === '19' && '1040_Line_19: Child Tax Credit or Credit for Other Dependents'}
                    {activeLine === '34' && '1040_Line_34: Overpayment to be Refunded'}
                  </span>
                </div>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
                  DETERMINISTIC
                </span>
              </div>

              <div className="space-y-3 font-sans text-slate-300">
                {activeLine === '1a' && (
                  <>
                    <p>Gross earned wages aggregated across all verified W-2 documents ingested in volatile memory.</p>
                    <div className="p-3 rounded bg-slate-900 font-mono text-xs text-slate-200">
                      Formula: <code>sum(w2.box1_wages for w2 in taxpayer_w2_list)</code>
                    </div>
                  </>
                )}
                {activeLine === '12' && (
                  <>
                    <p>TY2026 inflation-adjusted statutory deduction: <strong>$16,100</strong> for Single / MFS, <strong>$32,200</strong> for Married Filing Jointly, <strong>$24,150</strong> for Head of Household.</p>
                    <div className="p-3 rounded bg-slate-900 font-mono text-xs text-slate-200">
                      Formula: <code>STANDARD_DEDUCTION_TY2026[filing_status] + additional_age_blindness_allowance</code>
                    </div>
                  </>
                )}
                {activeLine === '15' && (
                  <>
                    <p>Taxable income after all above-the-line adjustments and standard deductions.</p>
                    <div className="p-3 rounded bg-slate-900 font-mono text-xs text-slate-200">
                      Formula: <code>max(0, line_11_agi - line_12_deductions)</code>
                    </div>
                  </>
                )}
                {activeLine === '16' && (
                  <>
                    <p>Statutory progressive bracket calculation under IRS Section 1(j) rates for Tax Year 2026.</p>
                    <div className="p-3 rounded bg-slate-900 font-mono text-xs text-slate-200">
                      Formula: <code>piecewise_sum(taxable_income, brackets_ty2026[filing_status])</code>
                    </div>
                  </>
                )}
                {activeLine === '19' && (
                  <>
                    <p>Child Tax Credit under IRC § 24: <strong>$2,000 per qualifying child under age 17</strong>, subject to phaseout starting at $200k Single / $400k MFJ.</p>
                    <div className="p-3 rounded bg-slate-900 font-mono text-xs text-slate-200">
                      Formula: <code>min(regular_tax, qualifying_children * 2000 - phaseout_penalty)</code>
                    </div>
                  </>
                )}
                {activeLine === '34' && (
                  <>
                    <p>Net refundable overpayment returned to taxpayer via direct ACH deposit.</p>
                    <div className="p-3 rounded bg-slate-900 font-mono text-xs text-slate-200">
                      Formula: <code>max(0, line_33_total_payments - line_24_total_tax)</code>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* WHY TAXFILEX COMPARISON TABLE */}
      {/* ---------------------------------------------------- */}
      <section id="why-taxfilex" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
            COMPARISON
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Taxpayers Choose TaxFilex
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Not another bloated tax survey. A modern, privacy-first deterministic engine designed for operators.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-mono uppercase text-slate-400">
                <th className="py-4 px-4">Feature / Capability</th>
                <th className="py-4 px-4 text-emerald-400 bg-emerald-500/5 font-bold">TaxFilex</th>
                <th className="py-4 px-4 text-slate-400">TurboTax / H&R Block</th>
                <th className="py-4 px-4 text-slate-400">Generic AI Chatbots</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Document Retention</td>
                <td className="py-4 px-4 text-emerald-400 bg-emerald-500/5 font-semibold">
                  Zero Document Retention (RAM shred in seconds)
                </td>
                <td className="py-4 px-4 text-rose-400">Stored indefinitely for advertising & loan ads</td>
                <td className="py-4 px-4 text-amber-400">Stored in model training logs</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Pricing Model</td>
                <td className="py-4 px-4 text-emerald-400 bg-emerald-500/5 font-semibold">
                  $39 Flat (Federal + State included)
                </td>
                <td className="py-4 px-4 text-rose-400">$89 – $220+ with unexpected add-on fees</td>
                <td className="py-4 px-4 text-slate-400">Cannot legally e-file returns</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Calculation Integrity</td>
                <td className="py-4 px-4 text-emerald-400 bg-emerald-500/5 font-semibold">
                  100% Deterministic Rule Engine
                </td>
                <td className="py-4 px-4 text-slate-300">Proprietary legacy rule set</td>
                <td className="py-4 px-4 text-rose-400">Hallucinates math and deductions</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Average Completion Time</td>
                <td className="py-4 px-4 text-emerald-400 bg-emerald-500/5 font-semibold">
                  Under 3 Minutes
                </td>
                <td className="py-4 px-4 text-slate-400">45 – 60 minutes of repetitive forms</td>
                <td className="py-4 px-4 text-slate-400">N/A</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Audit Lineage</td>
                <td className="py-4 px-4 text-emerald-400 bg-emerald-500/5 font-semibold">
                  Inspectable formula for every dollar
                </td>
                <td className="py-4 px-4 text-slate-400">Black box opaque summary</td>
                <td className="py-4 px-4 text-slate-400">No IRS form mapping</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Direct IRS MeF e-File</td>
                <td className="py-4 px-4 text-emerald-400 bg-emerald-500/5 font-semibold">
                  Direct submission with cryptographic receipt
                </td>
                <td className="py-4 px-4 text-slate-300">Included (after upgrade paywall)</td>
                <td className="py-4 px-4 text-rose-400">Not supported</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* PRICING STRIP */}
      {/* ---------------------------------------------------- */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
            HONEST PRICING
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            One Flat Price. Zero Hidden Taxes.
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            No per-form fees. No deduction tiers. No upselling on state filings.
          </p>
        </div>

        <div className="max-w-lg mx-auto p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs">
            ALL INCLUSIVE
          </div>

          <div className="text-xs font-mono text-emerald-400 font-semibold mb-2">
            TY2026 COMPLETE RETURN
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-white">$39</span>
            <span className="text-sm text-slate-400 font-normal">flat / individual return</span>
          </div>

          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Everything you need for an accurate, certified, zero-retention tax filing with the IRS.
          </p>

          <ul className="space-y-3 text-xs text-slate-300 mb-8">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Federal Form 1040 + all supported schedules (Sch 1, 8812)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1 Resident State Return included (no additional state tax)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant in-memory document parsing (W-2, 1099s)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Document Retention guarantee with cryptographic shredding</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct IRS MeF e-File submission with tracking token</span>
            </li>
          </ul>

          <Link
            href="/return/upload"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm text-center block shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Start Your Return Now — $39
          </Link>

          <div className="mt-4 text-center">
            <Link
              href="/pricing"
              className="text-xs text-slate-400 hover:text-emerald-300 underline"
            >
              See detailed fee breakdown & competitive savings table →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FAQ SECTION */}
      {/* ---------------------------------------------------- */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
            QUESTIONS & ANSWERS
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Have questions about our zero-retention architecture or tax engine?
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-emerald-300 transition-colors"
                >
                  <span>{item.q}</span>
                  <span className={`text-emerald-400 font-mono text-base transform transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Visit Full FAQ Portal with Search & Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FINAL CALL TO ACTION */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to File in Under 3 Minutes?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              No questionnaires. No files lingering in the cloud. Just pure mathematical tax computation and instant submission.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/return/upload"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Start Filing — $39 Flat
              </Link>
              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-semibold text-base transition-colors"
              >
                Try Interactive Sandbox
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
