import type { CalculationResults } from './calculations';
import type { CalculatorState } from './useCalculatorStore';

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
