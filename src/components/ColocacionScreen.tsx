import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './colocacionscreen.css';

export const ColocacionScreen: React.FC = () => {
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-diag-wrapper">

            {/* HERO HEADER VERDE COMPLETO */}
            <div className="sifco-diag-hero">
                <div className="sifco-diag-hero-content">
                    <span className="sifco-diag-hero-tag">Diagnostico de tu Operación</span>
                    <h1 className="sifco-diag-hero-title">
                        400 solicitudes/mes,<br />$5,000 ticket promedio
                    </h1>
                    <p className="sifco-diag-hero-subtitle">
                        Basado en benchmarks reales de implementaciones B1Lending
                    </p>
                </div>
            </div>

            {/* CONTENEDOR SEPARADO ABAJO (SIN ENTRAR EN EL HERO) */}
            <div className="sifco-diag-container">

                {/* FILA 1: TARJETAS GRANDES DE ESTADO */}
                <div className="sifco-diag-top-cards">
                    <div className="sifco-diag-big-card border-pink">
                        <span className="sifco-diag-big-label">Eficiencia Operativa</span>
                        <div className="sifco-diag-big-value-wrapper color-pink">
                            <svg className="sifco-diag-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M7 11h10v2H7z" />
                            </svg>
                            <span className="sifco-diag-big-value">Baja</span>
                        </div>
                    </div>

                    <div className="sifco-diag-big-card border-amber">
                        <span className="sifco-diag-big-label">Riesgo Operativo</span>
                        <div className="sifco-diag-big-value-wrapper color-amber">
                            <svg className="sifco-diag-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-diag-big-value">Medio</span>
                        </div>
                    </div>

                    <div className="sifco-diag-big-card border-green">
                        <span className="sifco-diag-big-label">Potencial de Automatización</span>
                        <div className="sifco-diag-big-value-wrapper color-green">
                            <svg className="sifco-diag-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            <span className="sifco-diag-big-value">Alto</span>
                        </div>
                    </div>
                </div>

                {/* FILA 2: TARJETAS DE MÉTRICAS */}
                <div className="sifco-diag-bottom-cards">
                    <div className="sifco-diag-metric-card border-pink">
                        <div className="sifco-diag-metric-label">Pérdida por abandono / mes</div>
                        <div className="sifco-diag-metric-value color-pink">$24,000</div>
                        <div className="sifco-diag-metric-desc">
                            Clientes listos para tomar crédito que se van por fricción.
                        </div>
                    </div>

                    <div className="sifco-diag-metric-card border-pink">
                        <div className="sifco-diag-metric-label">Costo de reprocesos / mes</div>
                        <div className="sifco-diag-metric-value color-pink">$3,200</div>
                        <div className="sifco-diag-metric-desc">
                            Horas de analistas perdidas en correcciones y retrabajos.
                        </div>
                    </div>

                    <div className="sifco-diag-metric-card border-green">
                        <div className="sifco-diag-metric-label">Créditos adicionales / mes</div>
                        <div className="sifco-diag-metric-value color-green">+112</div>
                        <div className="sifco-diag-metric-desc">
                            Con el mismo equipo, optimizando el proceso.
                        </div>
                    </div>

                    <div className="sifco-diag-metric-card border-green">
                        <div className="sifco-diag-metric-label">Días ahorrados / Crédito</div>
                        <div className="sifco-diag-metric-value color-green">5 días</div>
                        <div className="sifco-diag-metric-desc">
                            Desembolso más rápido = ingresos que llegan antes.
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 3: TABLA COMPARATIVA */}
                <div className="sifco-diag-table-section">
                    <h3 className="sifco-diag-table-title">Colocación: Hoy vs. Con B1Lending</h3>

                    <div className="sifco-diag-table-responsive">
                        <table className="sifco-diag-table">
                            <thead>
                                <tr>
                                    <th>Métrica</th>
                                    <th>Hoy</th>
                                    <th>Con B1Lending</th>
                                    <th>Mejora</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tiempo de aprobación</td>
                                    <td className="color-pink font-bold">5 días</td>
                                    <td className="color-green">2 días</td>
                                    <td className="color-green font-bold">- 60%</td>
                                </tr>
                                <tr>
                                    <td>Tiempo total hasta desembolso</td>
                                    <td className="color-pink font-bold">8 días</td>
                                    <td className="color-green">3.2 días</td>
                                    <td className="color-green font-bold">- 5 días</td>
                                </tr>
                                <tr>
                                    <td>Créditos procesados / mes</td>
                                    <td className="color-pink font-bold">160</td>
                                    <td className="color-green">267</td>
                                    <td className="color-green font-bold">+ 107 más</td>
                                </tr>
                                <tr>
                                    <td>Costo operativo por crédito</td>
                                    <td className="color-pink font-bold">$25</td>
                                    <td className="color-green">$10</td>
                                    <td className="color-green font-bold">- 60%</td>
                                </tr>
                                <tr>
                                    <td>% Reprocesos</td>
                                    <td className="color-pink font-bold">25%</td>
                                    <td className="color-green">10%</td>
                                    <td className="color-green font-bold">- 60%</td>
                                </tr>
                                <tr>
                                    <td>% Abandono de clientes</td>
                                    <td className="color-pink font-bold">20%</td>
                                    <td className="color-green">10%</td>
                                    <td className="color-green font-bold">- 50%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="sifco-diag-disclaimer">
                        * Benchmarks basados en implementaciones reales de B1Lending. Resultados pueden variar.
                    </p>
                </div>

                {/* BOTÓN DE RETORNO */}
                <div className="sifco-diag-footer">
                    <button type="button" className="sifco-diag-btn-back" onClick={prevStep}>
                        ← Modificar Datos
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ColocacionScreen;