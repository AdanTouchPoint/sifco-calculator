import React, { useState } from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './leadform.css';

export const LeadForm: React.FC = () => {
    // 1. Store hooks
    const storeEmail = useCalculatorStore((state) => state.email);
    const storeEmpresa = useCalculatorStore((state) => state.empresa);
    const setEmail = useCalculatorStore((state) => state.setEmail);
    const setEmpresa = useCalculatorStore((state) => state.setEmpresa);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const goToStep = useCalculatorStore((state) => state.goToStep);
    const setLeadFormCompleted = (v: boolean) => useCalculatorStore.setState({ leadFormCompleted: v });

    // 2. Local state for form fields
    const [emailVal, setEmailVal] = useState(storeEmail);
    const [empresaVal, setEmpresaVal] = useState(storeEmpresa);
    const [errorMsg, setErrorMsg] = useState('');

    // 3. Email validation helper
    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    // 4. Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const trimmedEmail = emailVal.trim();
        const trimmedEmpresa = empresaVal.trim();

        if (!trimmedEmail) {
            setErrorMsg('Por favor, ingresa tu correo electrónico.');
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setErrorMsg('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!trimmedEmpresa) {
            setErrorMsg('Por favor, ingresa el nombre de tu empresa.');
            return;
        }

        // Save to store and proceed
        setEmail(trimmedEmail);
        setEmpresa(trimmedEmpresa);
        setLeadFormCompleted(true);
        nextStep();
    };

    // Skip handler: regresa a landing sin guardar datos
    const handleSkip = () => {
        goToStep(0);
    };

    return (
        <div className="sifco-lead-wrapper">
            <div className="sifco-lead-card">
                
                {/* CLOSE ICON BUTTON */}
                <button 
                    type="button" 
                    className="sifco-lead-close-btn" 
                    onClick={handleSkip}
                    title="Cerrar y ver resultados"
                    aria-label="Cerrar y ver resultados"
                >
                    ✕
                </button>

                {/* NAVBAR PILL INSIDE CARD */}
                <header className="sifco-lead-header">
                    <div className="sifco-lead-navbar">
                        <div className="sifco-lead-nav-left">
                            <div className="sifco-lead-logo-container">
                                <div className="sifco-lead-logo-icon">
                                    <span className="sifco-lead-bar sifco-lead-bar-top"></span>
                                    <span className="sifco-lead-bar sifco-lead-bar-bottom"></span>
                                </div>
                                <span className="sifco-lead-logo-text">SIFCO</span>
                            </div>
                            <span className="sifco-lead-divider">|</span>
                            <span className="sifco-lead-nav-subtitle">Calculadora de ROI</span>
                        </div>
                        <button type="button" className="sifco-lead-btn-calc">
                            Calcular mi ROI
                        </button>
                    </div>
                </header>

                {/* CENTRAL CONTENT */}
                <div className="sifco-lead-content">
                    <h1 className="sifco-lead-title">
                        ¡Tu <span className="sifco-lead-text-highlight">Diagnóstico de Eficiencia Financiera</span> está listo!
                    </h1>
                    <p className="sifco-lead-subtitle">
                        Hemos analizado tus datos operativos frente a los estándares de optimización de SIFCO.
                    </p>
                    <p className="sifco-lead-description">
                        Para enviarte el Informe de Rentabilidad completo con tu proyección de ahorro mensual y el plan de escalabilidad para tu equipo, por favor ingresa tu correo corporativo.
                    </p>
                </div>

                {/* FORM */}
                <div className="sifco-lead-form-container">
                    <form className="sifco-lead-form" onSubmit={handleSubmit}>
                        
                        <div className="sifco-lead-fields-row">
                            {/* EMAIL INPUT */}
                            <div className="sifco-lead-input-group">
                                <label className="sifco-lead-label" htmlFor="lead-email">
                                    Correo Electrónico
                                </label>
                                <input
                                    id="lead-email"
                                    type="email"
                                    className="sifco-lead-input"
                                    placeholder="nombre@email.com"
                                    value={emailVal}
                                    onChange={(e) => setEmailVal(e.target.value)}
                                />
                            </div>

                            {/* COMPANY INPUT */}
                            <div className="sifco-lead-input-group">
                                <label className="sifco-lead-label" htmlFor="lead-empresa">
                                    Empresa
                                </label>
                                <input
                                    id="lead-empresa"
                                    type="text"
                                    className="sifco-lead-input"
                                    placeholder="Corporativo ASAP"
                                    value={empresaVal}
                                    onChange={(e) => setEmpresaVal(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Validation Error Message */}
                        <div className="sifco-lead-validation-msg" role="alert">
                            {errorMsg}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button type="submit" className="sifco-lead-submit-btn">
                            <span>Ver Mi Reporte y Descargar PDF</span>
                            <i className="sifco-lead-btn-arrow"></i>
                        </button>

                    </form>
                </div>

                {/* FOOTER & DISCLAIMER */}
                <footer className="sifco-lead-footer">
                    <p className="sifco-lead-disclaimer">
                        Al registrarte, avanzarás al dashboard de resultados y recibirás una copia en tu bandeja de entrada.{' '}
                        Si decides no hacerlo, puedes{' '}
                        <button type="button" className="sifco-lead-close-link" onClick={handleSkip}>
                            cerrar esta ventana
                        </button>{' '}
                        en cualquier momento.
                    </p>
                </footer>

            </div>
        </div>
    );
};

export default LeadForm;
