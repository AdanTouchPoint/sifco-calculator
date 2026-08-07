// Test de paridad: caUpdate.html vs calculateROI
// Ejecutar con: node --experimental-strip-types src/test-parity.ts

import { calculateROI } from './lib/calculations.ts';
import type { CalculatorState } from './lib/useCalculatorStore.ts';

// =============================================================
// IMPLEMENTACIÓN CAUPDATE.HTML (réplica literal de showResults)
// =============================================================
interface CaUpdateInputs {
    solicitudes: number;
    conversion: number;   // 0..1
    ticket: number;
    t_apro: number;
    t_desem: number;
    salario: number;
    horas: number;
    abandono: number;     // 0..1
    reprocesos: number;   // 0..1
    manual: number;       // 0..1
    sistemasVal: number;
    cartera_activa: number;
    mora_pct: number;     // 0..1
    dias_mora: number;
    tasa_rec: number;     // 0..1
    costo_cob: number;
    manual_cob: number;   // 0..1
    manual_pag: number;   // 0..1
    error_pag: number;    // 0..1
    provision_pct: number;// 0..1
}

interface CaUpdateResults {
    // Colocación
    creditos_mes: number;
    t_total: number;
    costo_hora: number;
    costo_por_credito: number;
    perdida_abandono: number;
    costo_reprocesos: number;
    t_apro_new: number;
    t_total_new: number;
    dias_ah: number;
    cap_nueva: number;
    cred_add: number;
    costo_new: number;
    roi_anual: number;
    ef: string;
    ri: string;
    po: string;
    // Recuperación
    cartera_mora: number;
    perdida_mora: number;
    costo_error_pag: number;
    castigo_mensual: number;
    tasa_rec_new: number;
    mora_pct_new: number;
    cartera_mora_new: number;
    perdida_mora_new: number;
    costo_cob_new: number;
    costo_error_new: number;
    castigo_new: number;
    ahorro_mora: number;
    ahorro_cobranza: number;
    ahorro_errores: number;
    roi_recuperacion: number;
    roi_total: number;
    mora_nivel: string;
    cob_nivel: string;
    pag_nivel: string;
}

