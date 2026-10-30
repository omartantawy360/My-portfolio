import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillNode {
  id: string;
  name: string;
  category: 'frontend' | 'languages' | 'tools';
  scale: string;
  color: string;
  bg: string;
  role: string;
  coords: { x: number; y: number };
}

const skillUniverse: SkillNode[] = [
  // FRONTEND CLUSTER
  {
    id: 'react',
    name: 'REACT 19',
    category: 'frontend',
    scale: 'text-3xl sm:text-5xl lg:text-7xl font-black',
    color: '#20201E',
    bg: '#D7FF45',
    role: 'Concurrent rendering, custom hooks architecture & state machines',
    coords: { x: 12, y: 18 },
  },
  {
    id: 'typescript',
    name: 'TYPESCRIPT',
    category: 'frontend',
    scale: 'text-2xl sm:text-4xl lg:text-6xl font-black',
    color: '#304FFE',
    bg: '#FFFFFF',
    role: 'Strict static type systems, generic interfaces & robust type safety',
    coords: { x: 48, y: 14 },
  },
  {
    id: 'tailwind',
    name: 'TAILWIND CSS',
    category: 'frontend',
    scale: 'text-xl sm:text-3xl lg:text-5xl font-black',
    color: '#20201E',
    bg: '#FFB7D5',
    role: 'Design token architecture, modern layout engines & responsive UX',
    coords: { x: 72, y: 24 },
  },
  {
    id: 'htmlcss',
    name: 'HTML5 / CSS3',
    category: 'frontend',
    scale: 'text-lg sm:text-2xl lg:text-4xl font-black',
    color: '#20201E',
    bg: '#FFFFFF',
    role: 'Semantic document tree, accessibility compliance & CSS Grid/Flexbox',
    coords: { x: 22, y: 36 },
  },
  {
    id: 'bootstrap',
    name: 'BOOTSTRAP 5',
    category: 'frontend',
    scale: 'text-base sm:text-xl lg:text-3xl font-bold font-mono',
    color: '#304FFE',
    bg: '#EFF3FF',
    role: 'Rapid layout prototyping, responsive grid systems & utility classes',
    coords: { x: 58, y: 34 },
  },

  // LANGUAGES CLUSTER
  {
    id: 'javascript',
    name: 'JAVASCRIPT (ES6+)',
    category: 'languages',
    scale: 'text-2xl sm:text-4xl lg:text-6xl font-black',
    color: '#20201E',
    bg: '#D7FF45',
    role: 'Asynchronous event loops, DOM engineering & modern browser APIs',
    coords: { x: 14, y: 52 },
  },
  {
    id: 'cpp',
    name: 'C++ PROGRAMMING',
    category: 'languages',
    scale: 'text-xl sm:text-3xl lg:text-5xl font-black',
    color: '#FF4B35',
    bg: '#FFFFFF',
    role: 'Algorithmic logic, computational memory fundamentals & data structures',
    coords: { x: 50, y: 54 },
  },
  {
    id: 'python',
    name: 'PYTHON',
    category: 'languages',
    scale: 'text-lg sm:text-2xl lg:text-4xl font-black font-mono',
    color: '#20201E',
    bg: '#FFFDF0',
    role: 'Automation scripting, backend utilities & data logic orchestration',
    coords: { x: 78, y: 56 },
  },

  // TOOLS CLUSTER
  {
    id: 'git',
    name: 'GIT & GITHUB',
    category: 'tools',
    scale: 'text-2xl sm:text-4xl lg:text-5xl font-black',
    color: '#20201E',
    bg: '#FF4B35',
    role: 'Distributed version control, branching strategies & CI/CD deployment',
    coords: { x: 18, y: 74 },
  },
  {
    id: 'node',
    name: 'NPM & NODE',
    category: 'tools',
    scale: 'text-xl sm:text-3xl lg:text-4xl font-black',
    color: '#304FFE',
    bg: '#FFFFFF',
    role: 'Package management, dependency orchestration & tooling pipelines',
    coords: { x: 44, y: 78 },
  },
  {
    id: 'emailjs',
    name: 'EMAILJS',
    category: 'tools',
    scale: 'text-base sm:text-2xl lg:text-3xl font-bold font-mono',
    color: '#20201E',
    bg: '#D7FF45',
    role: 'Client-side transactional messaging & serverless dispatch delivery',
    coords: { x: 68, y: 76 },
  },
  {
    id: 'vscode',
    name: 'VS CODE',
    category: 'tools',
    scale: 'text-base sm:text-xl lg:text-3xl font-bold font-mono',
    color: '#304FFE',
    bg: '#FFFFFF',
    role: 'Productivity extensions, debug suites & modern development workspace',
    coords: { x: 84, y: 86 },
  },
];

