import type { CalculatorState } from './useCalculatorStore';

// CONSTANTES Y FACTORES FIJOS (Según guide-calc.md)
export const BMRK_TIEMPO = 0.60;
export const BMRK_REPR = 0.60;
export const BMRK_ABAN = 0.50;
export const BMRK_INT = 0.05;
export const HRS_ACT_DIA = 0.5;
export const HRS_REPR = 2;
export const MESES_ANO = 12;

export const MEJ_REC = 0.25;
export const MEJ_MORA = 0.30;
export const MEJ_COB = 0.45;
export const MEJ_ERR = 0.72;
export const MEJ_CAST = 0.20;

export interface CalculationResults {
  // Colocacion
  CREDITOS_MES: number;
  T_TOTAL: number;
  COSTO_HORA: number;
  HRS_X_CREDITO: number;
  COSTO_X_CREDITO: number;
  PERDIDA_ABANDONO: number;
  COSTO_REPROCESOS: number;
  CAP_NUEVA: number;
  CRED_ADD: number;
  COSTO_NUEVO: number;

  DIAS_AHORRADOS: number;

  indicadorEficiencia: 'Alta' | 'Media' | 'Baja';
  indicadorRiesgoOp: 'Alto' | 'Medio' | 'Bajo';
  indicadorAutomatizacion: 'Alto' | 'Medio' | 'Bajo';

  ROI_COLOCACION: number;

  // Recuperacion
  CARTERA_MORA: number;
  PERDIDA_MORA: number;
  COSTO_ERROR_PAG: number;
  CASTIGO_MENS: number;
  TASA_REC_NEW: number;
  MORA_PCT_NEW: number;
  CARTERA_MORA_NEW: number;
  PERDIDA_MORA_NEW: number;
  COSTO_COB_NEW: number;
  COSTO_ERROR_NEW: number;

  indicadorMora: 'Alto' | 'Medio' | 'Bajo';
  indicadorEficienciaCob: 'Alta' | 'Media' | 'Baja';
  indicadorRiesgoPagos: 'Alto' | 'Medio' | 'Bajo';

  AHORRO_MORA: number;
  AHORRO_COB: number;
  AHORRO_ERR: number;
  ROI_RECUPERACION: number;

  ROI_TOTAL: number;
}

