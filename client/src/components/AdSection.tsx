import React from 'react';
import adImage from '../assets/Adimg.jpg';
import './AdSection.css';

const AdSection: React.FC = () => {
    return (
        <section className="ad-section">
            <div className="ad-container">
                <div className="ad-image-wrapper">
                    <img src={adImage} alt="WisdomWood High Education" className="ad-image" />
                </div>

                <div className="ad-content">
                    <h2 className="ad-title">Apply to WisdomWood High</h2>
                    <p className="ad-description">
                        Admissions mark the start of a child’s lifelong learning journey. Our transparent, supportive, and family-friendly process ensures parents and students feel confident joining a school focused on holistic education and 21st-century readiness.
                    </p>

                    <div className="merged-grid">
                        <div className="info-block">
                            <h3>Why Choose Us</h3>
                            <ul className="highlight-list">
                                <li><span>✓</span> Holistic Growth</li>
                                <li><span>✓</span> Digital Readiness</li>
                                <li><span>✓</span> Future Focused</li>
                            </ul>
                        </div>

                        <div className="info-block">
                            <h3>Instructions for Parents</h3>
                            <ul className="guideline-list">
                                <li>Please enter your child’s full name, date of birth, and grade seeking admission accurately.</li>
                                <li>Provide a valid mobile number and email ID for all admission communication.</li>
                                <li>Mention if your child has a sibling at WisdomWood High.</li>
                                <li>Use the remarks section to add any specific queries.</li>
                                <li>After submission, our admissions team will contact you within 24-48 hours.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdSection;