const connections = [
  { from: 'react', to: 'typescript' },
  { from: 'typescript', to: 'javascript' },
  { from: 'react', to: 'tailwind' },
  { from: 'tailwind', to: 'htmlcss' },
  { from: 'htmlcss', to: 'bootstrap' },
  { from: 'javascript', to: 'node' },
  { from: 'javascript', to: 'cpp' },
  { from: 'cpp', to: 'python' },
  { from: 'node', to: 'git' },
  { from: 'git', to: 'vscode' },
  { from: 'react', to: 'emailjs' },
];

const clusters = [
  {
    id: 'frontend',
    number: '01',
    title: 'FRONTEND ARCHITECTURE',
    badge: '5 NODES',
    badgeBg: 'bg-[#D7FF45] text-[#20201E]',
    description: 'Concurrent rendering, component design systems, and responsive layouts.',
  },
  {
    id: 'languages',
    number: '02',
    title: 'SYSTEM LANGUAGES',
    badge: '3 NODES',
    badgeBg: 'bg-[#FF4B35] text-white',
    description: 'Modern asynchronous JavaScript, computational C++, and Python scripting.',
  },
  {
    id: 'tools',
    number: '03',
    title: 'TOOLCHAIN & RUNTIME',
    badge: '4 NODES',
    badgeBg: 'bg-[#304FFE] text-white',
    description: 'Distributed git workflows, dependency management, and developer tooling.',
  },
];

