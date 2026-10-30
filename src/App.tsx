import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ModeSelector from './pages/ModeSelector';
import DashboardPage from './pages/DashboardPage';
import ThreeDWorldPage from './pages/ThreeDWorldPage';
import ClassicPage from './pages/ClassicPage';
import EditorialPortfolioPage from './pages/EditorialPortfolioPage';
import KineticArchivePage from './pages/KineticArchivePage';
import './index.css';

const App: React.FC = () => {
  return (
    <HashRouter>
      {/* Route content */}
      <Routes>
        <Route path="/" element={<ModeSelector />} />
        <Route path="/v5" element={<KineticArchivePage />} />
        <Route path="/kinetic-archive" element={<KineticArchivePage />} />
        <Route path="/editorial" element={<EditorialPortfolioPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/3d-world" element={<ThreeDWorldPage />} />
        <Route path="/classic" element={<ClassicPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