export function calculateROI(state: CalculatorState): CalculationResults {
  // Variables from state
  const SOL = state.solicitudesMes;
  const CONV = state.porcentajeAprobado / 100;
  const TICKET = state.montoTicket;
  const T_APRO = state.tiempoAprobacion;
  const T_DESEM = state.tiempoDesembolso;
  //const ANALISTAS = state.numAnalistas;
  const SALARIO = state.salarioAnalista;
  const HORAS_MES = state.horasLaboralesMes;
  const ABAN = state.porcentajeAbandono / 100;
  const REPR = state.porcentajeReprocesos / 100;
  const MANUAL = state.porcentajeManual / 100;
  const SISTEMAS = state.sistemasActuales;

  const CARTERA_ACTIVA = state.saldoCarteraActiva;
  const MORA_PCT = state.porcentajeMoraNPL / 100;
  const TASA_REC = state.porcentajeRecuperacion / 100;
  const COSTO_COB = state.costoMensualCobranza;
  const MANUAL_PAG = state.porcentajePagosManuales / 100;
  const ERROR_PAG = state.porcentajeErroresAplicacion / 100;
  const PROVISION_PCT = state.porcentajeWriteOffAnual / 100;

  // INTERMEDIATE: COLOCACION
  const CREDITOS_MES = SOL * CONV;
  const T_TOTAL = T_APRO + T_DESEM;
  const COSTO_HORA = SALARIO / HORAS_MES;
  const HRS_X_CREDITO = T_TOTAL * HRS_ACT_DIA;
  const COSTO_X_CREDITO = HRS_X_CREDITO * COSTO_HORA;
  const PERDIDA_ABANDONO = SOL * ABAN * TICKET * BMRK_INT;
  const COSTO_REPROCESOS = SOL * REPR * HRS_REPR * COSTO_HORA;

  const CAP_NUEVA = CREDITOS_MES / (1 - BMRK_TIEMPO);
  const CRED_ADD = CAP_NUEVA - CREDITOS_MES;
  const COSTO_NUEVO = COSTO_X_CREDITO * (1 - BMRK_TIEMPO);

  const DIAS_AHORRADOS = T_TOTAL * BMRK_TIEMPO;

  // INDICADORES: COLOCACION
  let indicadorEficiencia: 'Alta' | 'Media' | 'Baja' = 'Alta';
  if (T_TOTAL > 10 || REPR > 0.30 || ABAN > 0.25) {
    indicadorEficiencia = 'Baja';
  } else if (T_TOTAL > 5 || REPR > 0.15 || ABAN > 0.15) {
    indicadorEficiencia = 'Media';
  }

  let indicadorRiesgoOp: 'Alto' | 'Medio' | 'Bajo' = 'Bajo';
  if (SISTEMAS >= 4) {
    indicadorRiesgoOp = 'Alto';
  } else if (SISTEMAS >= 2) {
    indicadorRiesgoOp = 'Medio';
  }

  let indicadorAutomatizacion: 'Alto' | 'Medio' | 'Bajo' = 'Bajo';
  if (MANUAL > 0.60) {
    indicadorAutomatizacion = 'Alto';
  } else if (MANUAL > 0.30) {
    indicadorAutomatizacion = 'Medio';
  }

  const ROI_COLOCACION = ((COSTO_X_CREDITO - COSTO_NUEVO) * CREDITOS_MES + PERDIDA_ABANDONO * BMRK_ABAN + COSTO_REPROCESOS * BMRK_REPR) * MESES_ANO;

  // INTERMEDIATE: RECUPERACION
  const CARTERA_MORA = CARTERA_ACTIVA * MORA_PCT;
  const PERDIDA_MORA = CARTERA_MORA * (1 - TASA_REC);
  const COSTO_ERROR_PAG = CARTERA_ACTIVA * ERROR_PAG * 0.01;
  const CASTIGO_MENS = (CARTERA_ACTIVA * PROVISION_PCT) / 12;
  const TASA_REC_NEW = Math.min(TASA_REC * (1 + MEJ_REC), 0.98);
  const MORA_PCT_NEW = MORA_PCT * (1 - MEJ_MORA);
  const CARTERA_MORA_NEW = CARTERA_ACTIVA * MORA_PCT_NEW;
  const PERDIDA_MORA_NEW = CARTERA_MORA_NEW * (1 - TASA_REC_NEW);
  const COSTO_COB_NEW = COSTO_COB * (1 - MEJ_COB);
  const COSTO_ERROR_NEW = COSTO_ERROR_PAG * (1 - MEJ_ERR);

  // INDICADORES: RECUPERACION
  let indicadorMora: 'Alto' | 'Medio' | 'Bajo' = 'Bajo';
  if (MORA_PCT > 0.20) {
    indicadorMora = 'Alto';
  } else if (MORA_PCT > 0.10) {
    indicadorMora = 'Medio';
  }

  let indicadorEficienciaCob: 'Alta' | 'Media' | 'Baja' = 'Alta';
  if (TASA_REC < 0.50) {
    indicadorEficienciaCob = 'Baja';
  } else if (TASA_REC < 0.70) {
    indicadorEficienciaCob = 'Media';
  }

  let indicadorRiesgoPagos: 'Alto' | 'Medio' | 'Bajo' = 'Bajo';
  if (ERROR_PAG > 0.10 || MANUAL_PAG > 0.80) {
    indicadorRiesgoPagos = 'Alto';
  } else if (ERROR_PAG > 0.05 || MANUAL_PAG > 0.50) {
    indicadorRiesgoPagos = 'Medio';
  }

  const AHORRO_MORA = (PERDIDA_MORA - PERDIDA_MORA_NEW) * MESES_ANO;
  const AHORRO_COB = (COSTO_COB - COSTO_COB_NEW) * MESES_ANO;
  const AHORRO_ERR = (COSTO_ERROR_PAG - COSTO_ERROR_NEW) * MESES_ANO;
  const ROI_RECUPERACION = AHORRO_MORA + AHORRO_COB + AHORRO_ERR;

  const ROI_TOTAL = ROI_COLOCACION + ROI_RECUPERACION;

  return {
    CREDITOS_MES,
    T_TOTAL,
    COSTO_HORA,
    HRS_X_CREDITO,
    COSTO_X_CREDITO,
    PERDIDA_ABANDONO,
    COSTO_REPROCESOS,
    CAP_NUEVA,
    CRED_ADD,
    COSTO_NUEVO,
    DIAS_AHORRADOS,

    indicadorEficiencia,
    indicadorRiesgoOp,
    indicadorAutomatizacion,

    ROI_COLOCACION,

    CARTERA_MORA,
    PERDIDA_MORA,
    COSTO_ERROR_PAG,
    CASTIGO_MENS,
    TASA_REC_NEW,
    MORA_PCT_NEW,
    CARTERA_MORA_NEW,
    PERDIDA_MORA_NEW,
    COSTO_COB_NEW,
    COSTO_ERROR_NEW,

    indicadorMora,
    indicadorEficienciaCob,
    indicadorRiesgoPagos,

    AHORRO_MORA,
    AHORRO_COB,
    AHORRO_ERR,
    ROI_RECUPERACION,

    ROI_TOTAL
  };
}
