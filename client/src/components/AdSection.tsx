import React from 'react';
import adImage from '../assets/Adimg.jpg';
import './AdSection.css';

const AdSection: React.FC = () => {
    return (
        <section className="ad-section">
            <div className="ad-container">
                <div className="ad-image-wrapper">
                    <img src={adImage} alt="WisdomWood High Education" className="ad-image" />
                    <div className="image-experience-badge">
                        <span className="exp-number">15+</span>
                        <span className="exp-text">Years of Excellence</span>
                    </div>
                </div>
                
                <div className="ad-content">
                    <h2 className="ad-title">Enroll Your Child for a Brighter Future</h2>
                    <p className="ad-description">
                        At WisdomWood High, we combine academic excellence with holistic development. Our world-class facilities and expert faculty provide the perfect environment for your child to thrive.
                    </p>

                    <div className="merged-grid">
                        <div className="info-block">
                            <h3>School Highlights</h3>
                            <ul className="highlight-list">
                                <li><span>✓</span> Expert Faculty & Mentorship</li>
                                <li><span>✓</span> Modern Labs & Creative Spaces</li>
                                <li><span>✓</span> Holistic Development Programs</li>
                            </ul>
                        </div>
                        
                        <div className="info-block">
                            <h3>Admission Guidelines</h3>
                            <ul className="guideline-list">
                                <li>Ensure child's name & DOB are accurate.</li>
                                <li>Provide valid mobile & email ID.</li>
                                <li>Mention sibling details if applicable.</li>
                                <li>Expect a response within 24-48 hours.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdSection;
