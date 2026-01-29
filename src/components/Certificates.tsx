import React from 'react';

const Certificates: React.FC = () => {
  const certificates = [
    {
      id: 1,
      title: "c++ programming",
      description: "A course covering the basics of C++ programming language.",
      image: "./images/c++.png",
      link: "https://www.credly.com/badges/042a08f2-6193-40fc-a5fa-0b659b60c150/linked_in_profile"
    },
    {
      id: 2,
      title: "Python programming",
      description: "A course covering the basics of Python programming language.",
      image: "./images/py.png",
      link: "https://www.credly.com/badges/2fa4d7fd-fe82-4584-b9b4-83553db38f61/linked_in_profile"
    },
    {
      id: 3,
      title: "CS50's",
      description: "A course covering the basics of computer science and programming.",
      image: "./images/cs50.png",
      link: "https://cs50.harvard.edu/certificates/9bf9c1b7-79c8-4d55-a82a-a4f286adadc6"
    },
    {
      id: 4,
      title: "FreeCodeCamp Responsive Web Design",
      description: "A course covering the basics of responsive web design.",
      image: "./images/freecamp.png",
      link: "https://www.freecodecamp.org/certification/omartantawy/responsive-web-design"
    }
    
  ];

  return (
    <section
      id="certificates"
      className="py-20"
    >
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div
          className="max-w-2xl mx-auto lg:text-center"
        >
          <h2 className="text-3xl font-semibold text-c06c84 underline-animate text-glow">
            Certificates
          </h2>
          <p
            className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            My Qualifications & Achievements
          </p>
          <p className="mt-6 text-lg text-gray-300">
            Professional certifications and courses completed to enhance my
            skills and knowledge in web development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="relative p-6 bg-gray-700 rounded-lg"
            >
              <div
                className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover-glow"
              >
                <i className="text-white fas fa-certificate"></i>
              </div>
              <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
              <p className="mt-2 text-gray-400">{cert.description}</p>
              <div className="relative mt-6 group">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="object-cover w-full transition duration-300 border-2 rounded-lg shadow-lg h-52 border-indigo-500/40 hover:border-indigo-400"
                />
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full shadow-lg bottom-4 right-4 opacity-90 hover:bg-white hover:text-indigo-600 hover:scale-105 hover:shadow-2xl"
                >
                  <i
                    className="text-base fa-solid fa-arrow-up-right-from-square"
                  ></i>
                  View Certificate
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
