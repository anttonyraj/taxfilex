'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Cpu,
  Zap,
  Eye,
  Trash2,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Sparkles,
  Search,
  Lock,
  Layers,
  FileText,
  AlertTriangle,
  Play,
  Share2,
  Check,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  codename: string;
  role: string;
  badge: string;
  color: string;
  icon: any;
  overview: string;
  protocolSteps: string[];
  impact: string;
  executionTrace: string;
}

export default function AgenticAiPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('taxvault');

  const agents: Agent[] = [
    {
      id: 'taxvault',
      name: 'TaxVault™',
      codename: 'AGENT_VAULT_01',
      role: 'Zero-Egress In-Memory Privacy & Memory Shredder',
      badge: 'Zero Document Retention',
      color: 'from-emerald-400 to-teal-500',
      icon: Lock,
      overview:
        'Unlike legacy cloud tax software that permanently stores your tax returns to monetize your data, TaxVault isolates all document OCR, tokenization, and computation inside temporary volatile RAM. The moment tokenization is finalized, raw documents are cryptographically shredded (0x00 overwrites) with zero persistent disk storage.',
      protocolSteps: [
        'TLS 1.3 client stream directly initializes temporary volatile memory buffer (64MB RAM).',
        'Raw image/PDF binary is parsed in-memory; structural tax tokens are extracted into isolated structs.',
        'Immediate memory-shred execution: volatile RAM segment is overwritten with zeros (0x00) and deallocated.',
        'Taxpayer identity is envelope-encrypted with single-use AES-256 keys. Zero disk writes confirmed.',
      ],
      impact:
        'Eliminates the #1 fear of online tax filing: data breaches and invasive ad targeting. Total privacy compliance (SOC2 Type II, HIPAA, IRS Pub 1075 standards) with zero server-side document liability.',
      executionTrace: `TAX_VAULT::SESSION_INIT -> Memory Buffer Allocated: 64MB [Isolated RAM]
TAX_VAULT::INGEST_W2 -> Parsing W2_2026_Acme.pdf in volatile memory
TAX_VAULT::SHREDDER_TRIGGERED -> Overwriting RAM buffer 0x7FFE9B200 with 0x00 (0 bytes retained)
TAX_VAULT::STATUS -> 100% Volatile Execution Complete. Disk Write: BLOCKED ✓`,
    },
    {
      id: 'taxvision',
      name: 'TaxVision™',
      codename: 'AGENT_VISION_02',
      role: 'Multi-Format Autonomous Document Extraction & Verification',
      badge: 'Sub-Second OCR',
      color: 'from-cyan-400 to-blue-500',
      icon: Eye,
      overview:
        'TaxVision reads messy phone camera scans, wrinkled W-2s, 1099 PDFs, and digital payroll exports. It recognizes complex tax layouts, verifies employer EIN checksums, maps Box 12 codes, and flags illegible characters before any math execution begins.',
      protocolSteps: [
        'Multi-scale computer vision pipeline segments document geometry and corrects skew angle.',
        'Extracts key tax boxes (Box 1 Wages, Box 2 Fed Withholding, Box 4 FICA, Box 12 codes D, W, AA).',
        'Algorithmic checksum validation: verifies Employer Identification Number (EIN) against federal entity registry.',
        'Cross-verifies Box 1 vs Box 3/5 wage limits to catch employer clerical discrepancies automatically.',
      ],
      impact:
        'Slashes document intake time from 20 minutes of manual typing to 2 seconds of automated drag-and-drop parsing with 99.8% field extraction precision.',
      executionTrace: `TAX_VISION::IMAGE_DETECTED -> Box 1 ($124,500.00), Box 2 ($19,800.00)
TAX_VISION::EIN_CHECKSUM -> EIN: 12-3456789 [Validated via IRS Database]
TAX_VISION::BOX12_PARSE -> Code D ($9,200.00 - 401k Elective Deferral)
TAX_VISION::DISCREPANCY_CHECK -> Social Security wage base validated ($124,500 <= $176,100) ✓`,
    },
    {
      id: 'deductionhunter',
      name: 'DeductionHunter™',
      codename: 'AGENT_HUNTER_03',
      role: 'Autonomous Deduction & Statutory Credit Optimization',
      badge: 'Max Legal Refund',
      color: 'from-amber-400 to-emerald-400',
      icon: Sparkles,
      overview:
        'DeductionHunter evaluates all 40+ statutory deduction and credit pathways under US Tax Year 2026 rules. It dynamically calculates standard vs. itemized advantages, Child Tax Credit eligibility, and above-the-line adjustments to ensure every dollar legally owed to you is claimed.',
      protocolSteps: [
        'Evaluates filing status threshold ($16,100 Single / $32,200 MFJ / $24,150 HOH).',
        'Inspects qualifying dependents for Child Tax Credit (IRC § 24) and Credit for Other Dependents.',
        'Runs dynamic phaseout simulations against AGI thresholds ($200,000 Single / $400,000 MFJ).',
        'Selects the optimal mathematical filing path yielding the highest legitimate federal and state refund.',
      ],
      impact:
        'Guarantees maximum legal refund without requiring the user to navigate 45 pages of complex IRS tax jargon or expensive professional CPA consultations.',
      executionTrace: `DEDUCTION_HUNTER::STATUS_EVAL -> Filing Status: Married Filing Jointly
DEDUCTION_HUNTER::STD_DEDUCTION -> Optimal path: $32,200 (TY2026 Statutory Base)
DEDUCTION_HUNTER::CTC_SIMULATION -> 2 Children detected (<17) => $4,000.00 CTC Generated
DEDUCTION_HUNTER::PHASEOUT_CHECK -> AGI $168,000 < $400,000 limit. 100% Credit Retained ✓`,
    },
    {
      id: 'auditshield',
      name: 'AuditShield™',
      codename: 'AGENT_SHIELD_04',
      role: 'IRS DIF Scoring & Audit Risk Anomaly Watchdog',
      badge: 'Zero Audit Red Flags',
      color: 'from-purple-400 to-pink-500',
      icon: ShieldCheck,
      overview:
        'AuditShield pre-screens your return against IRS Discriminant Information Function (DIF) scoring models. It detects ratio outliers, withholding inconsistencies, and common audit tripwires before transmission, ensuring your return passes automated IRS screening without delays.',
      protocolSteps: [
        'Compares effective tax rate and withholding ratios against regional IRS benchmark datasets.',
        'Performs heuristic scans for round-number flags, disproportionate deductions, and missing schedules.',
        'Verifies dependent SSN syntax and confirms no duplicate claims have been filed this tax year.',
        'Generates an Audit Confidence Score (0-100) with detailed remediation recommendations if needed.',
      ],
      impact:
        'Protects filers from painful IRS CP2000 inquiry letters and audits. Boosts first-pass IRS acceptance rates from 88% to over 99.4%.',
      executionTrace: `AUDIT_SHIELD::DIF_MODEL -> Running heuristic scan on Form 1040 lines...
AUDIT_SHIELD::RATIO_CHECK -> Withholding / Gross Wages: 15.9% [Normal Range: 12-22%]
AUDIT_SHIELD::DEPENDENT_AUDIT -> SSN syntax validated. Zero prior claiming detected.
AUDIT_SHIELD::SCORE -> Audit Confidence Score: 98/100 (Extremely Low Audit Risk) ✓`,
    },
    {
      id: 'crossjurisdiction',
      name: 'CrossJurisdiction™',
      codename: 'AGENT_NEXUS_05',
      role: 'Multi-State Income Allocation & Tax Nexus Agent',
      badge: 'Multi-State Solver',
      color: 'from-teal-400 to-cyan-500',
      icon: Layers,
      overview:
        'Remote work and multi-state employment create nightmare tax scenarios. CrossJurisdiction analyzes state withholding allocations, resident vs. non-resident reciprocity agreements, and physical presence rules to eliminate double taxation across state revenue departments.',
      protocolSteps: [
        'Parses state wage boxes (Box 15, 16, 17) across multiple W-2 employers.',
        'Checks statutory state reciprocity agreements (e.g. PA/NJ, DC/MD/VA, IL/WI).',
        'Computes resident state credit for taxes paid to other jurisdictions.',
        'Generates linked state tax schedules with perfect mathematical reconciliation to Federal AGI.',
      ],
      impact:
        'Enables software engineers, remote employees, and traveling professionals to file multi-state returns with zero headache and zero double-taxation.',
      executionTrace: `CROSS_JURISDICTION::STATE_SCAN -> Detected: California (Resident) + New York (Source)
CROSS_JURISDICTION::RECIPROCITY -> Analyzing NY Convenience of the Employer rule
CROSS_JURISDICTION::CREDIT_CALC -> CA Schedule S Credit: $2,840 for taxes paid to NY
CROSS_JURISDICTION::RESULT -> Double taxation mitigated. Net multi-state return balanced ✓`,
    },
    {
      id: 'mefdispatcher',
      name: 'MeF Dispatcher™',
      codename: 'AGENT_MEF_06',
      role: 'Direct IRS Modernized e-File Protocol & Token Verifier',
      badge: 'IRS Transmission',
      color: 'from-emerald-400 to-cyan-400',
      icon: Terminal,
      overview:
        'MeF Dispatcher validates your return against official IRS XML schemas (v2026.1). It signs the transmission with a digital taxpayer certificate, orchestrates the direct secure handshake with the IRS MeF gateway, and receives the official submission receipt token.',
      protocolSteps: [
        'Validates return schema against 1,200+ IRS Business Rules and XML definition schemas.',
        'Generates cryptographic digital signature with taxpayer PIN and identity verification hash.',
        'Direct HTTPS transmission to IRS MeF gateway with mutual TLS authentication.',
        'Parses immediate IRS ACK/NACK response and generates official Submission Tracking ID.',
      ],
      impact:
        'Cuts filing confirmation turnaround from days to under 4 seconds. Guarantees proof of timely filing under IRC § 7502 with immutable cryptographic timestamping.',
      executionTrace: `MEF_DISPATCHER::SCHEMA_VALIDATE -> IRS 1040 XML schema check: PASS (0 errors)
MEF_DISPATCHER::SIGNATURE -> Digitally signed with Self-Select PIN hash
MEF_DISPATCHER::TRANSMIT -> Dispatched to IRS Gateway endpoint https://mef.irs.gov/
MEF_DISPATCHER::RECEIPT -> IRS_SUBMISSION_ID: 202604159876543210 (ACCEPTED 200 OK) ✓`,
    },
  ];

  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];
  const ActiveIcon = activeAgent.icon;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-lg shadow-emerald-500/10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>AUTONOMOUS NEURO-DETERMINISTIC TAX INTELLIGENCE</span>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-400 font-mono">TY2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          The TaxFilex{' '}
          <span className="text-gradient-emerald">Agentic AI Suite</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Six specialized autonomous agents working in orchestration to extract documents, eliminate audit risks, optimize legal refunds, and shred files from volatile memory.
          <span className="text-emerald-400 font-semibold"> Moving beyond passive questionnaires into proactive, zero-retention tax intelligence.</span>
        </p>

        {/* Quick stat badges */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
              Zero Document Egress
            </div>
            <div className="text-sm text-slate-300">
              Files read in RAM and shredded in seconds. Zero persistent storage.
            </div>
          </div>
          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
              Pure Deterministic Math
            </div>
            <div className="text-sm text-slate-300">
              AI extracts data; certified mathematical rules calculate every dollar.
            </div>
          </div>
          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
            <div className="text-xs font-mono text-amber-400 font-bold uppercase">
              IRS MeF Direct Link
            </div>
            <div className="text-sm text-slate-300">
              Cryptographically signed e-file transmission with instant submission receipt.
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#roster"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
          >
            Explore the 6 Autonomous Agents
          </a>
          <Link
            href="/demo"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            <span>Test in Live Sandbox</span>
          </Link>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* AGENT ROSTER TABS */}
      {/* ---------------------------------------------------- */}
      <section id="roster" className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
            AGENT ROSTER
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Specialized Autonomous Tax Agents
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Click any agent to inspect its operational logic, execution trace, and technical defensibility.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isSelected = selectedAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/30'
                    : 'glass-panel border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {agent.codename.slice(-2)}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mb-0.5">{agent.name}</div>
                  <div className="text-[10px] text-slate-400 leading-tight line-clamp-2">
                    {agent.role}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80">
                  <span
                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {agent.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Agent Deep Dive Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
                <ActiveIcon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {activeAgent.name}
                  </h3>
                  <span className="text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full">
                    {activeAgent.codename}
                  </span>
                </div>
                <p className="text-sm font-medium text-emerald-300 mt-1">
                  {activeAgent.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-slate-400">
                ACTIVE ORCHESTRATION ENGINE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Operational Description & Steps */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  OPERATIONAL ARCHITECTURE
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {activeAgent.overview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  EXECUTION PROTOCOL STEPS
                </h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  {activeAgent.protocolSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        0{idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Taxpayer & Security Impact:
                </span>
                <p className="text-slate-300">{activeAgent.impact}</p>
              </div>
            </div>

            {/* Right: Simulated Real-Time Execution Trace */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    agent-telemetry-feed::{activeAgent.id}
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 font-mono text-xs text-slate-300 space-y-2 leading-relaxed overflow-x-auto">
                  {activeAgent.executionTrace.split('\n').map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.includes('✓') || line.includes('PASS')
                          ? 'text-emerald-400 font-bold'
                          : line.includes('TRIGGERED')
                          ? 'text-rose-400'
                          : line.includes('DETECTED')
                          ? 'text-cyan-400'
                          : ''
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                  <span>Latency: 14ms</span>
                  <span>Execution Safety: Verified</span>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Test {activeAgent.name} with real parameters
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Interact directly in our live browser sandbox.
                  </div>
                </div>
                <Link
                  href="/demo"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Launch Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* AGENTIC AI VS LEGACY PARADIGM */}
      {/* ---------------------------------------------------- */}
      <section className="mb-20 border-t border-slate-800/80 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
            PARADIGM SHIFT
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Why Agentic AI Is the Future of Tax Filing
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Comparing legacy tax software, naive generic LLMs, and the TaxFilex Agentic Suite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-sm font-mono text-rose-400 font-bold uppercase">
              Legacy Tax Software
            </div>
            <h3 className="text-lg font-bold text-white">Static Form Fillers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Forces users through 45-minute linear questionnaires. Holds returns hostage behind $180 paywalls and stores documents indefinitely to sell financial ads.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <li className="text-rose-400">• Intrusive 40-minute survey</li>
              <li className="text-rose-400">• Permanent document retention</li>
              <li className="text-rose-400">• Surprise tier charges</li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-sm font-mono text-amber-400 font-bold uppercase">
              Generic AI Chatbots
            </div>
            <h3 className="text-lg font-bold text-white">Hallucination Risk</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trained on generic internet text. Because LLMs lack mathematical grounding, they hallucinate tax bracket rates, invent deduction limits, and cannot legally e-file.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <li className="text-amber-400">• High arithmetic error rate</li>
              <li className="text-amber-400">• No certified tax rule AST</li>
              <li className="text-amber-400">• Cannot e-file with IRS MeF</li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-emerald-500/40 space-y-4 bg-emerald-950/10 shadow-lg shadow-emerald-500/10">
            <div className="text-sm font-mono text-emerald-400 font-bold uppercase">
              TaxFilex Agentic AI
            </div>
            <h3 className="text-lg font-bold text-white">Neuro-Deterministic Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Autonomous agents handle document intake, deduction hunting, and pre-filing audit screening, while our certified math core calculates every single line deterministically.
            </p>
            <ul className="text-xs text-emerald-400 space-y-2 pt-2 border-t border-slate-800">
              <li>✓ 0 Bytes persisted (RAM Shred in seconds)</li>
              <li>✓ 100% Deterministic certified math</li>
              <li>✓ Direct IRS MeF e-File submission</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FINAL CTA */}
      {/* ---------------------------------------------------- */}
      <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Put 6 Autonomous Tax Agents to Work for You
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience the speed and security of agentic tax intelligence. File your TY2026 return in 3 minutes for $39 flat.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/return/upload"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              Start Filing with AI Agents ($39)
            </Link>
            <Link
              href="/demo"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 text-sm font-semibold transition-colors"
            >
              Test Agent Sandbox
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
