import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SwissSectionTransitionProps {
  type: 'about-to-works' | 'works-to-skills';
}

const SwissSectionTransition: React.FC<SwissSectionTransitionProps> = ({ type }) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Required Effect F: Custom Choreographed Section Transition Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: transitionRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1,
        },
      });

      if (shapeRef.current) {
        if (type === 'about-to-works') {
          tl.fromTo(
            shapeRef.current,
            { scaleX: 0.3, rotation: -8, borderRadius: '40px' },
            { scaleX: 1, rotation: 0, borderRadius: '0px', ease: 'none' }
          );
        } else {
          tl.fromTo(
            shapeRef.current,
            { xPercent: -50, scale: 0.8 },
            { xPercent: 0, scale: 1.1, ease: 'none' }
          );
        }
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { xPercent: type === 'about-to-works' ? 30 : -30, opacity: 0.4 },
          { xPercent: 0, opacity: 1, ease: 'none' },
          0
        );
      }
    }, transitionRef);

    return () => ctx.revert();
  }, [type]);

  if (type === 'about-to-works') {
    return (
      <div
        ref={transitionRef}
        aria-hidden="true"
        className="relative h-24 sm:h-32 bg-[#FAF8F5] overflow-hidden border-b-4 border-[#20201E] flex items-center justify-center select-none"
      >
        <div
          ref={shapeRef}
          className="w-full h-full bg-[#FF4B35] border-y-2 border-[#20201E] flex items-center justify-center will-change-transform"
        >
          <div
            ref={textRef}
            className="flex items-center gap-6 font-mono text-sm sm:text-lg font-black uppercase text-white tracking-widest"
          >
            <span>↓ SELECTED WORKS CATALOGUE ↓</span>
            <span className="hidden sm:inline bg-[#D7FF45] text-[#20201E] px-2 py-0.5 border border-[#20201E]">
              PINNED INTERACTION
            </span>
            <span>↓ SELECTED WORKS CATALOGUE ↓</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={transitionRef}
      aria-hidden="true"
      className="relative h-24 sm:h-32 bg-[#F7F3E8] overflow-hidden border-b-4 border-[#20201E] flex items-center justify-center select-none"
    >
      <div
        ref={shapeRef}
        className="w-full h-full bg-[#304FFE] border-y-2 border-[#20201E] flex items-center justify-center will-change-transform"
      >
        <div
          ref={textRef}
          className="flex items-center gap-6 font-mono text-sm sm:text-lg font-black uppercase text-[#D7FF45] tracking-widest"
        >
          <span>★ CROSSING TO TECHNICAL ARSENAL ★</span>
          <span className="hidden sm:inline bg-white text-[#20201E] px-2 py-0.5 border border-[#20201E]">
            12 VERIFIED NODES
          </span>
          <span>★ CROSSING TO TECHNICAL ARSENAL ★</span>
        </div>
      </div>
    </div>
  );
};

export default SwissSectionTransition;

