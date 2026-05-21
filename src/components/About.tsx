import React, { useState } from 'react';

const About: React.FC = () => {
  const skillCategories = {
    Frontend: [
      { name: "React", icon: "fab fa-react" },
      { name: "TypeScript", icon: "fas fa-code-branch" },
      { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
      { name: "Bootstrap 5", icon: "fab fa-bootstrap" },
      { name: "HTML5 / CSS3", icon: "fab fa-html5" }
    ],
    Languages: [
      { name: "JavaScript (ES6+)", icon: "fab fa-js" },
      { name: "C++ Programming", icon: "fas fa-terminal" },
      { name: "Python", icon: "fab fa-python" }
    ],
    Tools: [
      { name: "Git & GitHub", icon: "fab fa-github" },
      { name: "EmailJS", icon: "fas fa-paper-plane" },
      { name: "VS Code", icon: "fas fa-laptop-code" },
      { name: "npm & Node", icon: "fab fa-node-js" }
    ]
  };

  const [activeTab, setActiveTab] = useState<keyof typeof skillCategories>('Frontend');

  return (
    <section id="aboutme" className="py-28 relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 tracking-tight">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Bio Section Left */}
          <div className="lg:w-1/2 text-left space-y-6 animate-fade-in-up">
            <h2 className="text-sm font-black tracking-widest text-primary uppercase mb-2">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              A passionate developer<br />
              <span className="text-slate-400 font-semibold">with an eye for digital precision.</span>
            </h3>
            
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-medium">
              <p>
                I am <span className="text-white font-bold">Omar Tantawy</span>, a dedicated Front-End Developer with a track record of transforming visual designs into interactive, accessible, and high-performance web products.
              </p>
              <p>
                My development approach bridges the gap between pure engineering and premium aesthetics. I focus on writing semantically rich HTML, optimized CSS layouts, and modular, clean React structures.
              </p>
              <p>
                Constantly learning and adapting to the modern web framework landscape, I turn sophisticated web architectures into seamless user journeys.
              </p>
            </div>
            
            {/* Ambient Profile Quote Block */}
            <div className="p-6 border-l-4 border-primary bg-primary/5 rounded-r-2xl border-y border-r border-white/5 mt-8">
              <p className="text-slate-400 italic text-base leading-relaxed">
                "The details are not the details. They make the design." I apply this principle to every line of code, ensuring flawless responsiveness and high visual appeal on all viewports.
              </p>
            </div>
          </div>

          {/* Skills Section Right */}
          <div className="lg:w-1/2 w-full animate-fade-in-up [animation-delay:200ms]">
            <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors"></div>
              
              <h4 className="text-2xl font-black text-white mb-8 relative z-10">Technical Expertise</h4>
              
              {/* Tab Selection Row */}
              <div className="flex space-x-2 border-b border-white/5 pb-4 mb-8 relative z-10 overflow-x-auto scrollbar-none">
                {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                      activeTab === tab 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Categorized Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 min-h-[220px]">
                {skillCategories[activeTab].map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-slate-950/20 hover:border-primary/30 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group/skill"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/skill:bg-primary group-hover/skill:text-primary-foreground transition-all duration-300">
                      <i className={`${skill.icon} text-lg`}></i>
                    </div>
                    <span className="text-slate-300 font-bold text-sm group-hover/skill:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/5 relative z-10 text-center">
                <span className="text-slate-500 text-xs font-semibold tracking-wider uppercase">
                  Continuous Learning • Industry Standard Tools • Scalable Codebases
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
