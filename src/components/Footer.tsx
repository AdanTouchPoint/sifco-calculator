import React from 'react';
import './footer.css';

// SVG Asset Imports
import Logo from '../assets/Logo.svg';
import FacebookIcon from '../assets/Facebook icon container.svg';
import LinkedInIcon from '../assets/LinkedIn icon container.svg';
import InstagramIcon from '../assets/Instagram icon container.svg';
import YoutubeIcon from '../assets/YouTube icon container.svg';

export const Footer: React.FC = () => {
    return (
        <footer className="sifco-footer-wrapper">
            <div className="sifco-footer-container">
                
                {/* COLUMN 1: LOGO, DESCRIPTION & SOCIALS */}
                <div className="sifco-footer-info-col">
                    <img 
                        src={Logo} 
                        alt="SIFCO Logo" 
                        className="sifco-footer-logo-img" 
                    />
                    <p className="sifco-footer-desc">
                        Somos una empresa con más de 20 años de experiencia en el mercado, brindando soluciones de software y servicios a diversas organizaciones del sector financiero no bancario, que se han caracterizado por ser de fácil y rápida adaptación para los usuarios.
                    </p>
                    <div className="sifco-footer-socials">
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="sifco-footer-social-link"
                            aria-label="Facebook SIFCO"
                        >
                            <img src={FacebookIcon} alt="Facebook" className="sifco-footer-social-icon" />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="sifco-footer-social-link"
                            aria-label="LinkedIn SIFCO"
                        >
                            <img src={LinkedInIcon} alt="LinkedIn" className="sifco-footer-social-icon" />
                        </a>
                        <a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="sifco-footer-social-link"
                            aria-label="Instagram SIFCO"
                        >
                            <img src={InstagramIcon} alt="Instagram" className="sifco-footer-social-icon" />
                        </a>
                        <a 
                            href="https://youtube.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="sifco-footer-social-link"
                            aria-label="YouTube SIFCO"
                        >
                            <img src={YoutubeIcon} alt="YouTube" className="sifco-footer-social-icon" />
                        </a>
                    </div>
                </div>

                {/* COLUMN 2: SOLUCIONES */}
                <div className="sifco-footer-links-col">
                    <h3 className="sifco-footer-col-title">Soluciones</h3>
                    <ul className="sifco-footer-links-list">
                        <li><a href="#soluciones" className="sifco-footer-link">B1 Unity</a></li>
                        <li><a href="#soluciones" className="sifco-footer-link">B1 Financial</a></li>
                        <li><a href="#soluciones" className="sifco-footer-link">B1 Lending</a></li>
                    </ul>
                </div>

                {/* COLUMN 3: NOSOTROS */}
                <div className="sifco-footer-links-col">
                    <h3 className="sifco-footer-col-title">Nosotros</h3>
                    <ul className="sifco-footer-links-list">
                        <li><a href="#nosotros" className="sifco-footer-link">Quienes somos</a></li>
                        <li><a href="#nosotros" className="sifco-footer-link">Programa de Socios</a></li>
                        <li><a href="#nosotros" className="sifco-footer-link">Trabaja con nosotros</a></li>
                    </ul>
                </div>

                {/* COLUMN 4: SERVICIOS */}
                <div className="sifco-footer-links-col">
                    <h3 className="sifco-footer-col-title">Servicios</h3>
                    <ul className="sifco-footer-links-list">
                        <li><a href="#servicios" className="sifco-footer-link">Implementación</a></li>
                        <li><a href="#servicios" className="sifco-footer-link">Soporte y mantenimiento</a></li>
                    </ul>
                </div>

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
