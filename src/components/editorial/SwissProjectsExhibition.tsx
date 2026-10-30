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

    // ─── DESKTOP PINNED TIMELINE (>= 1024px) ───
    mm.add('(min-width: 1024px)', () => {
      if (!containerRef.current || !exhibitionStageRef.current) return;

      const totalProjects = projects.length;

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

      tl.to(exhibitionStageRef.current, {
        scale: 1,
        ease: 'none',
      });
    });

    // ─── MOBILE SCROLL-DRIVEN TIMELINE (< 1024px) ───
    mm.add('(max-width: 1023px)', () => {
      const cards = containerRef.current?.querySelectorAll('.mobile-project-card');

      cards?.forEach((card, idx) => {
        const img = card.querySelector('.mobile-project-img');

        // ScrollTrigger per card for responsive parallax & theme switching
        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, yPercent: 6 },
            {
              scale: 1.0,
              yPercent: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 40%',
                scrub: 0.6,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  const currentProject = projects[activeIndex] || projects[0];
  const currentTheme = exhibitionThemes[activeIndex] || exhibitionThemes[0];

  const handleIndexClick = (idx: number) => {
    setActiveIndex(idx);
    const mm = window.innerWidth >= 1024;
    if (mm && containerRef.current) {
      const scrollTriggerInstance = ScrollTrigger.getById('projects-exhibition');
      if (scrollTriggerInstance) {
        const targetScroll =
          scrollTriggerInstance.start +
          (idx / projects.length) * (scrollTriggerInstance.end - scrollTriggerInstance.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    } else {
      const card = document.getElementById(`mobile-project-${idx}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="works"
      className="relative bg-[#F7F3E8] border-b-4 border-[#20201E] min-h-screen py-10 lg:py-0 overflow-hidden select-none scroll-mt-16"
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

              {/* Large Image Frame */}
              <div className="relative overflow-hidden bg-white aspect-[16/10] border-2 border-[#20201E] border-t-0 flex items-center justify-center">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
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

      {/* ─── MOBILE RESPONSIVE SCROLL-DRIVEN EXHIBITION FEED (< 1024px) ─── */}
      <div className="lg:hidden px-3 sm:px-6 space-y-8 max-w-2xl mx-auto pt-4 pb-12">
        
        {/* Sticky Mobile Progression Ledger */}
        <div className="sticky top-14 sm:top-16 z-30 bg-[#F7F3E8]/95 backdrop-blur-md border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E] p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF4B35] inline-block border border-[#20201E]" />
            <span className="font-mono text-xs font-black text-[#20201E]">
              0{currentProject.id} / 09
            </span>
            <span className="font-black text-xs text-[#20201E] truncate max-w-[130px] sm:max-w-none">
              {currentProject.title}
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleIndexClick(idx)}
                className={`w-5 h-5 rounded-none font-mono text-[9px] font-black border flex items-center justify-center transition-colors ${
                  idx === activeIndex
                    ? 'bg-[#FF4B35] text-white border-[#20201E]'
                    : 'bg-white text-[#20201E] border-[#20201E]/30'
                }`}
              >
                {p.id}
              </button>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <div className="border-b-2 border-[#20201E] pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-black text-[#FF4B35] uppercase mb-1">
            <span>[04]</span>
            <span>{'//'} SELECTED EXHIBITION</span>
          </div>
          <h2 className="text-3xl font-black text-[#20201E]">Digital Project Archive</h2>
        </div>

        {/* 9 Scroll-Triggered Dynamic Project Articles */}
        {projects.map((proj, idx) => {
          const theme = exhibitionThemes[idx % exhibitionThemes.length];

          return (
            <article
              key={proj.id}
              id={`mobile-project-${idx}`}
              className="mobile-project-card bg-white border-2 border-[#20201E] shadow-[5px_5px_0px_#20201E] p-4 sm:p-5 space-y-3.5 transition-all duration-300 scroll-mt-24"
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

              <h3 className="text-xl sm:text-2xl font-black text-[#20201E]">{proj.title}</h3>

              {/* Scroll-Parallax Preview Frame */}
              <div className="border border-[#20201E] overflow-hidden bg-slate-100">
                <div className="bg-[#20201E] text-white px-2.5 py-1 text-[10px] font-mono flex items-center justify-between">
                  <span>PREVIEW</span>
                  <span className="text-[#D7FF45]">LIVE ACTIVE</span>
                </div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="mobile-project-img w-full h-full object-cover object-top will-change-transform"
                  />
                </div>
              </div>

              <p className="text-xs font-mono text-[#20201E]/80 leading-relaxed">
                {proj.description}
              </p>

              <div className="pt-1 flex flex-wrap gap-1">
                {proj.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono px-2 py-0.5 bg-[#FAF8F5] border border-[#20201E]"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#20201E] text-white font-mono font-black text-xs uppercase flex items-center justify-center gap-2 border-2 border-[#20201E] shadow-[2px_2px_0px_#FF4B35] hover:bg-[#FF4B35] transition-colors"
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