function caUpdateShowResults(i: CaUpdateInputs): CaUpdateResults {
    // === COLOCACIÓN ===
    const creditos_mes = Math.round(i.solicitudes * i.conversion);
    const t_total = i.t_apro + i.t_desem;
    const costo_hora = i.salario / i.horas;
    const costo_por_credito = t_total * 0.75 * costo_hora;
    const perdida_abandono = Math.round(i.solicitudes * i.abandono) * i.ticket * 0.28;
    const costo_reprocesos = Math.round(i.solicitudes * i.reprocesos) * 3.5 * costo_hora;

    const mt = 0.60, mr = 0.60, ma = 0.35;
    const t_apro_new = Math.round(i.t_apro * (1 - mt) * 10) / 10;
    const t_total_new = Math.round(t_total * (1 - mt) * 10) / 10;
    const dias_ah = Math.round((t_total - t_total_new) * 10) / 10;
    const cap_nueva = Math.round(creditos_mes * (1 / (1 - mt)));
    const cred_add = cap_nueva - creditos_mes;
    const costo_new = costo_por_credito * (1 - mt);
    const roi_anual = ((costo_por_credito - costo_new) * creditos_mes + perdida_abandono * ma + costo_reprocesos * mr) * 12;

    // Badges Colocación
    const ef = (i.reprocesos > 0.3 || i.abandono > 0.25 || t_total > 10)
        ? 'Baja'
        : (i.reprocesos > 0.15 || i.abandono > 0.15 || t_total > 5)
            ? 'Media' : 'Alta';
    const ri = i.sistemasVal === 3 ? 'Alto' : i.sistemasVal === 2 ? 'Medio' : 'Bajo';
    const po = i.manual > 0.6 ? 'Alto' : i.manual > 0.3 ? 'Medio' : 'Bajo';

    // === RECUPERACIÓN ===
    const cartera_mora = i.cartera_activa * i.mora_pct;
    const perdida_mora = cartera_mora * (1 - i.tasa_rec);
    const costo_error_pag = i.cartera_activa * i.error_pag * 0.01;
    const castigo_mensual = i.cartera_activa * i.provision_pct / 12;

    const mej_rec = 0.25, mej_mora = 0.30, mej_cob = 0.35, mej_err = 0.65, mej_cast = 0.20;

    const tasa_rec_new = Math.min(i.tasa_rec * (1 + mej_rec), 0.98);
    const mora_pct_new = i.mora_pct * (1 - mej_mora);
    const cartera_mora_new = i.cartera_activa * mora_pct_new;
    const perdida_mora_new = cartera_mora_new * (1 - tasa_rec_new);
    const costo_cob_new = i.costo_cob * (1 - mej_cob);
    const costo_error_new = costo_error_pag * (1 - mej_err);
    const castigo_new = castigo_mensual * (1 - mej_cast);

    const ahorro_mora = perdida_mora - perdida_mora_new;
    const ahorro_cobranza = i.costo_cob - costo_cob_new;
    const ahorro_errores = costo_error_pag - costo_error_new;
    const roi_recuperacion = (ahorro_mora + ahorro_cobranza + ahorro_errores) * 12;
    const roi_total = roi_anual + roi_recuperacion;

    // Badges Recuperación
    const mora_nivel = i.mora_pct > 0.20 ? 'Alto' : i.mora_pct > 0.10 ? 'Medio' : 'Bajo';
    const cob_nivel = i.tasa_rec < 0.50 ? 'Baja' : i.tasa_rec < 0.70 ? 'Media' : 'Alta';
    const pag_nivel = (i.error_pag > 0.10 || i.manual_pag > 0.80)
        ? 'Alto'
        : (i.error_pag > 0.05 || i.manual_pag > 0.50)
            ? 'Medio' : 'Bajo';

    return {
        creditos_mes, t_total, costo_hora, costo_por_credito,
        perdida_abandono, costo_reprocesos,
        t_apro_new, t_total_new, dias_ah, cap_nueva, cred_add, costo_new,
        roi_anual, ef, ri, po,
        cartera_mora, perdida_mora, costo_error_pag, castigo_mensual,
        tasa_rec_new, mora_pct_new, cartera_mora_new, perdida_mora_new,
        costo_cob_new, costo_error_new, castigo_new,
        ahorro_mora, ahorro_cobranza, ahorro_errores,
        roi_recuperacion, roi_total,
        mora_nivel, cob_nivel, pag_nivel
    };
}

// Construir CalculatorState a partir de los inputs caUpdate
function buildState(i: CaUpdateInputs): CalculatorState {
    return {
        currentStep: 0,
        solicitudesMes: i.solicitudes,
        porcentajeAprobado: i.conversion * 100,
        montoTicket: i.ticket,
        tiempoAprobacion: i.t_apro,
        tiempoDesembolso: i.t_desem,
        numAnalistas: 6,
        salarioAnalista: i.salario,
        horasLaboralesMes: i.horas,
        porcentajeAbandono: i.abandono * 100,
        porcentajeReprocesos: i.reprocesos * 100,
        porcentajeManual: i.manual * 100,
        sistemasActuales: i.sistemasVal,
        saldoCarteraActiva: i.cartera_activa,
        porcentajeMoraNPL: i.mora_pct * 100,
        diasAtrasoPromedio: i.dias_mora,
        porcentajeRecuperacion: i.tasa_rec * 100,
        costoMensualCobranza: i.costo_cob,
        porcentajeGestionesManuales: i.manual_cob * 100,
        porcentajePagosManuales: i.manual_pag * 100,
        porcentajeErroresAplicacion: i.error_pag * 100,
        porcentajeWriteOffAnual: i.provision_pct * 100,
        email: '',
        empresa: '',
        leadFormCompleted: false,
        setFieldValue: () => {},
        nextStep: () => {},
        prevStep: () => {},
        goToStep: () => {},
        resetCalculator: () => {},
        setEmail: () => {},
        setEmpresa: () => {},
    };
}

