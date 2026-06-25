import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './recuperacionscreen.css';

export const RecuperacionScreen: React.FC = () => {
    const prevStep = useCalculatorStore((state) => state.prevStep);

    return (
        <div className="sifco-rec-wrapper">

            {/* HERO HEADER VERDE DE RECUPERACIÓN */}
            <div className="sifco-rec-hero">
                <div className="sifco-rec-hero-content">
                    <span className="sifco-rec-hero-tag">Diagnostico de Recuperación</span>
                    <h1 className="sifco-rec-hero-title">
                        Cartera $500K, NPL 10%,<br />recuperacion 60%
                    </h1>
                    <p className="sifco-rec-hero-subtitle">
                        Benchmarks B1Lending: cobranza digital y recuperacion automatizada
                    </p>
                </div>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="sifco-rec-container">

                {/* FILA 1: TARJETAS GRANDES DE ESTADO (Todas en estado "Medio" / Amber en image_9d2ac3.png) */}
                <div className="sifco-rec-top-cards">

                    <div className="sifco-rec-big-card border-amber">
                        <span className="sifco-rec-big-label">Índice de Morosidad</span>
                        <div className="sifco-rec-big-value-wrapper color-amber">
                            <svg className="sifco-rec-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-rec-big-value">Medio</span>
                        </div>
                    </div>

                    <div className="sifco-rec-big-card border-amber">
                        <span className="sifco-rec-big-label">Eficiencia de Cobranza</span>
                        <div className="sifco-rec-big-value-wrapper color-amber">
                            <svg className="sifco-rec-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-rec-big-value">Medio</span>
                        </div>
                    </div>

                    <div className="sifco-rec-big-card border-amber">
                        <span className="sifco-rec-big-label">Riesgo Registro de Pagos</span>
                        <div className="sifco-rec-big-value-wrapper color-amber">
                            <svg className="sifco-rec-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-rec-big-value">Medio</span>
                        </div>
                    </div>

                </div>

                {/* FILA 2: TARJETAS DE MÉTRICAS INFERIORES */}
                <div className="sifco-rec-bottom-cards">

                    <div className="sifco-rec-metric-card border-pink">
                        <div className="sifco-rec-metric-label">Pérdida por mora no recuperada</div>
                        <div className="sifco-rec-metric-value color-pink">$20,000</div>
                        <div className="sifco-rec-metric-desc">
                            Cartera vencida que no se recupera con proceso actual
                        </div>
                    </div>

                    <div className="sifco-rec-metric-card border-pink">
                        <div className="sifco-rec-metric-label">Costo de cobranza / mes</div>
                        <div className="sifco-rec-metric-value color-pink">$2,000</div>
                        <div className="sifco-rec-metric-desc">
                            Gestión manual: llamadas, visitas y seguimiento
                        </div>
                    </div>

                    <div className="sifco-rec-metric-card border-green">
                        <div className="sifco-rec-metric-label">Recuperación adicional / mes</div>
                        <div className="sifco-rec-metric-value color-green">$7,500</div>
                        <div className="sifco-rec-metric-desc">
                            Mejora con alertas tempranas y IA
                        </div>
                    </div>

                    <div className="sifco-rec-metric-card border-green">
                        <div className="sifco-rec-metric-label">Ahorro en cobranza y errores</div>
                        <div className="sifco-rec-metric-value color-green">$1,100</div>
                        <div className="sifco-rec-metric-desc">
                            Automatizando gestiones y eliminando errores de pagos
                        </div>
                    </div>

                </div>

                {/* SECCIÓN 3: TABLA COMPARATIVA */}
                <div className="sifco-rec-table-section">
                    <h3 className="sifco-rec-table-title">Recuperación: Hoy vs. Con B1Lending</h3>

                    <div className="sifco-rec-table-responsive">
                        <table className="sifco-rec-table">
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
                                    <td>Cartera en mora (NPL)</td>
                                    <td className="color-pink font-bold">10%</td>
                                    <td className="color-green">7%</td>
                                    <td className="color-green font-bold">- 30%</td>
                                </tr>
                                <tr>
                                    <td>Tasa de recuperación</td>
                                    <td className="color-pink font-bold">60%</td>
                                    <td className="color-green">75%</td>
                                    <td className="color-green font-bold">+ 25%</td>
                                </tr>
                                <tr>
                                    <td>Costo de cobranza / mes</td>
                                    <td className="color-pink font-bold">$2,000</td>
                                    <td className="color-green">$1,100</td>
                                    <td className="color-green font-bold">- 45%</td>
                                </tr>
                                <tr>
                                    <td>Errores en registro de pagos</td>
                                    <td className="color-pink font-bold">5%</td>
                                    <td className="color-green">1.4%</td>
                                    <td className="color-green font-bold">- 72%</td>
                                </tr>
                                <tr>
                                    <td>Write-off / castigo anual</td>
                                    <td className="color-pink font-bold">3%</td>
                                    <td className="color-green">2.4%</td>
                                    <td className="color-green font-bold">- 20%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="sifco-rec-disclaimer">
                        * Benchmarks B1Lending: alertas tempranas, cobranza digital, conciliacion automatica de pagos.
                    </p>
                </div>

                {/* BOTÓN DE RETORNO */}
                <div className="sifco-rec-footer">
                    <button type="button" className="sifco-rec-btn-back" onClick={prevStep}>
                        ← Modificar Datos
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RecuperacionScreen;