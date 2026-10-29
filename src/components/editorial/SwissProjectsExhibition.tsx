import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const exhibitionThemes = [
  {
    bg: '#FAF8F5',
    accent: '#FF4B35',
    tagBg: '#FF4B35',
    tagText: '#FFFFFF',
    border: '#20201E',
    label: 'CURATED EDITION 01',
  },
  {
    bg: '#EFF3FF',
    accent: '#304FFE',
    tagBg: '#304FFE',
    tagText: '#FFFFFF',
    border: '#20201E',
    label: 'CURATED EDITION 02',
  },
  {
    bg: '#FFFDF0',
    accent: '#FF4B35',
    tagBg: '#D7FF45',
    tagText: '#20201E',
    border: '#20201E',
    label: 'CURATED EDITION 03',
  },
  {
    bg: '#FFF0F5',
    accent: '#20201E',
    tagBg: '#FFB7D5',
    tagText: '#20201E',
    border: '#20201E',
    label: 'CURATED EDITION 04',
  },
  {
    bg: '#F5FFF0',
    accent: '#FF4B35',
    tagBg: '#D7FF45',
    tagText: '#20201E',
    border: '#20201E',
    label: 'CURATED EDITION 05',
  },
  {
    bg: '#F0F8FF',
    accent: '#304FFE',
    tagBg: '#304FFE',
    tagText: '#FFFFFF',
    border: '#20201E',
    label: 'CURATED EDITION 06',
  },
  {
    bg: '#FFF6F0',
    accent: '#FF4B35',
    tagBg: '#FF4B35',
    tagText: '#FFFFFF',
    border: '#20201E',
    label: 'CURATED EDITION 07',
  },
  {
    bg: '#F3F0FF',
    accent: '#304FFE',
    tagBg: '#304FFE',
    tagText: '#FFFFFF',
    border: '#20201E',
    label: 'CURATED EDITION 08',
  },
  {
    bg: '#FAFFF0',
    accent: '#20201E',
    tagBg: '#D7FF45',
    tagText: '#20201E',
    border: '#20201E',
    label: 'CURATED EDITION 09',
  },
];

