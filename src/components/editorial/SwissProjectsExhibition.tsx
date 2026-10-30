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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const totalProjects = projects.length;

    // Unified Scroll-Driven Pinning across Desktop, Tablet & Mobile
    const st = ScrollTrigger.create({
      id: 'projects-exhibition',
      trigger: containerRef.current,
      pin: true,
      scrub: 0.6,
      start: 'top top',
      end: `+=${totalProjects * 450}`,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
        const newIndex = Math.min(
          Math.floor(progress * totalProjects),
          totalProjects - 1
        );
        setActiveIndex(newIndex);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const currentTheme = exhibitionThemes[activeIndex % exhibitionThemes.length];
  const currentProject = projects[activeIndex] || projects[0];

  const handleIndexClick = (idx: number) => {
    setActiveIndex(idx);
    const scrollTriggerInstance = ScrollTrigger.getById('projects-exhibition');
    if (scrollTriggerInstance) {
      const targetScroll =
        scrollTriggerInstance.start +
        (idx / projects.length) * (scrollTriggerInstance.end - scrollTriggerInstance.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="works"
      className="relative bg-[#F7F3E8] border-b-4 border-[#20201E] h-screen w-full max-w-full overflow-hidden select-none scroll-mt-16 z-20"
      style={{ backgroundColor: currentTheme.bg, transition: 'background-color 0.4s ease' }}
    >
      {/* ─── DESKTOP PINNED EXHIBITION EXPERIENCE (>= 1024px) ─── */}
      <div className="hidden lg:flex flex-col justify-between h-full min-h-[680px] max-h-[920px] px-8 pt-20 pb-8 max-w-[1500px] mx-auto w-full">
        
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

        {/* Dynamic Project Index Bar */}
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
          {/* Left Column: Curated Project Information (5 Cols) */}
          <div className="col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#20201E]/60 uppercase tracking-widest">
                FEATURED RECORD
              </span>
              <h3 className="text-4xl xl:text-5xl font-black text-[#20201E] tracking-tight leading-none">
                {currentProject.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 border border-[#20201E] text-xs font-mono font-bold uppercase shadow-[1.5px_1.5px_0px_#20201E]"
                  style={{ backgroundColor: currentTheme.tagBg, color: currentTheme.tagText }}
                >
                  {tag}
                </span>
              ))}
            </div>

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
                <span>VISIT DEPLOYMENT</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full-Scale Panoramic Canvas (7 Cols) */}
          <div className="col-span-7">
            <div className="relative border-4 border-[#20201E] bg-[#20201E] shadow-[10px_10px_0px_#20201E] p-2">
              <div className="bg-[#FAF8F5] border-2 border-[#20201E] px-4 py-1.5 flex items-center justify-between font-mono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B35] border border-[#20201E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D7FF45] border border-[#20201E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#304FFE] border border-[#20201E]" />
                  <span className="ml-2 text-[#20201E]/70 truncate max-w-[280px]">
                    {currentProject.link}
                  </span>
                </div>
                <span className="text-xs font-black uppercase text-[#20201E] bg-[#D7FF45] px-2 py-0.5 border border-[#20201E]">
                  DEPLOYED
                </span>
              </div>

              {/* Large Image Frame with Smooth Scroll Swap */}
              <div className="relative overflow-hidden bg-white aspect-[16/10] border-2 border-[#20201E] border-t-0 flex items-center justify-center">
                <img
                  key={currentProject.id}
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out animate-fade-in"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/avatar.png`;
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

      {/* ─── MOBILE PINNED SCROLL-DRIVEN EXHIBITION THEATRE (< 1024px) ─── */}
      <div className="flex lg:hidden flex-col justify-between h-full w-full px-3.5 sm:px-6 pt-16 sm:pt-20 pb-3 max-w-lg mx-auto">
        
        {/* Top Sticky Progression Ledger Bar */}
        <div className="shrink-0 bg-white/95 border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E] p-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="w-2.5 h-2.5 border border-[#20201E] inline-block shrink-0 transition-colors"
              style={{ backgroundColor: currentTheme.accent }}
            />
            <span className="font-mono text-xs font-black text-[#20201E] shrink-0">
              0{currentProject.id} / 09
            </span>
            <span className="font-black text-xs text-[#20201E] truncate ml-1">
              {currentProject.title}
            </span>
          </div>

          {/* Quick-Jump scene dots */}
          <div className="flex items-center gap-1 shrink-0 overflow-x-auto scrollbar-none">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleIndexClick(idx)}
                className={`w-5 h-5 font-mono text-[9px] font-black border flex items-center justify-center transition-all ${
                  idx === activeIndex
                    ? 'bg-[#FF4B35] text-white border-[#20201E] shadow-[1px_1px_0px_#20201E] scale-110'
                    : 'bg-[#FAF8F5] text-[#20201E]/60 border-[#20201E]/40'
                }`}
                aria-label={`Jump to project 0${p.id}`}
              >
                {p.id}
              </button>
            ))}
          </div>
        </div>

        {/* Center Canvas: Neobrutalist Viewport Frame */}
        <div className="my-auto py-2 flex flex-col gap-2.5">
          <div className="border-3 border-[#20201E] bg-[#20201E] shadow-[5px_5px_0px_#20201E] p-1.5">
            {/* Browser chrome header */}
            <div className="bg-[#FAF8F5] border border-[#20201E] px-2.5 py-1 flex items-center justify-between font-mono text-[10px] font-bold">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#FF4B35]" />
                <span className="w-2 h-2 rounded-full bg-[#D7FF45]" />
                <span className="w-2 h-2 rounded-full bg-[#304FFE]" />
                <span className="ml-1 text-[#20201E]/70 truncate max-w-[150px]">
                  {currentProject.link}
                </span>
              </div>
              <span className="text-[9px] font-black uppercase text-[#20201E] bg-[#D7FF45] px-1.5 py-0.2 border border-[#20201E] shrink-0">
                LIVE ACTIVE
              </span>
            </div>

            {/* Kinetic Screenshot Image with smooth scroll-driven transition */}
            <div className="relative overflow-hidden bg-white aspect-[16/10] border border-[#20201E] border-t-0 flex items-center justify-center">
              <img
                key={currentProject.id}
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/avatar.png`;
                }}
              />

              <div className="absolute top-2 left-2 font-mono text-[9px] text-[#20201E]/40 pointer-events-none">+</div>
              <div className="absolute top-2 right-2 font-mono text-[9px] text-[#20201E]/40 pointer-events-none">+</div>
              <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#20201E]/40 pointer-events-none">+</div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#20201E]/40 pointer-events-none">+</div>
            </div>
          </div>

          {/* Project Details Stage */}
          <div className="space-y-1.5 bg-white/90 border-2 border-[#20201E] p-3 sm:p-4 shadow-[4px_4px_0px_#20201E]">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-[#20201E] truncate">
                {currentProject.title}
              </h3>
              <span
                className="px-2 py-0.5 border border-[#20201E] text-[9px] font-mono font-bold uppercase shrink-0"
                style={{ backgroundColor: currentTheme.tagBg, color: currentTheme.tagText }}
              >
                {currentProject.tags[0]}
              </span>
            </div>

            <p className="text-[11px] font-mono text-[#20201E]/80 leading-relaxed line-clamp-2">
              {currentProject.description}
            </p>

            <div className="flex flex-wrap gap-1 pt-0.5">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.2 border border-[#20201E] text-[9px] font-mono font-bold uppercase bg-[#FAF8F5]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Launch CTA */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LAUNCH"
                className="flex-1 py-2 text-center bg-[#20201E] hover:bg-[#FF4B35] text-white font-mono font-black text-xs uppercase border-2 border-[#20201E] shadow-[2px_2px_0px_#FF4B35] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Launch Live Product</span>
                <span>↗</span>
              </a>

              <a
                href="https://github.com/omartantawy360"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CODE"
                className="py-2 px-3 bg-white hover:bg-[#D7FF45] text-[#20201E] font-mono font-bold text-xs uppercase border-2 border-[#20201E] shadow-[2px_2px_0px_#20201E] transition-all"
              >
                Code ⤶
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Exhibition Scroll Telemetry Bar */}
        <div className="shrink-0 flex items-center justify-between border-t border-[#20201E]/30 pt-1.5 font-mono text-[10px] text-[#20201E]/70 font-bold">
          <span>✦ SCROLL TO SCRUB SCENES</span>
          <span className="text-[#FF4B35]">
            PROG: {Math.round(scrollProgress * 100)}%
          </span>
        </div>

      </div>

      {/* Persistent Bottom Progression Line Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#20201E]/10 z-30 pointer-events-none">
        <div
          className="h-full bg-[#FF4B35] transition-all duration-150"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>
    </section>
  );
};

export default SwissProjectsExhibition;
