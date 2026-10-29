import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifestoLines = [
  { text: 'DIGITAL INTERFACES', highlight: false },
  { text: 'ARE NOT STATIC POSTERS.', highlight: true },
  { text: 'THEY ARE LIVING, KINETIC EXPERIENCES', highlight: false },
  { text: 'ENGINEERED WITH RIGOR & PRECISION.', highlight: true },
];

const SwissManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Required Effect D: Line-by-Line Scroll-Linked Typography Mask Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });

      lineRefs.current.forEach((el, index) => {
        if (!el) return;
        tl.fromTo(
          el,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            yPercent: 60,
            opacity: 0.2,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            yPercent: 0,
            opacity: 1,
            ease: 'power2.out',
          },
          index * 0.25
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-28 bg-[#FF4B35] text-white border-b-4 border-[#20201E] overflow-hidden"
    >
      {/* Background Graphic Watermark */}
      <div className="absolute right-6 -bottom-10 font-mono text-[18vw] font-black text-[#20201E]/10 pointer-events-none select-none leading-none">
        ETHOS
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-[#20201E] pb-4">
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#20201E] bg-[#D7FF45] px-3 py-1 border border-[#20201E] shadow-[2px_2px_0px_#20201E]">
            <span>[02]</span>
            <span>{'//'} KINETIC MANIFESTO</span>
          </div>
          <span className="font-mono text-xs font-bold uppercase text-[#20201E]">
            SCROLL-LINKED CHOREOGRAPHY
          </span>
        </div>

        {/* Masked Revealing Typography Lines */}
        <div className="space-y-2 md:space-y-4 py-6">
          {manifestoLines.map((line, index) => (
            <div key={index} className="overflow-hidden">
              <h2
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.95] will-change-transform ${
                  line.highlight
                    ? 'text-[#D7FF45] drop-shadow-[3px_3px_0px_#20201E]'
                    : 'text-[#20201E]'
                }`}
              >
                {line.text}
              </h2>
            </div>
          ))}
        </div>

        {/* Supporting Editorial Citation */}
        <div className="pt-6 border-t-2 border-[#20201E] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs font-bold text-[#20201E]">
          <p className="max-w-xl">
            Omar Tantawy · Front-End Architect bridging raw engineering execution with tactile editorial aesthetics.
          </p>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#20201E] shadow-[2px_2px_0px_#20201E]">
            <span className="w-2 h-2 rounded-full bg-[#FF4B35]" />
            <span>RESPONSIVE TO SCROLL IN BOTH DIRECTIONS</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SwissManifesto;

