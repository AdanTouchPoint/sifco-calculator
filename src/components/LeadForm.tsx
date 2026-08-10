import React, { useEffect, useRef } from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './leadform.css';

declare global {
    interface Window {
        ml?: ((...args: unknown[]) => void) & { q: unknown[][] };
    }
}

export const LeadForm: React.FC = () => {
    const goToStep = useCalculatorStore((state) => state.goToStep);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const formContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ml = ((...args: unknown[]) => {
            ml.q.push(args);
        }) as ((...args: unknown[]) => void) & { q: unknown[][] };
        ml.q = [] as unknown[][];
        window.ml = ml;
        window.ml('account', '2500316');

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://assets.mailerlite.com/js/universal.js';
        document.head.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    useEffect(() => {
        const container = formContainerRef.current;
        if (!container) return;

        let hasAdvanced = false;
        const observer = new MutationObserver(() => {
            const success = container.querySelector<HTMLElement>('.row-success, .ml-form-successBody');
            if (!success || hasAdvanced || getComputedStyle(success).display === 'none') return;

            hasAdvanced = true;
            useCalculatorStore.setState({ leadFormCompleted: true });
            nextStep();
        });

        observer.observe(container, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['class', 'style'],
        });

        return () => observer.disconnect();
    }, [nextStep]);

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
                    <div ref={formContainerRef} className="ml-embedded" data-form="JWNBqM"></div>
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
