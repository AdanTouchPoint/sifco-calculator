import React, { useState } from 'react';
import './calculatorsteps.css';
import { useCalculatorStore } from './../lib/useCalculatorStore';
export const StepOne: React.FC = () => {
    // 2. Te suscribes a los datos que te interesan de este paso
    const solicitudesMes = useCalculatorStore((state) => state.solicitudesMes);
    const porcentajeAprobado = useCalculatorStore((state) => state.porcentajeAprobado);
    const montoTicket = useCalculatorStore((state) => state.montoTicket);
    const setFieldValue = useCalculatorStore((state) => state.setFieldValue);

    // 3. Traes el control de navegación
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-step-wrapper">
            <div className="sifco-step-container">

                {/* TOP BADGE */}
                <div className="sifco-step-badge-category">
                    Bloque 1 – Volumen de Negocio
                </div>

                {/* TÍTULO PRINCIPAL Y PASO */}
                <h2 className="sifco-step-title">¿Cuánto mueven tus créditos?</h2>
                <div className="sifco-step-progress-text">Paso 1 de 8</div>

                {/* BARRA DE PROGRESO */}
                <div className="sifco-step-progress-bar-container">
                    <div className="sifco-step-progress-bar-fill" style={{ width: '12.5%' }}></div> {/* 1 de 8 = 12.5% */}
                </div>

                {/* SUBTÍTULO AVISO */}
                <p className="sifco-step-notice">
                    Datos básicos de tu operación mensual, valores pre-cargados con benchmarks LATAM
                </p>

                {/* FORMULARIO DE ENTRADAS */}
                <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

                    {/* INPUT 1: SOLICITUDES */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Solicitudes de crédito al mes</label>
                        <input
                            type="number"
                            className="sifco-step-input-text"
                            value={solicitudesMes}
                            onChange={(e) => setFieldValue("solicitudesMes", Number(e.target.value))}
                        />
                        <span className="sifco-step-input-help">+ Promedio regional: 300-500 solicitudes/mes</span>
                    </div>

                    {/* INPUT 2: SLIDER PORCENTAJE */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">% que se convierten en crédito aprobado</label>

                        <div className="sifco-step-slider-container">
                            {/* Tooltip flotante con el valor actual */}
                            <div
                                className="sifco-step-slider-tooltip"
                                style={{ left: `calc(${porcentajeAprobado}% - 20px)` }}
                            >
                                {porcentajeAprobado}%
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="sifco-step-input-range"
                                value={porcentajeAprobado}
                                onChange={(e) => setFieldValue("porcentajeAprobado", Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${porcentajeAprobado}%, #e2e8f0 ${porcentajeAprobado}%, #e2e8f0 100%)`
                                }}
                            />
                        </div>

                        <span className="sifco-step-input-help">+ Promedio industria LATAM: 35-50%</span>
                    </div>

                    {/* INPUT 3: MONTO PROMEDIO */}
                    <div className="sifco-step-input-group">
                        <label className="sifco-step-label">Monto promedio del crédito (ticket) en $</label>
                        <div className="sifco-step-currency-input-wrapper">
                            <span className="sifco-step-currency-symbol">$</span>
                            <input
                                type="text"
                                className="sifco-step-input-text sifco-step-input-currency"
                                value={montoTicket}
                                onChange={(e) => setFieldValue("montoTicket", Number(e.target.value))}
                            />
                        </div>
                        <span className="sifco-step-input-help">+ Micro: $500-$3K / Consumo: $3K-$15K / Empresarial: $15K+</span>
                    </div>

                    {/* BOTONES DE NAVEGACIÓN */}
                    <div className="sifco-step-navigation">
                        <button onClick={prevStep} type="button" className="sifco-step-btn sifco-step-btn-back">
                            ← Inicio
                        </button>
                        <button onClick={nextStep} type="button" className="sifco-step-btn sifco-step-btn-next">
                            <span>Siguiente</span>
                            <i className="sifco-step-arrow"></i>
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default StepOne;