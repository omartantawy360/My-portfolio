import React, { useState } from 'react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <svg
        className="absolute top-0 left-0 w-0 h-0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M .5,0 C .1,0 0,.1 0,.5 C 0,.9 .1,1 .5,1 C .9,1 1,.9 1,.5 C 1,.1 .9,0 .5,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <header
        className="fixed top-0 left-0 right-0 z-50 header-extra-dark"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <a
              href="#home"
              className="text-2xl font-bold text-white uppercase underline-animate hover-glow"
            >
              Omar Tantawy
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#aboutme"
                className="text-sm font-semibold text-white hover:text-c06c84 transition-colors duration-300 underline-animate hover-lift"
              >
                About me
              </a>
              <a
                href="#projects"
                className="text-sm font-semibold text-white hover:text-c06c84 transition-colors duration-300 underline-animate hover-lift"
              >
                Projects
              </a>
              <a
                href="#certificates"
                className="text-sm font-semibold text-white hover:text-c06c84 transition-colors duration-300 underline-animate hover-lift"
              >
                Certificates
              </a>
              <a
                href="#contact"
                className="text-sm font-semibold text-white hover:text-c06c84 transition-colors duration-300 underline-animate hover-lift"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-white hover:text-c06c84 transition-colors p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-black/90 backdrop-blur-md h-screen animate-fade-in`}>
          <nav className="flex flex-col items-center justify-center space-y-8 h-full pb-20">
            <a
              href="#aboutme"
              className="text-2xl font-semibold text-white hover:text-c06c84 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About me
            </a>
            <a
              href="#projects"
              className="text-2xl font-semibold text-white hover:text-c06c84 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#certificates"
              className="text-2xl font-semibold text-white hover:text-c06c84 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Certificates
            </a>
            <a
              href="#contact"
              className="text-2xl font-semibold text-white hover:text-c06c84 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

