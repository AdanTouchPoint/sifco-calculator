import React, { useEffect, useRef, useState } from 'react';
import { createSubmissionId } from '../lib/saveCalculatorSubmission';
import { useCalculatorStore, type LeadContact } from '../lib/useCalculatorStore';
import './leadform.css';

const MAILERLITE_SCRIPT = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
const MAILERLITE_TRACKING_URL = 'https://assets.mailerlite.com/jsonp/2500316/forms/195092090283099181/takel';
const MAILERLITE_SUBSCRIBE_URL = 'https://assets.mailerlite.com/jsonp/2500316/forms/195092090283099181/subscribe';
const EMAIL_VALIDATOR_URL = 'https://n8n-n8n.n4k6yy.easypanel.host/webhook/email-phone-validator';

export const LeadForm: React.FC = () => {
    const lead = useCalculatorStore((state) => state.lead);
    const setLead = useCalculatorStore((state) => state.setLead);
    const setLeadSentEmail = useCalculatorStore((state) => state.setLeadSentEmail);
    const setSubmissionId = useCalculatorStore((state) => state.setSubmissionId);
    const nextStep = useCalculatorStore((state) => state.nextStep);
    const resetCalculator = useCalculatorStore((state) => state.resetCalculator);

    const validationInProgress = useRef(false);
    const [contactPreference, setContactPreference] = useState(lead.contactPreference);
    const [areaCode, setAreaCode] = useState(lead.areaCode);
    const [phone, setPhone] = useState(lead.phone);
    const [implementationDeadline, setImplementationDeadline] = useState(lead.implementationDeadline);
    const [emailError, setEmailError] = useState('');
    const [submissionError, setSubmissionError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const wantsContact = contactPreference.startsWith('Sí');

    useEffect(() => {
        if (!document.querySelector(`script[src="${MAILERLITE_SCRIPT}"]`)) {
            const script = document.createElement('script');
            script.async = true;
            script.src = MAILERLITE_SCRIPT;
            document.body.appendChild(script);
        }

        // Solo cuenta como visita nueva si aún no se envió un correo en esta visita.
        if (!useCalculatorStore.getState().leadSentEmail) {
            void fetch(MAILERLITE_TRACKING_URL).catch(() => undefined);
        }
    }, []);

    const handleContactPreferenceChange = (value: string) => {
        setContactPreference(value);
        setSubmissionError('');

        if (!value.startsWith('Sí')) {
            setAreaCode('');
            setPhone('');
            setImplementationDeadline('');
        }
    };

    // Cerrar el formulario limpia todo y regresa a la portada.
    const handleClose = () => {
        resetCalculator();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Se cancela el submit nativo y se detiene la propagación para que el script de MailerLite no procese el formulario.
        event.preventDefault();
        event.stopPropagation();
        if (validationInProgress.current) return;

        const form = event.currentTarget;
        // FormData omite controles deshabilitados, así que se captura antes de iniciar el envío.
        const formData = new FormData(form);
        const email = String(formData.get('fields[email]') ?? '').trim();
        if (!email) return;

        const contactPreferenceValue = String(formData.get('fields[te_gustaria_ser_contactado]') ?? '');
        const wantsContactValue = contactPreferenceValue.startsWith('Sí');
        const marketingConsent = form.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked ?? false;

        const nextLead: LeadContact = {
            firstName: String(formData.get('fields[name]') ?? '').trim(),
            lastName: String(formData.get('fields[last_name]') ?? '').trim(),
            email,
            contactPreference: contactPreferenceValue,
            areaCode: wantsContactValue ? String(formData.get('fields[codigo_de_area]') ?? '') : '',
            phone: wantsContactValue ? String(formData.get('fields[phone]') ?? '').trim() : '',
            implementationDeadline: wantsContactValue
                ? String(formData.get('fields[plazo_deseado_de_implementacion]') ?? '')
                : '',
            marketingConsent,
        };

        validationInProgress.current = true;
        setEmailError('');
        setSubmissionError('');
        setIsSubmitting(true);

        try {
            const alreadySent = useCalculatorStore.getState().leadSentEmail === email;

            // Si el correo ya se envió en esta visita (el usuario volvió desde el diagnóstico), no se repite.
            if (!alreadySent) {
                const query = new URLSearchParams({ email, bussiness_email: 'true' });
                let validation: { success?: unknown; message?: unknown } | undefined;
                try {
                    const response = await fetch(`${EMAIL_VALIDATOR_URL}?${query.toString()}`);
                    if (!response.ok) throw new Error('Email validation request failed');

                    const result: unknown = await response.json();
                    validation = Array.isArray(result)
                        ? result[0] as { success?: unknown; message?: unknown } | undefined
                        : undefined;
                } catch {
                    setEmailError('No pudimos validar el correo. Inténtalo de nuevo.');
                    return;
                }

                if (validation?.success !== true) {
                    setEmailError(
                        typeof validation?.message === 'string'
                            ? validation.message
                            : 'Ingresa un correo empresarial para continuar.',
                    );
                    return;
                }

                const body = new URLSearchParams();
                formData.forEach((value, key) => {
                    if (typeof value === 'string') body.append(key, value);
                });

                // Respuesta opaca (no-cors): no se puede leer si MailerLite aceptó el registro, solo que la petición salió.
                try {
                    await fetch(MAILERLITE_SUBSCRIBE_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        body,
                    });
                } catch {
                    setSubmissionError('No pudimos enviar tus datos. Inténtalo de nuevo.');
                    return;
                }

                setLeadSentEmail(email);
            }

            // Nueva visita: el ID se crea una sola vez; si el usuario regresa, se conserva.
            if (!useCalculatorStore.getState().submissionId) {
                setSubmissionId(createSubmissionId());
            }
            setLead(nextLead);
            nextStep();
        } catch {
            setSubmissionError('No pudimos continuar. Inténtalo de nuevo.');
        } finally {
            validationInProgress.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <div className="sifco-lead-wrapper">
            <div className="sifco-lead-card">
                <button
                    type="button"
                    className="sifco-lead-close-btn"
                    onClick={handleClose}
                    title="Cerrar y volver al inicio"
                    aria-label="Cerrar y volver al inicio"
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
                        Comienza tu <span className="sifco-lead-text-highlight">Diagnóstico de Eficiencia Financiera</span>
                    </h1>
                    <p className="sifco-lead-subtitle">
                        Ingresa tus datos para iniciar el análisis de eficiencia financiera de tu operación.
                    </p>
                    <p className="sifco-lead-description">
                        Al final del recorrido te enviaremos el Informe de Rentabilidad completo con tu proyección de ahorro mensual y el plan de escalabilidad para tu equipo, a tu correo corporativo.
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
                                        action={MAILERLITE_SUBSCRIBE_URL}
                                        method="post"
                                        onSubmitCapture={handleSubmit}
                                        onChangeCapture={() => setSubmissionError('')}
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
                                                        defaultValue={lead.firstName}
                                                        disabled={isSubmitting}
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
                                                        defaultValue={lead.lastName}
                                                        disabled={isSubmitting}
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
                                                        defaultValue={lead.email}
                                                        readOnly={isSubmitting}
                                                        aria-invalid={Boolean(emailError)}
                                                        aria-describedby={emailError ? 'email-validation-error' : undefined}
                                                        onChange={() => setEmailError('')}
                                                    />
                                                    {emailError && (
                                                        <p id="email-validation-error" className="email-validation-error" role="alert">
                                                            {emailError}
                                                        </p>
                                                    )}
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
                                                        disabled={isSubmitting}
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
                                                        disabled={!wantsContact || isSubmitting}
                                                        value={areaCode}
                                                        onChange={(event) => setAreaCode(event.target.value)}
                                                    >
                                                        <option value="">-</option>
                                                        <option value="🇦🇷 Argentina (+54)">🇦🇷 Argentina (+54)</option>
                                                        <option value="🇧🇴 Bolivia (+591)">🇧🇴 Bolivia (+591)</option>
                                                        <option value="🇨🇱 Chile (+56)">🇨🇱 Chile (+56)</option>
                                                        <option value="🇨🇴 Colombia (+57)">🇨🇴 Colombia (+57)</option>
                                                        <option value="🇨🇷 Costa Rica (+506)">🇨🇷 Costa Rica (+506)</option>
                                                        <option value="🇨🇺 Cuba (+53)">🇨🇺 Cuba (+53)</option>
                                                        <option value="🇪🇨 Ecuador (+593)">🇪🇨 Ecuador (+593)</option>
                                                        <option value="🇸🇻 El Salvador (+503)">🇸🇻 El Salvador (+503)</option>
                                                        <option value="🇪🇸 España (+34)">🇪🇸 España (+34)</option>
                                                        <option value="🇬🇹 Guatemala (+502)">🇬🇹 Guatemala (+502)</option>
                                                        <option value="🇭🇳 Honduras (+504)">🇭🇳 Honduras (+504)</option>
                                                        <option value="🇲🇽 México (+52)">🇲🇽 México (+52)</option>
                                                        <option value="🇳🇮 Nicaragua (+505)">🇳🇮 Nicaragua (+505)</option>
                                                        <option value="🇵🇦 Panamá (+507)">🇵🇦 Panamá (+507)</option>
                                                        <option value="🇵🇾 Paraguay (+595)">🇵🇾 Paraguay (+595)</option>
                                                        <option value="🇵🇪 Perú (+51)">🇵🇪 Perú (+51)</option>
                                                        <option value="🇵🇷 Puerto Rico (+1-787 / +1-939)">🇵🇷 Puerto Rico (+1-787 / +1-939)</option>
                                                        <option value="🇩🇴 República Dominicana (+1-809 / +1-829 / +1-849)">🇩🇴 República Dominicana (+1-809 / +1-829 / +1-849)</option>
                                                        <option value="🇺🇾 Uruguay (+598)">🇺🇾 Uruguay (+598)</option>
                                                        <option value="🇻🇪 Venezuela (+58)">🇻🇪 Venezuela (+58)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className={`ml-form-fieldRow ml-conditional-field${wantsContact ? '' : ' ml-conditional-hidden'}`}>
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
                                                        disabled={!wantsContact || isSubmitting}
                                                        value={phone}
                                                        onChange={(event) => setPhone(event.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className={`ml-form-fieldRow ml-conditional-field ml-last-item${wantsContact ? '' : ' ml-conditional-hidden'}`}>
                                                <div className="ml-field-group ml-field-plazo_deseado_de_implementacion">
                                                    <label htmlFor="ml-implementation-deadline-44579002">Plazo deseado de implementación</label>
                                                    <select
                                                        id="ml-implementation-deadline-44579002"
                                                        className="custom-select"
                                                        name="fields[plazo_deseado_de_implementacion]"
                                                        aria-label="plazo_deseado_de_implementacion"
                                                        aria-required={wantsContact}
                                                        required={wantsContact}
                                                        disabled={!wantsContact || isSubmitting}
                                                        value={implementationDeadline}
                                                        onChange={(event) => setImplementationDeadline(event.target.value)}
                                                    >
                                                        <option value="">-</option>
                                                        <option value="Inmediata: Requerido en plazo de 30 días.">
                                                            Inmediata: Requerido en plazo de 30 días.
                                                        </option>
                                                        <option value="Próximo bimestre: Requerido entre este y el siguiente mes.">
                                                            Próximo bimestre: Requerido entre este y el siguiente mes.
                                                        </option>
                                                        <option value="Próximos cuatro meses: En un plazo de 90-120 días.">
                                                            Próximos cuatro meses: En un plazo de 90-120 días.
                                                        </option>
                                                        <option value="Planificación futura: 6 meses en adelante">
                                                            Planificación futura: 6 meses en adelante
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-form-checkboxRow ml-validate-required">
                                            <label className="checkbox">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    aria-required="true"
                                                    defaultChecked={lead.marketingConsent}
                                                    disabled={isSubmitting}
                                                />
                                                <span className="label-description">
                                                    <span>Acepto recibir noticias, novedades y actualizaciones por correo electrónico</span>
                                                </span>
                                            </label>
                                        </div>

                                        <p className="sifco-lead-storage-notice">
                                            Al comenzar, SIFCO guardará tus datos de contacto. Tus respuestas se registrarán al generar tu diagnóstico.
                                        </p>

                                        <input type="hidden" name="ml-submit" value="1" />

                                        <div className="ml-form-embedSubmit">
                                            <button type="submit" className="primary" disabled={isSubmitting}>
                                                {isSubmitting ? 'Enviando...' : 'Comenzar'}
                                            </button>
                                            <button disabled type="button" className="loading" aria-label="Cargando">
                                                <span className="ml-form-embedSubmitLoad" />
                                                <span className="sr-only">Cargando...</span>
                                            </button>
                                        </div>

                                        {submissionError && (
                                            <p className="submission-error" role="alert">
                                                {submissionError}
                                            </p>
                                        )}

                                        <input type="hidden" name="anticsrf" value="true" />
                                    </form>
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
                        Al comenzar, recibirás una copia del informe en tu bandeja de entrada.{' '}
                        Si decides no hacerlo, puedes{' '}
                        <button type="button" className="sifco-lead-close-link" onClick={handleClose}>
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
