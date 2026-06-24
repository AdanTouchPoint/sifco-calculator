import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './CalculatorSteps.css';

export const StepThree: React.FC = () => {
    const numAnalistas = useCalculatorStore((state) => state.numAnalistas);
    const salarioAnalista = useCalculatorStore((state) => state.salarioAnalista);
    const horasLaboralesMes = useCalculatorStore((state) => state.horasLaboralesMes);

    // 2. Acciones globales
    const setFieldValue = useCalculatorStore((state) => state.setFieldValue);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-step-wrapper">
            <div className="sifco-step-container">

                {/* TOP BADGE */}
                <div className="sifco-step-badge-category">
                    BLOQUE 3 — EQUIPO OPERATIVO
                </div>

                {/* TÍTULO PRINCIPAL Y PROGRESO */}
                <h2 className="sifco-step-title">Como esta compuesto tu equipo?</h2>
                <div className="sifco-step-progress-text">Paso 3 de 8 (38%)</div>

                {/* BARRA DE PROGRESO */}
                <div className="sifco-step-progress-bar-container">
                    <div className="sifco-step-progress-bar-fill" style={{ width: '38%' }}></div>
                </div>

                {/* SUBTÍTULO AVISO */}
                <p className="sifco-step-notice">
                    Calculamos el costo real por credito procesado — referencias LATAM pre-cargadas
                </p>

                {/* FORMULARIO */}
                <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

                    {/* INPUT 1: NÚMERO DE ANALISTAS */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Numero de analistas de credito</label>
                        <input
                            type="number"
                            className="sifco-step-input-text"
                            value={numAnalistas}
                            onChange={(e) => setFieldValue('numAnalistas', Number(e.target.value))}
                        />
                        <span className="sifco-step-input-help">+ Tipico: 1 analista por cada 60-80 solicitudes/mes</span>
                    </div>

                    {/* INPUT 2: SALARIO MENSUAL */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Salario mensual promedio por analista ($)</label>
                        <div className="sifco-step-currency-input-wrapper">
                            <span className="sifco-step-currency-symbol">$</span>
                            <input
                                type="number"
                                className="sifco-step-input-text sifco-step-input-currency"
                                value={salarioAnalista}
                                onChange={(e) => setFieldValue('salarioAnalista', Number(e.target.value))}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Referencia LATAM: $500-$1,200 segun pais y nivel</span>
                    </div>

                    {/* INPUT 3: SLIDER HORAS LABORALES */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Horas laborales al mes por analista</label>

                        <div className="sifco-step-slider-container">
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `calc(${(horasLaboralesMes / 200) * 100}% - 20px)` }} // Base máxima estimada de 200h para el slider
                            >
                                {horasLaboralesMes} h
                            </div>
                            <input
                                type="range"
                                min="40"
                                max="200"
                                className="sifco-step-input-range"
                                value={horasLaboralesMes}
                                onChange={(e) => setFieldValue('horasLaboralesMes', Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${(horasLaboralesMes / 200) * 100}%, #e2e8f0 ${(horasLaboralesMes / 200) * 100}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>

                        <span className="sifco-step-input-help">+ Estandar: 160 horas/mes (jornada completa)</span>
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

export default StepThree;