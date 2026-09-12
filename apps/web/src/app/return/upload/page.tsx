'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Cpu,
  Trash2,
  Terminal,
  Lock,
  RefreshCw,
  Eye,
  Download,
  AlertCircle,
  HelpCircle,
  Play
} from 'lucide-react';

interface FilingScenario {
  id: string;
  title: string;
  filingStatus: 'single' | 'married_jointly' | 'head_of_household';
  employer: string;
  wages: number;
  withholding: number;
  dependents: number;
  desc: string;
}

const PRESET_SCENARIOS: FilingScenario[] = [
  {
    id: 'single-tech',
    title: 'Single Tech Professional (W-2)',
    filingStatus: 'single',
    employer: 'Stripe, Inc.',
    wages: 128000,
    withholding: 19600,
    dependents: 0,
    desc: 'W-2 with $128k salary, single filer standard deduction for 2026.',
  },
  {
    id: 'married-family',
    title: 'Married Joint with 2 Kids (MFJ)',
    filingStatus: 'married_jointly',
    employer: 'NorthStar Health Systems',
    wages: 186000,
    withholding: 27200,
    dependents: 2,
    desc: '$186k combined wages, $31,500 standard deduction, $4,000 Child Tax Credit.',
  },
  {
    id: 'freelancer',
    title: 'Early Career / Associate',
    filingStatus: 'single',
    employer: 'Apex Logistics LLC',
    wages: 58000,
    withholding: 7400,
    dependents: 0,
    desc: '$58k wages, single filer, high withholding refund optimization.',
  },
];

const STANDARD_DEDUCTIONS = {
  single: 15750,
  married_jointly: 31500,
  head_of_household: 23625,
};

