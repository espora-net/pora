import React, { useEffect, useState } from 'react';
import './splash-screen.scss';

interface SplashScreenProps {
  onComplete: () => void;
  minimumDisplayTime?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  minimumDisplayTime = 1500 
}) => {
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldHide(true);
      onComplete();
    }, minimumDisplayTime);

    return () => clearTimeout(timer);
  }, [minimumDisplayTime, onComplete]);

  return (
    <div className={`splash-screen ${shouldHide ? 'hidden' : ''}`}>
      <div className="splash-content">
        <div className="logo-container">
          <img src="/images/baobab.png" alt="Pora Logo" className="app-logo" />
        </div>
        <h1 className="app-name">Pora</h1>
        <div className="loading-indicator">
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
