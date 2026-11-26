import { calculateROI, type CalculationResults } from './calculations';
import type { CalculatorState } from './useCalculatorStore';
import type { TrafficChannel } from './trafficSource';

export type CalculatorAnswers = Pick<
    CalculatorState,
    | 'solicitudesMes'
    | 'porcentajeAprobado'
    | 'montoTicket'
    | 'tiempoAprobacion'
    | 'tiempoDesembolso'
    | 'numAnalistas'
    | 'salarioAnalista'
    | 'horasLaboralesMes'
    | 'porcentajeAbandono'
    | 'porcentajeReprocesos'
    | 'porcentajeManual'
    | 'sistemasActuales'
    | 'saldoCarteraActiva'
    | 'porcentajeMoraNPL'
    | 'diasAtrasoPromedio'
    | 'porcentajeRecuperacion'
    | 'costoMensualCobranza'
    | 'porcentajeGestionesManuales'
    | 'porcentajePagosManuales'
    | 'porcentajeErroresAplicacion'
    | 'porcentajeWriteOffAnual'
>;

export interface CalculatorSubmissionPayload {
    schemaVersion: 1;
    submissionId: string;
    submittedAt: string;
    source: 'sifco-roi-calculator';
    // Canal de adquisición: 'meta' (campañas, sin formulario de contacto) o 'directo'.
    channel: TrafficChannel;
    contact: {
        firstName: string;
        lastName: string;
        email: string;
        contactPreference: string;
        areaCode: string | null;
        phone: string | null;
        implementationDeadline: string | null;
        marketingConsent: boolean;
    };
    answers: CalculatorAnswers;
    results: CalculationResults;
}

export function createSubmissionId(): string {
    return globalThis.crypto?.randomUUID?.()
        ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

// Arma el payload con los datos de contacto (paso inicial) y las respuestas/resultados actuales.
export function buildCalculatorSubmissionPayload(state: CalculatorState): CalculatorSubmissionPayload {
    const { lead } = state;
    const wantsContact = lead.contactPreference.startsWith('Sí');

    return {
        schemaVersion: 1,
        submissionId: state.submissionId || createSubmissionId(),
        submittedAt: new Date().toISOString(),
        source: 'sifco-roi-calculator',
        channel: state.channel,
        contact: {
            firstName: lead.firstName.trim(),
            lastName: lead.lastName.trim(),
            email: lead.email,
            contactPreference: lead.contactPreference,
            areaCode: wantsContact ? lead.areaCode : null,
            phone: wantsContact ? lead.phone.trim() : null,
            implementationDeadline: wantsContact ? lead.implementationDeadline : null,
            marketingConsent: lead.marketingConsent,
        },
        answers: {
            solicitudesMes: state.solicitudesMes,
            porcentajeAprobado: state.porcentajeAprobado,
            montoTicket: state.montoTicket,
            tiempoAprobacion: state.tiempoAprobacion,
            tiempoDesembolso: state.tiempoDesembolso,
            numAnalistas: state.numAnalistas,
            salarioAnalista: state.salarioAnalista,
            horasLaboralesMes: state.horasLaboralesMes,
            porcentajeAbandono: state.porcentajeAbandono,
            porcentajeReprocesos: state.porcentajeReprocesos,
            porcentajeManual: state.porcentajeManual,
            sistemasActuales: state.sistemasActuales,
            saldoCarteraActiva: state.saldoCarteraActiva,
            porcentajeMoraNPL: state.porcentajeMoraNPL,
            diasAtrasoPromedio: state.diasAtrasoPromedio,
            porcentajeRecuperacion: state.porcentajeRecuperacion,
            costoMensualCobranza: state.costoMensualCobranza,
            porcentajeGestionesManuales: state.porcentajeGestionesManuales,
            porcentajePagosManuales: state.porcentajePagosManuales,
            porcentajeErroresAplicacion: state.porcentajeErroresAplicacion,
            porcentajeWriteOffAnual: state.porcentajeWriteOffAnual,
        },
        results: calculateROI(state),
    };
}

export async function saveCalculatorSubmission(payload: CalculatorSubmissionPayload): Promise<void> {
    const webhookUrl = import.meta.env.VITE_N8N_ROI_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
        throw new Error('La URL del webhook de n8n no está configurada.');
    }

    // text/plain es CORS-safelisted y evita el preflight OPTIONS.
    // n8n recibe el JSON directamente en body, sin un campo externo "payload".
    const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`El webhook respondió con HTTP ${response.status}.`);
    }

    let result: unknown;
    try {
        result = await response.json();
    } catch {
        throw new Error('El webhook no devolvió una respuesta JSON válida.');
    }

    if (!result || typeof result !== 'object' || !('success' in result) || result.success !== true) {
        throw new Error('El webhook no confirmó que guardó las respuestas.');
    }
}
