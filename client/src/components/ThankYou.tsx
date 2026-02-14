import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
        dataLayer: any[];
    }
}

const ThankYou: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('thank-you-body');
        return () => {
            document.body.classList.remove('thank-you-body');
        };
    }, []);

    // Meta Pixel & GTM — only on ThankYou page
    useEffect(() => {
        const injectedElements: HTMLElement[] = [];

        // --- Meta Pixel Code ---
        const fbScript = document.createElement('script');
        fbScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1577997463166710');
            fbq('track', 'PageView');
        `;
        document.head.appendChild(fbScript);
        injectedElements.push(fbScript);

        const fbNoscript = document.createElement('noscript');
        fbNoscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1577997463166710&ev=PageView&noscript=1" />`;
        document.body.appendChild(fbNoscript);
        injectedElements.push(fbNoscript);

        // --- Google Tag Manager ---
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KMB24JQB');
        `;
        document.head.appendChild(gtmScript);
        injectedElements.push(gtmScript);

        const gtmNoscript = document.createElement('noscript');
        gtmNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KMB24JQB" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(gtmNoscript, document.body.firstChild);
        injectedElements.push(gtmNoscript);

        // Cleanup on unmount
        return () => {
            injectedElements.forEach((el) => el.remove());
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
