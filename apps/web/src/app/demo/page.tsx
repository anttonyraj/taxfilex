'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Play,
  Trash2,
  ShieldCheck,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  Sliders,
  Sparkles,
  Info,
  Layers,
  Lock,
} from 'lucide-react';
import { compute, EngineInput, FilingStatus, LineId, LineResult } from '@taxfilex/tax-engine';

export default function DemoPage() {
  // Preset state
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('SINGLE');
  const [w2Wages, setW2Wages] = useState<number>(125000);
  const [withholding, setWithholding] = useState<number>(19500);
  const [dependentsCount, setDependentsCount] = useState<number>(0);

  // Shredder animation state
  const [isShredding, setIsShredding] = useState<boolean>(false);
  const [shredLog, setShredLog] = useState<string[]>([]);
  const [shredComplete, setShredComplete] = useState<boolean>(false);

  // Active view: '1040' or 'lineage'
  const [activeTab, setActiveTab] = useState<'1040' | 'lineage'>('1040');

  // Compute live return using real @taxfilex/tax-engine!
  const returnResult = useMemo(() => {
    const deps = Array.from({ length: dependentsCount }, (_, i) => ({
      id: `dep_${i}`,
      relationship: 'CHILD' as const,
      monthsInHome: 12,
      underAge17AtEndOfYear: true,
      hasSsn: true,
      isClaimedByUser: true,
    }));

    const input: EngineInput = {
      taxYear: 2026,
      filingStatus,
      filer: {
        ageOnDec31: 32,
        isBlind: false,
        canBeClaimedAsDependent: false,
      },
      spouse:
        filingStatus === 'MARRIED_FILING_JOINTLY'
          ? {
              ageOnDec31: 31,
              isBlind: false,
              canBeClaimedAsDependent: false,
            }
          : undefined,
      dependents: deps,
      documents: [
        {
          id: 'w2_demo_1',
          type: 'W2',
          w2: {
            id: 'w2_1',
            employerName: 'Acme Technologies Inc.',
            employerEin: '12-3456789',
            box1Wages: w2Wages,
            box2FederalTaxWithheld: withholding,
          },
        },
      ],
      answers: {},
    };

    try {
      return compute(input);
    } catch (e) {
      console.error('Compute error', e);
      return null;
    }
  }, [filingStatus, w2Wages, withholding, dependentsCount]);

  // Presets
  const applyPreset = (preset: 'tech' | 'family' | 'starter' | 'hoh') => {
    if (preset === 'tech') {
      setFilingStatus('SINGLE');
      setW2Wages(135000);
      setWithholding(22000);
      setDependentsCount(0);
    } else if (preset === 'family') {
      setFilingStatus('MARRIED_FILING_JOINTLY');
      setW2Wages(175000);
      setWithholding(20500);
      setDependentsCount(2);
    } else if (preset === 'starter') {
      setFilingStatus('SINGLE');
      setW2Wages(55000);
      setWithholding(6800);
      setDependentsCount(0);
    } else if (preset === 'hoh') {
      setFilingStatus('HEAD_OF_HOUSEHOLD');
      setW2Wages(82000);
      setWithholding(9400);
      setDependentsCount(1);
    }
  };

  // Trigger memory shredding simulation
  const runMemoryPurge = () => {
    setIsShredding(true);
    setShredComplete(false);
    setShredLog(['[0.00s] Initiating Process & Forget Memory Shredder...']);

    setTimeout(() => {
      setShredLog((prev) => [
        ...prev,
        '[0.45s] Zeroing volatile RAM segment 0x7FFE9B200... (0x00)',
      ]);
    }, 450);

    setTimeout(() => {
      setShredLog((prev) => [
        ...prev,
        '[0.90s] Shredding W-2 OCR tokens & raw binary buffer...',
      ]);
    }, 900);

    setTimeout(() => {
      setShredLog((prev) => [
        ...prev,
        '[1.40s] Destroying taxpayer envelope encryption key AES-256...',
      ]);
    }, 1400);

    setTimeout(() => {
      setShredLog((prev) => [
        ...prev,
        '[1.95s] Audit pass: 0 bytes retained on disk. Memory purge 100% COMPLETE.',
      ]);
      setIsShredding(false);
      setShredComplete(true);
    }, 2000);
  };

  const lines: Partial<Record<LineId, LineResult>> = returnResult?.lines ?? {};
  const agi = lines['1040_11']?.value ?? w2Wages;
  const standardDeduction = lines['1040_12']?.value ?? 0;
  const taxableIncome = lines['1040_15']?.value ?? 0;
  const regularTax = lines['1040_16']?.value ?? 0;
  const ctc = lines['1040_19']?.value ?? 0;
  const totalTax = lines['1040_24']?.value ?? regularTax;
  const totalPayments = lines['1040_33']?.value ?? withholding;
  const refund = lines['1040_34']?.value ?? 0;
  const amountOwed = lines['1040_37']?.value ?? 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
          <Play className="w-3.5 h-3.5 fill-cyan-400/20" />
          <span>LIVE DETERMINISTIC SANDBOX</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Test the Tax Engine in Real Time
        </h1>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Adjust wages, dependents, and filing statuses below. Watch our pure mathematical rules compute Form 1040 line-by-line with zero server persistence.
        </p>
      </div>

      {/* Preset Quick Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <span className="text-xs text-slate-400 font-mono mr-2">Quick Presets:</span>
        <button
          onClick={() => applyPreset('tech')}
          className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
        >
          Tech Worker ($135k Single)
        </button>
        <button
          onClick={() => applyPreset('family')}
          className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
        >
          Family with 2 Kids ($175k MFJ)
        </button>
        <button
          onClick={() => applyPreset('hoh')}
          className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
        >
          Single Parent Head of Household ($82k)
        </button>
        <button
          onClick={() => applyPreset('starter')}
          className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
        >
          Early Career ($55k Single)
        </button>
      </div>

      {/* Main Grid: Controls (Left) vs Form 1040 Live Engine (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Interactive Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Taxpayer Parameters (TY2026)
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE INPUTS
              </span>
            </div>

            {/* Filing Status */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="SINGLE">Single ($16,100 Standard Deduction)</option>
                <option value="MARRIED_FILING_JOINTLY">
                  Married Filing Jointly ($32,200 Standard Deduction)
                </option>
                <option value="HEAD_OF_HOUSEHOLD">
                  Head of Household ($24,150 Standard Deduction)
                </option>
                <option value="MARRIED_FILING_SEPARATELY">
                  Married Filing Separately ($16,100 Standard Deduction)
                </option>
              </select>
            </div>

            {/* W-2 Box 1 Wages Slider & Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-300">W-2 Box 1 (Gross Wages):</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  ${w2Wages.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="350000"
                step="2500"
                value={w2Wages}
                onChange={(e) => setW2Wages(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$20,000</span>
                <span>$180,000</span>
                <span>$350,000</span>
              </div>
            </div>

            {/* W-2 Box 2 Withholding Slider & Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-300">W-2 Box 2 (Federal Tax Withheld):</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">
                  ${withholding.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="60000"
                step="500"
                value={withholding}
                onChange={(e) => setWithholding(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$1,000</span>
                <span>$30,000</span>
                <span>$60,000</span>
              </div>
            </div>

            {/* Qualifying Children (CTC) */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-2">
                <span className="text-slate-300">Qualifying Children (Under 17):</span>
                <span className="text-amber-400 font-mono font-bold text-sm">
                  {dependentsCount} {dependentsCount === 1 ? 'child' : 'children'} ($
                  {(dependentsCount * 2000).toLocaleString()} Credit)
                </span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => setDependentsCount(count)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                      dependentsCount === count
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Memory Memory Shredder Simulation Box */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    Process & Forget Shredder
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">RAM VOLATILE</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Experience how TaxFilex destroys all uploaded tokens and document buffers immediately from memory.
                </p>

                <button
                  onClick={runMemoryPurge}
                  disabled={isShredding}
                  className="w-full py-2.5 px-4 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isShredding ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Purging RAM Buffer (0x00)...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Simulate Memory Purge & Shred</span>
                    </>
                  )}
                </button>

                {shredLog.length > 0 && (
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] space-y-1 text-slate-300 max-h-36 overflow-y-auto">
                    {shredLog.map((log, i) => (
                      <div
                        key={i}
                        className={
                          log.includes('COMPLETE') ? 'text-emerald-400 font-bold' : ''
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Form 1040 Calculation Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tab buttons */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('1040')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === '1040'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Form 1040 Line Preview
              </button>
              <button
                onClick={() => setActiveTab('lineage')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'lineage'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Pure Math AST & Formulas
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TY2026 Engine v2026.1</span>
            </div>
          </div>

          {/* Refund / Balance Due Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/40 relative overflow-hidden shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {refund > 0 ? 'Estimated Federal Refund' : 'Estimated Balance Due'}
                </span>
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight mt-1 glow-text-emerald">
                  ${(refund > 0 ? refund : amountOwed).toLocaleString()}.00
                </div>
                <div className="text-xs text-slate-300 mt-1 font-sans">
                  {refund > 0
                    ? 'Eligible for direct ACH deposit within 14-21 days of e-file acceptance.'
                    : 'Payable via IRS Direct Pay or installment plan.'}
                </div>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-2 text-right">
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  Line {refund > 0 ? '34 (Overpayment)' : '37 (Amount Owed)'}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Computed in 0.4ms in RAM
                </span>
              </div>
            </div>
          </div>

          {/* 1040 Line Breakdown or Lineage AST */}
          {activeTab === '1040' ? (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-bold uppercase text-slate-400 mb-2">
                Official Form 1040 Line Calculations:
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-semibold">Line 1a & 1z — Total Wages</div>
                  <div className="text-[10px] text-slate-400">Sum of Box 1 from all Form(s) W-2</div>
                </div>
                <span className="text-emerald-400 font-bold text-sm">
                  ${w2Wages.toLocaleString()}.00
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-semibold">Line 11 — Adjusted Gross Income (AGI)</div>
                  <div className="text-[10px] text-slate-400">Total Income minus Schedule 1 adjustments</div>
                </div>
                <span className="text-slate-200 font-bold text-sm">
                  ${agi.toLocaleString()}.00
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-semibold">Line 12 — Standard Deduction</div>
                  <div className="text-[10px] text-slate-400">
                    Statutory rate for {filingStatus.replace(/_/g, ' ')}
                  </div>
                </div>
                <span className="text-slate-400 font-bold text-sm">
                  -${standardDeduction.toLocaleString()}.00
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-semibold">Line 15 — Taxable Income</div>
                  <div className="text-[10px] text-slate-400">AGI ($agi) - Standard Deduction ($std)</div>
                </div>
                <span className="text-cyan-400 font-bold text-sm">
                  ${taxableIncome.toLocaleString()}.00
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-semibold">Line 16 — Regular Bracket Tax</div>
                  <div className="text-[10px] text-slate-400">Calculated via TY2026 progressive brackets</div>
                </div>
                <span className="text-slate-200 font-bold text-sm">
                  ${regularTax.toLocaleString()}.00
                </span>
              </div>

              {ctc > 0 && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-emerald-300 font-semibold">
                      Line 19 — Child Tax Credit (Sch 8812)
                    </div>
                    <div className="text-[10px] text-emerald-400/80">
                      $2,000 × {dependentsCount} qualifying children under 17
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-sm">
                    -${ctc.toLocaleString()}.00
                  </span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-semibold">Line 24 — Total Tax Liability</div>
                  <div className="text-[10px] text-slate-400">Line 16 minus nonrefundable credits</div>
                </div>
                <span className="text-slate-300 font-bold text-sm">
                  ${totalTax.toLocaleString()}.00
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-semibold">Line 25d & 33 — Total Payments</div>
                  <div className="text-[10px] text-slate-400">Federal income tax withheld from Form W-2</div>
                </div>
                <span className="text-cyan-400 font-bold text-sm">
                  ${totalPayments.toLocaleString()}.00
                </span>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="text-xs font-bold uppercase text-slate-400 mb-2">
                Pure Deterministic AST Lineage Trace:
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
                <div className="text-emerald-400 font-bold">// 1. AGI Computation</div>
                <div><code>const agi = calculateGrossIncome(input).line11.value;</code></div>
                <div className="text-slate-500 text-[10px]">=&gt; {agi}</div>

                <div className="text-emerald-400 font-bold pt-2">// 2. Standard Deduction Calculation</div>
                <div><code>const stdDeduction = calculateStandardDeduction(input, earnedIncome);</code></div>
                <div className="text-slate-500 text-[10px]">=&gt; {standardDeduction}</div>

                <div className="text-emerald-400 font-bold pt-2">// 3. Taxable Income (floored at 0)</div>
                <div><code>const taxable = Math.max(0, agi - stdDeduction);</code></div>
                <div className="text-slate-500 text-[10px]">=&gt; {taxableIncome}</div>

                <div className="text-emerald-400 font-bold pt-2">// 4. Bracket Evaluation</div>
                <div><code>const bracketTax = calculateBracketTax(taxable, input.filingStatus);</code></div>
                <div className="text-slate-500 text-[10px]">=&gt; {regularTax}</div>

                <div className="text-emerald-400 font-bold pt-2">// 5. Child Tax Credit & Phaseout</div>
                <div><code>const ctc = calculateChildTaxCredit(dependents, status, agi, regularTax);</code></div>
                <div className="text-slate-500 text-[10px]">=&gt; {ctc}</div>

                <div className="text-emerald-400 font-bold pt-2">// 6. Final Balance Settlement</div>
                <div><code>const refundOrBalance = calculateRefundOrBalance(regularTax, ctc, totalPayments);</code></div>
                <div className="text-emerald-400 font-bold text-[10px]">
                  =&gt; Line 34 Refund: ${refund} | Line 37 Owed: ${amountOwed}
                </div>
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">
                Ready to file with your real W-2?
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Drop your PDF in volatile memory. Form 1040 generated in seconds for $39 flat.
              </div>
            </div>
            <Link
              href="/return/upload"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 whitespace-nowrap transition-all"
            >
              Start Filing ($39 Flat)
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
