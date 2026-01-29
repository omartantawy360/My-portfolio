import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Avatar website",
      description: "A website for a responsive avatar website using HTML, CSS",
      image: "./images/avatar.png",
      link: "https://omartantawy360.github.io/avatar/"
    },
    {
      id: 2,
      title: "Shoes website",
      description: "A website for a responsive shoes website using HTML, CSS",
      image: "./images/shoes.png",
      link: "https://omartantawy360.github.io/shoes/"
    },
    {
      id: 3,
      title: "Strict website",
      description: "A website for a responsive strict website using HTML, CSS",
      image: "./images/strict.png",
      link: "https://omartantawy360.github.io/strict/"
    },
    {
      id: 4,
      title: "Food Lover website",
      description: "A website for a responsive food lover website using HTML, CSS, and JavaScript",
      image: "./images/foodlover.png",
      link: "https://omartantawy360.github.io/food-lover/"
    },
    {
      id: 5,
      title: "Bootstrap login page",
      description: "A website for a responsive login page using Bootstrap",
      image: "./images/bootstrap.png",
      link: "https://omartantawy360.github.io/bootstrap-login/"
    },
    {
      id: 6,
      title: "Tailwind landing page",
      description: "A landing page for a responsive website using Tailwind with dark mode and light mode",
      image: "./images/tailwind.png",
      link: "https://omartantawy360.github.io/tailwind-project/"
    }
  ];

  return (
    <section
      id="projects"
      className="min-h-screen py-12"
    >
      <div className="w-[90%] mx-auto text-center">
        <h2
          className="text-3xl font-semibold text-c06c84 underline-animate text-glow slide-up"
        >
          My Work
        </h2>
        <p
          className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Portfolio
          <span className="text-c06c84 underline-animate text-glow">Projects</span>
        </p>
        <p
          className="mt-6 text-lg text-gray-300"
        >
          Here are some of my recent projects that showcase my skills and
          experience.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-gray-800 p-6 rounded-lg overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-48 transition-transform duration-500 rounded-md group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-500 rounded-lg opacity-0 bg-gradient-to-b from-black/80 to-blue-400 group-hover:opacity-100">
                <h3 className="mb-4 text-xl font-semibold">{project.title}</h3>
                <p className="text-sm font-normal">{project.description}</p>
                <a
                  href={project.link}
                  className="flex items-center justify-center w-12 h-12 mt-6 text-lg text-gray-800 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-indigo-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
