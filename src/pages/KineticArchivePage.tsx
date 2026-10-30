import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import KineticCursor from '../components/v5/KineticCursor';
import KineticChrome from '../components/v5/KineticChrome';
import KineticCurtainHero from '../components/v5/KineticCurtainHero';
import KineticProjectsExhibition from '../components/v5/KineticProjectsExhibition';
import KineticSkillsMatrix from '../components/v5/KineticSkillsMatrix';
import KineticCertificatesLedger from '../components/v5/KineticCertificatesLedger';
import KineticFinaleTerminal from '../components/v5/KineticFinaleTerminal';

gsap.registerPlugin(ScrollTrigger);

const KineticArchivePage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 50);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Scroll listener for real-time telemetry (progress, velocity, active section)
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      // Section observer
      const sectionIds = ['hero', 'projects', 'skills', 'certificates', 'finale'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // Track scroll velocity via Lenis
    lenis.on('scroll', (e: { velocity: number }) => {
      setScrollVelocity(e.velocity || 0);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#0A0A09] text-[#F2EFE9] selection:bg-[#FF3E00] selection:text-[#0A0A09] relative transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Vermilion Kinetic Cursor */}
      <KineticCursor />

      {/* Viewport Architectural Frame & Live Telemetry Chrome */}
      <KineticChrome
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
        activeSection={activeSection}
      />

      {/* Main Kinetic Sequence (Zero Card Grids, Continuous Scroll-Scrubbed Mechanics) */}
      <main className="relative">
        {/* Section 01: Pinned Kinetic Curtain Hero with Horizontal Split Gate */}
        <KineticCurtainHero />

        {/* Section 02: Pinned Split-Stage Exhibition with Odometer & Mask-Wipes */}
        <KineticProjectsExhibition />

        {/* Section 03: Velocity-Reactive Kinetic Skills Matrix on Raw Linen Surface */}
        <KineticSkillsMatrix />

        {/* Section 04: Archival Ledger with Sweep Hover & Spring-Physics Preview */}
        <KineticCertificatesLedger />

        {/* Section 05: Parallax Uncover Finale Command Terminal */}
        <KineticFinaleTerminal />
      </main>
    </div>
  );
};

export default KineticArchivePage;

