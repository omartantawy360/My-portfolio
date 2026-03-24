import React from 'react';

const About: React.FC = () => {
  const skills = [
    "React", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", 
    "HTML5 / CSS3", "Bootstrap", "Git / GitHub", "EmailJS"
  ];

  return (
    <section id="aboutme" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 tracking-tight">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Bio Section */}
          <div className="lg:w-1/2 animate-fade-in-up">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              A passionate developer <br />
              <span className="text-slate-400 font-medium">with an eye for detail.</span>
            </h3>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                I am Omar Tantawy, a Frontend Developer specialized in creating 
                seamless, user-centric digital experiences. My approach blends 
                technical precision with a clean, modern aesthetic.
              </p>
              <p>
                I thrive on turning complex problems into intuitive solutions. 
                Whether it's building responsive layouts or optimizing performance, 
                I'm committed to delivering high-quality work that stands out.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="lg:w-1/2 w-full animate-fade-in-up [animation-delay:200ms]">
            <div className="glass-card p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors"></div>
              
              <h4 className="text-2xl font-bold text-white mb-8 relative z-10">Technical Mastery</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                {skills.map((skill) => (
                  <div 
                    key={skill}
                    className="flex items-center space-x-3 text-slate-400 group/skill transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/skill:bg-primary group-hover/skill:scale-125 transition-all"></div>
                    <span className="text-sm font-medium group-hover/skill:text-white transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                <p className="text-slate-500 text-sm italic leading-relaxed">
                  "The best way to predict the future is to invent it." 
                  I stay ahead by constantly exploring the evolving web ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

