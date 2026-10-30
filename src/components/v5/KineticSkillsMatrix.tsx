import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface SkillProjectRef {
  name: string;
  category: 'Frontend' | 'Languages' | 'Tools';
  code: string;
  projectCount: number;
  projectNames: string[];
}

const skillCrossReferences: Record<string, SkillProjectRef> = {
  React: {
    name: 'React 19',
    category: 'Frontend',
    code: 'DOM-FE-01',
    projectCount: 8,
    projectNames: [
      'El-3lamea Leather',
      'Blaze Store',
      'Private Burger',
      'Wave Team',
      'E-commerce Store',
      'Academic Center',
      'EduComp',
      'Tailwind Landing',
    ],
  },
  TypeScript: {
    name: 'TypeScript',
    category: 'Frontend',
    code: 'DOM-FE-02',
    projectCount: 5,
    projectNames: ['Blaze Store', 'Private Burger', 'Wave Team', 'E-commerce Store', 'Portfolio V5'],
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    category: 'Frontend',
    code: 'DOM-FE-03',
    projectCount: 8,
    projectNames: [
      'El-3lamea Leather',
      'Blaze Store',
      'Private Burger',
      'Wave Team',
      'E-commerce Store',
      'Academic Center',
      'EduComp',
      'Tailwind Landing',
    ],
  },
  'Bootstrap 5': {
    name: 'Bootstrap 5',
    category: 'Frontend',
    code: 'DOM-FE-04',
    projectCount: 3,
    projectNames: ['Wave Team', 'Academic Center', 'Food Lover Portal'],
  },
  'HTML5 / CSS3': {
    name: 'HTML5 / CSS3',
    category: 'Frontend',
    code: 'DOM-FE-05',
    projectCount: 9,
    projectNames: [
      'El-3lamea Leather',
      'Blaze Store',
      'Private Burger',
      'Wave Team',
      'E-commerce Store',
      'Academic Center',
      'Food Lover Portal',
      'EduComp',
      'Tailwind Landing',
    ],
  },
  'JavaScript (ES6+)': {
    name: 'JavaScript (ES6+)',
    category: 'Languages',
    code: 'DOM-LN-01',
    projectCount: 9,
    projectNames: [
      'Food Lover Portal',
      'El-3lamea Leather',
      'Blaze Store',
      'Private Burger',
      'Wave Team',
      'E-commerce Store',
      'Academic Center',
      'EduComp',
      'Tailwind Landing',
    ],
  },
  'C++ Programming': {
    name: 'C++ Programming',
    category: 'Languages',
    code: 'DOM-LN-02',
    projectCount: 2,
    projectNames: ['Cisco Systems Certification', 'Algorithmic Logic Engine'],
  },
  Python: {
    name: 'Python',
    category: 'Languages',
    code: 'DOM-LN-03',
    projectCount: 2,
    projectNames: ['Cisco Python Certification', 'Data Logic & Automation Scripts'],
  },
  'Git & GitHub': {
    name: 'Git & GitHub',
    category: 'Tools',
    code: 'DOM-TL-01',
    projectCount: 9,
    projectNames: ['All 9 Production Repositories & CI/CD Pipelines'],
  },
  EmailJS: {
    name: 'EmailJS',
    category: 'Tools',
    code: 'DOM-TL-02',
    projectCount: 3,
    projectNames: ['Portfolio Direct Dispatch', 'Client Inquiries Engine', 'Blaze Store Orders'],
  },
  'VS Code': {
    name: 'VS Code',
    category: 'Tools',
    code: 'DOM-TL-03',
    projectCount: 9,
    projectNames: ['Primary Engineering Workspace Across All 9 Projects'],
  },
  'npm & Node': {
    name: 'npm & Node',
    category: 'Tools',
    code: 'DOM-TL-04',
    projectCount: 9,
    projectNames: ['Package Orchestration & Toolchains for All 9 Projects'],
  },
};

const domains = [
  {
    code: 'DOM-01',
    title: 'FRONTEND ARCHITECTURE',
    desc: 'Component models, reactive state loops, responsive design tokens & DOM rendering',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Bootstrap 5', 'HTML5 / CSS3'],
  },
  {
    code: 'DOM-02',
    title: 'LANGUAGE SYSTEMS',
    desc: 'Algorithmic complexity, asynchronous execution, memory management & scripting',
    skills: ['JavaScript (ES6+)', 'C++ Programming', 'Python'],
  },
  {
    code: 'DOM-03',
    title: 'WORKFLOW & TOOLCHAINS',
    desc: 'Distributed version control, client-side transactional APIs & modern bundlers',
    skills: ['Git & GitHub', 'EmailJS', 'VS Code', 'npm & Node'],
  },
];

