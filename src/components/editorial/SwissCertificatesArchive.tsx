import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates, Certificate } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface CredentialMetadata {
  docId: string;
  category: string;
  registry: string;
  skillsValidated: string[];
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

const credentialMeta: Record<number, CredentialMetadata> = {
  1: {
    docId: 'CISCO-CPP-2024-042',
    category: 'SYSTEMS & ALGORITHMS',
    registry: 'Credly Digital Registry (Cisco)',
    skillsValidated: ['C++ Syntax', 'Memory Management', 'Data Structures', 'OOP Fundamentals'],
    accentColor: '#FF4B35',
    badgeBg: '#FF4B35',
    badgeText: '#FFFFFF',
  },
  2: {
    docId: 'CISCO-PY-2024-2FA',
    category: 'SCRIPTING & AUTOMATION',
    registry: 'Credly Digital Registry (Cisco)',
    skillsValidated: ['Python Core', 'Scripting', 'Object-Oriented Design', 'Automation'],
    accentColor: '#304FFE',
    badgeBg: '#304FFE',
    badgeText: '#FFFFFF',
  },
  3: {
    docId: 'HARVARD-CS50-9BF',
    category: 'COMPUTER SCIENCE FOUNDATIONS',
    registry: 'Harvard DCE Verification Gateway',
    skillsValidated: ['Algorithmic Thinking', 'Memory & Pointers', 'Web Development', 'SQL & C'],
    accentColor: '#FF4B35',
    badgeBg: '#20201E',
    badgeText: '#FFFFFF',
  },
  4: {
    docId: 'FCC-RWD-OMAR-WEB',
    category: 'FRONTEND ARCHITECTURE',
    registry: 'freeCodeCamp Central Ledger',
    skillsValidated: ['HTML5 Semantics', 'Modern CSS3', 'Flexbox & CSS Grid', 'Responsive UX'],
    accentColor: '#D7FF45',
    badgeBg: '#D7FF45',
    badgeText: '#20201E',
  },
  5: {
    docId: 'CISCO-JS-2024-EBA',
    category: 'WEB PROGRAMMING',
    registry: 'Credly Digital Registry (Cisco)',
    skillsValidated: ['ECMAScript Core', 'DOM API', 'Asynchronous JS', 'Event Loop'],
    accentColor: '#304FFE',
    badgeBg: '#304FFE',
    badgeText: '#FFFFFF',
  },
  6: {
    docId: 'YANFAA-MKT-33E',
    category: 'COMMERCIAL STRATEGY',
    registry: 'Yanfaa Educational Authority',
    skillsValidated: ['Product Positioning', 'Funnel Architecture', 'Audience Growth', 'Digital Conversion'],
    accentColor: '#FFB7D5',
    badgeBg: '#FFB7D5',
    badgeText: '#20201E',
  },
};

const SwissCertificatesArchive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dossierStageRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const [activeCertId, setActiveCertId] = useState<number>(1);
  const [modalCert, setModalCert] = useState<Certificate | null>(null);

  const activeCert = certificates.find((c) => c.id === activeCertId) || certificates[0];
  const activeMeta = credentialMeta[activeCert.id] || credentialMeta[1];

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ─── DESKTOP ENTRANCE (>= 1024px) ───
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      tl.fromTo(
        '.ledger-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' },
        0
      );

      tl.fromTo(
        dossierStageRef.current,
        { scale: 0.95, opacity: 0.7, y: 30 },
        { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
        0
      );

      if (stampRef.current) {
        gsap.fromTo(
          stampRef.current,
          { scale: 1.8, opacity: 0, rotation: -25 },
          {
            scale: 1,
            opacity: 1,
            rotation: -8,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 55%',
            },
          }
        );
      }
    });

    // ─── MOBILE ENTRANCE (< 1024px) ───
    mm.add('(max-width: 1023px)', () => {
      const items = containerRef.current?.querySelectorAll('.ledger-item');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0.4, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  // Modal keyboard handling (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalCert(null);
      }
    };
    if (modalCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalCert]);

  return (
    <section
      ref={containerRef}
      id="credentials"
      className="relative bg-[#F7F3E8] border-b-4 border-[#20201E] py-16 sm:py-20 px-4 sm:px-6 lg:px-12 scroll-mt-16 overflow-hidden"
    >
      {/* Background Archival Grid Marks */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, #20201E 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* ─── ARCHIVAL MASTHEAD ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-[#20201E] pb-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-black tracking-widest text-[#FF4B35] uppercase">
              <span className="w-2.5 h-2.5 bg-[#FF4B35] border border-[#20201E] inline-block" />
              <span>{'//'} SECTION 06 · AUTHENTICATED RECORDS</span>
            </div>
            <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-[#20201E] uppercase leading-none">
              Credential <br className="hidden sm:inline" />
              <span className="text-[#304FFE] underline decoration-4 underline-offset-8">
                Archive
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
            <div className="bg-white border-2 border-[#20201E] p-2.5 sm:p-3 shadow-[3px_3px_0px_#20201E]">
              <span className="block text-[#20201E]/50 font-bold uppercase text-[10px]">LEDGER AUDIT</span>
              <span className="text-xs sm:text-sm font-black text-[#20201E]">06 / 06 VERIFIED PASS</span>
            </div>
            <div className="bg-[#D7FF45] border-2 border-[#20201E] p-2.5 sm:p-3 shadow-[3px_3px_0px_#20201E]">
              <span className="block text-[#20201E]/60 font-bold uppercase text-[10px]">REGISTRY STATUS</span>
              <span className="text-xs sm:text-sm font-black text-[#20201E]">100% PUBLIC VERIFIABLE</span>
            </div>
          </div>
        </div>

        {/* ─── ARCHIVE DOSSIER WORKBENCH ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Interactive Credential Ledger Index (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b-2 border-[#20201E] pb-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#20201E] uppercase tracking-wider">
                DOCUMENT INDEX [REF: OT-SEC-06]
              </span>
              <span className="font-mono text-[10px] font-bold text-[#FF4B35] bg-white border border-[#20201E] px-2 py-0.5">
                TAP TO INSPECT
              </span>
            </div>

            {/* List of 6 Dossier Index Records */}
            <div className="flex flex-col gap-3">
              {certificates.map((cert) => {
                const isSelected = cert.id === activeCertId;
                const meta = credentialMeta[cert.id];

                return (
                  <div
                    key={cert.id}
                    className={`ledger-item border-2 border-[#20201E] transition-all relative overflow-hidden ${
                      isSelected
                        ? 'bg-white shadow-[5px_5px_0px_#20201E] translate-x-1 sm:translate-x-1.5'
                        : 'bg-[#FAF8F5] hover:bg-white hover:shadow-[3px_3px_0px_#20201E] opacity-85 hover:opacity-100'
                    }`}
                  >
                    {/* Left Accent Stripe */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 transition-all"
                      style={{
                        backgroundColor: isSelected ? meta.accentColor : '#20201E',
                      }}
                    />

                    {/* Clickable Header Row */}
                    <button
                      type="button"
                      onClick={() => setActiveCertId(cert.id)}
                      data-cursor="INSPECT"
                      className="w-full text-left p-3.5 sm:p-4 pl-4 sm:pl-5 flex items-start justify-between gap-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] font-black text-[#20201E]/50">
                            [DOC-00{cert.id}]
                          </span>
                          <span
                            className="text-[9px] font-mono font-bold px-1.5 py-0.2 border border-[#20201E]"
                            style={{
                              backgroundColor: meta.badgeBg,
                              color: meta.badgeText,
                            }}
                          >
                            {meta.category}
                          </span>
                        </div>
                        <h4 className="font-black text-sm sm:text-base text-[#20201E] truncate group-hover:text-[#304FFE] transition-colors">
                          {cert.title}
                        </h4>
                        <p className="font-mono text-xs text-[#20201E]/70 truncate mt-0.5">
                          {cert.issuer}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 border border-[#20201E] ${
                            isSelected
                              ? 'bg-[#D7FF45] text-[#20201E]'
                              : 'bg-white text-[#20201E]/60'
                          }`}
                        >
                          {isSelected ? 'ACTIVE SCAN' : 'STORED'}
                        </span>
                        <span className="text-xs transition-transform duration-200">
                          {isSelected ? '▼' : '→'}
                        </span>
                      </div>
                    </button>

                    {/* Mobile Inline Inspection View (visible on small screens < 1024px when selected) */}
                    {isSelected && (
                      <div className="lg:hidden p-4 pt-1 border-t-2 border-[#20201E]/20 bg-[#FAF8F5] space-y-3">
                        <div
                          onClick={() => setModalCert(cert)}
                          className="bg-white border-2 border-[#20201E] p-2 cursor-pointer relative group flex items-center justify-center min-h-[160px]"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full max-h-[200px] object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/c++.png`;
                            }}
                          />
                          <div className="absolute inset-0 bg-[#20201E]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white text-[#20201E] font-mono text-[10px] font-black px-3 py-1.5 border border-[#20201E]">
                              TAP TO EXPAND 🔍
                            </span>
                          </div>
                        </div>

                        {/* Competencies Badges */}
                        <div>
                          <span className="font-mono text-[9px] font-black text-[#20201E]/50 uppercase tracking-widest block mb-1.5">
                            COMPETENCIES ASSESSED:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {meta.skillsValidated.map((skill, idx) => (
                              <span
                                key={idx}
                                className="font-mono text-[10px] font-bold px-2 py-0.5 bg-white border border-[#20201E] text-[#20201E]"
                              >
                                ✓ {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Mobile Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 text-center bg-[#20201E] text-white font-mono text-xs font-black uppercase border border-[#20201E] shadow-[2px_2px_0px_#FF4B35] flex items-center justify-center gap-1.5"
                          >
                            <span>VERIFY GATEWAY</span>
                            <span>↗</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => setModalCert(cert)}
                            className="py-2.5 px-3 bg-white text-[#20201E] font-mono text-xs font-black uppercase border border-[#20201E] shadow-[2px_2px_0px_#20201E]"
                          >
                            <span>ZOOM 🔍</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Verification Hint */}
            <div className="mt-2 p-3 bg-white border-2 border-dashed border-[#20201E]/40 font-mono text-[11px] text-[#20201E]/70 leading-relaxed">
              <span className="font-bold text-[#20201E]">NOTE ON PROVENANCE:</span> Every listed certificate includes cryptographic badge verification issued directly by Cisco Networking Academy, Harvard University DCE, freeCodeCamp, or Yanfaa.
            </div>
          </div>

          {/* RIGHT COLUMN: Active Document Dossier Inspection Stage (Desktop/Tablet, 7 Cols) */}
          <div className="hidden lg:block lg:col-span-7">
            <div
              ref={dossierStageRef}
              className="bg-white border-4 border-[#20201E] shadow-[8px_8px_0px_#20201E] p-6 sm:p-8 relative transition-all duration-300"
            >
              {/* Document Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#20201E] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#20201E]/50 block">
                    ARCHIVAL RECORD ID:
                  </span>
                  <span className="font-mono text-sm font-black text-[#20201E]">
                    {activeMeta.docId}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-[#20201E]" />
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-400 px-2 py-0.5">
                    VERIFIED AUTHENTIC
                  </span>
                </div>
              </div>

              {/* Physical Authenticated Stamp */}
              <div
                ref={stampRef}
                className="absolute right-6 top-20 pointer-events-none hidden sm:flex flex-col items-center justify-center w-28 h-28 border-4 border-[#FF4B35] rounded-full rotate-[-8deg] opacity-85 z-20"
                style={{
                  color: '#FF4B35',
                  boxShadow: 'inset 0 0 0 2px #FF4B35',
                }}
              >
                <span className="font-mono text-[8px] font-black uppercase tracking-widest">
                  OFFICIAL
                </span>
                <span className="font-black text-xs uppercase tracking-wider text-center leading-tight">
                  VERIFIED
                  <br />
                  RECORD
                </span>
                <span className="font-mono text-[7px] font-bold">OT // ARCHIVE</span>
              </div>

              {/* Certificate Main Title & Issuer */}
              <div className="mb-6 relative z-10 pr-0 sm:pr-28">
                <span
                  className="inline-block font-mono text-xs font-black px-2.5 py-1 border-2 border-[#20201E] mb-2 uppercase"
                  style={{
                    backgroundColor: activeMeta.badgeBg,
                    color: activeMeta.badgeText,
                  }}
                >
                  {activeMeta.category}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-[#20201E] tracking-tight leading-tight">
                  {activeCert.title}
                </h3>
                <p className="font-mono text-sm text-[#20201E]/80 mt-1 flex items-center gap-2">
                  <span>ISSUING AUTHORITY:</span>
                  <strong className="text-[#304FFE] underline decoration-1">
                    {activeCert.issuer}
                  </strong>
                </p>
              </div>

              {/* Certificate Large Scan Display (Clickable for Full Fidelity) */}
              <div
                onClick={() => setModalCert(activeCert)}
                data-cursor="ZOOM"
                className="group relative cursor-pointer border-3 border-[#20201E] bg-[#FAF8F5] p-3 mb-6 transition-all hover:border-[#304FFE] shadow-[4px_4px_0px_#20201E]"
              >
                <div className="relative overflow-hidden bg-white border border-[#20201E]/30 min-h-[220px] max-h-[380px] flex items-center justify-center">
                  <img
                    src={activeCert.image}
                    alt={activeCert.title}
                    className="w-full h-auto max-h-[340px] object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/c++.png`;
                    }}
                  />

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-[#20201E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#20201E] border-2 border-[#20201E] font-mono text-xs font-black px-4 py-2 shadow-[3px_3px_0px_#20201E] flex items-center gap-2">
                      <span>🔍</span>
                      <span>CLICK TO INSPECT FULL FIDELITY</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#20201E]/20 font-mono text-[11px] text-[#20201E]/60">
                  <span>HIGH-RESOLUTION ARCHIVAL SCAN</span>
                  <span className="font-bold text-[#304FFE] group-hover:underline">
                    EXPAND DOCUMENT ↗
                  </span>
                </div>
              </div>

              {/* Competencies Validated */}
              <div className="mb-6 bg-[#FAF8F5] border-2 border-[#20201E] p-4">
                <span className="font-mono text-[10px] font-black text-[#20201E]/50 uppercase tracking-widest block mb-2">
                  COMPETENCIES ASSESSED & VALIDATED:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeMeta.skillsValidated.map((skill, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs font-bold px-2.5 py-1 bg-white border border-[#20201E] text-[#20201E] shadow-[1.5px_1.5px_0px_#20201E]"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Live Registry Verification & Modal Trigger */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t-2 border-[#20201E]">
                <a
                  href={activeCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VERIFY"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#20201E] text-white font-mono text-xs font-black uppercase px-5 py-3 border-2 border-[#20201E] shadow-[3px_3px_0px_#FF4B35] hover:bg-[#304FFE] hover:border-[#304FFE] transition-all"
                >
                  <span>OFFICIAL VERIFICATION GATEWAY</span>
                  <span className="text-sm">↗</span>
                </a>

                <button
                  type="button"
                  onClick={() => setModalCert(activeCert)}
                  data-cursor="ZOOM"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#20201E] font-mono text-xs font-black uppercase px-5 py-3 border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E] hover:bg-[#D7FF45] transition-all"
                >
                  <span>INSPECT SCAN</span>
                  <span>🔍</span>
                </button>
              </div>

              {/* Provenance footer line */}
              <div className="mt-4 font-mono text-[10px] text-[#20201E]/50 flex items-center justify-between">
                <span>AUTHORITY: {activeCert.issuer}</span>
                <span>LEDGER: {activeMeta.registry}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULL FIDELITY INSPECTION MODAL ─── */}
      {modalCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#20201E]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setModalCert(null)}
        >
          <div
            className="bg-[#F7F3E8] border-4 border-[#20201E] shadow-[12px_12px_0px_#20201E] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-3 border-[#20201E] pb-4 mb-6">
              <div>
                <span className="font-mono text-xs font-black text-[#FF4B35] uppercase">
                  DOCUMENT INSPECTOR // ARCHIVAL SCAN
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#20201E] uppercase">
                  {modalCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalCert(null)}
                data-cursor="CLOSE"
                className="w-10 h-10 bg-white border-2 border-[#20201E] font-mono font-black text-lg shadow-[2px_2px_0px_#20201E] hover:bg-[#FF4B35] hover:text-white transition-colors"
                aria-label="Close Inspection Modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Large Scan */}
            <div className="bg-white border-2 border-[#20201E] p-4 mb-6 flex items-center justify-center shadow-inner">
              <img
                src={modalCert.image}
                alt={modalCert.title}
                className="w-full max-h-[500px] object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/c++.png`;
                }}
              />
            </div>

            {/* Modal Details & Direct Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-[#20201E]/60">ISSUING INSTITUTION:</span>
                <span className="font-bold text-[#20201E] ml-2">{modalCert.issuer}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={modalCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#304FFE] text-white px-5 py-2.5 font-black uppercase border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E] hover:bg-[#20201E] transition-all flex items-center gap-2"
                >
                  <span>AUTHENTICATE ON LIVE REGISTRY</span>
                  <span>↗</span>
                </a>

                <button
                  type="button"
                  onClick={() => setModalCert(null)}
                  className="bg-white text-[#20201E] px-4 py-2.5 font-bold uppercase border-2 border-[#20201E] hover:bg-gray-100 transition-all"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SwissCertificatesArchive;
