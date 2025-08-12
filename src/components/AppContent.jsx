import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Timeline from './Timeline';
import MusicPlayer from './MusicPlayer';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </>
  );
};

export default AppContent;
