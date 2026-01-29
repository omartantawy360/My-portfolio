import React from 'react';

const Header: React.FC = () => {
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
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
