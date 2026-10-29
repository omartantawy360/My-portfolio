import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    num: '01',
    title: 'Architectural Purity',
    desc: 'Semantically rich HTML5, robust TypeScript interfaces, and clean modular React structures engineered to scale effortlessly.',
    badge: 'RIGOR',
    color: 'bg-[#FF4B35] text-white',
  },
  {
    num: '02',
    title: 'Visual Precision',
    desc: 'Every padding, font-scale, transition curve, and contrast ratio calculated intentionally. No boilerplate templates.',
    badge: 'CRAFT',
    color: 'bg-[#304FFE] text-white',
  },
  {
    num: '03',
    title: 'Performance SLA',
    desc: 'Zero layout shifts, sub-second paints, touch ergonomics, and complete keyboard accessibility across all viewports.',
    badge: 'SPEED',
    color: 'bg-[#D7FF45] text-[#20201E]',
  },
];

const SwissAbout: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const crossRef = useRef<SVGSVGElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Required Effect B: About Section Scroll-Linked Transformation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { scale: 0.94, y: 40 },
          { scale: 1.02, y: -20, ease: 'none' },
          0
        );
      }

      if (crossRef.current) {
        tl.to(crossRef.current, { rotation: 180, scale: 1.3, ease: 'none' }, 0);
      }

      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0.7 },
          { y: 0, opacity: 1, stagger: 0.1, ease: 'none' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 bg-[#FAF8F5] text-[#20201E] border-b-4 border-[#20201E] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#20201E] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF4B35] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 bg-[#FF4B35]" />
              <span>[03] // BIOGRAPHY &amp; METHODOLOGY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#20201E]">
              Design Discipline &amp; Code
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-[#20201E]/60 max-w-xs">
            A developer approach bridging pure computer science foundations with editorial aesthetics.
          </span>
        </div>

        {/* Dynamic Dual-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Oversized Pull Quote with Rotating Cross */}
          <div className="lg:col-span-6 space-y-8">
            <div className="relative p-8 md:p-12 bg-white border-2 border-[#20201E] shadow-[8px_8px_0px_#20201E] overflow-hidden">
              {/* Rotating Swiss Cross Graphic */}
              <div className="absolute right-4 top-4 pointer-events-none opacity-20">
                <svg
                  ref={crossRef}
                  className="w-24 h-24 text-[#FF4B35]"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <rect x="38" y="0" width="24" height="100" />
                  <rect x="0" y="38" width="100" height="24" />
                </svg>
              </div>

              <span className="text-[10px] font-mono font-black tracking-widest text-[#FF4B35] uppercase block mb-4">
                {'//'} GUIDING PHILOSOPHY
              </span>

              <blockquote
                ref={quoteRef}
                className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#20201E] leading-tight will-change-transform"
              >
                &ldquo;The details are not the details.{' '}
                <span className="bg-[#D7FF45] px-2 py-0.5 border border-[#20201E] text-[#20201E]">
                  They make the design.
                </span>
                &rdquo;
              </blockquote>

              <p className="mt-6 text-sm text-[#20201E]/80 font-mono leading-relaxed">
                Applied to every line of markup, styling token, and interaction timeline to ensure
                flawless responsiveness on every viewport.
              </p>
            </div>

            {/* Spec Table */}
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-white border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E]">
                <span className="text-[9px] text-[#20201E]/60 uppercase block">BASE</span>
                <span className="font-bold">{profile.location}</span>
              </div>
              <div className="p-3 bg-white border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E]">
                <span className="text-[9px] text-[#20201E]/60 uppercase block">TIMEZONE</span>
                <span className="font-bold">{profile.timezone}</span>
              </div>
              <div className="p-3 bg-white border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E]">
                <span className="text-[9px] text-[#20201E]/60 uppercase block">STATUS</span>
                <span className="font-bold text-[#FF4B35]">HIREABLE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Genuine Biography Narrative & Engineering Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-base md:text-lg text-[#20201E] font-medium leading-relaxed">
              <p>
                I am <strong className="font-black text-[#FF4B35]">Omar Tantawy</strong>, a dedicated Front-End Developer with a proven record of transforming visual designs into interactive, accessible, and high-performance web products.
              </p>
              <p>
                My development approach bridges the gap between pure engineering and premium aesthetics. I focus on writing semantically rich HTML, optimized CSS layouts, and modular, clean React structures.
              </p>
              <p className="text-sm font-mono text-[#20201E]/70">
                Constantly learning and adapting to the modern web framework landscape, I turn sophisticated web architectures into seamless user journeys.
              </p>
            </div>

            {/* 3 Pillars Matrix */}
            <div ref={cardsRef} className="space-y-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className="p-5 bg-white border-2 border-[#20201E] shadow-[4px_4px_0px_#20201E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#20201E] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-black text-xs text-[#20201E]">
                      [{pillar.num}]
                    </span>
                    <span
                      className={`font-mono font-black text-[10px] px-2 py-0.5 border border-[#20201E] uppercase ${pillar.color}`}
                    >
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-[#20201E] mb-1 group-hover:text-[#FF4B35] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#20201E]/80 font-mono leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SwissAbout;

