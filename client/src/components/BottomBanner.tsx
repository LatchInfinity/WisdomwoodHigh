import React from 'react';
import './BottomBanner.css';

const BottomBanner: React.FC = () => {
  return (
    <section className="bottom-banner">
      <div className="bottom-banner-overlay">
        <div className="bottom-banner-container">
          <div className="bottom-banner-content">
            <h2 className="bottom-banner-title">
              Excellence in <br />
              Every Endeavor
            </h2>
            <p className="bottom-banner-subtitle">Join the WisdomWood Family Today</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
