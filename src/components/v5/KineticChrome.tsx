import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface KineticChromeProps {
  scrollProgress: number;
  scrollVelocity: number;
  activeSection: string;
}

const sectionMap: Record<string, { index: string; name: string }> = {
  hero: { index: '01', name: 'CURTAIN HERO' },
  projects: { index: '02', name: 'SPLIT-STAGE EXHIBITION' },
  skills: { index: '03', name: 'VELOCITY MATRIX' },
  certificates: { index: '04', name: 'ARCHIVAL LEDGER' },
  finale: { index: '05', name: 'COMMAND TERMINAL' },
};

const KineticChrome: React.FC<KineticChromeProps> = ({
  scrollProgress,
  scrollVelocity,
  activeSection,
}) => {
  const [cairoTime, setCairoTime] = useState<string>('');
  const [navDrawerOpen, setNavDrawerOpen] = useState<boolean>(false);

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
        setCairoTime('10:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentSection = sectionMap[activeSection] || { index: '01', name: 'CURTAIN HERO' };
  const formattedProgress = Math.round(scrollProgress * 100)
    .toString()
    .padStart(3, '0');
  const absVelocity = Math.min(Math.round(Math.abs(scrollVelocity)), 999);

  const scrollTo = (id: string) => {
    setNavDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ─── 1PX STRUCTURAL ARCHITECTURAL FRAME (DESKTOP 16PX INSET) ─── */}
      <div className="pointer-events-none fixed inset-0 z-40 p-2 sm:p-4 select-none">
        <div className="relative w-full h-full border border-[rgba(242,239,233,0.14)] pointer-events-none">
          
          {/* Corner Crosshairs */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF3E00]" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF3E00]" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF3E00]" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF3E00]" />

          {/* ─── TOP-LEFT TELEMETRY: IDENTITY & VERSION INDICATOR ─── */}
          <div className="pointer-events-auto absolute top-0 left-0 -translate-y-1/2 ml-4 px-3 py-0.5 bg-[#0A0A09] border border-[rgba(242,239,233,0.18)] flex items-center gap-2.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-pulse" />
            <span className="font-mono-tech text-[10px] tracking-widest uppercase text-[#F2EFE9] font-bold">
              SYS.V5 <span className="text-[#78756E]">{'//'}</span> KINETIC ARCHIVE
            </span>
          </div>

          {/* ─── TOP-RIGHT TELEMETRY: SECTION INDEX INDICATOR ─── */}
          <div className="pointer-events-auto absolute top-0 right-0 -translate-y-1/2 mr-4 px-3 py-0.5 bg-[#0A0A09] border border-[rgba(242,239,233,0.18)] flex items-center gap-2 shadow-lg">
            <span className="font-mono-tech text-[10px] tracking-widest uppercase text-[#78756E]">
              SEC —
            </span>
            <span className="font-mono-tech text-[11px] font-bold text-[#FF3E00]">
              {currentSection.index} / 05
            </span>
            <span className="hidden sm:inline font-mono-tech text-[10px] tracking-wider text-[#F2EFE9]/70 uppercase ml-1">
              [{currentSection.name}]
            </span>
          </div>

          {/* ─── BOTTOM-LEFT TELEMETRY: PROGRESS & VELOCITY METER ─── */}
          <div className="pointer-events-auto absolute bottom-0 left-0 translate-y-1/2 ml-4 px-3 py-0.5 bg-[#0A0A09] border border-[rgba(242,239,233,0.18)] flex items-center gap-3 shadow-lg">
            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[#F2EFE9]">
              <span className="text-[#78756E]">SCR:</span>
              <span className="font-bold text-[#FF3E00]">{formattedProgress}%</span>
            </div>
            <span className="w-px h-3 bg-[rgba(242,239,233,0.2)]" />
            <div className="hidden sm:flex items-center gap-1.5 font-mono-tech text-[10px] text-[#F2EFE9]">
              <span className="text-[#78756E]">VEL:</span>
              <span className="font-bold">{absVelocity} PX/S</span>
            </div>
          </div>

          {/* ─── BOTTOM-RIGHT TELEMETRY: CAIRO TIME & NAVIGATION TRIGGER ─── */}
          <div className="pointer-events-auto absolute bottom-0 right-0 translate-y-1/2 mr-4 flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-0.5 bg-[#0A0A09] border border-[rgba(242,239,233,0.18)] text-[10px] font-mono-tech text-[#F2EFE9]/80 shadow-lg">
              <span className="text-[#78756E]">LOC:</span>
              <span>CAI {cairoTime} [GMT+2]</span>
            </div>

            <button
              onClick={() => setNavDrawerOpen(!navDrawerOpen)}
              data-cursor={navDrawerOpen ? 'CLOSE' : 'INDEX'}
              className="px-3 py-0.5 bg-[#FF3E00] text-[#0A0A09] border border-[#FF3E00] font-mono-tech text-[10px] font-bold tracking-widest uppercase hover:bg-[#F2EFE9] transition-colors shadow-lg flex items-center gap-1.5"
            >
              <span>{navDrawerOpen ? '✕ CLOSE' : '☰ INDEX'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── EXPANDABLE ARCHITECTURAL NAVIGATION LEDGER DRAWER ─── */}
      {navDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A09]/95 backdrop-blur-md flex items-center justify-center p-6 select-none animate-fadeIn">
          <div className="max-w-2xl w-full border border-[rgba(242,239,233,0.2)] bg-[#0A0A09] p-6 sm:p-10 relative shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[rgba(242,239,233,0.15)] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF3E00]" />
                <span className="font-mono-tech text-xs tracking-widest text-[#F2EFE9] uppercase font-bold">
                  KINETIC ARCHIVE NAVIGATION SYSTEM // V5
                </span>
              </div>
              <button
                onClick={() => setNavDrawerOpen(false)}
                className="font-mono-tech text-xs text-[#78756E] hover:text-[#FF3E00] transition-colors"
              >
                [ESC // CLOSE]
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col divide-y divide-[rgba(242,239,233,0.08)]">
              {Object.entries(sectionMap).map(([id, meta]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  data-cursor="GOTO"
                  className="group py-4 px-2 flex items-center justify-between text-left hover:bg-[rgba(242,239,233,0.04)] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono-tech text-sm text-[#FF3E00] group-hover:translate-x-1 transition-transform">
                      [{meta.index}]
                    </span>
                    <span className="font-syne text-2xl sm:text-3xl font-extrabold text-[#F2EFE9] tracking-tight group-hover:text-[#FF3E00] transition-colors">
                      {meta.name}
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs text-[#78756E] group-hover:text-[#F2EFE9] transition-colors">
                    SECTOR #{meta.index} ↗
                  </span>
                </button>
              ))}
            </div>

            {/* Version Switcher Hub Strip */}
            <div className="mt-8 pt-6 border-t border-[rgba(242,239,233,0.15)] flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-[#78756E]">
              <span>SWITCH TO OTHER EDITIONS:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/classic" className="px-2 py-1 border border-[rgba(242,239,233,0.2)] hover:text-[#F2EFE9] hover:border-[#F2EFE9]">
                  V1 CLASSIC
                </Link>
                <Link to="/3d-world" className="px-2 py-1 border border-[rgba(242,239,233,0.2)] hover:text-[#F2EFE9] hover:border-[#F2EFE9]">
                  V2 3D
                </Link>
                <Link to="/dashboard" className="px-2 py-1 border border-[rgba(242,239,233,0.2)] hover:text-[#F2EFE9] hover:border-[#F2EFE9]">
                  V3 CYBER
                </Link>
                <Link to="/editorial" className="px-2 py-1 border border-[rgba(242,239,233,0.2)] hover:text-[#F2EFE9] hover:border-[#F2EFE9]">
                  V4 SWISS LIGHT
                </Link>
                <Link to="/" className="px-2 py-1 bg-[#FF3E00] text-[#0A0A09] font-bold">
                  HUB
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KineticChrome;
