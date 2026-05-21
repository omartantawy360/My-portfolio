import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'developer' | 'status'>('developer');

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text/Content Column */}
          <div className="lg:w-7/12 text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-wide uppercase animate-pulse">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span>Open to Opportunities</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
              Crafting Digital<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-purple-400 font-black">
                Experiences
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed font-medium">
              I'm <span className="text-white font-bold">Omar Tantawy</span>, a Frontend Developer specialized in building 
              high-performance web applications with a focus on immersive user experience, clean architecture, and modern aesthetics.
            </p>

            {/* Quick Metrics Row */}
            <div className="grid grid-cols-3 gap-6 pt-2 pb-4 border-y border-white/5 max-w-lg">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white">6+</h3>
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white">5+</h3>
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Certifications</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white">100%</h3>
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Responsive Design</p>
              </div>
            </div>
            
            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/45 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto text-center tracking-wide"
              >
                Explore Projects
              </a>
              <a 
                href="./OMAR-TANTAWY-FlowCV-Resume-20251225.pdf" 
                download
                className="px-8 py-4 glass hover:bg-slate-900/50 text-white border border-white/10 rounded-full font-bold transition-all transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto text-center flex items-center justify-center gap-2.5 tracking-wide"
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* Interactive IDE / Mock Terminal Column */}
          <div className="lg:w-5/12 w-full animate-fade-in-up [animation-delay:250ms] relative">
            
            {/* Glowing ambient ring behind the terminal */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-indigo-500/10 rounded-2xl blur-3xl -z-10 animate-pulse duration-7000"></div>

            <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl w-full">
              {/* Terminal Title Bar */}
              <div className="bg-slate-950/70 px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-bold text-slate-500 tracking-wider font-mono">vscode // omar-profile</span>
                <div className="w-12"></div> {/* spacer */}
              </div>

              {/* IDE Tabs */}
              <div className="bg-slate-900/30 flex border-b border-white/5 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('developer')}
                  className={`px-5 py-3 border-r border-white/5 flex items-center gap-2 transition-all font-semibold ${
                    activeTab === 'developer' 
                      ? 'bg-slate-950/40 text-primary border-t-2 border-t-primary' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                  }`}
                >
                  <span className="text-[#38bdf8]">ts</span> developer.ts
                </button>
                <button
                  onClick={() => setActiveTab('status')}
                  className={`px-5 py-3 border-r border-white/5 flex items-center gap-2 transition-all font-semibold ${
                    activeTab === 'status' 
                      ? 'bg-slate-950/40 text-[#f59e0b] border-t-2 border-t-[#f59e0b]' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                  }`}
                >
                  <span className="text-[#f59e0b]">py</span> status.py
                </button>
              </div>

              {/* IDE Content Area */}
              <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-slate-300 bg-slate-950/40 select-none overflow-x-auto min-h-[300px] flex items-center">
                {activeTab === 'developer' ? (
                  <pre className="text-left w-full">
<code><span className="text-pink-500">const</span> <span className="text-blue-400">developer</span> = &#123;
  <span className="text-slate-400">name</span>: <span className="text-amber-300">"Omar Tantawy"</span>,
  <span className="text-slate-400">role</span>: <span className="text-amber-300">"Frontend Developer"</span>,
  <span className="text-slate-400">skills</span>: [
    <span className="text-amber-300">"React"</span>, 
    <span className="text-amber-300">"TypeScript"</span>, 
    <span className="text-amber-300">"TailwindCSS"</span>
  ],
  <span className="text-slate-400">approach</span>: <span className="text-amber-300">"Clean code & premium UI"</span>,
  <span className="text-slate-400">passionateAbout</span>: <span className="text-amber-300">"Modern web design"</span>
&#125;;

<span className="text-emerald-400">{"// Click tabs to see status!"}</span></code>
                  </pre>
                ) : (
                  <pre className="text-left w-full">
<code><span className="text-pink-500">import</span> sys, time

<span className="text-pink-500">def</span> <span className="text-blue-400">get_developer_status</span>():
    status = &#123;
        <span className="text-amber-300">"status"</span>: <span className="text-amber-300">"Available for Hire"</span>,
        <span className="text-amber-300">"location"</span>: <span className="text-amber-300">"Egypt"</span>,
        <span className="text-amber-300">"timezone"</span>: <span className="text-amber-300">"GMT+2"</span>,
        <span className="text-amber-300">"active"</span>: <span className="text-emerald-400">True</span>
    &#125;
    <span className="text-pink-500">return</span> status

<span className="text-blue-400">print</span>(get_developer_status())</code>
                  </pre>
                )}
              </div>
              
              {/* IDE Footer Bar */}
              <div className="bg-slate-950/60 px-5 py-2.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-600 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>LN 1, COL 1</span>
                </span>
                <span>UTF-8</span>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[130px] -z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
