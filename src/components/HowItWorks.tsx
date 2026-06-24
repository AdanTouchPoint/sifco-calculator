import React from 'react';
import './howitworks.css';

export const HowItWorks: React.FC = () => {
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
      <section className="sifco-how-steps-section">

        {/* Grupo Módulo Colocación (Pasos 1 - 5) */}
        <div className="sifco-how-group">
          <div className="sifco-how-group-badge sifco-how-badge-orange">
            Módulo Colocación (Pasos 1 – 5)
          </div>

          <div className="sifco-how-grid-5">
            {/* Tarjeta 1 */}
            <div className="sifco-how-step-card sifco-how-card-orange">
              <h3 className="sifco-how-card-title text-orange">Volumen</h3>
              <p className="sifco-how-card-desc">Solicitudes conversion ticket</p>
              <span className="sifco-how-card-num bg-orange">1 →</span>
            </div>

            {/* Tarjeta 2 */}
            <div className="sifco-how-step-card sifco-how-card-orange">
              <h3 className="sifco-how-card-title text-orange">Tiempos</h3>
              <p className="sifco-how-card-desc">Aprobacion y desembolso</p>
              <span className="sifco-how-card-num bg-orange">2 →</span>
            </div>

            {/* Tarjeta 3 */}
            <div className="sifco-how-step-card sifco-how-card-orange">
              <h3 className="sifco-how-card-title text-orange">Equipo</h3>
              <p className="sifco-how-card-desc">Analistas costo, horas</p>
              <span className="sifco-how-card-num bg-orange">3 →</span>
            </div>

            {/* Tarjeta 4 */}
            <div className="sifco-how-step-card sifco-how-card-orange">
              <h3 className="sifco-how-card-title text-orange">Ineficiencias</h3>
              <p className="sifco-how-card-desc">Abandono reprocesos</p>
              <span className="sifco-how-card-num bg-orange">4 →</span>
            </div>

            {/* Tarjeta 5 */}
            <div className="sifco-how-step-card sifco-how-card-orange">
              <h3 className="sifco-how-card-title text-orange">Automatización</h3>
              <p className="sifco-how-card-desc">% manual sistemas</p>
              <span className="sifco-how-card-num bg-orange">5 →</span>
            </div>
          </div>
        </div>

        {/* Grupo Módulo Recuperación (Pasos 6 - 8) */}
        <div className="sifco-how-group sifco-how-group-recovery">
          <div className="sifco-how-group-badge sifco-how-badge-green">
            Módulo Recuperación (Pasos 6 – 8)
          </div>

          <div className="sifco-how-grid-3">
            {/* Tarjeta 6 */}
            <div className="sifco-how-step-card sifco-how-card-green">
              <h3 className="sifco-how-card-title text-green">Cartera</h3>
              <p className="sifco-how-card-desc">NPL, mora dias atraso</p>
              <span className="sifco-how-card-num bg-green">6 →</span>
            </div>

            {/* Tarjeta 7 */}
            <div className="sifco-how-step-card sifco-how-card-green">
              <h3 className="sifco-how-card-title text-green">Cobranza</h3>
              <p className="sifco-how-card-desc">Recuperación costo gestión</p>
              <span className="sifco-how-card-num bg-green">7 →</span>
            </div>

            {/* Tarjeta 8 */}
            <div className="sifco-how-step-card sifco-how-card-green">
              <h3 className="sifco-how-card-title text-green">Pagos</h3>
              <p className="sifco-how-card-desc">Registro errores write-off</p>
              <span className="sifco-how-card-num bg-green-solid">8</span>
            </div>
          </div>
        </div>

      </section>

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
        <button className="sifco-how-btn-start">
          <span>Iniciar Ahora</span>
          <i className="sifco-how-arrow"></i>
        </button>
      </div>

    </div>
  );
};

export default HowItWorks;