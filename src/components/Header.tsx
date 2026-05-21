import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking for active navigation highlights
      const sections = ['home', 'aboutme', 'projects', 'certificates', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is in the top portion of the viewport
          if (rect.top <= 160) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run to set active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#aboutme' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav
          className={`glass rounded-full px-8 py-3.5 transition-all duration-500 ${
            isScrolled 
              ? 'shadow-2xl bg-slate-950/65 border-white/5 shadow-primary/5' 
              : 'bg-transparent border-transparent shadow-none'
          }`}
        >
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="text-xl font-black tracking-wider text-white hover:text-primary transition-colors flex items-center gap-1 group"
            >
              <span>OMAR</span>
              <span className="text-primary group-hover:translate-x-0.5 transition-transform duration-300">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    className={`nav-link ${
                      isActive ? 'text-primary' : 'text-slate-400'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-primary to-indigo-400 transition-all duration-300" />
                    )}
                  </a>
                );
              })}
              
              <a
                href="#contact"
                className="bg-primary hover:bg-primary/95 text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 active:scale-95"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-slate-200 hover:text-white p-1 transition-all rounded-full hover:bg-white/5 active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl md:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center justify-center space-y-8 h-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`text-3xl font-bold transition-all transform hover:scale-110 tracking-wide ${
                  isActive 
                    ? 'text-primary scale-105 bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent' 
                    : 'text-slate-300 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            );
          })}
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-xl font-bold mt-4 shadow-xl shadow-primary/20"
            onClick={() => setMobileMenuOpen(false)}
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
