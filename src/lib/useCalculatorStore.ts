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

    setFieldValue: (field: keyof Omit<CalculatorState, 'setFieldValue' | 'nextStep' | 'prevStep' | 'currentStep'>, value: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
    currentStep: 0,
    solicitudesMes: 400,
    porcentajeAprobado: 40,
    montoTicket: 5000,

    setFieldValue: (field, value) => set({ [field]: value }),

    // El tope ahora es 11 (La pantalla de Thank You)
    nextStep: () => set((state) => ({
        currentStep: state.currentStep < 11 ? state.currentStep + 1 : state.currentStep
    })),

    // Retrocede sin bajar de 0
    prevStep: () => set((state) => ({
        currentStep: state.currentStep > 0 ? state.currentStep - 1 : state.currentStep
    })),
}));