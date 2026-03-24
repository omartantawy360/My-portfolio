import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';
import BackToTop from './components/BackToTop';
import './index.css';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    import('@emailjs/browser').then((emailjs) => {
      emailjs.default.init("7tDyC3h17GtQ4mty8");
    });

    // Simple fade-in effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Particles />
      <div className={`text-white font-sans overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default App;

