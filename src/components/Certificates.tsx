import React from 'react';

const Certificates: React.FC = () => {
  const certificates = [
    {
      id: 1,
      title: "C++ Programming",
      issuer: "Cisco Networking Academy",
      image: `${process.env.PUBLIC_URL}/images/c++.png`,
      link: "https://www.credly.com/badges/042a08f2-6193-40fc-a5fa-0b659b60c150/linked_in_profile"
    },
    {
      id: 2,
      title: "Python Programming",
      issuer: "Cisco Networking Academy",
      image: `${process.env.PUBLIC_URL}/images/py.png`,
      link: "https://www.credly.com/badges/2fa4d7fd-fe82-4584-b9b4-83553db38f61/linked_in_profile"
    },
    {
      id: 3,
      title: "CS50 Introduction to Computer Science",
      issuer: "Harvard University",
      image: `${process.env.PUBLIC_URL}/images/cs50.png`,
      link: "https://cs50.harvard.edu/certificates/9bf9c1b7-79c8-4d55-a82a-a4f286adadc6"
    },
    {
      id: 4,
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      image: `${process.env.PUBLIC_URL}/images/freecamp.png`,
      link: "https://www.freecodecamp.org/certification/omartantawy/responsive-web-design"
    },
    {
      id: 5,
      title: "JavaScript Essentials 1",
      issuer: "Cisco Networking Academy",
      image: `${process.env.PUBLIC_URL}/images/javascript.png`,
      link: "https://www.credly.com/badges/ebafc471-56d2-4a76-8e9d-a8caae9c0a69/"
    }
  ];

  return (
    <section id="certificates" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16 animate-fade-in-up">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Achievements</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Certifications</h3>
          <p className="text-slate-400 text-lg">
            A validation of my technical expertise and commitment to 
            continuous professional development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div 
              key={cert.id}
              className="glass-card group flex flex-col overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8 pb-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {cert.title}
                </h4>
                <p className="text-slate-500 text-sm font-medium mb-6">
                  {cert.issuer}
                </p>
              </div>
              
              <div className="px-8 pb-8 mt-auto">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-primary hover:border-primary text-white text-sm font-semibold transition-all group-hover:shadow-lg group-hover:shadow-primary/20"
                >
                  <span>Verify Certificate</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;

