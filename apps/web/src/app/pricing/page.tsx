'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  DollarSign,
  HelpCircle,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';

export default function PricingPage() {
  const [lastYearPaid, setLastYearPaid] = useState<number>(149);

  const savings = Math.max(0, lastYearPaid - 39);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <DollarSign className="w-3.5 h-3.5" />
          <span>NO PER-FORM TAX • NO UPSELLS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          One Flat Rate. $39 All-In.
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
          Federal Form 1040 and one Resident State return included. No hidden charges for HSA, student loan interest, or claiming your child tax credit.
        </p>
      </div>

      {/* Pricing Card & Savings Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
        {/* Main $39 Flat Card */}
        <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/40 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 px-5 py-1.5 rounded-bl-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs">
            TAX YEAR 2026 COMPLETE
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
              INDIVIDUAL & FAMILY FILING
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-6xl font-black text-white">$39</span>
              <span className="text-slate-400 text-sm font-medium">flat / return</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Everything required to e-file your official 2026 US Individual tax return with the IRS and your state department of revenue.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-300 mb-8">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>IRS Form 1040 (All filing statuses)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 State Return Included ($0 extra)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Schedule 1 (Additional income/adjustments)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Schedule 8812 (Child Tax Credit)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Document Retention (RAM purge)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct IRS MeF e-File submission</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Audit Lineage & Source Tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Deposit ACH Refund setup</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link
              href="/return/upload"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-base text-center block shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Start Filing Now — $39 Flat
            </Link>
            <div className="mt-3 text-center text-xs text-slate-400">
              Pay only when you review and approve your return for transmission.
            </div>
          </div>
        </div>

        {/* Savings Calculator (Right Col) */}
        <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Savings Calculator</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              See How Much You Save vs Big Box Competitors
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>What you paid last year elsewhere:</span>
                <span className="text-base font-mono font-bold text-white">
                  ${lastYearPaid}
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="300"
                step="5"
                value={lastYearPaid}
                onChange={(e) => setLastYearPaid(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$40</span>
                <span>$150 (Avg TurboTax)</span>
                <span>$300 (Avg H&R Block)</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="text-xs text-slate-400 font-mono">YOUR ESTIMATED SAVINGS</div>
              <div className="text-4xl font-extrabold text-emerald-400 glow-text-emerald">
                ${savings}
              </div>
              <div className="text-xs text-slate-400">
                Put back into your pocket, with zero spam or sold records.
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>TaxFilex Price:</span>
                <span className="text-emerald-400 font-bold">$39.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hidden state filing charge:</span>
                <span className="text-slate-200 font-bold">$0.00 (Included)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Document retention & ad selling:</span>
                <span className="text-rose-400 font-bold">NEVER (0s)</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <Link
              href="/demo"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold text-center block transition-colors"
            >
              Test with Your Numbers in Demo Sandbox →
            </Link>
          </div>
        </div>
      </div>

      {/* Comprehensive Feature Comparison Matrix */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Detailed Feature Breakdown
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Transparent comparison against legacy industry competitors.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-mono uppercase text-slate-400 bg-slate-950/60">
                <th className="py-4 px-5">Capability</th>
                <th className="py-4 px-5 text-emerald-400 bg-emerald-500/10 font-bold">TaxFilex</th>
                <th className="py-4 px-5">TurboTax Deluxe / Premier</th>
                <th className="py-4 px-5">H&R Block Deluxe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Base Federal Return</td>
                <td className="py-3.5 px-5 text-emerald-400 bg-emerald-500/5 font-semibold">$39 Flat</td>
                <td className="py-3.5 px-5">$69 – $129</td>
                <td className="py-3.5 px-5">$55 – $115</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">State Return Fee</td>
                <td className="py-3.5 px-5 text-emerald-400 bg-emerald-500/5 font-semibold">Included ($0)</td>
                <td className="py-3.5 px-5 text-rose-400">+$64 per state</td>
                <td className="py-3.5 px-5 text-rose-400">+$49 per state</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Zero Document Retention</td>
                <td className="py-3.5 px-5 text-emerald-400 bg-emerald-500/5 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400 inline mr-1" />
                  Guaranteed (RAM Purge)
                </td>
                <td className="py-3.5 px-5 text-rose-400">
                  <X className="w-4 h-4 text-rose-400 inline mr-1" />
                  Retained for cross-selling
                </td>
                <td className="py-3.5 px-5 text-rose-400">
                  <X className="w-4 h-4 text-rose-400 inline mr-1" />
                  Retained for cross-selling
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Child Tax Credit & Dependents</td>
                <td className="py-3.5 px-5 text-emerald-400 bg-emerald-500/5 font-semibold">Included ($0)</td>
                <td className="py-3.5 px-5">Included in Deluxe</td>
                <td className="py-3.5 px-5">Included in Deluxe</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Audit Formula Inspection</td>
                <td className="py-3.5 px-5 text-emerald-400 bg-emerald-500/5 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400 inline mr-1" />
                  Line-by-line IRC references
                </td>
                <td className="py-3.5 px-5 text-slate-500">Opaque summary</td>
                <td className="py-3.5 px-5 text-slate-500">Opaque summary</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Invasive Advertising / Credit Card Offers</td>
                <td className="py-3.5 px-5 text-emerald-400 bg-emerald-500/5 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400 inline mr-1" />
                  Zero Ads
                </td>
                <td className="py-3.5 px-5 text-rose-400">Heavy targeted ads</td>
                <td className="py-3.5 px-5 text-rose-400">Heavy targeted ads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Guarantees Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-2">100% Deterministic Accuracy</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our audited mathematical rule engine calculates your return strictly against official IRS statutory guidelines. Zero AI guesswork.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
            <DollarSign className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-2">Maximum Legal Refund</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            TaxFilex exhaustively computes all standard and above-the-line deductions you are legally entitled to under TY2026 law.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-2">Zero Data Retention</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Raw tax forms and images are shredded from volatile memory in seconds. We do not store, retain, or monetize your documents.
          </p>
        </div>
      </div>
    </main>
  );
}
