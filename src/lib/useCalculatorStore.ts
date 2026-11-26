import { create } from 'zustand';
// Con extensión .ts para que test-parity.ts siga corriendo con node --experimental-strip-types.
import { detectTrafficChannel, type TrafficChannel } from './trafficSource.ts';

// Datos de contacto capturados en el formulario inicial (paso 1).
export interface LeadContact {
    firstName: string;
    lastName: string;
    email: string;
    contactPreference: string;
    areaCode: string;
    phone: string;
    implementationDeadline: string;
    marketingConsent: boolean;
}

export const EMPTY_LEAD: LeadContact = {
    firstName: '',
    lastName: '',
    email: '',
    contactPreference: '',
    areaCode: '',
    phone: '',
    implementationDeadline: '',
    marketingConsent: false,
};

export interface CalculatorState {
    // Navigation:
    // 0 = Portada, 1 = Formulario de contacto (Comenzar)
    // 2 a 9 = Pasos del diagnóstico (1 al 8)
    // 10 = Resultados
    // El tráfico META (channel === 'meta') salta el paso 1: 0 -> 2 y 2 -> 0.
    currentStep: number;

    // Canal de adquisición detectado en la URL al cargar. resetCalculator no lo modifica.
    channel: TrafficChannel;

    // Datos Paso 1
    solicitudesMes: number;
    porcentajeAprobado: number;
    montoTicket: number;
    // --- VARIABLES PASO 2 (Tiempos del Proceso) ---
    tiempoAprobacion: number;
    tiempoDesembolso: number;
    // --- VARIABLES PASO 3 (Equipo Operativo) ---
    numAnalistas: number;
    salarioAnalista: number;
    horasLaboralesMes: number;
    // --- VARIABLES PASO 4 (Ineficiencias Actuales) ---
    porcentajeAbandono: number;
    porcentajeReprocesos: number;
    // --- VARIABLES PASO 5 (Nivel de Automatización) ---
    porcentajeManual: number;
    sistemasActuales: number;
    // --- VARIABLES PASO 6 (Cartera y Morosidad) ---
    saldoCarteraActiva: number;
    porcentajeMoraNPL: number;
    diasAtrasoPromedio: number;
    // --- VARIABLES PASO 7 (Eficiencia de Cobranza) ---
    porcentajeRecuperacion: number;
    costoMensualCobranza: number;
    porcentajeGestionesManuales: number;
    // --- VARIABLES PASO 8 (Registro de Pagos y Provisiones) ---
    porcentajePagosManuales: number;
    porcentajeErroresAplicacion: number;
    porcentajeWriteOffAnual: number;

    // Datos de contacto (formulario inicial)
    lead: LeadContact;
    // Correo ya enviado a MailerLite en esta visita (evita reenviarlo al volver al formulario).
    leadSentEmail: string;
    // Identificador de la visita para n8n. Se crea al pulsar "Comenzar" y se borra al reiniciar.
    submissionId: string;
    empresa: string;
    setLead: (lead: Partial<LeadContact>) => void;
    setLeadSentEmail: (email: string) => void;
    setSubmissionId: (id: string) => void;
    setEmpresa: (empresa: string) => void;

    setFieldValue: (field: Exclude<NumericFieldKey, 'currentStep'>, value: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    resetCalculator: () => void;
}

// Claves de CalculatorState cuyo valor es numérico.
type NumericFieldKey = {
    [K in keyof CalculatorState]: CalculatorState[K] extends number ? K : never;
}[keyof CalculatorState];

const LAST_STEP = 10;

export const useCalculatorStore = create<CalculatorState>((set) => ({
    currentStep: 0,
    channel: detectTrafficChannel(),
    solicitudesMes: 150,
    porcentajeAprobado: 40,
    montoTicket: 3000,
    // Paso 2 Defaults (Basados en la imagen del paso 2)
    tiempoAprobacion: 5,
    tiempoDesembolso: 3,
    // Defaults Paso 3 (según imagen)
    numAnalistas: 6,
    salarioAnalista: 600,
    horasLaboralesMes: 160,
    // Defaults Paso 4 (según imagen)
    porcentajeAbandono: 20,
    porcentajeReprocesos: 25,
    // Defaults Paso 5 (según imagen)
    porcentajeManual: 70,
    sistemasActuales: 2,
    // Defaults Paso 6 (según imagen)
    saldoCarteraActiva: 500000,
    porcentajeMoraNPL: 10,
    diasAtrasoPromedio: 45,
    // Defaults Paso 7 (según imagen)
    porcentajeRecuperacion: 60,
    costoMensualCobranza: 2000,
    porcentajeGestionesManuales: 75,
    // Defaults Paso 8 (según imagen)
    porcentajePagosManuales: 70,
    porcentajeErroresAplicacion: 5,
    porcentajeWriteOffAnual: 3,

    // Lead (formulario inicial)
    lead: EMPTY_LEAD,
    leadSentEmail: '',
    submissionId: '',
    empresa: '',
    setLead: (lead) => set((state) => ({ lead: { ...state.lead, ...lead } })),
    setLeadSentEmail: (leadSentEmail) => set({ leadSentEmail }),
    setSubmissionId: (submissionId) => set({ submissionId }),
    setEmpresa: (empresa) => set({ empresa }),

    setFieldValue: (field, value) => set({ [field]: value }),

    nextStep: () => set((state) => {
        // META: de la portada directo al primer paso, sin pasar por el formulario.
        if (state.channel === 'meta' && state.currentStep === 0) {
            return { currentStep: 2 };
        }
        return { currentStep: state.currentStep < LAST_STEP ? state.currentStep + 1 : state.currentStep };
    }),

    // Retrocede sin bajar de 0
    prevStep: () => set((state) => {
        // META: desde el primer paso se regresa a la portada, no al formulario.
        if (state.channel === 'meta' && state.currentStep === 2) {
            return { currentStep: 0 };
        }
        return { currentStep: state.currentStep > 0 ? state.currentStep - 1 : state.currentStep };
    }),

    // Navega a un paso específico
    goToStep: (step) => set({ currentStep: step }),

    // Reinicia toda la calculadora a sus valores por defecto (nueva visita)
    resetCalculator: () => set({
        currentStep: 0,
        solicitudesMes: 150,
        porcentajeAprobado: 40,
        montoTicket: 3000,
        tiempoAprobacion: 5,
        tiempoDesembolso: 3,
        numAnalistas: 6,
        salarioAnalista: 600,
        horasLaboralesMes: 160,
        porcentajeAbandono: 20,
        porcentajeReprocesos: 25,
        porcentajeManual: 70,
        sistemasActuales: 2,
        saldoCarteraActiva: 500000,
        porcentajeMoraNPL: 10,
        diasAtrasoPromedio: 45,
        porcentajeRecuperacion: 60,
        costoMensualCobranza: 2000,
        porcentajeGestionesManuales: 75,
        porcentajePagosManuales: 70,
        porcentajeErroresAplicacion: 5,
        porcentajeWriteOffAnual: 3,
        lead: EMPTY_LEAD,
        leadSentEmail: '',
        submissionId: '',
        empresa: '',
    }),
}));
