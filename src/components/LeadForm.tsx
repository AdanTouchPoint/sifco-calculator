import React, { useEffect, useRef, useState } from 'react';
import { useCalculatorStore } from '../lib/useCalculatorStore';
import './leadform.css';

declare global {
    interface Window {
        ml_webform_success_44579002?: () => void;
    }
}

const MAILERLITE_SCRIPT = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
const MAILERLITE_TRACKING_URL = 'https://assets.mailerlite.com/jsonp/2500316/forms/195092090283099181/takel';

export const LeadForm: React.FC = () => {
    const goToStep = useCalculatorStore((state) => state.goToStep);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const hasAdvanced = useRef(false);
    const [contactPreference, setContactPreference] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [phone, setPhone] = useState('');

    const wantsContact = contactPreference.startsWith('Sí');

    useEffect(() => {
        const onSuccess = () => {
            if (hasAdvanced.current) return;

            hasAdvanced.current = true;
            useCalculatorStore.setState({ leadFormCompleted: true });
            nextStep();
        };

        window.ml_webform_success_44579002 = onSuccess;

        if (!document.querySelector(`script[src="${MAILERLITE_SCRIPT}"]`)) {
            const script = document.createElement('script');
            script.async = true;
            script.src = MAILERLITE_SCRIPT;
            document.body.appendChild(script);
        }

        void fetch(MAILERLITE_TRACKING_URL).catch(() => undefined);

        return () => {
            if (window.ml_webform_success_44579002 === onSuccess) {
                delete window.ml_webform_success_44579002;
            }
        };
    }, [nextStep]);

    const handleContactPreferenceChange = (value: string) => {
        setContactPreference(value);

        if (!value.startsWith('Sí')) {
            setAreaCode('');
            setPhone('');
        }
    };

    const handleSkip = () => {
        goToStep(0);
    };

    return (
        <div className="sifco-lead-wrapper">
            <div className="sifco-lead-card">
                <button
                    type="button"
                    className="sifco-lead-close-btn"
                    onClick={handleSkip}
                    title="Cerrar y ver resultados"
                    aria-label="Cerrar y ver resultados"
                >
                    ✕
                </button>

                <header className="sifco-lead-header">
                    <div className="sifco-lead-navbar">
                        <div className="sifco-lead-nav-left">
                            <div className="sifco-lead-logo-container">
                                <div className="sifco-lead-logo-icon">
                                    <span className="sifco-lead-bar sifco-lead-bar-top" />
                                    <span className="sifco-lead-bar sifco-lead-bar-bottom" />
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

                <div className="sifco-lead-form-container">
                    <div id="mlb2-44579002" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-44579002">
                        <div className="ml-form-align-center">
                            <div className="ml-form-embedWrapper embedForm">
                                <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                                    <div className="ml-form-embedContent" />

                                    <form
                                        className="ml-block-form"
                                        action="https://assets.mailerlite.com/jsonp/2500316/forms/195092090283099181/subscribe"
                                        method="post"
                                        target="ml-submit-frame-44579002"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            if (hasAdvanced.current) return;

                                            // Fallback si el script de MailerLite no pudo interceptar el envío.
                                            HTMLFormElement.prototype.submit.call(event.currentTarget);
                                            hasAdvanced.current = true;
                                            useCalculatorStore.setState({ leadFormCompleted: true });
                                            nextStep();
                                        }}
                                    >
                                        <div className="ml-form-formContent">
                                            <div className="ml-form-fieldRow">
                                                <div className="ml-field-group ml-field-name">
                                                    <label htmlFor="ml-name-44579002">Nombre</label>
                                                    <input
                                                        id="ml-name-44579002"
                                                        aria-label="name"
                                                        type="text"
                                                        className="form-control"
                                                        name="fields[name]"
                                                        autoComplete="given-name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="ml-form-fieldRow">
                                                <div className="ml-field-group ml-field-last_name">
                                                    <label htmlFor="ml-last-name-44579002">Apellido</label>
                                                    <input
                                                        id="ml-last-name-44579002"
                                                        aria-label="last_name"
                                                        type="text"
                                                        className="form-control"
                                                        name="fields[last_name]"
                                                        autoComplete="family-name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="ml-form-fieldRow">
                                                <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                                                    <label htmlFor="ml-email-44579002">Correo Institucional</label>
                                                    <input
                                                        id="ml-email-44579002"
                                                        aria-label="email"
                                                        aria-required="true"
                                                        required
                                                        type="email"
                                                        className="form-control"
                                                        name="fields[email]"
                                                        autoComplete="email"
                                                    />
                                                </div>
                                            </div>

                                            <div className="ml-form-fieldRow">
                                                <div className="ml-field-group ml-field-te_gustaria_ser_contactado ml-validate-required">
                                                    <label htmlFor="ml-contactado-44579002">¿Te gustaría ser contactado?</label>
                                                    <select
                                                        id="ml-contactado-44579002"
                                                        className="custom-select"
                                                        name="fields[te_gustaria_ser_contactado]"
                                                        aria-label="te_gustaria_ser_contactado"
                                                        aria-required="true"
                                                        required
                                                        value={contactPreference}
                                                        onChange={(event) => handleContactPreferenceChange(event.target.value)}
                                                    >
                                                        <option value="">-</option>
                                                        <option value="Sí, quiero más información sobre las soluciones">
                                                            Sí, quiero más información sobre las soluciones
                                                        </option>
                                                        <option value="No, solo me interés el contenido">
                                                            No, solo me interés el contenido
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className={`ml-form-fieldRow ml-conditional-field${wantsContact ? '' : ' ml-conditional-hidden'}`}>
                                                <div className="ml-field-group ml-field-codigo_de_area">
                                                    <label htmlFor="ml-area-code-44579002">Código de área</label>
                                                    <select
                                                        id="ml-area-code-44579002"
                                                        className="custom-select"
                                                        name="fields[codigo_de_area]"
                                                        aria-label="codigo_de_area"
                                                        aria-required={wantsContact}
                                                        required={wantsContact}
                                                        disabled={!wantsContact}
                                                        value={areaCode}
                                                        onChange={(event) => setAreaCode(event.target.value)}
                                                    >
                                                        <option value="">-</option>
                                                        <option value="Argentina (+54)">🇦🇷 Argentina (+54)</option>
                                                        <option value="Bolivia (+591)">🇧🇴 Bolivia (+591)</option>
                                                        <option value="Chile (+56)">🇨🇱 Chile (+56)</option>
                                                        <option value="Colombia (+57)">🇨🇴 Colombia (+57)</option>
                                                        <option value="Costa Rica (+506)">🇨🇷 Costa Rica (+506)</option>
                                                        <option value="Cuba (+53)">🇨🇺 Cuba (+53)</option>
                                                        <option value="Ecuador (+593)">🇪🇨 Ecuador (+593)</option>
                                                        <option value="El Salvador (+503)">🇸🇻 El Salvador (+503)</option>
                                                        <option value="España (+34)">🇪🇸 España (+34)</option>
                                                        <option value="Guatemala (+502)">🇬🇹 Guatemala (+502)</option>
                                                        <option value="Honduras (+504)">🇭🇳 Honduras (+504)</option>
                                                        <option value="México (+52)">🇲🇽 México (+52)</option>
                                                        <option value="Nicaragua (+505)">🇳🇮 Nicaragua (+505)</option>
                                                        <option value="Panamá (+507)">🇵🇦 Panamá (+507)</option>
                                                        <option value="Paraguay (+595)">🇵🇾 Paraguay (+595)</option>
                                                        <option value="Perú (+51)">🇵🇪 Perú (+51)</option>
                                                        <option value="Puerto Rico (+1-787 / +1-939)">🇵🇷 Puerto Rico (+1-787 / +1-939)</option>
                                                        <option value="República Dominicana (+1-809 / +1-829 / +1-849)">🇩🇴 República Dominicana (+1-809 / +1-829 / +1-849)</option>
                                                        <option value="Uruguay (+598)">🇺🇾 Uruguay (+598)</option>
                                                        <option value="Venezuela (+58)">🇻🇪 Venezuela (+58)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className={`ml-form-fieldRow ml-conditional-field ml-last-item${wantsContact ? '' : ' ml-conditional-hidden'}`}>
                                                <div className="ml-field-group ml-field-phone">
                                                    <label htmlFor="ml-phone-44579002">Teléfono</label>
                                                    <input
                                                        id="ml-phone-44579002"
                                                        aria-label="phone"
                                                        type="tel"
                                                        className="form-control"
                                                        name="fields[phone]"
                                                        autoComplete="tel"
                                                        aria-required={wantsContact}
                                                        required={wantsContact}
                                                        disabled={!wantsContact}
                                                        value={phone}
                                                        onChange={(event) => setPhone(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-form-checkboxRow ml-validate-required">
                                            <label className="checkbox">
                                                <input type="checkbox" required aria-required="true" />
                                                <span className="label-description">
                                                    <span>Acepto recibir noticias, novedades y actualizaciones por correo electrónico</span>
                                                </span>
                                            </label>
                                        </div>

                                        <input type="hidden" name="ml-submit" value="1" />

                                        <div className="ml-form-embedSubmit">
                                            <button type="submit" className="primary">Ir al análisis</button>
                                            <button disabled type="button" className="loading" aria-label="Cargando">
                                                <span className="ml-form-embedSubmitLoad" />
                                                <span className="sr-only">Cargando...</span>
                                            </button>
                                        </div>

                                        <input type="hidden" name="anticsrf" value="true" />
                                    </form>

                                    <iframe
                                        name="ml-submit-frame-44579002"
                                        title="Envío del formulario"
                                        className="ml-submit-frame"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                                    <div className="ml-form-successContent">
                                        <h4>¡Gracias!</h4>
                                        <p>Tus datos se guardaron correctamente</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
