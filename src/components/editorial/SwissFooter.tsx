import React from 'react';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../data/portfolioData';

const editions = [
  { id: 'classic', label: 'Classic Portfolio', route: '/classic', tag: '2D RESUME' },
  { id: '3d-world', label: '3D World Experience', route: '/3d-world', tag: 'IMMERSIVE' },
  { id: 'dashboard', label: 'Cyberpunk Command', route: '/dashboard', tag: 'CYBERPUNK' },
  { id: 'editorial', label: 'Swiss Kinetic Edition', route: '/editorial', tag: 'ED. 04', current: true },
  { id: 'kinetic', label: 'Kinetic Archive (V5)', route: '/v5', tag: 'ED. 05' },
];

const SwissFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F7F3E8] text-[#20201E] pt-20 pb-12 overflow-hidden border-t-4 border-[#20201E]">
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Top Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Identity & Colophon */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#FF4B35] border border-[#20201E]" />
              <span className="font-black text-lg tracking-tight">OMAR TANTAWY</span>
            </div>
            <p className="text-xs font-mono text-[#20201E]/80 leading-relaxed max-w-sm">
              Creative Front-End Developer &amp; UI Architect. Designing and implementing high-impact,
              accessible web experiences with tactile motion choreography.
            </p>
            <div className="font-mono text-xs font-bold text-[#FF4B35]">
              CAIRO, EGYPT · GMT+2 · OPEN FOR COMMISSIONS
            </div>
          </div>

          {/* Site Navigation */}
          <div className="lg:col-span-3 space-y-2 font-mono text-xs">
            <span className="font-black text-[10px] text-[#20201E]/60 uppercase tracking-widest block mb-2">
              {'//'} SITE INDEX
            </span>
            <ul className="space-y-1.5 font-bold">
              <li><a href="#hero" className="hover:text-[#FF4B35] transition-colors">01. HERO</a></li>
              <li><a href="#manifesto" className="hover:text-[#FF4B35] transition-colors">02. MANIFESTO</a></li>
              <li><a href="#about" className="hover:text-[#FF4B35] transition-colors">03. ABOUT</a></li>
              <li><a href="#works" className="hover:text-[#FF4B35] transition-colors">04. WORKS</a></li>
              <li><a href="#skills" className="hover:text-[#FF4B35] transition-colors">05. ARSENAL</a></li>
              <li><a href="#credentials" className="hover:text-[#FF4B35] transition-colors">06. CREDENTIALS</a></li>
              <li><a href="#contact" className="hover:text-[#FF4B35] transition-colors">07. TRANSMISSION</a></li>
            </ul>
          </div>

          {/* 4-Edition Switcher */}
          <div className="lg:col-span-4 space-y-2 font-mono text-xs">
            <span className="font-black text-[10px] text-[#20201E]/60 uppercase tracking-widest block mb-2">
              {'//'} SWITCH PORTFOLIO EDITION
            </span>
            <div className="space-y-1.5">
              {editions.map((ed) => (
                <Link
                  key={ed.id}
                  to={ed.route}
                  data-cursor={ed.current ? 'ACTIVE' : 'SWITCH'}
                  className={`p-2.5 border-2 border-[#20201E] flex items-center justify-between font-bold transition-all ${
                    ed.current
                      ? 'bg-[#D7FF45] text-[#20201E] shadow-[2px_2px_0px_#20201E]'
                      : 'bg-white hover:bg-[#FAF8F5] text-[#20201E] shadow-[2px_2px_0px_#20201E] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#20201E]'
                  }`}
                >
                  <span>{ed.label}</span>
                  <span className="text-[10px] bg-[#20201E] text-white px-1.5 py-0.5">
                    {ed.tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Massive Outlined Typographic Signoff */}
        <div className="border-y-2 border-[#20201E] py-6 overflow-hidden select-none">
          <div className="text-center font-black tracking-tighter text-5xl sm:text-7xl md:text-9xl text-[#20201E]">
            TANTAWY
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold text-[#20201E]">
          <div>© {new Date().getFullYear()} OMAR TANTAWY. ALL RIGHTS RESERVED.</div>

          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF4B35] transition-colors"
              >
                {s.name.toUpperCase()}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="px-3 py-1 bg-white hover:bg-[#D7FF45] border-2 border-[#20201E] shadow-[2px_2px_0px_#20201E] flex items-center gap-1.5"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default SwissFooter;

