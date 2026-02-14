import React from 'react';
import './BottomBanner.css';

const BottomBanner: React.FC = () => {
  return (
    <section className="bottom-banner">
      <div className="bottom-banner-overlay">
        <div className="bottom-banner-container">
          <div className="bottom-banner-content">
            <h2 className="bottom-banner-title">
              Future-Ready<br />
              Learning  Spaces
            </h2>
            <p className="bottom-banner-subtitle">A campus designed to inspire</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
