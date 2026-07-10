import React from 'react';
import './howitworks.css';
import { useCalculatorStore } from './../lib/useCalculatorStore';

export const HowItWorks: React.FC = () => {
  const { nextStep } = useCalculatorStore();
  return (
    <div className="sifco-how-wrapper">

      {/* SECCIÓN TÍTULO */}
      <section className="sifco-how-header">
        <h2 className="sifco-how-main-title">¿Cómo funciona la calculadora?</h2>
        <p className="sifco-how-subtitle">
          Este simulador analiza tu operación actual mediante un recorrido guiado. No necesitas realizar cálculos complejos; la herramienta cruzará tus datos para entregarte un reporte financiero en tiempo real al finalizar.
        </p>
      </section>

      {/* SECCIÓN PASOS Y PASARELAS */}

      {/* SECCIÓN SUMATORIA DIAGNÓSTICOS (BLOQUES GRANDES) */}
      <section className="sifco-how-summary-section">
        <div className="sifco-how-summary-container">

          {/* Bloque Naranja */}
          <div className="sifco-how-block-summary bg-block-orange">
            <h4 className="sifco-how-block-title">Diagnostico Colocación</h4>
            <p className="sifco-how-block-desc">Eficiencia · Riesgo Potencial de automatización</p>
          </div>

          <div className="sifco-how-operator">+</div>

          {/* Bloque Verde */}
          <div className="sifco-how-block-summary bg-block-green">
            <h4 className="sifco-how-block-title">Diagnostico Recuperación</h4>
            <p className="sifco-how-block-desc">Morosidad · Cobranza Registro de pagos</p>
          </div>

          <div className="sifco-how-operator">+</div>

          {/* Bloque Blanco */}
          <div className="sifco-how-block-summary bg-block-white">
            <h4 className="sifco-how-block-title text-green-dark">ROI Total</h4>
            <p className="sifco-how-block-desc text-gray">Colocación + Recuperación = Oportunidad anual</p>
          </div>

        </div>
      </section>

      {/* BOTÓN INICIAR */}
      <div className="sifco-how-footer">
        <button onClick={nextStep} className="sifco-how-btn-start">
          <span>Iniciar Ahora</span>
          <i className="sifco-how-arrow"></i>
        </button>
      </div>

    </div>
  );
};

export default HowItWorks;