const SwissProjectsExhibition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const exhibitionStageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!containerRef.current || !exhibitionStageRef.current) return;

      const totalProjects = projects.length;

      // Pinned Multi-Scene Exhibition Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'projects-exhibition',
          trigger: containerRef.current,
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: `+=${totalProjects * 500}`,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.min(
              Math.floor(progress * totalProjects),
              totalProjects - 1
            );
            setActiveIndex(newIndex);
          },
        },
      });

      // Visual transformation across scroll progression
      tl.to(exhibitionStageRef.current, {
        scale: 1,
        ease: 'none',
      });
    });

    return () => mm.revert();
  }, []);

  const currentProject = projects[activeIndex] || projects[0];
  const currentTheme = exhibitionThemes[activeIndex] || exhibitionThemes[0];

  const handleIndexClick = (idx: number) => {
    setActiveIndex(idx);
    if (containerRef.current) {
      const scrollTriggerInstance = ScrollTrigger.getById('projects-exhibition');
      if (scrollTriggerInstance) {
        const targetScroll =
          scrollTriggerInstance.start +
          (idx / projects.length) * (scrollTriggerInstance.end - scrollTriggerInstance.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="works"
      className="relative bg-[#F7F3E8] border-b-4 border-[#20201E] min-h-screen py-16 lg:py-0 overflow-hidden select-none scroll-mt-16"
      style={{ backgroundColor: currentTheme.bg, transition: 'background-color 0.5s ease' }}
    >
      {/* ─── DESKTOP PINNED EXHIBITION EXPERIENCE (>= 1024px) ─── */}
      <div className="hidden lg:flex flex-col justify-between h-screen min-h-[680px] max-h-[920px] px-8 pt-20 pb-8 max-w-[1500px] mx-auto w-full">
        
        {/* Exhibition Master Header */}
        <div className="flex items-center justify-between border-b-2 border-[#20201E] pb-3 shrink-0">
          <div className="flex items-center gap-4">
            <span
              className="w-4 h-4 border-2 border-[#20201E] transition-colors duration-300"
              style={{ backgroundColor: currentTheme.accent }}
            />
            <h2 className="text-2xl font-black tracking-tight text-[#20201E]">
              Digital Project Exhibition
            </h2>
            <span className="font-mono text-xs font-bold text-[#20201E]/60 uppercase ml-2">
              [{currentTheme.label}]
            </span>
          </div>

          {/* Exhibition Progress & Project Indicator */}
          <div className="flex items-center gap-4 font-mono text-xs font-bold">
            <span className="text-[#20201E]/70">EXHIBITION SEQUENCE:</span>
            <span className="px-3 py-1 bg-white border-2 border-[#20201E] shadow-[2px_2px_0px_#20201E] text-base font-black">
              0{currentProject.id} <span className="text-xs text-[#20201E]/40">/ 09</span>
            </span>
          </div>
        </div>

        {/* Dynamic Project Index Bar: 9 interactive exhibition ledger tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 shrink-0 border-b border-[#20201E]/20 scrollbar-none">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => handleIndexClick(idx)}
                data-cursor="SELECT"
                className={`px-3 py-1 font-mono text-xs font-bold transition-all border whitespace-nowrap ${
                  isActive
                    ? 'bg-[#20201E] text-white border-[#20201E] shadow-[2px_2px_0px_#FF4B35]'
                    : 'bg-white/80 text-[#20201E] border-[#20201E]/40 hover:bg-white hover:border-[#20201E]'
                }`}
              >
                <span className="opacity-60 mr-1.5">0{proj.id}.</span>
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Main Exhibition Scene Canvas (Centered Stage) ─── */}
        <div
          ref={exhibitionStageRef}
          className="grid grid-cols-12 gap-8 items-center my-auto flex-1 py-4"
        >
          {/* Left Side: Dramatic Editorial Typography, Number, Spec Sheet, Links */}
          <div className="col-span-5 flex flex-col justify-between h-full max-h-[460px] space-y-4">
            
            {/* Top: Huge Display Number & Tags */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b-2 border-[#20201E] pb-2">
                <span className="text-6xl xl:text-7xl font-black font-mono text-[#20201E] tracking-tighter leading-none">
                  0{currentProject.id}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-[#20201E] font-mono text-[10px] font-bold uppercase shadow-[1px_1px_0px_#20201E]"
                      style={{
                        backgroundColor: currentTheme.tagBg,
                        color: currentTheme.tagText,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Oversized Title */}
              <h3 className="text-3xl xl:text-4xl font-black text-[#20201E] tracking-tight leading-tight transition-all duration-300">
                {currentProject.title}
              </h3>
            </div>

            {/* Middle: Curated Narrative Description */}
            <p className="text-sm font-mono text-[#20201E]/85 leading-relaxed bg-white/90 p-4 border-2 border-[#20201E] shadow-[4px_4px_0px_#20201E]">
              {currentProject.description}
            </p>

            {/* Bottom Actions: Launch Button + Spec Label */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono font-bold text-[#20201E]/60 uppercase">
                {'//'} PRODUCTION VERIFIED
              </span>

              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LAUNCH"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#20201E] hover:bg-[#FF4B35] text-white border-2 border-[#20201E] font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#20201E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#20201E] transition-all"
              >
                <span>Launch Live Product</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Right Side: Massive Panoramic Visual Canvas with Exhibition Frame */}
          <div className="col-span-7 flex flex-col justify-center">
            <div className="relative bg-white border-4 border-[#20201E] shadow-[10px_10px_0px_#20201E] overflow-hidden group">
              
              {/* Museum Header Bar */}
              <div className="bg-[#20201E] text-white px-4 py-2 flex items-center justify-between font-mono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B35]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D7FF45]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#304FFE]" />
                </div>
                <span className="truncate max-w-[340px] opacity-80">{currentProject.link}</span>
                <span
                  className="px-2 py-0.5 text-[10px] font-black uppercase text-[#20201E]"
                  style={{ backgroundColor: currentTheme.tagBg }}
                >
                  EXHIBIT 0{currentProject.id}
                </span>
              </div>

              {/* Large Image Showcase Frame */}
              <div className="relative h-[340px] xl:h-[390px] w-full bg-[#FAF8F5] overflow-hidden flex items-center justify-center">
                <img
                  key={currentProject.id}
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover object-top filter contrast-[1.05] transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Subtle Archival Crosshair Marks */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-[#20201E]/40 pointer-events-none">+</div>
                <div className="absolute top-3 right-3 font-mono text-[10px] text-[#20201E]/40 pointer-events-none">+</div>
                <div className="absolute bottom-3 left-3 font-mono text-[10px] text-[#20201E]/40 pointer-events-none">+</div>
                <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#20201E]/40 pointer-events-none">+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exhibition Footer Bar */}
        <div className="flex items-center justify-between border-t-2 border-[#20201E] pt-3 shrink-0 font-mono text-xs font-bold text-[#20201E]/70">
          <span>SCROLL DRIVES EXHIBITION SCENES</span>
          <span className="hidden sm:inline">9 GENUINE PRODUCTION CASES</span>
          <span>CLICK LEDGER OR SCROLL TO PROGRESS →</span>
        </div>
      </div>

      {/* ─── MOBILE RESPONSIVE EXHIBITION FEED (< 1024px) ─── */}
      <div className="lg:hidden px-4 sm:px-6 space-y-12 max-w-2xl mx-auto pt-6 pb-12">
        <div className="border-b-2 border-[#20201E] pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-black text-[#FF4B35] uppercase mb-1">
            <span>[04]</span>
            <span>{'//'} SELECTED EXHIBITION</span>
          </div>
          <h2 className="text-3xl font-black text-[#20201E]">Digital Project Archive</h2>
        </div>

        {projects.map((proj, idx) => {
          const theme = exhibitionThemes[idx % exhibitionThemes.length];

          return (
            <article
              key={proj.id}
              className="bg-white border-2 border-[#20201E] shadow-[5px_5px_0px_#20201E] p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#20201E]/20 pb-2">
                <span className="text-3xl font-black font-mono text-[#20201E]">
                  0{proj.id}
                </span>
                <span
                  className="px-2 py-0.5 border border-[#20201E] text-[10px] font-mono font-bold uppercase"
                  style={{ backgroundColor: theme.tagBg, color: theme.tagText }}
                >
                  {proj.tags[0]}
                </span>
              </div>

              <h3 className="text-xl font-black text-[#20201E]">{proj.title}</h3>

              <div className="border border-[#20201E] overflow-hidden bg-slate-100">
                <div className="bg-[#20201E] text-white px-2.5 py-1 text-[10px] font-mono flex items-center justify-between">
                  <span>PREVIEW</span>
                  <span className="text-[#D7FF45]">LIVE</span>
                </div>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <p className="text-xs font-mono text-[#20201E]/80 leading-relaxed">
                {proj.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1">
                {proj.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono px-1.5 py-0.5 bg-[#FAF8F5] border border-[#20201E]"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#20201E] text-white font-mono font-black text-xs uppercase flex items-center justify-center gap-2 border-2 border-[#20201E] shadow-[2px_2px_0px_#FF4B35]"
              >
                <span>Launch Live Product</span>
                <span>↗</span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SwissProjectsExhibition;
