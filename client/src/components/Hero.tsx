import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-text-content fade-in-up">
            <h1 className="hero-text-main">
              <span className="text-light">Growing Curious </span><br />
              <span className="text-bold">Minds </span> <span className="text-accent">into</span><br />
              <span className="text-bold">Leaders</span>
            </h1>
          </div>
          <div className="hero-curve">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 Q50,50 100,0 L100,100 L0,100 Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
