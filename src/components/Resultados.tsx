import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './resultados.css';
import RecuperacionScreen from './RecuperacionScreen';
import ColocacionScreen from './ColocacionScreen';

export const Resultados: React.FC = () => {
    const resetCalculator = useCalculatorStore((state) => state.resetCalculator); // O la función que maneje el regreso al inicio

    return (
        <div className="sifco-res-wrapper">
            <div className="sifco-res-container">
                <ColocacionScreen />
                <RecuperacionScreen />
                {/* FILA SUPERIOR: SUMA DE TARJETAS */}
                <div className="sifco-res-sum-row">

                    {/* Tarjeta Colocación */}
                    <div className="sifco-res-mini-card border-green">
                        <span className="sifco-res-mini-label">Colocacion</span>
                        <div className="sifco-res-mini-value-wrapper color-green">
                            <svg className="sifco-res-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            <span className="sifco-res-mini-value">$326,400</span>
                        </div>
                    </div>

                    {/* Signo Más */}
                    <div className="sifco-res-math-sign">+</div>

                    {/* Tarjeta Recuperación */}
                    <div className="sifco-res-mini-card border-amber">
                        <span className="sifco-res-mini-label">Recuperacion</span>
                        <div className="sifco-res-mini-value-wrapper color-amber">
                            <svg className="sifco-res-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-res-mini-value">$112,800</span>
                        </div>
                    </div>

                </div>

                {/* SECCIÓN CENTRAL: GRAN TOTAL */}
                <div className="sifco-res-total-section">
                    <h1 className="sifco-res-grand-total">$439,200</h1>

                    <p className="sifco-res-total-desc">
                        Suma de ahorros en colocación mas recuperación de cartera
                    </p>

                    <div className="sifco-res-meta">
                        Proyeccion a 12 meses <span className="sifco-res-divider">|</span> benchmarks B1Lending
                    </div>
                </div>

                {/* SECCIÓN ACCIONES / BOTONES */}
                <div className="sifco-res-actions">

                    {/* Botón Principal Llamativo */}
                    <button type="button" className="sifco-res-btn-primary">
                        Solicitar demo personalizada
                    </button>

                    {/* Enlaces Secundarios */}
                    <div className="sifco-res-links-row">
                        <a href="#descargar" className="sifco-res-link">Descargar reporte PDF</a>
                        <a href="#hablar" className="sifco-res-link">Hablar con un asesor</a>
                    </div>

                    {/* Botón Recalcular */}
                    <button type="button" className="sifco-res-btn-recalc" onClick={resetCalculator}>
                        <span className="sifco-res-arrow">←</span> Recalcular con otros datos
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Resultados;