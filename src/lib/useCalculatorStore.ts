import { create } from 'zustand';

interface CalculatorState {
    // Navigation: 
    // 0 = Landing, 1 = HowItWorks
    // 2 a 9 = Pasos del Formulario (1 al 8)
    // 10 = Resultados, 11 = Thank You
    currentStep: number;

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
    sistemasActuales: string;
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

    setFieldValue: (field: keyof Omit<CalculatorState, 'setFieldValue' | 'nextStep' | 'prevStep' | 'currentStep' | 'resetCalculator'>, value: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    resetCalculator: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
    currentStep: 0,
    solicitudesMes: 400,
    porcentajeAprobado: 40,
    montoTicket: 5000,
    // Paso 2 Defaults (Basados en la imagen del paso 2)
    tiempoAprobacion: 5,
    tiempoDesembolso: 3,
    // Defaults Paso 3 (según imagen)
    numAnalistas: 6,
    salarioAnalista: 800,
    horasLaboralesMes: 160,
    // Defaults Paso 4 (según imagen)
    porcentajeAbandono: 20,
    porcentajeReprocesos: 25,
    // Defaults Paso 5 (según imagen)
    porcentajeManual: 70,
    sistemasActuales: '2-3 sistemas',
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

    setFieldValue: (field, value) => set({ [field]: value }),

    // El tope ahora es 11 (La pantalla de Thank You)
    nextStep: () => set((state) => ({
        currentStep: state.currentStep < 11 ? state.currentStep + 1 : state.currentStep
    })),

    // Retrocede sin bajar de 0
    prevStep: () => set((state) => ({
        currentStep: state.currentStep > 0 ? state.currentStep - 1 : state.currentStep
    })),

    // Reinicia toda la calculadora a sus valores por defecto
    resetCalculator: () => set({
        currentStep: 0,
        solicitudesMes: 400,
        porcentajeAprobado: 40,
        montoTicket: 5000,
        tiempoAprobacion: 5,
        tiempoDesembolso: 3,
        numAnalistas: 6,
        salarioAnalista: 800,
        horasLaboralesMes: 160,
        porcentajeAbandono: 20,
        porcentajeReprocesos: 25,
        porcentajeManual: 70,
        sistemasActuales: '2-3 sistemas',
        saldoCarteraActiva: 500000,
        porcentajeMoraNPL: 10,
        diasAtrasoPromedio: 45,
        porcentajeRecuperacion: 60,
        costoMensualCobranza: 2000,
        porcentajeGestionesManuales: 75,
        porcentajePagosManuales: 70,
        porcentajeErroresAplicacion: 5,
        porcentajeWriteOffAnual: 3,
    }),
}));