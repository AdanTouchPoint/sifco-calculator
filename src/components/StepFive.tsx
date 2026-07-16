import React from 'react';
import { useCalculatorStore } from './../lib/useCalculatorStore';
import './calculatorsteps.css'; // Usamos tu CSS reutilizable de siempre

export const StepFive: React.FC = () => {
    // 1. Suscripción a las variables del Paso 5
    const porcentajeManual = useCalculatorStore((state) => state.porcentajeManual as number);
    const sistemasActuales = useCalculatorStore((state) => state.sistemasActuales);

    // 2. Acciones globales
    const setFieldValue = useCalculatorStore((state) => state.setFieldValue);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-step-wrapper">
            <div className="sifco-step-container">

                {/* TOP BADGE */}
                <div className="sifco-step-badge-category">
                    BLOQUE 5 — Nivel de Automatización
                </div>

                {/* TÍTULO PRINCIPAL Y PROGRESO */}
                <h2 className="sifco-step-title">Que tan manual es tu proceso hoy?</h2>
                <div className="sifco-step-progress-text">Paso 5 de 8 (63%)</div>

                {/* BARRA DE PROGRESO */}
                <div className="sifco-step-progress-bar-container">
                    <div className="sifco-step-progress-bar-fill" style={{ width: '63%' }}></div>
                </div>

                {/* SUBTÍTULO INFORMATIVO */}
                <p className="sifco-step-notice">
                    Identificamos donde estan tus mayores oportunidades de mejora
                </p>

                {/* FORMULARIO */}
                <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

                    {/* INPUT 1: SLIDER PORCENTAJE MANUAL */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% del proceso que es manual actualmente</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `${porcentajeManual}%` }}
                            >
                                {porcentajeManual}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="sifco-step-input-range"
                                value={porcentajeManual}
                                onChange={(e) => setFieldValue('porcentajeManual', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${porcentajeManual}%, #e2e8f0 ${porcentajeManual}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Promedio banca tradicional LATAM: 60-80% manual</span>
                    </div>

                    {/* INPUT 2: CUANTOS SISTEMAS USAN */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Cuantos sistemas/herramientas usan actualmente?</label>
                        <input
                            type="number"
                            min="1"
                            className="sifco-step-input-text"
                            value={sistemasActuales}
                            onChange={(e) => setFieldValue('sistemasActuales', Number(e.target.value))}
                        />
                        <span className="sifco-step-input-help">+ El 70% de instituciones LATAM opera con 2-4 sistemas no integrados</span>
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

export default StepFive;