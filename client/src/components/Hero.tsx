import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-text-content">
            <h1 className="hero-text-main">
              Transforming<br />
              Learners into<br />
              Leaders
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