const SwissSkillsUniverse: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [selectedMobileNode, setSelectedMobileNode] = useState<SkillNode>(skillUniverse[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ─── DESKTOP CONSTELLATION TIMELINE (>= 1024px) ───
    mm.add('(min-width: 1024px)', () => {
      const paths = svgRef.current?.querySelectorAll('path');
      const nodes = canvasRef.current?.querySelectorAll('.skill-node');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      if (paths && paths.length > 0) {
        paths.forEach((p) => {
          const length = (p as SVGPathElement).getTotalLength?.() || 300;
          gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(p, { strokeDashoffset: 0, ease: 'none' }, 0);
        });
      }

      if (nodes && nodes.length > 0) {
        tl.fromTo(
          nodes,
          { scale: 0.85, opacity: 0.4 },
          { scale: 1, opacity: 1, stagger: 0.05, ease: 'power2.out' },
          0
        );
      }
    });

    // ─── MOBILE SCROLL-DRIVEN SCRUB TIMELINE (< 1024px) ───
    mm.add('(max-width: 1023px)', () => {
      const mobileCards = mobileRef.current?.querySelectorAll('.mobile-cluster-card');
      if (mobileCards && mobileCards.length > 0) {
        mobileCards.forEach((card) => {
          const pills = card.querySelectorAll('.mobile-skill-pill');
          gsap.fromTo(
            pills,
            { opacity: 0.35, y: 16, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0.6,
              },
            }
          );
        });
      }
    });

    return () => mm.revert();
  }, []);

  // Connected nodes lookup helper
  const getConnectedNodes = (nodeId: string) => {
    const connectedIds = connections
      .filter((c) => c.from === nodeId || c.to === nodeId)
      .map((c) => (c.from === nodeId ? c.to : c.from));
    return skillUniverse.filter((s) => connectedIds.includes(s.id));
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 sm:py-28 bg-[#FAF8F5] text-[#20201E] border-b-4 border-[#20201E] overflow-hidden select-none scroll-mt-16"
    >
      {/* Background Graphic Blueprint Watermark */}
      <div className="absolute left-4 sm:left-6 top-8 font-mono text-[18vw] font-black text-[#20201E]/[0.03] pointer-events-none select-none leading-none">
        UNIVERSE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#20201E] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#FF4B35] tracking-widest mb-1">
              <span className="w-2.5 h-2.5 bg-[#FF4B35]" />
              <span>[05] // INTERCONNECTED SKILL SYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#20201E]">
              Typographic Universe
            </h2>
          </div>

          {/* Interactive Cluster Highlighter */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
            <span className="text-[#20201E]/60 uppercase mr-1 text-[11px]">FILTER:</span>
            {[
              { id: 'all', label: 'ALL [12]', bg: 'bg-[#20201E] text-white' },
              { id: 'frontend', label: 'FRONTEND [05]', bg: 'bg-[#D7FF45] text-[#20201E]' },
              { id: 'languages', label: 'LANGUAGES [03]', bg: 'bg-[#FF4B35] text-white' },
              { id: 'tools', label: 'TOOLS [04]', bg: 'bg-[#304FFE] text-white' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                data-cursor="FILTER"
                className={`px-2.5 sm:px-3 py-1 border-2 border-[#20201E] uppercase text-[11px] sm:text-xs transition-all ${
                  filterCategory === cat.id
                    ? `${cat.bg} shadow-[2px_2px_0px_#20201E]`
                    : 'bg-white text-[#20201E] hover:bg-[#F7F3E8] shadow-[1px_1px_0px_#20201E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── MOBILE & TABLET RESPONSIVE KINETIC MATRIX (< 1024px) ─── */}
        <div ref={mobileRef} className="block lg:hidden space-y-6">
          {/* Active Skill Telemetry HUD on Mobile */}
          <div className="bg-[#20201E] text-white border-3 border-[#20201E] p-4 shadow-[5px_5px_0px_#FF4B35] transition-all">
            <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D7FF45] animate-ping" />
                <span className="font-mono text-xs font-black text-[#D7FF45] uppercase">
                  ACTIVE SPEC: {selectedMobileNode.name}
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase bg-white/20 px-2 py-0.5 font-bold">
                {selectedMobileNode.category}
              </span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-mono mb-3">
              {selectedMobileNode.role}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10 font-mono text-[10px]">
              <span className="text-white/50 uppercase">INTERCONNECTED:</span>
              {getConnectedNodes(selectedMobileNode.id).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedMobileNode(c)}
                  className="px-1.5 py-0.5 bg-white/10 hover:bg-[#D7FF45] hover:text-[#20201E] border border-white/20 text-[#D7FF45] transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Clusters with Staggered ScrollTrigger Scrub */}
          {clusters.map((cluster) => {
            const clusterNodes = skillUniverse.filter((s) => s.category === cluster.id);
            const isCategoryMatch = filterCategory === 'all' || filterCategory === cluster.id;

            if (!isCategoryMatch) return null;

            return (
              <div
                key={cluster.id}
                className="mobile-cluster-card bg-white border-3 border-[#20201E] p-4 sm:p-6 shadow-[5px_5px_0px_#20201E]"
              >
                <div className="flex items-center justify-between border-b-2 border-[#20201E] pb-2 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-black text-[#20201E]">
                    <span className="text-[#FF4B35] font-black">{cluster.number}.</span>
                    <span>{cluster.title}</span>
                  </div>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border border-[#20201E] ${cluster.badgeBg}`}>
                    {cluster.badge}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#20201E]/70 mb-3 leading-relaxed">
                  {cluster.description}
                </p>

                {/* Skill Pills in Cluster */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {clusterNodes.map((node) => {
                    const isSelected = selectedMobileNode.id === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedMobileNode(node)}
                        className={`mobile-skill-pill text-left px-3 py-1.5 border-2 border-[#20201E] font-black tracking-tight text-xs sm:text-sm uppercase transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#FF4B35] text-white shadow-[3px_3px_0px_#20201E] scale-105 -rotate-1 z-10'
                            : 'bg-[#FAF8F5] text-[#20201E] shadow-[2px_2px_0px_#20201E] active:scale-95'
                        }`}
                        style={{
                          backgroundColor: isSelected ? '#FF4B35' : node.bg,
                          color: isSelected ? '#FFFFFF' : node.color,
                        }}
                      >
                        <span>{node.name}</span>
                        {isSelected && <span className="ml-1 text-[10px]">●</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── DESKTOP TYPOGRAPHIC CONSTELLATION POSTER STAGE (>= 1024px) ─── */}
        <div
          ref={canvasRef}
          className="hidden lg:block relative min-h-[640px] xl:min-h-[700px] bg-white border-4 border-[#20201E] p-8 lg:p-12 shadow-[8px_8px_0px_#20201E] overflow-hidden"
        >
          {/* SVG Interconnected Vector Lines Layer */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          >
            {connections.map((conn, idx) => {
              const fromNode = skillUniverse.find((s) => s.id === conn.from);
              const toNode = skillUniverse.find((s) => s.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted =
                hoveredNode &&
                (hoveredNode.id === conn.from || hoveredNode.id === conn.to);

              return (
                <path
                  key={idx}
                  d={`M ${fromNode.coords.x}% ${fromNode.coords.y}% Q ${(fromNode.coords.x + toNode.coords.x) / 2}% ${(fromNode.coords.y + toNode.coords.y) / 2 - 4}%, ${toNode.coords.x}% ${toNode.coords.y}%`}
                  fill="none"
                  stroke={isHighlighted ? '#FF4B35' : '#20201E'}
                  strokeWidth={isHighlighted ? '3' : '1.5'}
                  strokeDasharray={isHighlighted ? 'none' : '4 6'}
                  className="transition-all duration-300"
                  opacity={
                    filterCategory !== 'all' &&
                    fromNode.category !== filterCategory &&
                    toNode.category !== filterCategory
                      ? 0.1
                      : isHighlighted
                      ? 1
                      : 0.35
                  }
                />
              );
            })}
          </svg>

          {/* Dynamic Typography Nodes Arranged Across Composition */}
          <div className="relative z-10 w-full h-full min-h-[580px] xl:min-h-[640px]">
            {skillUniverse.map((node) => {
              const isMatch = filterCategory === 'all' || node.category === filterCategory;
              const isHovered = hoveredNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  style={{
                    left: `${node.coords.x}%`,
                    top: `${node.coords.y}%`,
                  }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`skill-node absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 select-none ${
                    isMatch ? 'opacity-100' : 'opacity-20 scale-95'
                  }`}
                  data-cursor="NODE"
                >
                  <div
                    className={`inline-block px-3 py-1 lg:px-4 lg:py-1.5 border-2 border-[#20201E] tracking-tight leading-none uppercase transition-all duration-300 ${
                      node.scale
                    } ${
                      isHovered
                        ? 'bg-[#FF4B35] text-white shadow-[6px_6px_0px_#20201E] scale-110 -rotate-1 z-30'
                        : 'shadow-[3px_3px_0px_#20201E] hover:shadow-[5px_5px_0px_#20201E]'
                    }`}
                    style={{
                      backgroundColor: isHovered ? '#FF4B35' : node.bg,
                      color: isHovered ? '#FFFFFF' : node.color,
                    }}
                  >
                    {node.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Skill Dynamic Annotation HUD Plate (Revealed on Hover) */}
          {hoveredNode && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-[#20201E] text-white border-2 border-white p-4 shadow-[4px_4px_0px_#D7FF45] z-40 animate-fade-in font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2">
                <span className="font-black text-[#D7FF45] uppercase">
                  NODE: {hoveredNode.name}
                </span>
                <span className="text-[10px] uppercase bg-white/20 px-2 py-0.5">
                  {hoveredNode.category}
                </span>
              </div>
              <p className="text-white/85 leading-relaxed">{hoveredNode.role}</p>
            </div>
          )}

          {/* Static Ambient Instruction (when no node hovered) */}
          {!hoveredNode && (
            <div className="absolute bottom-4 left-4 font-mono text-xs text-[#20201E]/60 bg-[#FAF8F5] border border-[#20201E]/30 px-3 py-1 pointer-events-none">
              ✦ HOVER SKILL TO TRACE INTERCONNECTED GRAPH
            </div>
          )}
        </div>

        {/* ─── CLUSTER LEDGER SUMMARY BAR (DESKTOP) ─── */}
        <div className="hidden lg:grid grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 bg-white border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E]">
            <div className="flex items-center justify-between mb-1.5 font-bold">
              <span className="text-[#20201E]">01. FRONTEND CORE</span>
              <span className="bg-[#D7FF45] px-1.5 py-0.2 border border-[#20201E]">5 NODES</span>
            </div>
            <p className="text-[#20201E]/70 leading-relaxed">
              React 19, TypeScript, Tailwind CSS, Bootstrap 5, HTML5 &amp; CSS3.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E]">
            <div className="flex items-center justify-between mb-1.5 font-bold">
              <span className="text-[#20201E]">02. SYSTEM LANGUAGES</span>
              <span className="bg-[#FF4B35] text-white px-1.5 py-0.2 border border-[#20201E]">3 NODES</span>
            </div>
            <p className="text-[#20201E]/70 leading-relaxed">
              JavaScript (ES6+), C++ Programming, Python.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E]">
            <div className="flex items-center justify-between mb-1.5 font-bold">
              <span className="text-[#20201E]">03. TOOLCHAIN &amp; RUNTIME</span>
              <span className="bg-[#304FFE] text-white px-1.5 py-0.2 border border-[#20201E]">4 NODES</span>
            </div>
            <p className="text-[#20201E]/70 leading-relaxed">
              Git &amp; GitHub, EmailJS, VS Code, npm &amp; Node.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SwissSkillsUniverse;
