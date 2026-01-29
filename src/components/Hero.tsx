import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            <span>Hello, I'm</span><br />
            <span className="text-c06c84 underline-animate text-glow gentle-pulse">Omar Tantawy</span><br />
            <span className="text-c06c84 underline-animate">
              Front-End Developer
            </span>
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">
            Passionate Front-End developer creating modern, responsive, and
            interactive web experiences.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="./OMAR-TANTAWY-FlowCV-Resume-20251225.pdf" download>
            <button
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full shadow-xl transform hover:scale-105 active:scale-95 transition-transform duration-300"
            >
              Download CV
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
