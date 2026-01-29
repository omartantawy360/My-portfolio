import React from 'react';

const About: React.FC = () => {
  return (
    <section
      id="aboutme"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-3xl font-semibold text-c06c84 underline-animate text-glow slide-up">
            About Me
          </h2>
          <p
            className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            I'm a Passionate Front-End Developer
          </p>
          <p className="mt-6 text-lg text-gray-300">
            Hi! I'm Omar, a Front-End developer passionate about creating
            modern, responsive, and interactive web experiences with a focus on
            clean code and user-friendly interfaces.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div
            className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
          >
            <div
              className="relative pl-16"
            >
              <div
                className="absolute top-0 left-0 flex w-10 h-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover-glow"
              >
                <p>&lt;/&gt;</p>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Web Developer Focused on Modern Front-End
              </h3>
              <p className="mt-2 text-gray-400">
                Passionate about building responsive and user-friendly websites
                using HTML, CSS, JavaScript, and modern frameworks like
                Bootstrap, Tailwind, and React.
              </p>
            </div>

            <div
              className="relative pl-16"
            >
              <div
                className="absolute top-0 left-0 flex w-10 h-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover-glow"
              >
                <i className="fas fa-book-open"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Lifelong Learner</h3>
              <p className="mt-2 text-gray-400">
                Always eager to learn new technologies and improve my skills to
                create clean, efficient, and interactive web experiences.
              </p>
            </div>

            <div
              className="relative pl-16"
            >
              <div
                className="absolute top-0 left-0 flex w-10 h-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover-glow"
              >
                <i className="fas fa-briefcase"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Portfolio Projects
              </h3>
              <p className="mt-2 text-gray-400">
                Working on real projects that showcase my design and development
                skills, from static layouts to dynamic, interactive web apps.
              </p>
            </div>

            <div
              className="relative pl-16"
            >
              <div
                className="absolute top-0 left-0 flex w-10 h-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover-glow"
              >
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Goal-Oriented & Creative
              </h3>
              <p className="mt-2 text-gray-400">
                Focused on delivering high-quality web solutions and
                continuously experimenting with new ideas to make my projects
                unique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
