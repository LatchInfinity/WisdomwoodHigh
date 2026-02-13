import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('thank-you-body');
        return () => {
            document.body.classList.remove('thank-you-body');
        };
    }, []);

    return (
        <div className="thank-you-page">
            <div className="bg-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
            
            <div className="thank-you-card fade-in">
                <div className="thank-you-icon-container">
                    <div className="thank-you-icon-wrapper">
                        <div className="thank-you-icon">✓</div>
                        <div className="icon-pulse"></div>
                    </div>
                </div>
                
                <h1 className="thank-you-title">Successfully Submitted!</h1>
                <div className="divider"></div>
                
                <p className="thank-you-message">
                    We've received your enquiry. Our admissions experts are reviewing it and will reach out to you within <strong>24-48 business hours</strong>.
                </p>
                
                <div className="thank-you-buttons">
                    <button 
                        className="btn-secondary" 
                        onClick={() => navigate('https://wisdomwoodhigh.in')}
                    >
                        Back to Home
                    </button>
                    <button 
                        className="btn-primary-action" 
                        onClick={() => navigate('/')}
                    >
                        Apply Again
                    </button>
                </div>

                <div className="card-footer">
                    <p>Need urgent help? Call us at <a href="tel:+911234567890">+91 12345 67890</a></p>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
