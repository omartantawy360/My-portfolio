import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ModeSelector from './pages/ModeSelector';
import DashboardPage from './pages/DashboardPage';
import ThreeDWorldPage from './pages/ThreeDWorldPage';
import ClassicPage from './pages/ClassicPage';
import AudioPlayer from './components/AudioPlayer';
import './index.css';

const App: React.FC = () => {
  return (
    <HashRouter>
      {/* Route content */}
      <Routes>
        <Route path="/" element={<ModeSelector />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/3d-world" element={<ThreeDWorldPage />} />
        <Route path="/classic" element={<ClassicPage />} />
      </Routes>

      {/* Global Audio Player — persists across all routes */}
      <AudioPlayer />
    </HashRouter>
  );
};

export default App;