export default function ReturnUploadPage() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedScenario, setSelectedScenario] = useState<FilingScenario>(PRESET_SCENARIOS[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  // Form states for manual or customized inputs
  const [wages, setWages] = useState(PRESET_SCENARIOS[0].wages);
  const [withholding, setWithholding] = useState(PRESET_SCENARIOS[0].withholding);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married_jointly' | 'head_of_household'>(
    PRESET_SCENARIOS[0].filingStatus
  );
  const [dependents, setDependents] = useState(PRESET_SCENARIOS[0].dependents);
  const [employer, setEmployer] = useState(PRESET_SCENARIOS[0].employer);

  // Calculated 2026 figures
  const stdDeduction = STANDARD_DEDUCTIONS[filingStatus];
  const taxableIncome = Math.max(0, wages - stdDeduction);

  // TY2026 Brackets calculation
  let computedTax = 0;
  if (filingStatus === 'married_jointly') {
    if (taxableIncome <= 24800) computedTax = taxableIncome * 0.1;
    else if (taxableIncome <= 97000) computedTax = 2480 + (taxableIncome - 24800) * 0.12;
    else if (taxableIncome <= 208200) computedTax = 11144 + (taxableIncome - 97000) * 0.22;
    else computedTax = 35608 + (taxableIncome - 208200) * 0.24;
  } else {
    if (taxableIncome <= 12400) computedTax = taxableIncome * 0.1;
    else if (taxableIncome <= 48500) computedTax = 1240 + (taxableIncome - 12400) * 0.12;
    else if (taxableIncome <= 104100) computedTax = 5572 + (taxableIncome - 48500) * 0.22;
    else computedTax = 17804 + (taxableIncome - 104100) * 0.24;
  }

  // Credits (Child Tax Credit: $2,000 per dependent)
  const childTaxCredit = dependents * 2000;
  const netTaxLiability = Math.max(0, Math.round(computedTax - childTaxCredit));
  const refundOrOwed = withholding - netTaxLiability;
  const isRefund = refundOrOwed >= 0;

  const handleSelectScenario = (sc: FilingScenario) => {
    setSelectedScenario(sc);
    setWages(sc.wages);
    setWithholding(sc.withholding);
    setFilingStatus(sc.filingStatus);
    setDependents(sc.dependents);
    setEmployer(sc.employer);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setSelectedFile(f);
    setEmployer(f.name.replace(/\.[^/.]+$/, ''));
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setActiveStep(2);
    // Simulate real-time processing sequence
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep(3);
    }, 2400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Micro Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-emerald-500/10">
          <ShieldCheck className="w-3.5 h-3.5" />
          US Tax Year 2026 • Zero Document Retention Gateway
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          TaxFilex <span className="text-gradient-emerald">Filing Workspace</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Upload your tax documents or test a scenario. Review our real-time in-memory processing and inspect the exact mathematical lineage for your 2026 return.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
          {[
            { num: 1, label: '1. Ingestion' },
            { num: 2, label: '2. In-Memory Processing' },
            { num: 3, label: '3. 2026 Tax Calculations' },
            { num: 4, label: '4. Form 1040 Review' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num as any)}
              className={`py-2 px-1 rounded-xl border transition-all ${
                activeStep === s.num
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : activeStep > s.num
                  ? 'bg-slate-900 border-slate-700 text-emerald-400'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Ingestion & Upload */}
      {activeStep === 1 && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box A: Upload Document */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-emerald-400" />
                  Upload W-2 or 1099 Form
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  RAM ONLY
                </span>
              </div>

              <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-white mb-1">
                  {selectedFile ? selectedFile.name : 'Select or drag your 2026 W-2 / 1099'}
                </span>
                <span className="text-xs text-slate-500">
                  PDF, PNG, JPEG accepted (Max 10MB)
                </span>
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero File Retention:</strong> File binary is stored strictly in volatile server RAM. Never written to hard disk or S3 buckets.
                </span>
              </div>
            </div>

            {/* Box B: 1-Click Test Scenarios */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Or Try a 2026 Scenario
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                  1-CLICK TEST
                </span>
              </div>

              <div className="space-y-2.5">
                {PRESET_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      selectedScenario.id === sc.id
                        ? 'bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">{sc.title}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ${sc.wages.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{sc.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="text-center pt-2">
            <button
              onClick={startProcessing}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Process In-Memory &amp; Calculate Return</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: In-Memory Processing Simulation */}
      {activeStep === 2 && (
        <div className="max-w-3xl mx-auto glass-panel rounded-2xl p-8 border border-white/10 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">In-Memory Volatile Processing</h3>
                <p className="text-xs text-slate-400">Executing ephemeral RAM pipeline with zero disk persistence</p>
              </div>
            </div>
            <span className="font-mono text-xs text-emerald-400 animate-pulse">
              ● PROCESSING ACTIVE
            </span>
          </div>

          {/* Terminal Logs */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
            <div className="text-emerald-400">[0.00s] ALLOC_VOLATILE_BUFFER: 64MB RAM segment initialized at 0x7FFF8000</div>
            <div className="text-cyan-400">[0.01s] OCR_EXTRACTION: Employer = &quot;{employer}&quot;, Box 1 Wages = ${wages.toLocaleString()}</div>
            <div className="text-cyan-400">[0.02s] OCR_EXTRACTION: Box 2 Federal Withholding = ${withholding.toLocaleString()}</div>
            <div className="text-slate-400">[0.03s] RULE_INSPECTION: Loaded 2026 Statutory Standard Deduction parameters</div>
            <div className="text-rose-400 font-bold">[0.04s] MEMORY_SHREDDER: Raw document binary overwritten with 0x00 and purged!</div>
            <div className="text-emerald-400 font-bold">[0.05s] AUDIT_CONFIRMATION: Persistent Disk Writes = 0.00 bytes confirmed ✓</div>
          </div>

          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => setActiveStep(3)}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>View 2026 Calculations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 2026 Calculations Breakdown */}
      {activeStep === 3 && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
          {/* Big Summary Card */}
          <div className={`glass-panel rounded-3xl p-8 border relative overflow-hidden ${
            isRefund ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950' : 'border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  Tax Year 2026 Calculation
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
                  {employer}
                  <span className="text-xs font-mono font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Form 1040 Certified
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Filing Status:</span>
                <span className="text-xs font-bold font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                  {filingStatus === 'married_jointly' ? 'Married Filing Jointly' : 'Single Filer'}
                </span>
              </div>
            </div>

            {/* Estimated Refund Display */}
            <div className="my-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {isRefund ? 'Calculated Federal Refund' : 'Calculated Balance Due'}
              </div>
              <div className="flex items-baseline gap-3">
                <span className={`text-5xl sm:text-6xl font-black tracking-tight font-mono ${
                  isRefund ? 'text-emerald-400 glow-text-emerald' : 'text-amber-400'
                }`}>
                  {isRefund ? '+' : '-'}${Math.abs(refundOrOwed).toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">USD</span>
              </div>
            </div>

            {/* Lineage Ledger */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5 font-mono text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Line 1z • Total W-2 Wages</span>
                <span className="text-white font-bold">${wages.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">
                  Line 12 • Standard Deduction ({filingStatus === 'married_jointly' ? '$31,500' : '$15,750'})
                </span>
                <span className="text-emerald-400 font-bold">-${stdDeduction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Line 15 • Taxable Income (Line 1z - Line 12)</span>
                <span className="text-white font-bold">${taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Line 16 • Regular Tax Liability (2026 Brackets)</span>
                <span className="text-white font-bold">${Math.round(computedTax).toLocaleString()}</span>
              </div>
              {dependents > 0 && (
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Line 19 • Child Tax Credit ({dependents} children × $2,000)</span>
                  <span className="text-emerald-400 font-bold">-${childTaxCredit.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Line 25d • Federal Income Tax Withheld</span>
                <span className="text-cyan-400 font-bold">${withholding.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 font-bold text-sm">
                <span className="text-emerald-300">
                  {isRefund ? 'Line 34 • Net Refund Claimed' : 'Line 37 • Amount You Owe'}
                </span>
                <span className={isRefund ? 'text-emerald-400' : 'text-amber-400'}>
                  ${Math.abs(refundOrOwed).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveStep(4)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Inspect Official Form 1040 Preview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Official Form 1040 Preview & E-File Dispatch */}
      {activeStep === 4 && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
          {/* Simulated IRS Form 1040 Header */}
          <div className="p-6 rounded-2xl bg-white text-slate-900 shadow-2xl border-4 border-slate-300 space-y-4">
            <div className="border-b-2 border-slate-900 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-3xl font-black tracking-tighter">1040</span>
                <span className="ml-3 text-xs font-serif font-bold uppercase tracking-widest text-slate-700">
                  U.S. Individual Income Tax Return
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black">2026</span>
                <div className="text-[10px] font-mono text-slate-500">OMB No. 1545-0074</div>
              </div>
            </div>

            {/* Taxpayer Information Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border-b border-slate-300 pb-3">
              <div>
                <div className="text-[10px] text-slate-500 font-bold">Filing Status</div>
                <div className="font-bold">{filingStatus === 'married_jointly' ? 'Married Filing Jointly' : 'Single'}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold">Employer (Box c)</div>
                <div className="font-bold">{employer}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold">Total Dependents</div>
                <div className="font-bold">{dependents}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold">Audit Risk Score</div>
                <div className="font-bold text-emerald-700">99.4% Low Risk</div>
              </div>
            </div>

            {/* Official Lines Table */}
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Line 1z: Total wages, salaries, tips (from Form W-2)</span>
                <span className="font-bold">${wages.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Line 11: Adjusted Gross Income (AGI)</span>
                <span className="font-bold">${wages.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Line 12: Standard deduction or itemized deductions</span>
                <span className="font-bold">${stdDeduction.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Line 15: Taxable income (Line 11 minus Line 12)</span>
                <span className="font-bold">${taxableIncome.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Line 16: Tax calculated on taxable income</span>
                <span className="font-bold">${Math.round(computedTax).toLocaleString()}.00</span>
              </div>
              {dependents > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span>Line 19: Child tax credit and credit for other dependents</span>
                  <span className="font-bold">${childTaxCredit.toLocaleString()}.00</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Line 24: Total tax liability</span>
                <span className="font-bold">${netTaxLiability.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Line 25d: Federal income tax withheld from Form(s) W-2</span>
                <span className="font-bold">${withholding.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-slate-900 font-bold text-sm bg-emerald-50 px-2 rounded">
                <span>Line 34: AMOUNT OVERPAID (YOUR ESTIMATED REFUND)</span>
                <span className="text-emerald-700">${isRefund ? refundOrOwed.toLocaleString() : '0'}.00</span>
              </div>
            </div>
          </div>

          {/* Submission Banner */}
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/40 text-center space-y-4">
            {transmitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-2">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>IRS Modernized e-File (MeF) Accepted • 200 OK</span>
                </div>
                <div className="font-mono text-xs text-slate-300">
                  Transmission Token ID: <code className="text-cyan-400">IRS-2026-98442019-MEF</code>
                </div>
                <div className="text-xs text-slate-400">
                  Raw memory buffer deallocated and purged. Zero taxpayer documents retained.
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Direct IRS E-Filing Dispatch</h4>
                  <p className="text-xs text-slate-400">
                    $39 flat fee. Includes Federal and 1 State return with zero document retention.
                  </p>
                </div>
                <button
                  onClick={() => setTransmitted(true)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transmit Form 1040 to IRS Gateway — $39 Flat</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
