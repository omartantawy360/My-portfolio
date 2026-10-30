import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface KineticProjectsExhibitionProps {
  onSectionProgress?: (progress: number) => void;
}

const KineticProjectsExhibition: React.FC<KineticProjectsExhibitionProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalProjects = projects.length;

      // Pinned Master Stage Timeline across both mobile & desktop
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'projects-theatre',
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalProjects * 90}%`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              Math.floor(progress * totalProjects),
              totalProjects - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // Scrubbed mask wipe for each project canvas layer
      for (let i = 1; i < totalProjects; i++) {
        const layer = document.getElementById(`project-canvas-layer-${i}`);
        const img = layer?.querySelector('.canvas-img');

        if (layer) {
          tl.fromTo(
            layer,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 },
            (i - 1) * 1
          );
        }

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.15 },
            { scale: 1.0, ease: 'none', duration: 1 },
            (i - 1) * 1
          );
        }
      }

      // Shutter wipe transition into Section 03
      if (shutterRef.current) {
        tl.to(
          shutterRef.current,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power3.inOut',
            duration: 0.8,
          },
          totalProjects - 0.9
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const safeIndex = Math.max(0, Math.min(activeIndex, projects.length - 1));
  const currentProject = projects[safeIndex] || projects[0];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full max-w-full h-screen bg-[#0A0A09] text-[#F2EFE9] overflow-hidden select-none z-20"
    >
      {/* ─── SPLIT-STAGE THEATRE (RESPONSIVE: CANVAS TOP ON MOBILE, RIGHT ON DESKTOP) ─── */}
      <div className="w-full max-w-full h-full flex flex-col-reverse md:flex-row relative z-10 pt-8 sm:pt-14 pb-3 sm:pb-8 px-2.5 sm:px-8 md:px-12 overflow-hidden">
        
        {/* ─── SPECS COLUMN: STICKY INFORMATION ARCHITECTURE ─── */}
        <div className="w-full md:w-[42%] h-[56%] md:h-full flex flex-col justify-between pr-0 md:pr-10 border-t md:border-t-0 md:border-r border-[rgba(242,239,233,0.12)] pt-1.5 md:pt-0 pb-1 md:pb-0 overflow-hidden min-w-0">
          
          {/* Top Section Breadcrumb */}
          <div className="flex items-center justify-between border-b border-[rgba(242,239,233,0.12)] pb-1.5 sm:pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF3E00]" />
              <span className="font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-widest text-[#F2EFE9] uppercase">
                EXHIBITION REEL // 02
              </span>
            </div>
            <span className="font-mono-tech text-[9px] sm:text-[10px] text-[#78756E] uppercase">
              PINNED THEATRE
            </span>
          </div>

          {/* Center Info Block: Odometer + Active Title & Description */}
          <div className="my-auto py-1 sm:py-4 space-y-1.5 sm:space-y-3.5">
            
            {/* Odometer Rolling Counter */}
            <div className="flex items-center gap-2.5 sm:gap-3 select-none">
              <div className="relative h-9 sm:h-16 md:h-20 w-14 sm:w-24 md:w-32 overflow-hidden font-mono-tech font-black text-2xl sm:text-5xl md:text-7xl text-[#FF3E00] leading-none">
                <div
                  className="transition-transform duration-500 ease-out flex flex-col w-full"
                  style={{
                    transform: `translateY(-${(safeIndex * 100) / projects.length}%)`,
                  }}
                >
                  {projects.map((p) => (
                    <span
                      key={p.id}
                      className="h-9 sm:h-16 md:h-20 flex items-center justify-start shrink-0 leading-none"
                    >
                      0{p.id}
                    </span>
                  ))}
                </div>
              </div>

              <span className="font-mono-tech text-xs sm:text-2xl text-[#78756E] font-medium leading-none">
                / 0{projects.length}
              </span>

              <span className="ml-auto font-mono-tech text-[9px] sm:text-xs text-[#78756E] uppercase tracking-widest">
                [INDEX REGISTER]
              </span>
            </div>

            {/* Project Title */}
            <h3 className="font-syne text-lg sm:text-2xl md:text-5xl font-extrabold text-[#F2EFE9] tracking-tight uppercase leading-[0.95] line-clamp-1 sm:line-clamp-none">
              {currentProject.title}
            </h3>

            {/* Description */}
            <p className="font-mono-tech text-[11px] sm:text-sm text-[#78756E] leading-relaxed max-w-lg line-clamp-2 md:line-clamp-none">
              {currentProject.description}
            </p>

            {/* Blueprint Metadata Matrix */}
            <div className="pt-1 sm:pt-3 border-t border-[rgba(242,239,233,0.12)] space-y-1.5 font-mono-tech text-[10px] sm:text-[11px]">
              <div className="flex items-center justify-between text-[#78756E]">
                <span>RELEASE ID:</span>
                <span className="text-[#F2EFE9] font-bold">
                  PRJ-00{currentProject.id} {'//'} PRODUCTION
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-1 pt-0.5">
                <span className="text-[#78756E] mr-1.5">STACK:</span>
                {currentProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-1.5 py-0.2 sm:px-2 sm:py-0.5 border border-[rgba(242,239,233,0.18)] bg-[#0A0A09] text-[9px] sm:text-[10px] text-[#F2EFE9] uppercase tracking-wider font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions: Brutalist Architectural Launch Buttons */}
          <div className="pt-1.5 sm:pt-4 border-t border-[rgba(242,239,233,0.12)] flex items-center gap-2 sm:gap-3">
            <a
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LAUNCH"
              className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-[#FF3E00] text-[#0A0A09] font-mono-tech text-[11px] sm:text-xs font-bold tracking-widest uppercase text-center border border-[#FF3E00] hover:bg-[#F2EFE9] hover:border-[#F2EFE9] transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>LAUNCH LIVE DEMO</span>
              <span className="text-sm">↗</span>
            </a>

            <a
              href="https://github.com/omartantawy360"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              className="py-2 sm:py-3 px-3 sm:px-4 bg-transparent text-[#F2EFE9] font-mono-tech text-[11px] sm:text-xs font-bold tracking-widest uppercase border border-[rgba(242,239,233,0.2)] hover:border-[#FF3E00] hover:text-[#FF3E00] transition-all flex items-center justify-center gap-1"
            >
              <span>CODE</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* ─── CANVAS COLUMN: FULL-BLEED MASK-WIPE CANVAS ─── */}
        <div className="w-full md:w-[58%] h-[44%] md:h-full relative pl-0 md:pl-8 pb-1.5 md:pb-0 overflow-hidden min-w-0">
          <div className="relative w-full h-full border border-[rgba(242,239,233,0.14)] bg-[#0A0A09] overflow-hidden">
            
            {/* Project Canvas Layers (Stacked with scrubbed clip-path) */}
            {projects.map((proj, pIdx) => {
              const isBaseLayer = pIdx === 0;

              return (
                <div
                  key={proj.id}
                  id={`project-canvas-layer-${pIdx}`}
                  className="absolute inset-0 w-full h-full will-change-[clip-path]"
                  style={{
                    clipPath: isBaseLayer ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                    zIndex: pIdx + 1,
                  }}
                >
                  {/* Image Viewport with Parallax Scaling */}
                  <div className="w-full h-full relative overflow-hidden bg-[#0A0A09] flex items-center justify-center">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="canvas-img w-full h-full object-cover object-center will-change-transform"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/avatar.png`;
                      }}
                    />

                    {/* Dark gradient overlay for telemetry legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-20 sm:h-32 bg-gradient-to-t from-[#0A0A09] via-[#0A0A09]/60 to-transparent pointer-events-none" />

                    {/* Blueprint Coordinates Corner Stamp */}
                    <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#0A0A09]/90 border border-[rgba(242,239,233,0.18)] font-mono-tech text-[9px] sm:text-[10px] text-[#F2EFE9] tracking-wider uppercase backdrop-blur-sm">
                      FRAME // 0{proj.id}
                    </div>

                    {/* Live Bottom Caption Overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between font-mono-tech text-[9px] sm:text-[11px] text-[#F2EFE9] pointer-events-none">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0A0A09]/85 px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[rgba(242,239,233,0.15)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" />
                        <span className="font-bold truncate max-w-[140px] sm:max-w-none">{proj.title}</span>
                      </div>
                      <span className="hidden sm:inline bg-[#0A0A09]/85 px-2.5 py-1 border border-[rgba(242,239,233,0.15)] text-[#78756E]">
                        HIGH-DPI VISUAL
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 1px Crosshair Grid overlay */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[rgba(242,239,233,0.06)]" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[rgba(242,239,233,0.06)]" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION 03 COLOR INVERSION SHUTTER (OBSIDIAN TO RAW LINEN) ─── */}
      <div
        ref={shutterRef}
        className="absolute inset-0 bg-[#F2EFE9] z-30 pointer-events-none will-change-[clip-path] flex items-center justify-center p-4"
        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
      >
        <div className="text-center text-[#0A0A09] space-y-2">
          <span className="font-mono-tech text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#FF3E00]">
            [SURFACE INVERSION INITIATED]
          </span>
          <h2 className="font-syne text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight">
            ENTERING ARCHIVAL MATRIX
          </h2>
        </div>
      </div>
    </section>
  );
};

export default KineticProjectsExhibition;
