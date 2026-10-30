import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { profile, socialLinks } from '../../data/portfolioData';

const editions = [
  { id: 'classic', label: 'V1.0 CLASSIC RESUME', route: '/classic', tag: '2D RESUME' },
  { id: '3d-world', label: 'V2.0 3D EXPERIENCE', route: '/3d-world', tag: 'THREE.JS' },
  { id: 'dashboard', label: 'V3.0 CYBER DASHBOARD', route: '/dashboard', tag: 'DATA HUB' },
  { id: 'editorial', label: 'V4.0 SWISS LIGHT', route: '/editorial', tag: 'EDITORIAL' },
  { id: 'kinetic', label: 'V5.0 KINETIC ARCHIVE', route: '/v5', tag: 'ACTIVE', current: true },
];

const KineticFinaleTerminal: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="finale"
      className="relative w-full max-w-full min-h-screen bg-[#0A0A09] text-[#F2EFE9] flex flex-col justify-between p-4 sm:p-12 md:p-16 select-none z-10 border-t-2 border-[#FF3E00] overflow-hidden"
    >
      {/* ─── 1PX ARCHITECTURAL GRID OVERLAY ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-6 sm:grid-cols-12 divide-x divide-[rgba(242,239,233,0.06)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full relative" />
          ))}
        </div>
      </div>

      {/* ─── TOP TERMINAL HEADER ─── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(242,239,233,0.15)] pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block" />
          <span className="font-mono-tech text-xs font-bold tracking-widest text-[#F2EFE9] uppercase">
            {'//'} COMMAND TERMINAL 05 · FINAL TRANSMISSION
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono-tech text-xs text-[#78756E]">
          <span>STATUS: ACCEPTING COMMISSIONS // 2026-2027</span>
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="text-[#FF3E00] hover:text-[#F2EFE9] transition-colors flex items-center gap-1 font-bold"
          >
            <span>↑ BACK TO TOP</span>
          </button>
        </div>
      </div>

      {/* ─── CENTER STAGE: MONUMENTAL DISPLAY TYPOGRAPHY & COPY TRIGGER ─── */}
      <div className="relative z-10 my-auto py-12 sm:py-16 space-y-8">
        
        {/* Kinetic Copied Status Banner */}
        <div
          className={`transition-all duration-300 overflow-hidden font-mono-tech text-xs font-bold ${
            copied ? 'max-h-12 opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-3 bg-[#FF3E00] text-[#0A0A09] border border-[#FF3E00] flex items-center justify-between shadow-lg">
            <span>[EMAIL COPIED TO CLIPBOARD // DISPATCH READY]</span>
            <span>✓ READY TO PASTE</span>
          </div>
        </div>

        {/* Monumental Signoff Heading */}
        <h2
          className="font-syne font-extrabold uppercase text-[#F2EFE9] tracking-[-0.04em] leading-[0.85] text-left select-none"
          style={{ fontSize: 'clamp(1.75rem, 8vw, 8.5rem)' }}
        >
          LET&apos;S BUILD <br />
          <span className="text-[#FF3E00] hover:text-[#F2EFE9] transition-colors">
            SOMETHING ICONIC
          </span>
        </h2>

        {/* Interactive Copy Email Bar & Direct Transmission */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 pt-4">
          <button
            onClick={handleCopyEmail}
            data-cursor="COPY"
            className="flex-1 max-w-xl py-3 sm:py-4 px-3 sm:px-6 bg-[#141412] hover:bg-[#FF3E00] text-[#F2EFE9] hover:text-[#0A0A09] border border-[rgba(242,239,233,0.2)] hover:border-[#FF3E00] transition-all flex items-center justify-between gap-2 group shadow-lg min-w-0"
          >
            <span className="font-mono-tech text-xs sm:text-base font-bold tracking-wider truncate min-w-0">
              {profile.email}
            </span>
            <span className="font-mono-tech text-xs px-2.5 py-1 bg-[rgba(242,239,233,0.1)] group-hover:bg-[#0A0A09] group-hover:text-[#F2EFE9] uppercase tracking-widest font-bold">
              {copied ? 'COPIED ✓' : 'CLICK TO COPY 📋'}
            </span>
          </button>

          <a
            href={`mailto:${profile.email}`}
            data-cursor="EMAIL"
            className="py-4 px-8 bg-[#FF3E00] hover:bg-[#F2EFE9] text-[#0A0A09] font-mono-tech text-sm font-black uppercase tracking-widest text-center border border-[#FF3E00] hover:border-[#F2EFE9] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>SEND DISPATCH</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* ─── BOTTOM MATRIX: SOCIAL TELEMETRY & 5-EDITION SWITCHER ─── */}
      <div className="relative z-10 pt-8 border-t border-[rgba(242,239,233,0.15)] space-y-8">
        
        {/* Social Profiles Grid */}
        <div className="flex flex-wrap items-center justify-between gap-6 font-mono-tech text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[#78756E]">COMMUNICATION CHANNELS:</span>
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={s.name.toUpperCase()}
                className="text-[#F2EFE9] hover:text-[#FF3E00] transition-colors flex items-center gap-1 font-bold"
              >
                <span>{s.name}</span>
                <span>↗</span>
              </a>
            ))}
          </div>

          <div className="text-[#78756E]">
            © {new Date().getFullYear()} OMAR TANTAWY. CRAFTED WITH KINETIC ARCHIVAL RIGOR.
          </div>
        </div>

        {/* 5-Edition Switcher Row */}
        <div className="pt-6 border-t border-[rgba(242,239,233,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 font-mono-tech text-[10px] text-[#78756E] uppercase tracking-widest">
            <span>PORTFOLIO EDITIONS (COMPARE DIRECTLY):</span>
            <span>ACTIVE: V5.0 KINETIC ARCHIVE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono-tech text-xs">
            {editions.map((ed) => (
              <Link
                key={ed.id}
                to={ed.route}
                data-cursor={ed.current ? 'ACTIVE' : 'SWITCH'}
                className={`p-3 border flex flex-col justify-between transition-all ${
                  ed.current
                    ? 'bg-[#FF3E00] text-[#0A0A09] border-[#FF3E00] font-bold shadow-md'
                    : 'bg-[#141412] text-[#F2EFE9] border-[rgba(242,239,233,0.15)] hover:border-[#FF3E00] hover:text-[#FF3E00]'
                }`}
              >
                <span className="text-[10px] opacity-75">{ed.tag}</span>
                <span className="font-bold mt-1 text-[11px] truncate">{ed.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default KineticFinaleTerminal;

