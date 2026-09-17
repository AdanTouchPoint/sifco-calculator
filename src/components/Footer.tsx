import React from 'react';
import './footer.css';

// SVG Asset Imports
import Logo from '../assets/Logo.svg';

export const Footer: React.FC = () => {
    return (
        <footer className="sifco-footer-wrapper">
            <div className="sifco-footer-container">
                <img 
                    src={Logo} 
                    alt="SIFCO Logo" 
                    className="sifco-footer-logo-img" 
                />
            </div>

            {/* COPYRIGHT BOTTOM BAR */}
            <div className="sifco-footer-bottom">
                <p className="sifco-footer-copy">
                    © {new Date().getFullYear()} SIFCO. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
