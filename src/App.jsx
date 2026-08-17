import React from 'react';
import { useImageSequence } from './hooks/useImageSequence';
import { CoffeeSequenceHero } from './components/CoffeeSequenceHero';
import { AboutUs } from './components/AboutUs';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  const seq1 = useImageSequence('hero1');
  const seq2 = useImageSequence('hero2');

  const totalLoaded = seq1.loadedCount + seq2.loadedCount;
  const totalFrames = (seq1.totalCount || 192) + (seq2.totalCount || 160);
  const progressPercent = Math.round((totalLoaded / totalFrames) * 100);

  const readyToDisplay = seq1.firstFrameReady;

  return (
    <div className="app-main">
      {/* Minimal Loading Screen */}
      {!readyToDisplay && (
        <div className="loading-screen">
          <div className="loading-content">
            <span className="loading-brand">TN47 COFFEE</span>
            <div className="loading-bar-wrapper">
              <div
                className="loading-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="loading-text">LOADING {progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Main Application Content */}
      <Navbar />

      <main>
        {/* Sequence 1 Hero (192 frames) */}
        <CoffeeSequenceHero
          images={seq1.images}
          totalCount={seq1.totalCount}
          firstFrameReady={seq1.firstFrameReady}
          brandText="TN47"
          subText="COFFEE"
          scrollHintText="SCROLL TO EXPLORE"
        />

        {/* Sequence 2 Hero (160 frames - continuation) */}
        <CoffeeSequenceHero
          images={seq2.images}
          totalCount={seq2.totalCount}
          firstFrameReady={seq2.firstFrameReady}
          brandText="TN47"
          subText="CRAFT"
          scrollHintText="CONTINUE SCROLLING"
        />

        {/* About Us Section */}
        <AboutUs />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
