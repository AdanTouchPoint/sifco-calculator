import React from 'react';
import './welcome.css';
import { useCalculatorStore } from './../lib/useCalculatorStore';
import HowItWorks from './HowItWorks';

// Asset Imports
import backgroundImg from '../assets/backgroundImg.png';
import icon1 from '../assets/icon1.svg';
import icon2 from '../assets/icon2.svg';
import icon3 from '../assets/icon3.svg';
import icon4 from '../assets/icon4.svg';

export const Welcome: React.FC = () => {
    const { nextStep } = useCalculatorStore();
    return (
        <div className="sifco-page-wrapper">



            {/* HERO SECTION */}
            <main className="sifco-hero-container">

                <div className="sifco-hero-card" style={{ backgroundImage: ` url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {/* HEADER / NAVBAR */}
                    <header className="sifco-header">
                        <div className="sifco-navbar">
                            <div className="sifco-nav-left">
                                {/* Logo SIFCO */}
                                <div className="sifco-logo-container">
                                    <div className="sifco-logo-icon">
                                        <span className="sifco-bar sifco-bar-top"></span>
                                        <span className="sifco-bar sifco-bar-bottom"></span>
                                    </div>
                                    <span className="sifco-logo-text">SIFCO</span>
                                </div>
                                <span className="sifco-divider">|</span>
                                <span className="sifco-nav-subtitle">Calculadora de ROI</span>
                            </div>
                            <button className="sifco-btn sifco-btn-secondary">
                                Calcular mi ROI
                            </button>
                        </div>
                    </header>
                    <div className="sifco-hero-content">
                        <span className="sifco-badge">Herramienta gratuita de diagnóstico</span>
                        <h1 className="sifco-hero-title">
                            <span className="sifco-text-highlight">Descubre cuánto dinero estás</span>
                            <br />
                            perdiendo en tu proceso de créditos
                        </h1>
                        <p className="sifco-hero-description">
                            En menos de 3 minutos calcula tu ROI potencial y visualiza cuánto podrías recuperar con{' '}
                            <strong>B1Lending — Colocación + Recuperación</strong>
                        </p>
                        <button onClick={nextStep} className="sifco-btn sifco-btn-primary">
                            <span>Calcular ahora</span>
                            <i className="sifco-arrow-icon"></i>
                        </button>
                    </div>
                </div>
            </main>

            {/* FEATURES / METRICS SECTION */}
            <section className="sifco-metrics-container">
                <h2 className="sifco-metrics-title">
                    Lo que logran las entidades financieras inteligentes con SIFCO
                </h2>

                <div className="sifco-metrics-grid">
                    {/* Tarjeta 1 */}
                    <div className="sifco-metric-card">
                        <img src={icon1} alt="Reducción en tiempo de proceso" className="sifco-metric-icon" />
                        <p className="sifco-metric-text">Reducción en tiempo de proceso</p>
                    </div>
                    {/* Tarjeta 2 */}
                    <div className="sifco-metric-card">
                        <img src={icon2} alt="Más créditos mismo equipo" className="sifco-metric-icon" />
                        <p className="sifco-metric-text">Mas créditos mismo equipo</p>
                    </div>
                    {/* Tarjeta 3 */}
                    <div className="sifco-metric-card">
                        <img src={icon3} alt="Menos errores y reprocesos" className="sifco-metric-icon" />
                        <p className="sifco-metric-text">Menos errores y reprocesos</p>
                    </div>
                    {/* Tarjeta 4 */}
                    <div className="sifco-metric-card">
                        <img src={icon4} alt="Mejora en recuperación" className="sifco-metric-icon" />
                        <p className="sifco-metric-text">Mejora en recuperación</p>
                    </div>
                </div>
            </section>
            <section>
                <HowItWorks />
            </section>

        </div>
    );
};

export default Welcome;