const KineticSkillsMatrix: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const track3Ref = useRef<HTMLDivElement>(null);
  const compressionCurtainRef = useRef<HTMLDivElement>(null);

  const [activeSkillHover, setActiveSkillHover] = useState<SkillProjectRef | null>(
    skillCrossReferences['React']
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-scrubbed horizontal tracks moving in alternating directions
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'skills-matrix-scroll',
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          onUpdate: (self) => {
            // Velocity-reactive skew
            const vel = self.getVelocity() / 300;
            const clampedSkew = Math.max(-14, Math.min(14, vel));

            if (track1Ref.current) gsap.set(track1Ref.current, { skewX: -clampedSkew });
            if (track2Ref.current) gsap.set(track2Ref.current, { skewX: clampedSkew });
            if (track3Ref.current) gsap.set(track3Ref.current, { skewX: -clampedSkew });
          },
        },
      });

      tl.to(track1Ref.current, { xPercent: -25, ease: 'none' }, 0);
      tl.to(track2Ref.current, { xPercent: 20, ease: 'none' }, 0);
      tl.to(track3Ref.current, { xPercent: -20, ease: 'none' }, 0);

      // 2. Horizontal Curtain Compression transitioning to Section 04 (restoring Obsidian #0A0A09)
      if (compressionCurtainRef.current) {
        gsap.fromTo(
          compressionCurtainRef.current,
          { scaleY: 0, transformOrigin: 'bottom' },
          {
            scaleY: 1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'bottom 85%',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full min-h-screen bg-[#F2EFE9] text-[#0A0A09] py-24 sm:py-32 overflow-hidden select-none z-10"
    >
      {/* ─── 1PX ARCHITECTURAL HAIRLINE GRID OVERLAY (LIGHT SURFACE) ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-6 sm:grid-cols-12 divide-x divide-[rgba(10,10,9,0.08)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full relative" />
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10 space-y-16 sm:space-y-20">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#0A0A09] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs font-bold tracking-widest text-[#FF3E00] uppercase">
              <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block" />
              <span>{'//'} SECTION 03 · KINETIC BLUEPRINT MATRIX</span>
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl md:text-8xl font-black text-[#0A0A09] tracking-tight uppercase leading-none">
              Skills &amp; Craft
            </h2>
          </div>

          <div className="font-mono-tech text-xs space-y-1 text-right text-[#78756E]">
            <p className="font-bold text-[#0A0A09]">TOTAL TECHNICAL NODES: {skills.length}</p>
            <p>VELOCITY-SKEWED SCROLL TOPOLOGY</p>
            <p className="text-[#FF3E00] font-bold">HOVER NODES TO CROSS-REFERENCE PROJECTS</p>
          </div>
        </div>

        {/* ─── GIANT HORIZONTAL VELOCITY-REACTIVE KINETIC TRACKS ─── */}
        <div className="space-y-4 py-4 overflow-hidden border-y border-[rgba(10,10,9,0.12)] bg-[rgba(10,10,9,0.02)]">
          
          {/* Track 1 (Leftward) */}
          <div
            ref={track1Ref}
            className="whitespace-nowrap font-syne font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#0A0A09] will-change-transform flex gap-8 items-center"
          >
            <span>REACT 19</span>
            <span className="text-[#FF3E00]">—</span>
            <span>TYPESCRIPT</span>
            <span className="text-[#FF3E00]">—</span>
            <span>TAILWIND CSS</span>
            <span className="text-[#FF3E00]">—</span>
            <span>HTML5 / CSS3</span>
            <span className="text-[#FF3E00]">—</span>
            <span>BOOTSTRAP 5</span>
            <span className="text-[#FF3E00]">—</span>
            <span>REACT 19</span>
            <span className="text-[#FF3E00]">—</span>
            <span>TYPESCRIPT</span>
          </div>

          {/* Track 2 (Rightward) */}
          <div
            ref={track2Ref}
            className="whitespace-nowrap font-syne font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#78756E] will-change-transform flex gap-8 items-center"
          >
            <span>JAVASCRIPT (ES6+)</span>
            <span className="text-[#FF3E00]">—</span>
            <span className="text-[#0A0A09]">C++ ALGORITHMS</span>
            <span className="text-[#FF3E00]">—</span>
            <span>PYTHON AUTOMATION</span>
            <span className="text-[#FF3E00]">—</span>
            <span>JAVASCRIPT (ES6+)</span>
            <span className="text-[#FF3E00]">—</span>
            <span className="text-[#0A0A09]">C++ ALGORITHMS</span>
          </div>

          {/* Track 3 (Leftward) */}
          <div
            ref={track3Ref}
            className="whitespace-nowrap font-syne font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#0A0A09] will-change-transform flex gap-8 items-center"
          >
            <span>GIT &amp; GITHUB</span>
            <span className="text-[#FF3E00]">—</span>
            <span>EMAILJS DISPATCH</span>
            <span className="text-[#FF3E00]">—</span>
            <span>VS CODE DEV SUITE</span>
            <span className="text-[#FF3E00]">—</span>
            <span>NPM &amp; NODE TOOLING</span>
            <span className="text-[#FF3E00]">—</span>
            <span>GIT &amp; GITHUB</span>
          </div>
        </div>

        {/* ─── INTERACTIVE BLUEPRINT MATRIX WITH CROSS-REFERENCE VIEWER ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          
          {/* LEFT: 3 DOMAIN ROWS (8 COLS) */}
          <div className="lg:col-span-8 divide-y-2 divide-[#0A0A09] border-y-2 border-[#0A0A09]">
            {domains.map((dom) => (
              <div key={dom.code} className="py-6 sm:py-8 space-y-4">
                
                {/* Domain Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-xs font-bold text-[#FF3E00] bg-[#0A0A09] text-white px-2 py-0.5">
                      {dom.code}
                    </span>
                    <h3 className="font-syne text-xl sm:text-2xl font-black text-[#0A0A09] tracking-tight uppercase">
                      {dom.title}
                    </h3>
                  </div>
                  <span className="font-mono-tech text-[11px] text-[#78756E]">
                    {dom.desc}
                  </span>
                </div>

                {/* Inline Monospace Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {dom.skills.map((skillName) => {
                    const refData = skillCrossReferences[skillName];
                    const isSelected = activeSkillHover?.name === (refData?.name || skillName);

                    return (
                      <button
                        key={skillName}
                        onClick={() => refData && setActiveSkillHover(refData)}
                        onMouseEnter={() => refData && setActiveSkillHover(refData)}
                        data-cursor="INSPECT"
                        className={`font-mono-tech text-xs sm:text-sm font-bold uppercase px-3 py-1.5 border transition-all ${
                          isSelected
                            ? 'bg-[#FF3E00] text-[#0A0A09] border-[#FF3E00] shadow-[2px_2px_0px_#0A0A09] -translate-y-0.5'
                            : 'bg-white text-[#0A0A09] border-[#0A0A09] hover:bg-[#0A0A09] hover:text-white'
                        }`}
                      >
                        [{skillName}]
                        {refData && (
                          <span className="ml-1.5 text-[10px] opacity-70">
                            {refData.projectCount}/9
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: DYNAMIC CROSS-REFERENCE BLUEPRINT HUD (4 COLS) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#0A0A09] text-[#F2EFE9] border-2 border-[#0A0A09] p-6 shadow-[8px_8px_0px_#FF3E00] space-y-4">
              
              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-[rgba(242,239,233,0.18)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse" />
                  <span className="font-mono-tech text-[10px] tracking-widest text-[#F2EFE9] uppercase font-bold">
                    ACTIVE NODE AUDIT
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] text-[#78756E]">
                  {activeSkillHover?.code || 'SYS-REF'}
                </span>
              </div>

              {/* Active Skill Title */}
              <div>
                <span className="font-mono-tech text-[10px] text-[#78756E] uppercase block mb-1">
                  SELECTED CRAFT DOMAIN
                </span>
                <h4 className="font-syne text-3xl font-black text-[#F2EFE9] uppercase tracking-tight">
                  {activeSkillHover?.name || 'SELECT A SKILL'}
                </h4>
              </div>

              {/* Utilization Metrics */}
              <div className="bg-[rgba(242,239,233,0.06)] p-3 border border-[rgba(242,239,233,0.12)] flex items-center justify-between font-mono-tech text-xs">
                <span className="text-[#78756E]">PORTFOLIO DEPLOYMENT:</span>
                <span className="font-bold text-[#FF3E00]">
                  {activeSkillHover?.projectCount || 0} OF 09 PRODUCTION RELEASES
                </span>
              </div>

              {/* Linked Projects Breakdown */}
              <div className="space-y-2 pt-2 border-t border-[rgba(242,239,233,0.12)]">
                <span className="font-mono-tech text-[10px] text-[#78756E] uppercase block">
                  VERIFIED IMPLEMENTATION IN:
                </span>
                <div className="space-y-1.5 font-mono-tech text-xs">
                  {activeSkillHover?.projectNames.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-center gap-2 text-[#F2EFE9]/90 bg-[rgba(242,239,233,0.04)] px-2.5 py-1 border border-[rgba(242,239,233,0.08)]"
                    >
                      <span className="text-[#FF3E00]">↳</span>
                      <span className="truncate">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono-tech text-[#78756E] flex items-center justify-between border-t border-[rgba(242,239,233,0.12)]">
                <span>STATUS: HIGH CONCURRENCY</span>
                <span>ZERO DRIFT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TRANSITION TO SECTION 04: HORIZONTAL CURTAIN COMPRESSION (OBSIDIAN) ─── */}
      <div
        ref={compressionCurtainRef}
        className="absolute inset-x-0 bottom-0 h-24 bg-[#0A0A09] pointer-events-none z-20"
      />
    </section>
  );
};

export default KineticSkillsMatrix;

