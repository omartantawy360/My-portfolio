import React, { useState } from 'react';
import { projects } from '../data/portfolioData';

const Projects: React.FC = () => {
  const filters = ["All", "Next.js", "React", "JavaScript", "Bootstrap", "HTML/CSS"];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => 
        project.tags.some(tag => {
          if (activeFilter === "HTML/CSS") {
            return tag === "HTML" || tag === "CSS" || tag === "Clean Code";
          }
          return tag.toLowerCase().includes(activeFilter.toLowerCase());
        })
      );

  return (
    <section id="projects" className="py-28 bg-slate-900/10 relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6">
        
        {/* Header Column */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-fade-in-up">
          <div className="max-w-2xl text-left">
            <h2 className="text-sm font-black tracking-widest text-primary uppercase mb-2">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Selected Works</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              A meticulously curated showcase of my frontend projects, integrating modern layouts, high accessibility, and robust interactive states.
            </p>
          </div>

          {/* Dynamic Filter Buttons */}
          <div className="flex flex-wrap gap-2.5 items-center justify-start md:justify-end border border-white/5 bg-slate-950/20 p-2 rounded-2xl backdrop-blur-md self-start md:self-end">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="glass-card group flex flex-col overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              
              {/* Image & Hover Action Overlay */}
              <div className="relative h-60 overflow-hidden bg-slate-950/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white text-slate-950 hover:bg-primary hover:text-primary-foreground rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:scale-110"
                    aria-label={`Visit ${project.title}`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Card Details Content */}
              <div className="p-8 flex flex-col flex-grow text-left">
                
                {/* Tech Tags Row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h4>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>
                
                {/* Interactive Card Action Link */}
                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span>Launch Project</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <div className="w-8 h-0.5 rounded bg-slate-800 group-hover:bg-primary group-hover:w-12 transition-all duration-300"></div>
                </div>

              </div>

            </div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 font-mono text-sm border border-dashed border-white/5 rounded-2xl glass">
              No projects matching "{activeFilter}" were found.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Projects;
