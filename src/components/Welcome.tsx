import React from 'react';
import './welcome.css';
import { useCalculatorStore } from './../lib/useCalculatorStore';
export const Welcome: React.FC = () => {
    const { nextStep } = useCalculatorStore();
    return (
        <div className="sifco-page-wrapper">

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

            {/* HERO SECTION */}
            <main className="sifco-hero-container">
                <div className="sifco-hero-card">
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
                        <span className="sifco-metric-number">70%</span>
                        <p className="sifco-metric-text">Reducción en tiempo de proceso</p>
                    </div>
                    {/* Tarjeta 2 */}
                    <div className="sifco-metric-card">
                        <span className="sifco-metric-number">3x</span>
                        <p className="sifco-metric-text">Mas créditos mismo equipo</p>
                    </div>
                    {/* Tarjeta 3 */}
                    <div className="sifco-metric-card">
                        <span className="sifco-metric-number">60%</span>
                        <p className="sifco-metric-text">Menos errores y reprocesos</p>
                    </div>
                    {/* Tarjeta 4 */}
                    <div className="sifco-metric-card">
                        <span className="sifco-metric-number">NPL-</span>
                        <p className="sifco-metric-text">Mejora en recuperación</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Welcome;