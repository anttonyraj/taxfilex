'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronDown,
  ShieldCheck,
  HelpCircle,
  Cpu,
  FileText,
  DollarSign,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'security' | 'engine' | 'forms' | 'efile' | 'pricing';
  question: string;
  answer: React.ReactNode;
}

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    sec_1: true,
  });

  const faqs: FaqItem[] = [
    {
      id: 'sec_1',
      category: 'security',
      question: 'How does the "Zero Document Retention" architecture actually work?',
      answer: (
        <div className="space-y-2">
          <p>
            When you upload a tax document (such as a W-2 PDF or JPEG), it is streamed directly into an isolated, temporary volatile memory (RAM) container. Our OCR parser reads the required numeric fields (Box 1, Box 2, employer EIN, etc.) and generates an envelope-encrypted data token.
          </p>
          <p>
            The moment tokenization finishes, the raw document binary in RAM is overwritten with zeros (0x00) and destroyed. <strong>No files are ever written to hard drives or S3/GCS buckets.</strong>
          </p>
        </div>
      ),
    },
    {
      id: 'sec_2',
      category: 'security',
      question: 'Is my Social Security Number (SSN) stored or visible to staff?',
      answer: (
        <p>
          No. Taxpayer identification numbers are envelope-encrypted with a unique 256-bit AES cryptographic key generated specifically for your filing session. Only the IRS transmission gateway decrypts the payload during direct e-file transmission. Our staff has zero visibility into unencrypted SSNs.
        </p>
      ),
    },
    {
      id: 'sec_3',
      category: 'security',
      question: 'Do you share or sell my financial data to advertisers or credit card companies?',
      answer: (
        <p>
          <strong>Never.</strong> Legacy tax software companies generate millions selling loan leads, credit card offers, and tax refund data. TaxFilex operates on a simple software fee model ($39 flat). We do not have advertising partners, third-party analytics trackers, or data brokers.
        </p>
      ),
    },
    {
      id: 'engine_1',
      category: 'engine',
      question: 'What is the difference between AI extraction and deterministic math?',
      answer: (
        <div className="space-y-2">
          <p>
            Many "AI tax apps" attempt to feed user prompts into an LLM and ask it to calculate taxes. Because LLMs are probabilistic text generators, they frequently hallucinate deduction limits and make arithmetic errors.
          </p>
          <p>
            TaxFilex utilizes AI strictly for document OCR (reading Box 1, Box 2 from scanned papers). The tax computation is executed by our pure, open, and audited <strong>deterministic rule engine</strong> that calculates every dollar via codified IRS statutory formulas.
          </p>
        </div>
      ),
    },
    {
      id: 'engine_2',
      category: 'engine',
      question: 'What tax year is TaxFilex configured for?',
      answer: (
        <p>
          TaxFilex is built for <strong>Tax Year 2026</strong> (filing in early 2027), incorporating the inflation-adjusted standard deductions ($16,100 Single / $32,200 MFJ / $24,150 Head of Household), updated bracket thresholds, and current Child Tax Credit statutory rules.
        </p>
      ),
    },
    {
      id: 'forms_1',
      category: 'forms',
      question: 'Which tax forms and income sources are supported?',
      answer: (
        <div className="space-y-2">
          <p>TaxFilex supports individual returns with:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Form 1040 (U.S. Individual Income Tax Return)</li>
            <li>Form W-2 (Wage and Tax Statement)</li>
            <li>Form 1099-INT (Interest Income) & Form 1099-DIV (Dividends)</li>
            <li>Form 1099-NEC (Nonemployee Compensation)</li>
            <li>Schedule 1 (Additional Income & Adjustments to Income)</li>
            <li>Schedule 8812 (Credits for Qualifying Children and Other Dependents)</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'forms_2',
      category: 'forms',
      question: 'What if I have an out-of-scope tax situation?',
      answer: (
        <p>
          Our engine features real-time scope detection. If you upload a complex form outside our scope (such as foreign earned income Form 2555, farm income Schedule F, or corporate K-1s), the engine will immediately notify you before you pay anything, ensuring you never pay for a return we cannot completely e-file.
        </p>
      ),
    },
    {
      id: 'efile_1',
      category: 'efile',
      question: 'How is my return transmitted to the IRS?',
      answer: (
        <p>
          We submit directly through the IRS Modernized e-File (MeF) schema gateway. You receive an official IRS Submission ID and cryptographic acceptance receipt. If the IRS rejects a return due to an SSN mismatch or typo, you can correct and resubmit at zero additional charge.
        </p>
      ),
    },
    {
      id: 'efile_2',
      category: 'efile',
      question: 'How quickly do I get my refund?',
      answer: (
        <p>
          The IRS typically issues direct ACH bank deposits within 14 to 21 business days of accepting an electronically filed return. You can track your refund progress directly on the official IRS "Where's My Refund?" tool using your accepted SSN and refund amount.
        </p>
      ),
    },
    {
      id: 'price_1',
      category: 'pricing',
      question: 'Are there really zero hidden fees or upsells?',
      answer: (
        <p>
          Yes. The $39 fee covers your complete Federal Form 1040 plus one resident State return. There are no surprise fees for claiming credits, having multiple W-2s, or contributing to retirement accounts.
        </p>
      ),
    },
    {
      id: 'price_2',
      category: 'pricing',
      question: 'When do I have to pay?',
      answer: (
        <p>
          You only pay at the very end when you review your calculated Form 1040 line-by-line and choose to e-file. Uploading documents and testing the interactive sandbox are completely free.
        </p>
      ),
    },
  ];

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'security', label: 'Security & Zero-Retention' },
    { key: 'engine', label: 'Deterministic Engine' },
    { key: 'forms', label: 'Supported Forms' },
    { key: 'efile', label: 'IRS e-File & Refunds' },
    { key: 'pricing', label: 'Pricing & Guarantee' },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesQuery =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof faq.answer === 'string' &&
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>HELP & KNOWLEDGE BASE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-slate-300 text-base">
          Everything you need to know about our zero-retention security model, TY2026 deterministic math engine, and pricing.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8 max-w-2xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions (e.g. zero retention, W-2, refund, state return)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-lg"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat.key
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4 mb-16">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-850/60 transition-colors"
                >
                  <span className="text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0 transform transition-transform ${
                      isOpen ? 'rotate-180 bg-emerald-500/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/60 text-sm text-slate-300 leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              No questions found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-emerald-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Still Have Questions CTA */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">Still have a question?</h3>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Our team is available 7 days a week during tax season. Inquire about security reviews, filing guidelines, or support.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <span>Contact Support & Operations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
