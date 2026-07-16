import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './calculatorsteps.css'; // Usamos las mismas clases de estilos globales

export const StepSeven: React.FC = () => {
    // 1. Selectores estrictos desde el store de Zustand
    const porcentajeRecuperacion = useCalculatorStore((state) => state.porcentajeRecuperacion);
    const costoMensualCobranza = useCalculatorStore((state) => state.costoMensualCobranza);
    const porcentajeGestionesManuales = useCalculatorStore((state) => state.porcentajeGestionesManuales);

    // 2. Acciones globales de navegación y mutación
    const setFieldValue = useCalculatorStore((state) => state.setFieldValue);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-step-wrapper">
            <div className="sifco-step-container">

                {/* TOP BADGE */}
                <div className="sifco-step-badge-category">
                    BLOQUE 7 — Eficiencia de Cobranza
                </div>

                {/* TÍTULO PRINCIPAL Y PROGRESO */}
                <h2 className="sifco-step-title">Que tan efectiva es tu cobranza?</h2>
                <div className="sifco-step-progress-text">Paso 7 de 8 (88%)</div>

                {/* BARRA DE PROGRESO */}
                <div className="sifco-step-progress-bar-container">
                    <div className="sifco-step-progress-bar-fill" style={{ width: '88%' }}></div>
                </div>

                {/* SUBTÍTULO INFORMATIVO */}
                <p className="sifco-step-notice">
                    Medimos cuanto recuperas y a que costo con el proceso actual
                </p>

                {/* FORMULARIO */}
                <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

                    {/* INPUT 1: % DE RECUPERACIÓN */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% de recuperacion en cartera mora</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `${porcentajeRecuperacion}%` }}
                            >
                                {porcentajeRecuperacion}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="sifco-step-input-range"
                                value={porcentajeRecuperacion}
                                onChange={(e) => setFieldValue('porcentajeRecuperacion', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${porcentajeRecuperacion}%, #e2e8f0 ${porcentajeRecuperacion}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio instituciones LATAM: 50-70% de recuperacion</span>
                    </div>

                    {/* INPUT 2: COSTO MENSUAL COBRANZA (Monetario seguro) */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Costo mensual del area de cobranza ($)</label>
                        <div className="sifco-step-currency-input-wrapper">
                            <span className="sifco-step-currency-symbol">$</span>
                            <input
                                type="number"
                                className="sifco-step-input-text sifco-step-input-currency"
                                value={costoMensualCobranza || ''}
                                onChange={(e) => setFieldValue('costoMensualCobranza', Number(e.target.value))}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Incluye salarios, llamadas, visitas y gestion administrativa</span>
                    </div>

                    {/* INPUT 3: % DE GESTIONES MANUALES */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% de gestiones de cobranza que son manuales</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `${porcentajeGestionesManuales}%` }}
                            >
                                {porcentajeGestionesManuales}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="sifco-step-input-range"
                                value={porcentajeGestionesManuales}
                                onChange={(e) => setFieldValue('porcentajeGestionesManuales', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${porcentajeGestionesManuales}%, #e2e8f0 ${porcentajeGestionesManuales}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio sector: 70-85% manual (llamadas, visitas, papeleo)</span>
                    </div>

                    {/* BOTONES DE NAVEGACIÓN */}
                    <div className="sifco-step-navigation">
                        <button
                            type="button"
                            className="sifco-step-btn sifco-step-btn-back"
                            onClick={prevStep}
                        >
                            ← Atrás
                        </button>
                        <button
                            type="button"
                            className="sifco-step-btn sifco-step-btn-next"
                            onClick={nextStep}
                        >
                            <span>Siguiente</span>
                            <i className="sifco-step-arrow"></i>
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default StepSeven;