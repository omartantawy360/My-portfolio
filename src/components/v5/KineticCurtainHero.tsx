import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, projects, certificates, skills } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface KineticCurtainHeroProps {
  onProgress?: (progress: number) => void;
}

const KineticCurtainHero: React.FC<KineticCurtainHeroProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topGateRef = useRef<HTMLDivElement>(null);
  const bottomGateRef = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned Split Gate Curtain Sequence (responsive across mobile & desktop)
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-split-gate',
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Telemetry strip compresses and fades
      tl.to(
        telemetryRef.current,
        {
          scaleX: 0.85,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        },
        0
      );

      // 2. The Split Gate: Top slides left, bottom slides right
      tl.to(
        topGateRef.current,
        {
          xPercent: -105,
          opacity: 0.1,
          ease: 'power3.inOut',
          duration: 1,
        },
        0.08
      );

      tl.to(
        bottomGateRef.current,
        {
          xPercent: 105,
          opacity: 0.1,
          ease: 'power3.inOut',
          duration: 1,
        },
        0.08
      );

      // 3. Central aperture expanding reveal
      tl.to(
        apertureRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          opacity: 1,
          ease: 'power2.inOut',
          duration: 1,
        },
        0.12
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen bg-[#0A0A09] text-[#F2EFE9] overflow-hidden select-none z-30"
    >
      {/* ─── 1PX ARCHITECTURAL HAIRLINE GRID OVERLAY ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-6 sm:grid-cols-12 divide-x divide-[rgba(242,239,233,0.06)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full relative">
              {i % 3 === 0 && (
                <span className="hidden sm:inline absolute top-8 left-2 font-mono-tech text-[9px] text-[rgba(242,239,233,0.15)] uppercase">
                  AXIS // 0{i + 1}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Horizontal Dividing Lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-[rgba(242,239,233,0.06)]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[rgba(242,239,233,0.12)]" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-[rgba(242,239,233,0.06)]" />
      </div>

      {/* ─── APERTURE REVEAL PORTAL (REVEALED AS GATE EXPANDS) ─── */}
      <div
        ref={apertureRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 scale-95 transition-all px-4"
        style={{ clipPath: 'inset(50% 0% 50% 0%)' }}
      >
        <div className="text-center space-y-2 sm:space-y-3">
          <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.25em] text-[#FF3E00] uppercase font-bold">
            [TRANSMISSION ACTIVATED]
          </span>
          <h3 className="font-syne text-3xl sm:text-6xl md:text-8xl font-black text-[#F2EFE9] tracking-tighter uppercase leading-none">
            PROCEED TO WORKS
          </h3>
          <p className="font-mono-tech text-[10px] sm:text-xs text-[#78756E] uppercase tracking-widest">
            SPLIT GATE APERTURE UNLOCKED // 02
          </p>
        </div>
      </div>

      {/* ─── SPLIT GATE: TOP HALF (ROW 1 - IDENTITY) ─── */}
      <div
        ref={topGateRef}
        className="absolute top-0 left-0 right-0 h-1/2 flex flex-col justify-end px-4 sm:px-12 md:px-20 pb-3 sm:pb-6 z-20 will-change-transform"
      >
        {/* Top Header Label */}
        <div className="flex items-center justify-between border-b border-[rgba(242,239,233,0.15)] pb-2 mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#FF3E00] inline-block" />
            <span className="font-mono-tech text-[10px] sm:text-xs font-bold tracking-widest text-[#F2EFE9] uppercase">
              PORTFOLIO EDITION // V5.0
            </span>
          </div>
          <span className="font-mono-tech text-[9px] sm:text-xs text-[#78756E] uppercase hidden sm:inline">
            SYSTEM STATUS: 100% OPERATIONAL
          </span>
        </div>

        {/* Monumental Display Name (Responsive Clamped Type) */}
        <h1
          className="font-syne font-extrabold uppercase text-[#F2EFE9] tracking-[-0.04em] leading-[0.88] text-left select-none break-words"
          style={{ fontSize: 'clamp(2.4rem, 9.5vw, 10rem)' }}
        >
          {profile.name}
        </h1>
      </div>

      {/* ─── CENTRAL TELEMETRY STRIP (BETWEEN ROWS) ─── */}
      <div
        ref={telemetryRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 px-4 sm:px-12 md:px-20 pointer-events-none will-change-transform"
      >
        <div className="border-y border-[rgba(242,239,233,0.18)] bg-[#0A0A09]/95 py-2 sm:py-2.5 flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono-tech text-[#78756E]">
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[#FF3E00] font-bold">[{projects.length} PROJECTS]</span>
            <span className="text-[rgba(242,239,233,0.2)]">/</span>
            <span className="text-[#F2EFE9] font-bold">[{certificates.length} CERTS]</span>
            <span className="text-[rgba(242,239,233,0.2)]">/</span>
            <span className="text-[#F2EFE9] font-bold">[{skills.length} TECHS]</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline text-[#F2EFE9]/70">
              LOC: CAIRO [30.0444° N, 31.2357° E]
            </span>
            <span className="text-[#FF3E00] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-pulse" />
              <span>ACTIVE</span>
            </span>
          </div>
        </div>
      </div>

      {/* ─── SPLIT GATE: BOTTOM HALF (ROW 2 - ROLE & CORE CRAFT) ─── */}
      <div
        ref={bottomGateRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 flex flex-col justify-start px-4 sm:px-12 md:px-20 pt-3 sm:pt-6 z-20 will-change-transform"
      >
        {/* Monumental Role & Craft (Responsive Clamped Type) */}
        <h2
          className="font-syne font-extrabold uppercase text-[#78756E] tracking-[-0.04em] leading-[0.88] text-left select-none hover:text-[#F2EFE9] transition-colors break-words"
          style={{ fontSize: 'clamp(1.75rem, 7.5vw, 8rem)' }}
        >
          FRONTEND ARCHITECT
        </h2>

        {/* Narrative & Scroll Prompt */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mt-3 sm:mt-6 border-t border-[rgba(242,239,233,0.15)] pt-2.5 sm:pt-4">
          <p className="font-mono-tech text-[10px] sm:text-xs text-[#78756E] max-w-md leading-relaxed line-clamp-2 sm:line-clamp-none">
            {profile.bio}
          </p>

          <div className="flex items-center gap-2 font-mono-tech text-[10px] sm:text-xs text-[#FF3E00] font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-ping" />
            <span className="tracking-widest uppercase">
              SCROLL TO ENGAGE SPLIT GATE [↓]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KineticCurtainHero;
