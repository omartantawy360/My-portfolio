import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import './index.css';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade-in effect tracker
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Check device screen & touch capability
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 1024px)').matches || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Use requestAnimationFrame for high performance 60/120fps styling changes
        window.requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className={`min-h-screen bg-slate-950 bg-mesh text-slate-200 selection:bg-primary/30 selection:text-primary-foreground transition-opacity duration-1000 relative overflow-x-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Interactive Cursor Trailer (Hidden on mobile/tablet) */}
      {!isMobile && <div ref={cursorRef} className="custom-cursor-trailer hidden lg:block" />}

      {/* Decorative Floating Glowing Background Blobs */}
      <div className="absolute top-[15vh] left-[5vw] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[45vh] right-[5vw] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[20vh] left-[10vw] w-[550px] h-[550px] bg-purple-500/8 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

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

export default App;
