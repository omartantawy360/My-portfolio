import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-500 text-sm">
            © 2025 Omar Tantawy. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#aboutme" className="text-xs font-bold tracking-widest text-slate-500 uppercase hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-xs font-bold tracking-widest text-slate-500 uppercase hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-xs font-bold tracking-widest text-slate-500 uppercase hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-slate-500 text-sm italic">
            Built with React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

