import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

/* ─── Mode Card Data ─── */
interface ModeCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  accentFrom: string;
  accentTo: string;
  glowColor: string;
  desktopOnly?: boolean;
}

const ModeSelector: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Cursor trailer (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        window.requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          }
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const handleCardClick = (card: ModeCard) => {
    if (card.desktopOnly && isMobile) {
      // Still navigate — the ThreeDWorldPage will show the 2D fallback
      navigate(card.route);
    } else {
      navigate(card.route);
    }
  };

  const modes: ModeCard[] = [
    {
      id: 'kinetic',
      title: 'Kinetic Archive (V5)',
      subtitle: 'OBSIDIAN & SCROLL-DRIVEN V5',
      description: 'The ultra-refined, high-craft Kinetic Swiss Archival portfolio. Featuring Lenis smooth scroll, split-gate hero, odometer split-stage exhibition, and velocity skew.',
      route: '/v5',
      accentFrom: 'from-orange-500',
      accentTo: 'to-amber-500',
      glowColor: 'vermilion',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      id: 'editorial',
      title: 'Swiss Kinetic Edition',
      subtitle: 'LIGHT & SCROLL-DRIVEN V4',
      description: 'An experimental light editorial portfolio featuring Swiss design discipline, kinetic typography, and GSAP scroll-pinned timelines.',
      route: '/editorial',
      accentFrom: 'from-amber-400',
      accentTo: 'to-rose-500',
      glowColor: 'orange',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'dashboard',
      title: 'Cyberpunk Dashboard',
      subtitle: 'DATA COMMAND CENTER',
      description: 'Enter the data-driven cyberpunk command center. Visualize skills, stats, and projects through a futuristic interface.',
      route: '/dashboard',
      accentFrom: 'from-fuchsia-500',
      accentTo: 'to-violet-600',
      glowColor: 'fuchsia',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: '3d-world',
      title: '3D Experience',
      subtitle: 'IMMERSIVE WORLD',
      description: 'Explore an immersive 3D portfolio world. Navigate through interactive scenes showcasing projects and skills.',
      route: '/3d-world',
      accentFrom: 'from-cyan-400',
      accentTo: 'to-blue-600',
      glowColor: 'cyan',
      desktopOnly: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
    {
      id: 'classic',
      title: 'Classic Resume',
      subtitle: 'CLEAN 2D PORTFOLIO',
      description: 'A clean, fast, and professional 2D resume layout. Optimized for quick reading and accessibility.',
      route: '/classic',
      accentFrom: 'from-purple-500',
      accentTo: 'to-indigo-600',
      glowColor: 'purple',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-fuchsia-500/30 transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Cursor trailer (desktop) */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[1] mix-blend-screen transition-transform duration-150 ease-out hidden lg:block"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, rgba(217, 70, 239, 0) 70%)',
          }}
        />
      )}

      {/* ─── Animated Background ─── */}
      {/* Mesh gradient blobs */}
      <div className="absolute top-[10vh] left-[5vw] w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[50vh] right-[5vw] w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[10vh] left-[15vw] w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute top-[20%] right-[20%] w-16 h-16 border border-fuchsia-500/20 rotate-45 animate-float-shape pointer-events-none" />
      <div className="absolute bottom-[30%] left-[10%] w-10 h-10 border border-cyan-500/15 rotate-12 animate-float-shape pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[60%] right-[8%] w-6 h-6 bg-fuchsia-500/10 rounded-full animate-float-shape pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 pb-24">
        {/* Header section */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 text-fuchsia-400 text-xs font-bold tracking-widest uppercase animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500" />
            </span>
            PORTFOLIO HUB
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500">
              Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Welcome to <span className="text-white font-semibold">Omar Tantawy's</span> portfolio.
            Select a viewing mode that suits your vibe.
          </p>
        </div>

        {/* Mode Cards Grid (5 Editions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {modes.map((mode, index) => (
            <button
              key={mode.id}
              onClick={() => handleCardClick(mode)}
              onMouseEnter={() => setHoveredCard(mode.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`mode-card group relative text-left rounded-2xl p-5 lg:p-6 border transition-all duration-500 animate-fade-in-up flex flex-col justify-between ${
                hoveredCard === mode.id
                  ? mode.glowColor === 'vermilion'
                    ? 'border-[#FF3E00]/60 bg-slate-900/85 -translate-y-2 shadow-2xl'
                    : mode.glowColor === 'orange'
                    ? 'border-orange-500/40 bg-slate-900/70 -translate-y-2 shadow-2xl'
                    : 'border-fuchsia-500/40 bg-slate-900/70 -translate-y-2 shadow-2xl'
                  : 'border-white/5 bg-slate-950/50 hover:border-white/10'
              }`}
              style={{
                animationDelay: `${0.2 + index * 0.12}s`,
                backdropFilter: 'blur(20px)',
                boxShadow: hoveredCard === mode.id
                  ? mode.glowColor === 'vermilion'
                    ? '0 20px 60px rgba(255, 62, 0, 0.25), 0 0 0 1px rgba(255, 62, 0, 0.2)'
                    : mode.glowColor === 'orange'
                    ? '0 20px 60px rgba(249, 115, 22, 0.18), 0 0 0 1px rgba(249, 115, 22, 0.1)'
                    : mode.glowColor === 'fuchsia'
                    ? '0 20px 60px rgba(217, 70, 239, 0.15), 0 0 0 1px rgba(217, 70, 239, 0.1)'
                    : mode.glowColor === 'cyan'
                    ? '0 20px 60px rgba(34, 211, 238, 0.12), 0 0 0 1px rgba(34, 211, 238, 0.1)'
                    : '0 20px 60px rgba(168, 85, 247, 0.12), 0 0 0 1px rgba(168, 85, 247, 0.1)'
                  : 'none',
              }}
            >
              {/* Gradient top line */}
              <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${mode.accentFrom} ${mode.accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon container */}
              <div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-all duration-500 ${
                  hoveredCard === mode.id
                    ? `bg-gradient-to-br ${mode.accentFrom} ${mode.accentTo} border-transparent text-white shadow-lg`
                    : 'border-white/10 bg-white/5 text-slate-400 group-hover:text-white group-hover:border-white/20'
                }`}>
                  {mode.icon}
                </div>

                {/* Subtitle / label */}
                <p className={`text-[10px] font-bold tracking-[0.2em] mb-2 transition-colors duration-300 ${
                  hoveredCard === mode.id
                    ? mode.glowColor === 'orange'
                      ? 'text-orange-400'
                      : 'text-fuchsia-400'
                    : 'text-slate-600'
                }`}>
                  {mode.subtitle}
                </p>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {mode.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-6 group-hover:text-slate-400 transition-colors">
                  {mode.description}
                </p>
              </div>

              {/* Footer: action + badge */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 w-full">
                <span className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                  hoveredCard === mode.id
                    ? mode.glowColor === 'orange'
                      ? 'text-orange-400'
                      : 'text-fuchsia-400'
                    : 'text-slate-600'
                }`}>
                  Enter →
                </span>

                {/* Desktop Only badge for 3D */}
                {mode.desktopOnly && isMobile && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold tracking-wide">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    2D MODE
                  </span>
                )}

                {mode.desktopOnly && !isMobile && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-wide">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    DESKTOP
                  </span>
                )}
              </div>

              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
                    mode.glowColor === 'orange'
                      ? 'rgba(249, 115, 22, 0.05)'
                      : mode.glowColor === 'fuchsia'
                      ? 'rgba(217, 70, 239, 0.04)'
                      : mode.glowColor === 'cyan'
                      ? 'rgba(34, 211, 238, 0.04)'
                      : 'rgba(168, 85, 247, 0.04)'
                  }, transparent 40%)`,
                }}
              />
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-slate-600 text-xs tracking-widest uppercase">
            Scroll-free · Just pick a mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
