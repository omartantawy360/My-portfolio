import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, stats } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const SwissHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLHeadingElement>(null);
  const starburstRef = useRef<SVGSVGElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Required Effect A: Hero Typography & Graphic Scroll Transformation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Opposing lateral typographic movement on scroll
      if (textLeftRef.current) {
        tl.to(textLeftRef.current, { xPercent: -35, ease: 'none' }, 0);
      }
      if (textRightRef.current) {
        tl.to(textRightRef.current, { xPercent: 35, ease: 'none' }, 0);
      }
      // Starburst spins and scales on scroll
      if (starburstRef.current) {
        tl.to(starburstRef.current, { rotation: 360, scale: 1.4, ease: 'none' }, 0);
      }
      // Bottom banner shifts in reverse
      if (bannerRef.current) {
        tl.to(bannerRef.current, { xPercent: -20, ease: 'none' }, 0);
      }
      // Sticker tilts
      if (stickerRef.current) {
        tl.to(stickerRef.current, { rotation: 25, y: -80, ease: 'none' }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] sm:min-h-[95vh] bg-[#F7F3E8] text-[#20201E] pt-24 sm:pt-28 pb-10 sm:pb-12 flex flex-col justify-between overflow-hidden border-b-4 border-[#20201E]"
    >
      {/* Background Swiss Grid Blueprint Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#20201E 1px, transparent 1px), linear-gradient(90deg, #20201E 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Top Editorial Index Meta */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#20201E] pb-3 text-xs font-mono font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF4B35] inline-block border border-[#20201E]" />
            <span className="text-[11px] sm:text-xs">CAIRO, EG · 30.0444° N, 31.2357° E</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="bg-[#D7FF45] px-2 py-0.5 border border-[#20201E] text-[#20201E]">
              SPEC: 2026
            </span>
            <span>{profile.role.toUpperCase()} {'//'} UI ARCHITECT</span>
          </div>
          <div className="flex items-center gap-2 text-[#FF4B35]">
            <span>●</span>
            <span className="text-[#20201E] text-[11px] sm:text-xs">{profile.status.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Typography Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto py-6 sm:py-8">
        
        {/* Floating Graphic Starburst Centerpiece */}
        <div className="absolute right-4 md:right-24 top-2 md:top-8 pointer-events-none z-0">
          <svg
            ref={starburstRef}
            className="w-24 h-24 sm:w-36 sm:h-36 md:w-56 md:h-56 text-[#FF4B35]"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            {/* 16-point bold kinetic starburst */}
            <path d="M50 0 L58 35 L95 20 L73 50 L100 70 L65 73 L58 100 L42 73 L0 70 L27 50 L5 20 L42 35 Z" />
          </svg>
        </div>

        {/* Floating Neobrutalist Sticker Badge */}
        <div
          ref={stickerRef}
          className="absolute -top-3 sm:-top-4 left-4 md:left-32 bg-[#D7FF45] border-2 border-[#20201E] px-3 sm:px-4 py-1.5 sm:py-2 font-mono font-black text-[11px] sm:text-xs md:text-sm shadow-[3px_3px_0px_#20201E] sm:shadow-[4px_4px_0px_#20201E] rotate-[-6deg] z-20 pointer-events-none select-none"
        >
          ★ 100% LIGHT &amp; KINETIC ★
        </div>

        {/* Giant Hero Letterforms */}
        <div className="space-y-0 select-none relative z-10">
          <div className="overflow-hidden">
            <h1
              ref={textLeftRef}
              className="text-5xl sm:text-8xl md:text-9xl lg:text-[14vw] font-black tracking-tighter leading-[0.88] text-[#20201E] will-change-transform"
            >
              OMAR
            </h1>
          </div>
          <div className="overflow-hidden flex items-baseline justify-between gap-4">
            <h1
              ref={textRightRef}
              className="text-5xl sm:text-8xl md:text-9xl lg:text-[14vw] font-black tracking-tighter leading-[0.88] text-[#FF4B35] will-change-transform"
            >
              TANTAWY
            </h1>
          </div>
        </div>

        {/* Editorial Subtitle & Bio Hook */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end pt-6 sm:pt-8 mt-4 border-t-2 border-[#20201E]">
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            <p className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[#20201E] leading-snug">
              Frontend Developer specialized in crafting{' '}
              <span className="bg-[#D7FF45] px-2 py-0.5 border border-[#20201E] text-[#20201E]">
                high-performance
              </span>{' '}
              web applications, kinetic interactions, and modern design systems.
            </p>
            <p className="text-xs sm:text-sm font-mono text-[#20201E]/70 max-w-xl">
              {'//'} {profile.approach} · Based in Cairo (GMT+2) · Building with React, TypeScript &amp; GSAP
            </p>
          </div>

          {/* Action CTAs */}
          <div className="md:col-span-5 flex flex-wrap gap-2.5 sm:gap-3 justify-start md:justify-end">
            <button
              onClick={() => scrollTo('works')}
              data-cursor="WORKS"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#FF4B35] hover:bg-[#20201E] text-white hover:text-[#D7FF45] border-2 border-[#20201E] font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_#20201E] sm:shadow-[4px_4px_0px_#20201E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#20201E] active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-2"
            >
              <span>Explore Works</span>
              <span className="bg-white text-[#20201E] px-1.5 py-0.5 rounded-none font-bold text-xs">
                0{stats.projectsCompleted}
              </span>
              <span>→</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              data-cursor="CONTACT"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-[#D7FF45] text-[#20201E] border-2 border-[#20201E] font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_#20201E] sm:shadow-[4px_4px_0px_#20201E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#20201E] active:translate-x-0 active:translate-y-0 transition-all"
            >
              Initiate Dialogue
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Full-Bleed Kinetic Ticker Bar */}
      <div className="relative z-10 w-full overflow-hidden border-t-2 border-[#20201E] bg-[#D7FF45] py-2 sm:py-2.5">
        <div
          ref={bannerRef}
          className="flex whitespace-nowrap gap-6 sm:gap-8 font-mono text-xs sm:text-sm font-black tracking-widest text-[#20201E] uppercase will-change-transform select-none"
        >
          <span>★ SWISS DESIGN DISCIPLINE</span>
          <span>✦ PURE REACT 19 &amp; TYPESCRIPT</span>
          <span>★ 60FPS SCROLL-DRIVEN MOTION</span>
          <span>✦ 09 SHIPPED PRODUCTION APPS</span>
          <span>★ ACCESSIBLE &amp; LIGHTWEIGHT</span>
          <span>✦ ZERO GENERIC TEMPLATES</span>
          <span>★ SWISS DESIGN DISCIPLINE</span>
          <span>✦ PURE REACT 19 &amp; TYPESCRIPT</span>
          <span>★ 60FPS SCROLL-DRIVEN MOTION</span>
        </div>
      </div>
    </section>
  );
};

export default SwissHero;