// =============================================================
// CASOS DE PRUEBA
// =============================================================
const testCases: { name: string; inputs: CaUpdateInputs }[] = [
    {
        name: '01. Defaults (caUpdate.html)',
        inputs: {
            solicitudes: 150, conversion: 0.40, ticket: 3000,
            t_apro: 5, t_desem: 3, salario: 600, horas: 160,
            abandono: 0.20, reprocesos: 0.25, manual: 0.70, sistemasVal: 2,
            cartera_activa: 500000, mora_pct: 0.10, dias_mora: 45,
            tasa_rec: 0.60, costo_cob: 2000, manual_cob: 0.75,
            manual_pag: 0.70, error_pag: 0.05, provision_pct: 0.03
        }
    },
    {
        name: '02. Volumen bajo (microfinanzas)',
        inputs: {
            solicitudes: 50, conversion: 0.25, ticket: 800,
            t_apro: 3, t_desem: 1, salario: 400, horas: 120,
            abandono: 0.10, reprocesos: 0.10, manual: 0.40, sistemasVal: 1,
            cartera_activa: 100000, mora_pct: 0.05, dias_mora: 20,
            tasa_rec: 0.80, costo_cob: 500, manual_cob: 0.50,
            manual_pag: 0.30, error_pag: 0.02, provision_pct: 0.01
        }
    },
    {
        name: '03. Volumen alto (banca corporativa)',
        inputs: {
            solicitudes: 800, conversion: 0.55, ticket: 25000,
            t_apro: 10, t_desem: 7, salario: 1500, horas: 180,
            abandono: 0.35, reprocesos: 0.40, manual: 0.85, sistemasVal: 3,
            cartera_activa: 5000000, mora_pct: 0.18, dias_mora: 90,
            tasa_rec: 0.45, costo_cob: 15000, manual_cob: 0.90,
            manual_pag: 0.85, error_pag: 0.12, provision_pct: 0.06
        }
    },
    {
        name: '04. Proceso eficiente (mejores prácticas)',
        inputs: {
            solicitudes: 200, conversion: 0.70, ticket: 5000,
            t_apro: 2, t_desem: 1, salario: 900, horas: 160,
            abandono: 0.05, reprocesos: 0.08, manual: 0.20, sistemasVal: 1,
            cartera_activa: 800000, mora_pct: 0.04, dias_mora: 15,
            tasa_rec: 0.85, costo_cob: 3000, manual_cob: 0.30,
            manual_pag: 0.20, error_pag: 0.01, provision_pct: 0.005
        }
    },
    {
        name: '05. Proceso crítico (mora alta)',
        inputs: {
            solicitudes: 300, conversion: 0.30, ticket: 4000,
            t_apro: 15, t_desem: 10, salario: 700, horas: 160,
            abandono: 0.40, reprocesos: 0.50, manual: 0.95, sistemasVal: 3,
            cartera_activa: 1000000, mora_pct: 0.30, dias_mora: 120,
            tasa_rec: 0.40, costo_cob: 5000, manual_cob: 0.95,
            manual_pag: 0.90, error_pag: 0.18, provision_pct: 0.10
        }
    },
    {
        name: '06. Edge: conversión mínima',
        inputs: {
            solicitudes: 100, conversion: 0.01, ticket: 1000,
            t_apro: 1, t_desem: 0, salario: 500, horas: 80,
            abandono: 0.00, reprocesos: 0.00, manual: 0.00, sistemasVal: 1,
            cartera_activa: 50000, mora_pct: 0.00, dias_mora: 1,
            tasa_rec: 1.00, costo_cob: 0, manual_cob: 0.00,
            manual_pag: 0.00, error_pag: 0.00, provision_pct: 0.00
        }
    },
    {
        name: '07. Edge: máxima fricción',
        inputs: {
            solicitudes: 100, conversion: 1.00, ticket: 100,
            t_apro: 30, t_desem: 20, salario: 100, horas: 240,
            abandono: 0.60, reprocesos: 0.80, manual: 1.00, sistemasVal: 3,
            cartera_activa: 10000, mora_pct: 0.40, dias_mora: 180,
            tasa_rec: 0.10, costo_cob: 100, manual_cob: 1.00,
            manual_pag: 1.00, error_pag: 0.30, provision_pct: 0.15
        }
    },
    {
        name: '08. Tasa_rec cerca del techo (cap 0.98)',
        inputs: {
            solicitudes: 200, conversion: 0.50, ticket: 5000,
            t_apro: 5, t_desem: 3, salario: 800, horas: 160,
            abandono: 0.15, reprocesos: 0.20, manual: 0.60, sistemasVal: 2,
            cartera_activa: 500000, mora_pct: 0.10, dias_mora: 45,
            tasa_rec: 0.95, costo_cob: 2000, manual_cob: 0.70,
            manual_pag: 0.70, error_pag: 0.05, provision_pct: 0.03
        }
    },
    {
        name: '09. Ticket micro vs empresarial',
        inputs: {
            solicitudes: 500, conversion: 0.40, ticket: 1500,
            t_apro: 4, t_desem: 2, salario: 500, horas: 160,
            abandono: 0.25, reprocesos: 0.30, manual: 0.75, sistemasVal: 2,
            cartera_activa: 750000, mora_pct: 0.12, dias_mora: 60,
            tasa_rec: 0.55, costo_cob: 3000, manual_cob: 0.80,
            manual_pag: 0.75, error_pag: 0.07, provision_pct: 0.04
        }
    },
    {
        name: '10. Mora recupera 100% (sin pérdida)',
        inputs: {
            solicitudes: 100, conversion: 0.50, ticket: 2000,
            t_apro: 5, t_desem: 3, salario: 600, horas: 160,
            abandono: 0.20, reprocesos: 0.25, manual: 0.70, sistemasVal: 2,
            cartera_activa: 200000, mora_pct: 0.10, dias_mora: 30,
            tasa_rec: 1.00, costo_cob: 1500, manual_cob: 0.70,
            manual_pag: 0.70, error_pag: 0.05, provision_pct: 0.03
        }
    },
    {
        name: '11. Mora 0% (sin riesgo)',
        inputs: {
            solicitudes: 100, conversion: 0.50, ticket: 2000,
            t_apro: 5, t_desem: 3, salario: 600, horas: 160,
            abandono: 0.20, reprocesos: 0.25, manual: 0.70, sistemasVal: 2,
            cartera_activa: 200000, mora_pct: 0.00, dias_mora: 0,
            tasa_rec: 0.60, costo_cob: 1500, manual_cob: 0.70,
            manual_pag: 0.70, error_pag: 0.05, provision_pct: 0.03
        }
    },
    {
        name: '12. Valores del guide-calc.md (v3.0)',
        inputs: {
            solicitudes: 400, conversion: 0.40, ticket: 5000,
            t_apro: 5, t_desem: 3, salario: 800, horas: 160,
            abandono: 0.20, reprocesos: 0.25, manual: 0.70, sistemasVal: 2,
            cartera_activa: 500000, mora_pct: 0.10, dias_mora: 45,
            tasa_rec: 0.60, costo_cob: 2000, manual_cob: 0.75,
            manual_pag: 0.70, error_pag: 0.05, provision_pct: 0.03
        }
    }
];

