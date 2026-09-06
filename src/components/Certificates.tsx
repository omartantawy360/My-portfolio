import React, { useState, useEffect } from 'react';
import { certificates } from '../data/portfolioData';
import type { Certificate } from '../data/portfolioData';

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="certificates" className="py-28 relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6">
        
        {/* Header Column */}
        <div className="max-w-2xl mb-16 text-left animate-fade-in-up">
          <h2 className="text-sm font-black tracking-widest text-primary uppercase mb-2">Achievements</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Certifications</h3>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            Rigorous validation of my fundamental programming skills, framework masteries, and computer science methodologies.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div 
              key={cert.id}
              className="glass-card group flex flex-col overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Top Details */}
              <div className="p-8 pb-0 text-left">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h4>
                <p className="text-slate-500 text-sm font-semibold tracking-wide">
                  {cert.issuer}
                </p>
              </div>
              
              {/* Bottom Image Link & Verify Action */}
              <div className="px-8 pb-8 mt-auto pt-6">
                
                {/* Certificate Mock Box - Clickable */}
                <div 
                  onClick={() => setSelectedCert(cert)}
                  className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 cursor-zoom-in bg-slate-950/40 border border-white/5 group-hover:border-primary/10 shadow-lg shadow-black/30 group-hover:shadow-primary/5 transition-all duration-300"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  
                  {/* Hover visual scale lens overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span className="px-4 py-2 rounded-full bg-white text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-2xl scale-90 group-hover:scale-100 transition-all duration-350">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      Quick View
                    </span>
                  </div>
                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2.5 w-full py-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-primary hover:border-primary hover:text-primary-foreground text-white text-sm font-bold transition-all shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                >
                  <span>Verify Credential</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* High-Fidelity Lightbox Modal Overlay */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in transition-all duration-300"
          onClick={() => setSelectedCert(null)}
        >
          {/* Modal Container */}
          <div 
            className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl max-w-3xl w-full scale-95 animate-fade-in-up [animation-duration:300ms] text-left relative"
            onClick={(e) => e.stopPropagation()} // Stop bubble up so click on card doesn't close modal
          >
            {/* Close Button Top Right */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-slate-950/65 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Close viewer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate Large Picture */}
            <div className="bg-slate-950 flex items-center justify-center p-4 min-h-[300px]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[70vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Details Box */}
            <div className="p-8 bg-slate-950/50 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-white">{selectedCert.title}</h4>
                <p className="text-sm font-bold text-primary">{selectedCert.issuer}</p>
              </div>
              <a
                href={selectedCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                <span>Verify Credential</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Certificates;
