import React from 'react';
import { useCalculatorStore } from './../lib/useCalculatorStore';
import './calculatorsteps.css';

export const StepTwo: React.FC = () => {
    const tiempoAprobacion = useCalculatorStore((state) => state.tiempoAprobacion);
    const tiempoDesembolso = useCalculatorStore((state) => state.tiempoDesembolso);

    // 2. Acciones del store
    const setFieldValue = useCalculatorStore((state) => state.setFieldValue);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-step-wrapper">
            <div className="sifco-step-container">

                {/* TOP BADGE */}
                <div className="sifco-step-badge-category">
                    BLOQUE 2 — TIEMPOS DEL PROCESO
                </div>

                {/* TÍTULO PRINCIPAL Y PASO */}
                <h2 className="sifco-step-title">¿Cuánto tarda tu proceso hoy?</h2>
                <div className="sifco-step-progress-text">Paso 2 de 8 (25%)</div>

                {/* BARRA DE PROGRESO */}
                <div className="sifco-step-progress-bar-container">
                    <div className="sifco-step-progress-bar-fill" style={{ width: '25%' }}></div>
                </div>

                {/* SUBTÍTULO AVISO */}
                <p className="sifco-step-notice">
                    Desde que el cliente solicita hasta que recibe el desembolso
                </p>

                {/* FORMULARIO */}
                <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

                    {/* INPUT 1: TIEMPO DE APROBACIÓN */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Tiempo promedio de aprobación (días hábiles)</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `${(tiempoAprobacion / 15) * 100}%` }}
                            >
                                {tiempoAprobacion} días
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="15"
                                className="sifco-step-input-range"
                                value={tiempoAprobacion}
                                onChange={(e) => setFieldValue('tiempoAprobacion', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${(tiempoAprobacion / 15) * 100}%, #e2e8f0 ${(tiempoAprobacion / 15) * 100}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio instituciones tradicionales: 5-10 días</span>
                    </div>

                    {/* INPUT 2: TIEMPO ADICIONAL DESEMBOLSO */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Tiempo adicional hasta el desembolso (días)</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `${(tiempoDesembolso / 10) * 100}%` }}
                            >
                                {tiempoDesembolso} días
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                className="sifco-step-input-range"
                                value={tiempoDesembolso}
                                onChange={(e) => setFieldValue('tiempoDesembolso', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${(tiempoDesembolso / 10) * 100}%, #e2e8f0 ${(tiempoDesembolso / 10) * 100}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio: 2-5 días adicionales</span>
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

export default StepTwo;