import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './calculatorsteps.css';

export const StepPortfolio: React.FC = () => {
  // 1. Selectores estrictos
  const saldoCarteraActiva = useCalculatorStore((state) => state.saldoCarteraActiva);
  const porcentajeMoraNPL = useCalculatorStore((state) => state.porcentajeMoraNPL);
  const diasAtrasoPromedio = useCalculatorStore((state) => state.diasAtrasoPromedio);

  const setFieldValue = useCalculatorStore((state) => state.setFieldValue);
  const nextStep = useCalculatorStore((state) => state.nextStep);
  const prevStep = useCalculatorStore((state) => state.prevStep);

  return (
    <div className="sifco-step-wrapper">
      <div className="sifco-step-container">

        <div className="sifco-step-badge-category">
          BLOQUE 6 — CARTERA Y MOROSIDAD
        </div>

        <h2 className="sifco-step-title">Como esta tu cartera hoy?</h2>
        <div className="sifco-step-progress-text">Paso 6 de 8 (75%)</div>

        <div className="sifco-step-progress-bar-container">
          <div className="sifco-step-progress-bar-fill" style={{ width: '75%' }}></div>
        </div>

        <p className="sifco-step-notice">
          Datos sobre el comportamiento de pago de tu cartera activa
        </p>

        <form className="sifco-step-form" onSubmit={(e) => e.preventDefault()}>

          {/* INPUT MONEDA CORREGIDO: type="number" evita bugs de renderizado al escribir */}
          <div className="sifco-step-input-group">
            <label className="sifco-step-label">Saldo total de cartera activa ($)</label>
            <div className="sifco-step-currency-input-wrapper">
              <span className="sifco-step-currency-symbol">$</span>
              <input
                type="number"
                className="sifco-step-input-text sifco-step-input-currency"
                value={saldoCarteraActiva || ''}
                onChange={(e) => setFieldValue('saldoCarteraActiva', Number(e.target.value))}
              />
            </div>
            <span className="sifco-step-input-help">+ Incluye todos los creditos vigentes en tu portafolio</span>
          </div>

          {/* SLIDER % DE MORA */}
          <div className="sifco-step-input-group">
            <label className="sifco-step-label">% de cartera en mora (NPL)</label>
            <div className="sifco-step-slider-container">
              <div
                className="sifco-step-slider-tooltip"
                style={{ left: `calc(${(porcentajeMoraNPL / 50) * 100}% - 20px)` }}
              >
                {porcentajeMoraNPL}%
              </div>
              <input
                type="range"
                min="0"
                max="50"
                className="sifco-step-input-range"
                value={porcentajeMoraNPL}
                onChange={(e) => setFieldValue('porcentajeMoraNPL', Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${(porcentajeMoraNPL / 50) * 100}%, #e2e8f0 ${(porcentajeMoraNPL / 50) * 100}%, #e2e8f0 100%)`
                }}
              />
            </div>
            <span className="sifco-step-input-help">+ Promedio LATAM microfinanzas: 8-15% NPL</span>
          </div>

          {/* SLIDER DÍAS PROMEDIO DE ATRASO */}
          <div className="sifco-step-input-group">
            <label className="sifco-step-label">Dias promedio de atraso en cartera mora</label>
            <div className="sifco-step-slider-container">
              <div
                className="sifco-step-slider-tooltip"
                style={{ left: `calc(${(diasAtrasoPromedio / 180) * 100}% - 25px)` }}
              >
                {diasAtrasoPromedio} dias
              </div>
              <input
                type="range"
                min="0"
                max="180"
                className="sifco-step-input-range"
                value={diasAtrasoPromedio}
                onChange={(e) => setFieldValue('diasAtrasoPromedio', Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #76BC21 0%, #76BC21 ${(diasAtrasoPromedio / 180) * 100}%, #e2e8f0 ${(diasAtrasoPromedio / 180) * 100}%, #e2e8f0 100%)`
                }}
              />
            </div>
            <span className="sifco-step-input-help">+ Riesgo alto con mas de 90 dias de atraso</span>
          </div>

          {/* NAVEGACIÓN */}
          <div className="sifco-step-navigation">
            <button type="button" className="sifco-step-btn sifco-step-btn-back" onClick={prevStep}>
              ← Atrás
            </button>
            <button type="button" className="sifco-step-btn sifco-step-btn-next" onClick={nextStep}>
              <span>Siguiente</span>
              <i className="sifco-step-arrow"></i>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StepPortfolio;