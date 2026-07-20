import React, { useState } from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import { calculateROI } from '../lib/calculations';
import { generateResultadosPDF } from '../lib/generatePDF';
import './resultados.css';
import './print.css';
import RecuperacionScreen from './RecuperacionScreen';
import ColocacionScreen from './ColocacionScreen';


const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export const Resultados: React.FC = () => {
    const state = useCalculatorStore();
    const resetCalculator = state.resetCalculator;
    const leadFormCompleted = state.leadFormCompleted;
    const goToStep = state.goToStep;

    const results = calculateROI(state);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            await generateResultadosPDF(state.empresa);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div id="sifco-results-capture" className="sifco-res-wrapper">
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
                            <span className="sifco-res-mini-value">{formatCurrency(results.ROI_COLOCACION)}</span>
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
                            <span className="sifco-res-mini-value">{formatCurrency(results.ROI_RECUPERACION)}</span>
                        </div>
                    </div>

                </div>

                {/* SECCIÓN CENTRAL: GRAN TOTAL */}
                <div className="sifco-res-total-section">
                    <h1 className="sifco-res-grand-total">{formatCurrency(results.ROI_TOTAL)}</h1>

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
                        {leadFormCompleted ? (
                            <button
                                type="button"
                                className="sifco-res-link"
                                onClick={handleDownload}
                                disabled={downloading}
                            >
                                {downloading ? '⏳ Generando PDF...' : '⬇ Descargar reporte PDF'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="sifco-res-link sifco-res-link-disabled"
                                title="Llena el formulario para descargar tu reporte"
                                onClick={() => goToStep(9)}
                            >
                                Descargar reporte PDF 🔒
                            </button>
                        )}
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