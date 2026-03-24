import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Avatar website",
      description: "A responsive avatar platform built with clean HTML and modern CSS.",
      image: `${process.env.PUBLIC_URL}/images/avatar.png`,
      link: "https://omartantawy360.github.io/avatar/",
      tags: ["HTML", "CSS"]
    },
    {
      id: 2,
      title: "Shoes website",
      description: "Premium dynamic e-commerce interface for high-end footwear.",
      image: `${process.env.PUBLIC_URL}/images/shoes.png`,
      link: "https://omartantawy360.github.io/shoes/",
      tags: ["HTML", "CSS", "Design"]
    },
    {
      id: 3,
      title: "Strict website",
      description: "Minimalist corporate landing page with a focus on typography.",
      image: `${process.env.PUBLIC_URL}/images/strict.png`,
      link: "https://omartantawy360.github.io/strict/",
      tags: ["Clean Code", "CSS"]
    },
    {
      id: 4,
      title: "Food Lover",
      description: "Interactive culinary experience featuring dynamic JS interactions.",
      image: `${process.env.PUBLIC_URL}/images/foodlover.png`,
      link: "https://omartantawy360.github.io/food-lover/",
      tags: ["JavaScript", "HTML", "CSS"]
    },
    {
      id: 5,
      title: "Bootstrap Login",
      description: "Highly secure and responsive login portal using Bootstrap 5.",
      image: `${process.env.PUBLIC_URL}/images/bootstrap.png`,
      link: "https://omartantawy360.github.io/bootstrap-login/",
      tags: ["Bootstrap", "UI"]
    },
    {
      id: 6,
      title: "Tailwind Landing",
      description: "Modern landing page with full dark mode support and glassmorphism.",
      image: `${process.env.PUBLIC_URL}/images/tailwind.png`,
      link: "https://omartantawy360.github.io/tailwind-project/",
      tags: ["Tailwind", "React"]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16 animate-fade-in-up">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Selected Works</h3>
          <p className="text-slate-400 text-lg">
            A showcase of my recent projects, featuring modern web technologies 
            and user-centric designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="glass-card group flex flex-col overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white text-slate-950 rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">
                    View Project
                  </span>
                  <div className="w-6 h-px bg-slate-700 group-hover:bg-primary transition-colors"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