// =============================================================
// COMPARACIÓN
// =============================================================
const EPSILON = 0.01; // tolerancia para comparar floats

interface Comparison {
    field: string;
    caUpdate: number | string;
    current: number | string;
    pass: boolean;
}

function compare(name: string, inputs: CaUpdateInputs): boolean {
    const ca = caUpdateShowResults(inputs);
    const state = buildState(inputs);
    const cur = calculateROI(state);

    const checks: Comparison[] = [
        // Numéricos con tolerancia
        { field: 'CREDITOS_MES', caUpdate: ca.creditos_mes, current: cur.CREDITOS_MES, pass: Math.abs(ca.creditos_mes - cur.CREDITOS_MES) < EPSILON },
        { field: 'T_TOTAL', caUpdate: ca.t_total, current: cur.T_TOTAL, pass: Math.abs(ca.t_total - cur.T_TOTAL) < EPSILON },
        { field: 'COSTO_HORA', caUpdate: ca.costo_hora, current: cur.COSTO_HORA, pass: Math.abs(ca.costo_hora - cur.COSTO_HORA) < EPSILON },
        { field: 'HRS_X_CREDITO', caUpdate: ca.t_total * 0.75, current: cur.HRS_X_CREDITO, pass: Math.abs(ca.t_total * 0.75 - cur.HRS_X_CREDITO) < EPSILON },
        { field: 'COSTO_X_CREDITO', caUpdate: ca.costo_por_credito, current: cur.COSTO_X_CREDITO, pass: Math.abs(ca.costo_por_credito - cur.COSTO_X_CREDITO) < EPSILON },
        { field: 'PERDIDA_ABANDONO', caUpdate: ca.perdida_abandono, current: cur.PERDIDA_ABANDONO, pass: Math.abs(ca.perdida_abandono - cur.PERDIDA_ABANDONO) < EPSILON },
        { field: 'COSTO_REPROCESOS', caUpdate: ca.costo_reprocesos, current: cur.COSTO_REPROCESOS, pass: Math.abs(ca.costo_reprocesos - cur.COSTO_REPROCESOS) < EPSILON },
        { field: 'CAP_NUEVA', caUpdate: ca.cap_nueva, current: cur.CAP_NUEVA, pass: Math.abs(ca.cap_nueva - cur.CAP_NUEVA) < EPSILON },
        { field: 'CRED_ADD', caUpdate: ca.cred_add, current: cur.CRED_ADD, pass: Math.abs(ca.cred_add - cur.CRED_ADD) < EPSILON },
        { field: 'COSTO_NUEVO', caUpdate: ca.costo_new, current: cur.COSTO_NUEVO, pass: Math.abs(ca.costo_new - cur.COSTO_NUEVO) < EPSILON },
        { field: 'DIAS_AHORRADOS', caUpdate: ca.dias_ah, current: cur.DIAS_AHORRADOS, pass: Math.abs(ca.dias_ah - cur.DIAS_AHORRADOS) < EPSILON },
        { field: 'ROI_COLOCACION', caUpdate: ca.roi_anual, current: cur.ROI_COLOCACION, pass: Math.abs(ca.roi_anual - cur.ROI_COLOCACION) < EPSILON },
        // Indicadores Colocación
        { field: 'indicadorEficiencia', caUpdate: ca.ef, current: cur.indicadorEficiencia, pass: ca.ef === cur.indicadorEficiencia },
        { field: 'indicadorRiesgoOp', caUpdate: ca.ri, current: cur.indicadorRiesgoOp, pass: ca.ri === cur.indicadorRiesgoOp },
        { field: 'indicadorAutomatizacion', caUpdate: ca.po, current: cur.indicadorAutomatizacion, pass: ca.po === cur.indicadorAutomatizacion },
        // Recuperación
        { field: 'CARTERA_MORA', caUpdate: ca.cartera_mora, current: cur.CARTERA_MORA, pass: Math.abs(ca.cartera_mora - cur.CARTERA_MORA) < EPSILON },
        { field: 'PERDIDA_MORA', caUpdate: ca.perdida_mora, current: cur.PERDIDA_MORA, pass: Math.abs(ca.perdida_mora - cur.PERDIDA_MORA) < EPSILON },
        { field: 'COSTO_ERROR_PAG', caUpdate: ca.costo_error_pag, current: cur.COSTO_ERROR_PAG, pass: Math.abs(ca.costo_error_pag - cur.COSTO_ERROR_PAG) < EPSILON },
        { field: 'CASTIGO_MENS', caUpdate: ca.castigo_mensual, current: cur.CASTIGO_MENS, pass: Math.abs(ca.castigo_mensual - cur.CASTIGO_MENS) < EPSILON },
        { field: 'TASA_REC_NEW', caUpdate: ca.tasa_rec_new, current: cur.TASA_REC_NEW, pass: Math.abs(ca.tasa_rec_new - cur.TASA_REC_NEW) < EPSILON },
        { field: 'MORA_PCT_NEW', caUpdate: ca.mora_pct_new, current: cur.MORA_PCT_NEW, pass: Math.abs(ca.mora_pct_new - cur.MORA_PCT_NEW) < EPSILON },
        { field: 'CARTERA_MORA_NEW', caUpdate: ca.cartera_mora_new, current: cur.CARTERA_MORA_NEW, pass: Math.abs(ca.cartera_mora_new - cur.CARTERA_MORA_NEW) < EPSILON },
        { field: 'PERDIDA_MORA_NEW', caUpdate: ca.perdida_mora_new, current: cur.PERDIDA_MORA_NEW, pass: Math.abs(ca.perdida_mora_new - cur.PERDIDA_MORA_NEW) < EPSILON },
        { field: 'COSTO_COB_NEW', caUpdate: ca.costo_cob_new, current: cur.COSTO_COB_NEW, pass: Math.abs(ca.costo_cob_new - cur.COSTO_COB_NEW) < EPSILON },
        { field: 'COSTO_ERROR_NEW', caUpdate: ca.costo_error_new, current: cur.COSTO_ERROR_NEW, pass: Math.abs(ca.costo_error_new - cur.COSTO_ERROR_NEW) < EPSILON },
        { field: 'AHORRO_MORA', caUpdate: ca.ahorro_mora * 12, current: cur.AHORRO_MORA, pass: Math.abs(ca.ahorro_mora * 12 - cur.AHORRO_MORA) < EPSILON },
        { field: 'AHORRO_COB', caUpdate: ca.ahorro_cobranza * 12, current: cur.AHORRO_COB, pass: Math.abs(ca.ahorro_cobranza * 12 - cur.AHORRO_COB) < EPSILON },
        { field: 'AHORRO_ERR', caUpdate: ca.ahorro_errores * 12, current: cur.AHORRO_ERR, pass: Math.abs(ca.ahorro_errores * 12 - cur.AHORRO_ERR) < EPSILON },
        { field: 'ROI_RECUPERACION', caUpdate: ca.roi_recuperacion, current: cur.ROI_RECUPERACION, pass: Math.abs(ca.roi_recuperacion - cur.ROI_RECUPERACION) < EPSILON },
        { field: 'ROI_TOTAL', caUpdate: ca.roi_total, current: cur.ROI_TOTAL, pass: Math.abs(ca.roi_total - cur.ROI_TOTAL) < EPSILON },
        // Indicadores Recuperación
        { field: 'indicadorMora', caUpdate: ca.mora_nivel, current: cur.indicadorMora, pass: ca.mora_nivel === cur.indicadorMora },
        { field: 'indicadorEficienciaCob', caUpdate: ca.cob_nivel, current: cur.indicadorEficienciaCob, pass: ca.cob_nivel === cur.indicadorEficienciaCob },
        { field: 'indicadorRiesgoPagos', caUpdate: ca.pag_nivel, current: cur.indicadorRiesgoPagos, pass: ca.pag_nivel === cur.indicadorRiesgoPagos },
    ];

    const failed = checks.filter(c => !c.pass);

    console.log(`\n${'='.repeat(80)}`);
    console.log(`CASO: ${name}`);
    console.log('='.repeat(80));
    console.log(`Inputs: SOL=${inputs.solicitudes} TICKET=${inputs.ticket} SAL=${inputs.salario} SIS=${inputs.sistemasVal}`);
    console.log(`        MORA=${(inputs.mora_pct*100).toFixed(0)}% T_REC=${(inputs.tasa_rec*100).toFixed(0)}% ABAN=${(inputs.abandono*100).toFixed(0)}% REPR=${(inputs.reprocesos*100).toFixed(0)}%`);
    console.log('-'.repeat(80));

    if (failed.length === 0) {
        console.log(`✅ PASÓ — 32/32 campos coinciden (ROI_TOTAL=$${cur.ROI_TOTAL.toFixed(2)})`);
        return true;
    } else {
        console.log(`❌ FALLÓ — ${failed.length} campos con diferencia:`);
        failed.forEach(f => {
            console.log(`   ${f.field.padEnd(25)} caUpdate=${f.caUpdate}  current=${f.current}`);
        });
        return false;
    }
}

let passed = 0;
let failed = 0;
testCases.forEach(tc => {
    if (compare(tc.name, tc.inputs)) passed++;
    else failed++;
});

console.log(`\n${'='.repeat(80)}`);
console.log(`RESUMEN: ${passed}/${testCases.length} casos pasaron · ${failed} fallaron`);
console.log('='.repeat(80));
process.exit(failed > 0 ? 1 : 0);
