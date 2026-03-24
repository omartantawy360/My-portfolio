import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Available for new projects</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 animate-fade-in-up [animation-delay:200ms]">
            Crafting Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
              Experiences
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            I'm Omar Tantawy, a Frontend Developer specialized in building 
            modern, high-performance web applications with a focus on 
            user experience and clean design.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
            <a
              href="#projects"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto text-center"
            >
              Explore Projects
            </a>
            <a 
              href="./OMAR-TANTAWY-FlowCV-Resume-20251225.pdf" 
              download
              className="px-8 py-4 glass hover:bg-slate-900/60 text-white rounded-full font-semibold transition-all transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
    </section>
  );
};

export default Hero;

