import React, { useState, useEffect } from 'react';
import SwissCursor from '../components/editorial/SwissCursor';
import SwissNav from '../components/editorial/SwissNav';
import SwissHero from '../components/editorial/SwissHero';
import SwissManifesto from '../components/editorial/SwissManifesto';
import SwissAbout from '../components/editorial/SwissAbout';
import SwissSectionTransition from '../components/editorial/SwissSectionTransition';
import SwissProjectsExhibition from '../components/editorial/SwissProjectsExhibition';
import SwissSkillsUniverse from '../components/editorial/SwissSkillsUniverse';
import SwissCertificatesArchive from '../components/editorial/SwissCertificatesArchive';
import SwissContact from '../components/editorial/SwissContact';
import SwissFooter from '../components/editorial/SwissFooter';

const EditorialPortfolioPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#F7F3E8] text-[#20201E] selection:bg-[#D7FF45] selection:text-[#20201E] transition-opacity duration-500 relative overflow-x-hidden ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Light Swiss Kinetic Cursor */}
      <SwissCursor />

      {/* Editorial Masthead Navigation */}
      <SwissNav />

      {/* Main Kinetic Sequence */}
      <main className="relative">
        {/* Required Effect A: Hero Typography Transformation */}
        <SwissHero />

        {/* Required Effect D: Animated Line-by-Line Typography Reveal */}
        <SwissManifesto />

        {/* Required Effect B: About Visual Transformation */}
        <SwissAbout />

        {/* Required Effect F: Custom Transition 1 */}
        <SwissSectionTransition type="about-to-works" />

        {/* Custom Scroll-Driven Projects Exhibition */}
        <SwissProjectsExhibition />

        {/* Custom Section Transition */}
        <SwissSectionTransition type="works-to-skills" />

        {/* Custom Scroll-Driven Typographic Skills Universe */}
        <SwissSkillsUniverse />

        {/* Custom Scroll-Driven Authenticated Credentials Dossier */}
        <SwissCertificatesArchive />

        {/* Direct Transmission & Functional Contact Form */}
        <SwissContact />
      </main>

      {/* Colophon & Footer */}
      <SwissFooter />
    </div>
  );
};

export default EditorialPortfolioPage;
