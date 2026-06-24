import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './calculatorsteps.css';

export const StepPayments: React.FC = () => {
    // 1. Selectores de Zustand para el Paso 8
    const porcentajePagosManuales = useCalculatorStore((state) => state.porcentajePagosManuales);
    const porcentajeErroresAplicacion = useCalculatorStore((state) => state.porcentajeErroresAplicacion);
    const porcentajeWriteOffAnual = useCalculatorStore((state) => state.porcentajeWriteOffAnual);

    // 2. Acciones del store
    const setFieldValue = useCalculatorStore((state) => state.setFieldValue);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-step-wrapper">
            <div className="sifco-step-container">

                {/* TOP BADGE */}
                <div className="sifco-step-badge-category">
                    BLOQUE 8 — REGISTRO DE PAGOS Y PROVISIONES
                </div>

                {/* TÍTULO PRINCIPAL Y PROGRESO */}
                <h2 className="sifco-step-title">Como gestionas los pagos recibidos?</h2>
                <div className="sifco-step-progress-text">Paso 8 de 8 (100%)</div>

                {/* BARRA DE PROGRESO COMPLETA */}
                <div className="sifco-step-progress-bar-container">
                    <div className="sifco-step-progress-bar-fill" style={{ width: '100%' }}></div>
                </div>

                {/* SUBTÍTULO INFORMATIVO */}
                <p className="sifco-step-notice">
                    El registro preciso de pagos es clave para una cartera sana
                </p>

                {/* FORMULARIO */}
                <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

                    {/* INPUT 1: % DE PAGOS MANUALES */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% de pagos registrados manualmente</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `calc(${porcentajePagosManuales}% - 20px)` }}
                            >
                                {porcentajePagosManuales}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="sifco-step-input-range"
                                value={porcentajePagosManuales}
                                onChange={(e) => setFieldValue('porcentajePagosManuales', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${porcentajePagosManuales}%, #e2e8f0 ${porcentajePagosManuales}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ El registro manual genera mora tecnica y descuadres de cartera</span>
                    </div>

                    {/* INPUT 2: % DE ERRORES EN APLICACIÓN */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% de pagos con error en su aplicacion</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `calc(${(porcentajeErroresAplicacion / 30) * 100}% - 20px)` }} // Escala máx de visualización estimada al 30%
                            >
                                {porcentajeErroresAplicacion}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="30"
                                className="sifco-step-input-range"
                                value={porcentajeErroresAplicacion}
                                onChange={(e) => setFieldValue('porcentajeErroresAplicacion', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${(porcentajeErroresAplicacion / 30) * 100}%, #e2e8f0 ${(porcentajeErroresAplicacion / 30) * 100}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Errores generan mora tecnica, reclamos y costos adicionales</span>
                    </div>

                    {/* INPUT 3: % DE CARTERA CASTIGADA (WRITE-OFF) */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% de cartera castigada / write-off anual</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `calc(${(porcentajeWriteOffAnual / 20) * 100}% - 20px)` }} // Escala máx de visualización estimada al 20%
                            >
                                {porcentajeWriteOffAnual}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                className="sifco-step-input-range"
                                value={porcentajeWriteOffAnual}
                                onChange={(e) => setFieldValue('porcentajeWriteOffAnual', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${(porcentajeWriteOffAnual / 20) * 100}%, #e2e8f0 ${(porcentajeWriteOffAnual / 20) * 100}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio industria: 2-5% anual; mas de 5% indica alto riesgo</span>
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
                        {/* Botón final naranja para detonar los cálculos del reporte */}
                        <button
                            type="button"
                            className="sifco-step-btn sifco-step-btn-next sifco-step-btn-submit"
                            onClick={nextStep}
                            style={{ backgroundColor: '#F5A623', borderColor: '#F5A623' }}
                        >
                            <span>Ver mis resultados →</span>
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default StepPayments;