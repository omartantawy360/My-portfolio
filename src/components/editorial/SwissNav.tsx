import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Hero', href: '#hero', index: '01' },
  { label: 'Ethos', href: '#manifesto', index: '02' },
  { label: 'About', href: '#about', index: '03' },
  { label: 'Works', href: '#works', index: '04' },
  { label: 'Skills', href: '#skills', index: '05' },
  { label: 'Credentials', href: '#credentials', index: '06' },
  { label: 'Contact', href: '#contact', index: '07' },
];

const SwissNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cairoTime, setCairoTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Cairo',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setCairoTime(timeStr);
      } catch {
        setCairoTime('23:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ['hero', 'manifesto', 'about', 'works', 'skills', 'credentials', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 64;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-[#20201E] bg-[#F7F3E8] h-14 md:h-16 flex items-center ${
          isScrolled ? 'shadow-[0_4px_0_rgba(32,32,30,0.06)]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between gap-4">
          
          {/* Masthead Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2 group"
              data-cursor="HOME"
            >
              <div className="w-8 h-8 bg-[#FF4B35] text-white border-2 border-[#20201E] flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#20201E] group-hover:bg-[#D7FF45] group-hover:text-[#20201E] transition-colors shrink-0">
                OT
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-black text-sm tracking-tight text-[#20201E] leading-none group-hover:text-[#FF4B35] transition-colors">
                  OMAR TANTAWY
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#20201E]/60 uppercase mt-0.5">
                  ED. 04 / SWISS KINETIC
                </span>
              </div>
            </a>

            {/* Live Availability Badge (visible on wide screens) */}
            <div className="hidden 2xl:inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#20201E] bg-[#D7FF45] text-[#20201E] text-[10px] font-mono font-bold tracking-wider shadow-[1px_1px_0px_#20201E] whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B35] animate-ping" />
              <span>COMMISSIONS OPEN</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  data-cursor={item.label.toUpperCase()}
                  className={`px-2.5 py-1 font-mono text-xs font-bold transition-all border whitespace-nowrap ${
                    isActive
                      ? 'bg-[#20201E] text-[#D7FF45] border-[#20201E] shadow-[2px_2px_0px_#FF4B35]'
                      : 'border-transparent text-[#20201E] hover:border-[#20201E] hover:bg-white/80'
                  }`}
                >
                  <span className="text-[10px] mr-1 opacity-50">{item.index}.</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cairo Clock */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 border border-[#20201E] bg-white text-[11px] font-mono font-bold text-[#20201E] shadow-[2px_2px_0px_#20201E] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B35]" />
              <span>CAI {cairoTime}</span>
            </div>

            {/* Resume button */}
            <a
              href={`${process.env.PUBLIC_URL}/OMAR-TANTAWY-FlowCV-Resume-20251225.pdf`}
              download
              data-cursor="RESUME"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-[#FF4B35] hover:bg-[#20201E] text-white hover:text-[#D7FF45] border-2 border-[#20201E] font-mono font-bold text-xs shadow-[2px_2px_0px_#20201E] transition-all whitespace-nowrap"
            >
              <span>CV ↓</span>
            </a>

            {/* Hub Return Button */}
            <Link
              to="/"
              data-cursor="HUB"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#D7FF45] text-[#20201E] border-2 border-[#20201E] font-mono font-bold text-xs shadow-[2px_2px_0px_#20201E] transition-all whitespace-nowrap"
            >
              <span>HUB ⤶</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 bg-white border-2 border-[#20201E] text-[#20201E] shadow-[2px_2px_0px_#20201E]"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F7F3E8] lg:hidden flex flex-col justify-center px-8 pt-20 border-b-4 border-[#20201E]">
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-mono font-black tracking-widest text-[#FF4B35] uppercase">
              {'//'} INDEX NAVIGATION
            </span>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-baseline justify-between border-b-2 border-[#20201E] pb-2 text-2xl font-black text-[#20201E] hover:text-[#FF4B35] transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono text-sm text-[#FF4B35] font-bold">{item.index}</span>
              </a>
            ))}

            <div className="pt-6 flex flex-col gap-3">
              <a
                href={`${process.env.PUBLIC_URL}/OMAR-TANTAWY-FlowCV-Resume-20251225.pdf`}
                download
                className="w-full py-3 text-center bg-[#FF4B35] text-white font-mono font-black text-sm border-2 border-[#20201E] shadow-[4px_4px_0px_#20201E]"
              >
                DOWNLOAD CV (PDF)
              </a>
              <Link
                to="/"
                className="w-full py-3 text-center bg-white text-[#20201E] font-mono font-black text-sm border-2 border-[#20201E] shadow-[4px_4px_0px_#20201E]"
              >
                RETURN TO PORTFOLIO HUB
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SwissNav;
