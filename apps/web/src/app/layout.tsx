import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaxBgAnimation from '../components/TaxBgAnimation';
import VisitorTracker from '../components/VisitorTracker';

export const metadata: Metadata = {
  title: 'TaxFilex — Instant Tax Filing. Zero Document Retention. Pure Deterministic Math.',
  description: 'AI-assisted OCR with 100% auditable, deterministic tax calculation for US Tax Year 2026. Zero document retention: your tax forms are shredded from RAM in seconds.',
  keywords: 'tax filing, TY2026, zero retention tax, deterministic tax engine, form 1040, IRS e-file, privacy first tax',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col relative">
        <VisitorTracker />
        <TaxBgAnimation />
        <Header />
        <div className="flex-1 relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
