import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import { calculateROI, MEJ_REC, MEJ_MORA, MEJ_COB, MEJ_ERR, MEJ_CAST } from '../lib/calculations';
import './recuperacionscreen.css';
import backgroundImg from '../assets/backgroundImg.png';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const formatPercent = (value: number) => new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(value);

export const RecuperacionScreen: React.FC = () => {
    const state = useCalculatorStore();

    const results = calculateROI(state);

    const getIndicatorClass = (indicator: string) => {
        if (indicator === 'Baja' || indicator === 'Alto') return 'border-pink';
        if (indicator === 'Media' || indicator === 'Medio') return 'border-amber';
        return 'border-green';
    };

    const getColorClass = (indicator: string) => {
        if (indicator === 'Baja' || indicator === 'Alto') return 'color-pink';
        if (indicator === 'Media' || indicator === 'Medio') return 'color-amber';
        return 'color-green';
    };

    return (
        <div className="sifco-rec-wrapper">

            {/* HERO HEADER VERDE DE RECUPERACIÓN */}
            <div className="sifco-rec-hero" style={{ backgroundImage: ` url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="sifco-rec-hero-content">
                    <span className="sifco-rec-hero-tag">Diagnostico de Recuperación</span>
                    <h1 className="sifco-rec-hero-title">
                        Cartera {formatCurrency(state.saldoCarteraActiva)}, NPL {state.porcentajeMoraNPL}%,<br />recuperacion {state.porcentajeRecuperacion}%
                    </h1>
                    <p className="sifco-rec-hero-subtitle">
                        Benchmarks B1Lending: cobranza digital y recuperacion automatizada
                    </p>
                </div>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="sifco-rec-container">

                {/* FILA 1: TARJETAS GRANDES DE ESTADO */}
                <div className="sifco-rec-top-cards">

                    <div className={`sifco-rec-big-card ${getIndicatorClass(results.indicadorMora)}`}>
                        <span className="sifco-rec-big-label">Índice de Morosidad</span>
                        <div className={`sifco-rec-big-value-wrapper ${getColorClass(results.indicadorMora)}`}>
                            <svg className="sifco-rec-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-rec-big-value">{results.indicadorMora}</span>
                        </div>
                    </div>

                    <div className={`sifco-rec-big-card ${getIndicatorClass(results.indicadorEficienciaCob)}`}>
                        <span className="sifco-rec-big-label">Eficiencia de Cobranza</span>
                        <div className={`sifco-rec-big-value-wrapper ${getColorClass(results.indicadorEficienciaCob)}`}>
                            <svg className="sifco-rec-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-rec-big-value">{results.indicadorEficienciaCob}</span>
                        </div>
                    </div>

                    <div className={`sifco-rec-big-card ${getIndicatorClass(results.indicadorRiesgoPagos)}`}>
                        <span className="sifco-rec-big-label">Riesgo Registro de Pagos</span>
                        <div className={`sifco-rec-big-value-wrapper ${getColorClass(results.indicadorRiesgoPagos)}`}>
                            <svg className="sifco-rec-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-rec-big-value">{results.indicadorRiesgoPagos}</span>
                        </div>
                    </div>

                </div>

                {/* FILA 2: TARJETAS DE MÉTRICAS INFERIORES */}
                <div className="sifco-rec-bottom-cards">

                    <div className="sifco-rec-metric-card border-pink">
                        <div className="sifco-rec-metric-label">Pérdida por mora no recuperada</div>
                        <div className="sifco-rec-metric-value color-pink">{formatCurrency(results.PERDIDA_MORA)}</div>
                        <div className="sifco-rec-metric-desc">
                            Cartera vencida que no se recupera con proceso actual
                        </div>
                    </div>

                    <div className="sifco-rec-metric-card border-pink">
                        <div className="sifco-rec-metric-label">Costo de cobranza / mes</div>
                        <div className="sifco-rec-metric-value color-pink">{formatCurrency(state.costoMensualCobranza)}</div>
                        <div className="sifco-rec-metric-desc">
                            Gestión manual: llamadas, visitas y seguimiento
                        </div>
                    </div>

                    <div className="sifco-rec-metric-card border-green">
                        <div className="sifco-rec-metric-label">Recuperación adicional / mes</div>
                        <div className="sifco-rec-metric-value color-green">{formatCurrency(results.PERDIDA_MORA - results.PERDIDA_MORA_NEW)}</div>
                        <div className="sifco-rec-metric-desc">
                            Mejora con alertas tempranas y IA
                        </div>
                    </div>

                    <div className="sifco-rec-metric-card border-green">
                        <div className="sifco-rec-metric-label">Ahorro en cobranza y errores</div>
                        <div className="sifco-rec-metric-value color-green">{formatCurrency((state.costoMensualCobranza - results.COSTO_COB_NEW) + (results.COSTO_ERROR_PAG - results.COSTO_ERROR_NEW))}</div>
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
                                    <th></th>
                                    <th><span className="sifco-table-hdr-badge pink">Hoy</span></th>
                                    <th><span className="sifco-table-hdr-badge dark-green">Con B1Lending</span></th>
                                    <th><span className="sifco-table-hdr-badge green">Mejora</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cartera en mora (NPL)</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {state.porcentajeMoraNPL}%</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatPercent(results.MORA_PCT_NEW)}</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(MEJ_MORA)}</td>
                                </tr>
                                <tr>
                                    <td>Tasa de recuperación</td>
                                    <td><span className="sifco-table-indicator pink">↓</span> {state.porcentajeRecuperacion}%</td>
                                    <td><span className="sifco-table-indicator green">↑</span> {formatPercent(results.TASA_REC_NEW)}</td>
                                    <td className="sifco-table-cell-highlight">+ {formatPercent(MEJ_REC)}</td>
                                </tr>
                                <tr>
                                    <td>Costo de cobranza / mes</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {formatCurrency(state.costoMensualCobranza)}</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatCurrency(results.COSTO_COB_NEW)}</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(MEJ_COB)}</td>
                                </tr>
                                <tr>
                                    <td>Errores en registro de pagos</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {state.porcentajeErroresAplicacion}%</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatPercent((state.porcentajeErroresAplicacion / 100) * (1 - MEJ_ERR))}</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(MEJ_ERR)}</td>
                                </tr>
                                <tr>
                                    <td>Write-off / castigo anual</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {state.porcentajeWriteOffAnual}%</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatPercent((state.porcentajeWriteOffAnual / 100) * (1 - MEJ_CAST))}</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(MEJ_CAST)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="sifco-rec-disclaimer">
                        * Benchmarks B1Lending: alertas tempranas, cobranza digital, conciliacion automatica de pagos.
                    </p>
                </div>


            </div>
        </div>
    );
};

export default RecuperacionScreen;