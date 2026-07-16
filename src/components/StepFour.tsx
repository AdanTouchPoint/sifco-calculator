import React from 'react';
import { useCalculatorStore } from './../lib/useCalculatorStore';
import './calculatorsteps.css';

export const StepFour: React.FC = () => {
    const porcentajeAbandono = useCalculatorStore((state) => state.porcentajeAbandono);
    const porcentajeReprocesos = useCalculatorStore((state) => state.porcentajeReprocesos);

    // 2. Acciones del store
    const setFieldValue = useCalculatorStore((state) => state.setFieldValue);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-step-wrapper">
            <div className="sifco-step-container">

                {/* TOP BADGE */}
                <div className="sifco-step-badge-category">
                    BLOQUE 4 — Ineficiencias Actuales
                </div>

                {/* TÍTULO PRINCIPAL Y PROGRESO */}
                <h2 className="sifco-step-title">Que tanto se pierde en el camino?</h2>
                <div className="sifco-step-progress-text">Paso 4 de 8 (50%)</div>

                {/* BARRA DE PROGRESO */}
                <div className="sifco-step-progress-bar-container">
                    <div className="sifco-step-progress-bar-fill" style={{ width: '50%' }}></div>
                </div>

                {/* SUBTÍTULO INFORMATIVO */}
                <p className="sifco-step-notice">
                    Estos datos revelan el costo oculto de tu operacion actual
                </p>

                {/* FORMULARIO */}
                <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

                    {/* INPUT 1: % DE ABANDONO */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% de clientes que abandonan el proceso</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `${porcentajeAbandono}%` }}
                            >
                                {porcentajeAbandono}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="sifco-step-input-range"
                                value={porcentajeAbandono}
                                onChange={(e) => setFieldValue('porcentajeAbandono', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${porcentajeAbandono}%, #e2e8f0 ${porcentajeAbandono}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio industria financiera LATAM: 15-25%</span>
                    </div>

                    {/* INPUT 2: % DE REPROCESOS */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% de solicitudes con errores o reprocesos</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `${porcentajeReprocesos}%` }}
                            >
                                {porcentajeReprocesos}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="sifco-step-input-range"
                                value={porcentajeReprocesos}
                                onChange={(e) => setFieldValue('porcentajeReprocesos', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${porcentajeReprocesos}%, #e2e8f0 ${porcentajeReprocesos}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio procesos manuales: 20-30%</span>
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

export default StepFour;