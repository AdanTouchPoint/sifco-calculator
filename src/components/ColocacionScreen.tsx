import React from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import { calculateROI, BMRK_TIEMPO, BMRK_REPR, BMRK_ABAN } from '../lib/calculations';
import './colocacionscreen.css';
import backgroundImg from '../assets/backgroundImg.png';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const formatNumber = (value: number, decimals: number = 0) => new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(value);
const formatPercent = (value: number) => new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(value);

export const ColocacionScreen: React.FC = () => {
    const state = useCalculatorStore();
    const prevStep = state.prevStep;

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
        <div className="sifco-diag-wrapper">

            {/* HERO HEADER VERDE COMPLETO */}
            <div className="sifco-diag-hero" style={{ backgroundImage: ` url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="sifco-diag-hero-content">
                    <span className="sifco-diag-hero-tag">Diagnostico de tu Operación</span>
                    <h1 className="sifco-diag-hero-title">
                        {formatNumber(state.solicitudesMes)} solicitudes/mes,<br />{formatCurrency(state.montoTicket)} ticket promedio
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
                    <div className={`sifco-diag-big-card ${getIndicatorClass(results.indicadorEficiencia)}`}>
                        <span className="sifco-diag-big-label">Eficiencia Operativa</span>
                        <div className={`sifco-diag-big-value-wrapper ${getColorClass(results.indicadorEficiencia)}`}>
                            <svg className="sifco-diag-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M7 11h10v2H7z" />
                            </svg>
                            <span className="sifco-diag-big-value">{results.indicadorEficiencia}</span>
                        </div>
                    </div>

                    <div className={`sifco-diag-big-card ${getIndicatorClass(results.indicadorRiesgoOp)}`}>
                        <span className="sifco-diag-big-label">Riesgo Operativo</span>
                        <div className={`sifco-diag-big-value-wrapper ${getColorClass(results.indicadorRiesgoOp)}`}>
                            <svg className="sifco-diag-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="sifco-diag-big-value">{results.indicadorRiesgoOp}</span>
                        </div>
                    </div>

                    <div className={`sifco-diag-big-card ${getIndicatorClass(results.indicadorAutomatizacion)}`}>
                        <span className="sifco-diag-big-label">Potencial de Automatización</span>
                        <div className={`sifco-diag-big-value-wrapper ${getColorClass(results.indicadorAutomatizacion)}`}>
                            <svg className="sifco-diag-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            <span className="sifco-diag-big-value">{results.indicadorAutomatizacion}</span>
                        </div>
                    </div>
                </div>

                {/* FILA 2: TARJETAS DE MÉTRICAS */}
                <div className="sifco-diag-bottom-cards">
                    <div className="sifco-diag-metric-card border-pink">
                        <div className="sifco-diag-metric-label">Pérdida por abandono / mes</div>
                        <div className="sifco-diag-metric-value color-pink">{formatCurrency(results.PERDIDA_ABANDONO)}</div>
                        <div className="sifco-diag-metric-desc">
                            Clientes listos para tomar crédito que se van por fricción.
                        </div>
                    </div>

                    <div className="sifco-diag-metric-card border-pink">
                        <div className="sifco-diag-metric-label">Costo de reprocesos / mes</div>
                        <div className="sifco-diag-metric-value color-pink">{formatCurrency(results.COSTO_REPROCESOS)}</div>
                        <div className="sifco-diag-metric-desc">
                            Horas de analistas perdidas en correcciones y retrabajos.
                        </div>
                    </div>

                    <div className="sifco-diag-metric-card border-green">
                        <div className="sifco-diag-metric-label">Créditos adicionales / mes</div>
                        <div className="sifco-diag-metric-value color-green">+{formatNumber(results.CRED_ADD)}</div>
                        <div className="sifco-diag-metric-desc">
                            Con el mismo equipo, optimizando el proceso.
                        </div>
                    </div>

                    <div className="sifco-diag-metric-card border-green">
                        <div className="sifco-diag-metric-label">Días ahorrados / Crédito</div>
                        <div className="sifco-diag-metric-value color-green">{formatNumber(results.DIAS_AHORRADOS, 1)} días</div>
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
                                    <th></th>
                                    <th><span className="sifco-table-hdr-badge pink">Hoy</span></th>
                                    <th><span className="sifco-table-hdr-badge dark-green">Con B1Lending</span></th>
                                    <th><span className="sifco-table-hdr-badge green">Mejora</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tiempo de aprobación</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {state.tiempoAprobacion} días</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatNumber(state.tiempoAprobacion * (1 - BMRK_TIEMPO), 1)} días</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(BMRK_TIEMPO)}</td>
                                </tr>
                                <tr>
                                    <td>Tiempo total hasta desembolso</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {results.T_TOTAL} días</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatNumber(results.T_TOTAL * (1 - BMRK_TIEMPO), 1)} días</td>
                                    <td className="sifco-table-cell-highlight">- {formatNumber(results.DIAS_AHORRADOS, 1)} días</td>
                                </tr>
                                <tr>
                                    <td>Créditos procesados / mes</td>
                                    <td><span className="sifco-table-indicator pink">↓</span> {formatNumber(results.CREDITOS_MES)}</td>
                                    <td><span className="sifco-table-indicator green">↑</span> {formatNumber(results.CAP_NUEVA)}</td>
                                    <td className="sifco-table-cell-highlight">+ {formatNumber(results.CRED_ADD)} más</td>
                                </tr>
                                <tr>
                                    <td>Costo operativo por crédito</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {formatCurrency(results.COSTO_X_CREDITO)}</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatCurrency(results.COSTO_NUEVO)}</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(BMRK_TIEMPO)}</td>
                                </tr>
                                <tr>
                                    <td>% Reprocesos</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {state.porcentajeReprocesos}%</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatNumber(state.porcentajeReprocesos * (1 - BMRK_REPR), 1)}%</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(BMRK_REPR)}</td>
                                </tr>
                                <tr>
                                    <td>% Abandono de clientes</td>
                                    <td><span className="sifco-table-indicator pink">↑</span> {state.porcentajeAbandono}%</td>
                                    <td><span className="sifco-table-indicator green">↓</span> {formatNumber(state.porcentajeAbandono * (1 - BMRK_ABAN), 1)}%</td>
                                    <td className="sifco-table-cell-highlight">- {formatPercent(BMRK_ABAN)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="sifco-diag-disclaimer">
                        * Benchmarks basados en implementaciones reales de B1Lending. Resultados pueden variar.
                    </p>
                </div>



            </div>
        </div>
    );
};

export default ColocacionScreen;