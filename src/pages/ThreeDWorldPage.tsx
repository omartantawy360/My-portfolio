import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

/* ═══════════════════════════════════════════════════════════
   3D WORLD PAGE — /3d-world
   Immersive React Three Fiber scene with floating tech island.
   Falls back to a premium 2D layout on mobile devices.
   ═══════════════════════════════════════════════════════════ */

/* ─── Lazy-load R3F to avoid loading Three.js on mobile ─── */
const ThreeScene = React.lazy(() => import('../components/ThreeScene'));
/* ─── Loading Spinner ─── */
const LoadingSpinner: React.FC = () => (
  <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-950">
    <div className="relative w-20 h-20 mb-6">
      <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-fuchsia-500 animate-spin" />
      <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-fuchsia-500 animate-pulse" />
      </div>
    </div>
    <p className="text-fuchsia-400 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
      LOADING 3D WORLD
    </p>
    <p className="text-slate-600 text-[10px] font-mono mt-2">Initializing WebGL context...</p>
  </div>
);

/* ─── Mobile 2D Fallback ─── */
const MobileFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Animated floating CSS shapes */}
      <div className="absolute top-[15%] left-[10%] w-24 h-24 border border-fuchsia-500/15 rounded-2xl rotate-12 animate-float-shape pointer-events-none" />
      <div className="absolute top-[30%] right-[8%] w-16 h-16 border border-cyan-500/15 rounded-full animate-float-shape pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[25%] left-[15%] w-20 h-20 border border-violet-500/10 rotate-45 animate-float-shape pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[60%] right-[15%] w-12 h-12 bg-fuchsia-500/5 rounded-lg rotate-[30deg] animate-float-shape pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[10%] right-[30%] w-8 h-8 bg-cyan-500/8 rounded-full animate-float-shape pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-[40%] right-[5%] w-14 h-14 border border-pink-500/10 rounded-xl rotate-[60deg] animate-float-shape pointer-events-none" style={{ animationDelay: '2.5s' }} />

      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-600/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-fuchsia-500/20 animate-pulse" style={{ animationDuration: '3s' }}>
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          MOBILE EXPERIENCE
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-500 to-cyan-400">
            3D World
          </span>
        </h1>

        <p className="text-slate-400 text-base leading-relaxed">
          The immersive 3D experience requires a desktop browser with WebGL support.
          Here's a mobile-optimized preview of what awaits you.
        </p>

        {/* Feature cards */}
        <div className="space-y-3 text-left">
          {[
            { icon: '💻', title: 'Project Console', desc: 'Interactive 3D laptop showcasing all projects', color: 'fuchsia' },
            { icon: '🔮', title: 'Skills Crystal', desc: 'Floating sphere revealing the full tech stack', color: 'cyan' },
            { icon: '🌀', title: 'Portal Gate', desc: 'Dimensional gateway back to the Hub', color: 'violet' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 backdrop-blur-sm`}>
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link to="/dashboard"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-bold text-center shadow-lg shadow-fuchsia-500/20 active:scale-95 transition-transform">
            Try Dashboard Instead
          </Link>
          <Link to="/"
            className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm font-bold text-center hover:bg-white/10 transition-all active:scale-95">
            ← Back to Hub
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */
const ThreeDWorldPage: React.FC = () => {
  const isMobile = useIsMobile();

  // Mobile → render 2D fallback
  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <div className="w-screen h-screen bg-slate-950 relative overflow-hidden">
      {/* Back to Hub button */}
      <Link to="/"
        className="fixed top-4 left-4 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 text-slate-400 text-xs font-semibold hover:text-white hover:border-fuchsia-500/30 transition-all group shadow-lg">
        <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Hub
      </Link>

      {/* HUD overlay — top right */}
      <div className="fixed top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 backdrop-blur-xl border border-white/5 text-[10px] font-mono text-slate-600">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>3D_WORLD // WEBGL</span>
      </div>

      {/* Instructions HUD — bottom center */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-5 py-2.5 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/5 text-[10px] font-semibold text-slate-500 pointer-events-none select-none">
        <span className="animate-pulse">🖱️ Scroll to explore</span>
        <span className="w-px h-3 bg-white/10" />
        <span>📍 Scroll inside monitor for details</span>
      </div>

      {/* 3D Canvas */}
      <Suspense fallback={<LoadingSpinner />}>
        <ThreeScene />
      </Suspense>
    </div>
  );
};

export default ThreeDWorldPage;
