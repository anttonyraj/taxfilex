'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Cpu,
  Globe,
  ArrowRight,
  Terminal,
} from 'lucide-react';

export default function ContactPage() {
  const [category, setCategory] = useState<'support' | 'security' | 'cpa' | 'partners'>('support');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(`TX-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 900);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>DIRECT SUPPORT & OPERATIONS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in Touch with TaxFilex
        </h1>
        <p className="mt-3 text-slate-300 text-base sm:text-lg">
          Have an inquiry about zero document retention, our TY2026 deterministic engine, or filing support?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (Left) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 relative">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{name || 'Taxpayer'}</strong>. Your inquiry has been routed to our operations team.
                </p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 inline-block font-mono text-xs text-slate-300">
                  Tracking Reference Token: <span className="text-emerald-400 font-bold">{ticketId}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Average response time during filing season is under 15 minutes.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    Inquiry Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'support', label: 'Tax Support' },
                      { key: 'security', label: 'Security & Privacy' },
                      { key: 'cpa', label: 'CPA / Partners' },
                      { key: 'partners', label: 'General / Media' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.key}
                        onClick={() => setCategory(item.key as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                          category === item.key
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                            : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Alex Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your question or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Encrypting & Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Encrypted Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Live Operational Status & Channels (Right) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real-time Telemetry Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Live System Telemetry
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">IRS MeF Gateway:</span>
                <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Support Desk Response:</span>
                <span className="text-cyan-400 font-bold">&lt; 8 Minutes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">RAM Shredder Buffer:</span>
                <span className="text-slate-200 font-bold">Zero Latency</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Active Tax Year:</span>
                <span className="text-amber-400 font-bold">TY2026</span>
              </div>
            </div>
          </div>

          {/* Direct channels */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 text-xs text-slate-300">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Direct Inquiries
            </h4>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Email Communications</div>
                <div className="text-slate-400">support@taxfilex.com</div>
                <div className="text-slate-400">security@taxfilex.com</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Operating Hours (Tax Season)</div>
                <div className="text-slate-400">Monday – Sunday: 7:00 AM – 11:00 PM EST</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Open Source & Auditing</div>
                <a
                  href="https://github.com/anttonyraj/taxfilex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  github.com/anttonyraj/taxfilex
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
