import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useIsMobile from '../hooks/useIsMobile';

/**
 * ClassicPage — wraps all original portfolio components.
 * This is the /classic route and preserves the original purple/violet theme.
 */
const ClassicPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
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

  return (
    <div
      className={`min-h-screen bg-slate-950 bg-mesh text-slate-200 selection:bg-primary/30 selection:text-primary-foreground transition-opacity duration-1000 relative overflow-x-hidden ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Interactive Cursor Trailer (Hidden on mobile/tablet) */}
      {!isMobile && <div ref={cursorRef} className="custom-cursor-trailer hidden lg:block" />}

      {/* Decorative Floating Glowing Background Blobs */}
      <div className="absolute top-[15vh] left-[5vw] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[45vh] right-[5vw] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[20vh] left-[10vw] w-[550px] h-[550px] bg-purple-500/8 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Back to Hub floating button */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 text-slate-400 text-xs font-semibold hover:text-white hover:border-primary/30 hover:bg-slate-800/80 transition-all duration-300 group shadow-lg"
      >
        <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Hub
      </Link>

      <Header />

      <main className="relative pt-20">
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ClassicPage;
