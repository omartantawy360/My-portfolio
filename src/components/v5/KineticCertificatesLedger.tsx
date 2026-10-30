import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates, Certificate } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface CertExtraMeta {
  code: string;
  year: string;
  skills: string;
}

const certExtras: Record<number, CertExtraMeta> = {
  1: { code: 'CISCO-CPP-042', year: '2024', skills: 'C++ Systems · Memory & Data Structures' },
  2: { code: 'CISCO-PY-2FA', year: '2024', skills: 'Python Core · Object-Oriented Scripting' },
  3: { code: 'HARVARD-CS50-9BF', year: '2024', skills: 'Computer Science · Algorithms · Memory Management' },
  4: { code: 'FCC-RWD-OMAR', year: '2023', skills: 'Semantic HTML5 · Modern CSS3 · Responsive Design' },
  5: { code: 'CISCO-JS-EBA', year: '2024', skills: 'JavaScript ES6+ · Asynchronous Execution · DOM APIs' },
  6: { code: 'YANFAA-MKT-33E', year: '2024', skills: 'Product Strategy · Funnel Architecture · Digital Conversion' },
};

const KineticCertificatesLedger: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<Certificate>(certificates[0]);
  const [modalCert, setModalCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row scroll triggers: as user scrolls through ledger rows, active cert updates and sweep activates
      const rows = containerRef.current?.querySelectorAll('.ledger-row');

      rows?.forEach((row, idx) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => setActiveCert(certificates[idx]),
          onEnterBack: () => setActiveCert(certificates[idx]),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Track mouse coordinates for subtle spring tilt on floating preview box
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    if (previewBoxRef.current) {
      gsap.to(previewBoxRef.current, {
        rotationY: relX * 18,
        rotationX: -relY * 18,
        rotationZ: relX * 4,
        ease: 'power2.out',
        duration: 0.5,
      });
    }
  };

  // Keyboard escape for modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalCert(null);
    };
    if (modalCert) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalCert]);

  return (
    <section
      ref={containerRef}
      id="certificates"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#0A0A09] text-[#F2EFE9] py-24 sm:py-32 overflow-hidden select-none z-20 border-t border-[rgba(242,239,233,0.12)]"
    >
      {/* ─── 1PX ARCHITECTURAL HAIRLINE GRID ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-6 sm:grid-cols-12 divide-x divide-[rgba(242,239,233,0.06)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full relative" />
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10 space-y-16">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(242,239,233,0.18)] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs font-bold tracking-widest text-[#FF3E00] uppercase">
              <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block" />
              <span>{'//'} SECTION 04 · ARCHIVAL INDEX LEDGER</span>
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl md:text-8xl font-black text-[#F2EFE9] tracking-tight uppercase leading-none">
              Verified Dossier
            </h2>
          </div>

          <div className="font-mono-tech text-xs space-y-1 text-right text-[#78756E]">
            <p className="font-bold text-[#F2EFE9]">ACADEMIC &amp; INDUSTRY CREDENTIALS</p>
            <p>06 RECORDS AUTHENTICATED VIA CRYPTOGRAPHIC LEDGERS</p>
            <p className="text-[#FF3E00] font-bold">CLICK ROW FOR HIGH-FIDELITY SCAN</p>
          </div>
        </div>

        {/* ─── MAIN LEDGER & FLOATING PREVIEW LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          
          {/* LEFT: FULL-WIDTH HORIZONTAL ROWS (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[rgba(242,239,233,0.12)] border-y border-[rgba(242,239,233,0.18)]">
            {certificates.map((cert) => {
              const isCurrent = cert.id === activeCert.id;
              const meta = certExtras[cert.id] || {
                code: `CRED-00${cert.id}`,
                year: '2024',
                skills: 'Verified Technical Competency',
              };

              return (
                <div
                  key={cert.id}
                  onClick={() => setModalCert(cert)}
                  onMouseEnter={() => setActiveCert(cert)}
                  data-cursor="INSPECT"
                  className={`ledger-row group relative cursor-pointer py-6 sm:py-8 px-4 transition-all duration-300 overflow-hidden ${
                    isCurrent ? 'translate-x-2' : ''
                  }`}
                >
                  {/* Vermilion Sweep Background Fill */}
                  <div
                    className={`absolute inset-0 bg-[#FF3E00] transition-transform duration-500 origin-left ease-out pointer-events-none ${
                      isCurrent
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />

                  {/* Row Content */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Index + Title */}
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                      <span
                        className={`font-mono-tech text-sm sm:text-base font-bold transition-colors duration-300 ${
                          isCurrent
                            ? 'text-[#0A0A09]'
                            : 'text-[#FF3E00] group-hover:text-[#0A0A09]'
                        }`}
                      >
                        [0{cert.id}]
                      </span>

                      <div className="min-w-0">
                        <h3
                          className={`font-syne text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight transition-all duration-300 truncate ${
                            isCurrent
                              ? 'text-[#0A0A09] translate-x-2'
                              : 'text-[#F2EFE9] group-hover:text-[#0A0A09] group-hover:translate-x-2'
                          }`}
                        >
                          {cert.title}
                        </h3>

                        <p
                          className={`font-mono-tech text-xs mt-1 transition-colors duration-300 truncate ${
                            isCurrent
                              ? 'text-[#0A0A09]/80'
                              : 'text-[#78756E] group-hover:text-[#0A0A09]/80'
                          }`}
                        >
                          {cert.issuer} · <span className="opacity-70">{meta.skills}</span>
                        </p>
                      </div>
                    </div>

                    {/* Meta Code & Arrow Action */}
                    <div className="flex items-center gap-4 shrink-0 font-mono-tech text-xs">
                      <span
                        className={`hidden sm:inline transition-colors duration-300 ${
                          isCurrent
                            ? 'text-[#0A0A09] font-bold'
                            : 'text-[#78756E] group-hover:text-[#0A0A09]'
                        }`}
                      >
                        {meta.code}
                      </span>

                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#0A0A09] text-[#F2EFE9] border-[#0A0A09] scale-110'
                            : 'border-[rgba(242,239,233,0.2)] text-[#F2EFE9] group-hover:bg-[#0A0A09] group-hover:text-[#F2EFE9] group-hover:border-[#0A0A09]'
                        }`}
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: FLOATING SPRING-PHYSICS PREVIEW VIEWPORT (5 COLS) */}
          <div className="lg:col-span-5 sticky top-24 hidden lg:block">
            <div
              ref={previewBoxRef}
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              className="bg-[#0A0A09] border-2 border-[rgba(242,239,233,0.18)] p-4 shadow-[16px_16px_0px_#FF3E00] transition-all duration-300"
            >
              {/* Preview Viewport Header */}
              <div className="flex items-center justify-between border-b border-[rgba(242,239,233,0.15)] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse" />
                  <span className="font-mono-tech text-[10px] tracking-widest text-[#F2EFE9] uppercase font-bold">
                    SPRING-PHYSICS VIEWPORT // 04
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] text-[#FF3E00] font-bold">
                  VERIFIED ACTIVE
                </span>
              </div>

              {/* Certificate Image Canvas */}
              <div
                onClick={() => setModalCert(activeCert)}
                className="relative bg-[#141412] border border-[rgba(242,239,233,0.12)] p-4 flex items-center justify-center min-h-[260px] max-h-[360px] overflow-hidden group cursor-pointer"
              >
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full h-auto max-h-[320px] object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/c++.png`;
                  }}
                />

                {/* Inspect Overlay */}
                <div className="absolute inset-0 bg-[#0A0A09]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#FF3E00] text-[#0A0A09] font-mono-tech text-xs font-bold px-4 py-2 uppercase tracking-widest flex items-center gap-2">
                    <span>🔍</span>
                    <span>EXPAND ARCHIVAL SCAN</span>
                  </span>
                </div>
              </div>

              {/* Details & Actions Below Image */}
              <div className="mt-4 pt-3 border-t border-[rgba(242,239,233,0.12)] space-y-3 font-mono-tech text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#78756E]">ISSUING AUTHORITY:</span>
                  <span className="text-[#F2EFE9] font-bold">{activeCert.issuer}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VERIFY"
                    className="flex-1 py-2 px-3 bg-[#FF3E00] text-[#0A0A09] font-bold uppercase tracking-wider text-center border border-[#FF3E00] hover:bg-[#F2EFE9] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>GATEWAY REGISTRY</span>
                    <span>↗</span>
                  </a>

                  <button
                    onClick={() => setModalCert(activeCert)}
                    className="py-2 px-3 bg-transparent text-[#F2EFE9] border border-[rgba(242,239,233,0.2)] hover:border-[#FF3E00] hover:text-[#FF3E00] transition-all font-bold uppercase"
                  >
                    ZOOM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULL RESOLUTION INSPECTION MODAL ─── */}
      {modalCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0A0A09]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setModalCert(null)}
        >
          <div
            className="bg-[#0A0A09] border-2 border-[rgba(242,239,233,0.25)] shadow-[20px_20px_0px_#FF3E00] max-w-4xl w-full p-6 sm:p-8 relative select-none animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[rgba(242,239,233,0.18)] pb-4 mb-6">
              <div>
                <span className="font-mono-tech text-xs text-[#FF3E00] uppercase font-bold tracking-widest block">
                  ARCHIVAL RECORD INSPECTOR // V5.0
                </span>
                <h3 className="font-syne text-2xl sm:text-3xl font-black text-[#F2EFE9] uppercase mt-1">
                  {modalCert.title}
                </h3>
              </div>
              <button
                onClick={() => setModalCert(null)}
                data-cursor="CLOSE"
                className="w-10 h-10 border border-[rgba(242,239,233,0.2)] bg-[#141412] text-[#F2EFE9] hover:bg-[#FF3E00] hover:text-[#0A0A09] transition-colors font-mono-tech text-sm font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Scan */}
            <div className="bg-[#141412] border border-[rgba(242,239,233,0.12)] p-4 mb-6 flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img
                src={modalCert.image}
                alt={modalCert.title}
                className="w-full h-auto max-h-[50vh] object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/c++.png`;
                }}
              />
            </div>

            {/* Modal Footer Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-xs">
              <span className="text-[#78756E]">
                ISSUING INSTITUTION: <strong className="text-[#F2EFE9]">{modalCert.issuer}</strong>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={modalCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none py-2.5 px-6 bg-[#FF3E00] text-[#0A0A09] font-bold uppercase tracking-widest hover:bg-[#F2EFE9] transition-all flex items-center justify-center gap-2"
                >
                  <span>OFFICIAL VERIFICATION GATEWAY</span>
                  <span>↗</span>
                </a>
                <button
                  onClick={() => setModalCert(null)}
                  className="py-2.5 px-4 border border-[rgba(242,239,233,0.2)] text-[#F2EFE9] hover:border-[#FF3E00] transition-colors"
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

export default KineticCertificatesLedger;
