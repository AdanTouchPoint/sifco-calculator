// Validación de cálculos con valores por defecto de caUpdate.html
// Ejecutar con: node --experimental-strip-types validate-calcs.ts

// === DEFAULTS (caUpdate.html líneas 339-625) ===

const validate = () => {

    const SOL = 150;
    const CONV = 0.40;       // 40%
    const TICKET = 3000;
    const T_APRO = 5;
    const T_DESEM = 3;
    //const ANALISTAS = 6;
    const SALARIO = 600;
    const HORAS_MES = 160;
    const ABAN = 0.20;       // 20%
    const REPR = 0.25;       // 25%
    //const MANUAL = 0.70;     // 70%
    // const SISTEMAS = 2;

    // Benchmarks Colocación (caUpdate.html)
    const BMRK_TIEMPO = 0.60;
    const BMRK_REPR = 0.60;
    const BMRK_ABAN = 0.35;
    const BMRK_INT = 0.28;

    // Factores Fijos (caUpdate.html)
    const HRS_ACT_DIA = 0.75;
    const HRS_REPR_F = 3.5;

    // === DEFAULTS Recuperación ===
    const CARTERA_ACTIVA = 500000;
    const MORA_PCT = 0.10;   // 10%
    const TASA_REC = 0.60;   // 60%
    const COSTO_COB = 2000;
    // const MANUAL_PAG = 0.70; // 70%
    const ERROR_PAG = 0.05;  // 5%
    // const PROVISION_PCT = 0.03; // 3%

    // Benchmarks Recuperación (caUpdate.html)
    const MEJ_REC = 0.25;
    const MEJ_MORA = 0.30;
    const MEJ_COB = 0.35;
    const MEJ_ERR = 0.65;
    // const MEJ_CAST = 0.20;

    console.log("=== INTERMEDIAS COLOCACIÓN ===");
    const CREDITOS_MES = Math.round(SOL * CONV);
    console.log(`CREDITOS_MES = round(${SOL} × ${CONV}) = ${CREDITOS_MES}`);

    const T_TOTAL = T_APRO + T_DESEM;
    console.log(`T_TOTAL = ${T_APRO} + ${T_DESEM} = ${T_TOTAL}`);

    const COSTO_HORA = SALARIO / HORAS_MES;
    console.log(`COSTO_HORA = ${SALARIO} / ${HORAS_MES} = $${COSTO_HORA}`);

    const HRS_X_CREDITO = T_TOTAL * HRS_ACT_DIA;
    console.log(`HRS_X_CREDITO = ${T_TOTAL} × ${HRS_ACT_DIA} = ${HRS_X_CREDITO}`);

    const COSTO_X_CREDITO = T_TOTAL * HRS_ACT_DIA * COSTO_HORA;
    console.log(`COSTO_X_CREDITO = ${T_TOTAL} × ${HRS_ACT_DIA} × ${COSTO_HORA} = $${COSTO_X_CREDITO}`);

    const PERDIDA_ABANDONO = Math.round(SOL * ABAN) * TICKET * BMRK_INT;
    console.log(`PERDIDA_ABANDONO = round(${SOL} × ${ABAN}) × ${TICKET} × ${BMRK_INT} = $${PERDIDA_ABANDONO}`);

    const COSTO_REPROCESOS = Math.round(SOL * REPR) * HRS_REPR_F * COSTO_HORA;
    console.log(`COSTO_REPROCESOS = round(${SOL} × ${REPR}) × ${HRS_REPR_F} × ${COSTO_HORA} = $${COSTO_REPROCESOS}`);

    const CAP_NUEVA = Math.round(CREDITOS_MES * (1 / (1 - BMRK_TIEMPO)));
    console.log(`CAP_NUEVA = round(${CREDITOS_MES} × (1 / (1 - ${BMRK_TIEMPO}))) = ${CAP_NUEVA}`);

    const CRED_ADD = CAP_NUEVA - CREDITOS_MES;
    console.log(`CRED_ADD = ${CAP_NUEVA} - ${CREDITOS_MES} = ${CRED_ADD}`);

    const COSTO_NUEVO = COSTO_X_CREDITO * (1 - BMRK_TIEMPO);
    console.log(`COSTO_NUEVO = ${COSTO_X_CREDITO} × (1 - ${BMRK_TIEMPO}) = $${COSTO_NUEVO}`);

    const DIAS_AHORRADOS = T_TOTAL * BMRK_TIEMPO;
    console.log(`DIAS_AHORRADOS = ${T_TOTAL} × ${BMRK_TIEMPO} = ${DIAS_AHORRADOS}`);

    console.log("\n=== ROI COLOCACIÓN ===");
    const ahorro_operativo = (COSTO_X_CREDITO - COSTO_NUEVO) * CREDITOS_MES;
    console.log(`Ahorro operativo/mes = (${COSTO_X_CREDITO} - ${COSTO_NUEVO}) × ${CREDITOS_MES} = $${ahorro_operativo}`);

    const recuperacion_abandono = PERDIDA_ABANDONO * BMRK_ABAN;
    console.log(`Recuperación abandono/mes = ${PERDIDA_ABANDONO} × ${BMRK_ABAN} = $${recuperacion_abandono}`);

    const ahorro_reprocesos = COSTO_REPROCESOS * BMRK_REPR;
    console.log(`Ahorro reprocesos/mes = ${COSTO_REPROCESOS} × ${BMRK_REPR} = $${ahorro_reprocesos}`);

    const total_mensual_col = ahorro_operativo + recuperacion_abandono + ahorro_reprocesos;
    console.log(`Total mensual colocación = $${total_mensual_col}`);

    const ROI_COLOCACION = total_mensual_col * 12;
    console.log(`ROI_COLOCACION = $${total_mensual_col} × 12 = $${ROI_COLOCACION}`);

    console.log("\n=== INTERMEDIAS RECUPERACIÓN ===");
    const CARTERA_MORA = CARTERA_ACTIVA * MORA_PCT;
    console.log(`CARTERA_MORA = ${CARTERA_ACTIVA} × ${MORA_PCT} = $${CARTERA_MORA}`);

    const PERDIDA_MORA = CARTERA_MORA * (1 - TASA_REC);
    console.log(`PERDIDA_MORA = ${CARTERA_MORA} × (1 - ${TASA_REC}) = $${PERDIDA_MORA}`);

    const COSTO_ERROR_PAG_V = CARTERA_ACTIVA * ERROR_PAG * 0.01;
    console.log(`COSTO_ERROR_PAG = ${CARTERA_ACTIVA} × ${ERROR_PAG} × 0.01 = $${COSTO_ERROR_PAG_V}`);

    const TASA_REC_NEW = Math.min(TASA_REC * (1 + MEJ_REC), 0.98);
    console.log(`TASA_REC_NEW = MIN(${TASA_REC} × (1 + ${MEJ_REC}), 0.98) = ${TASA_REC_NEW}`);

    const MORA_PCT_NEW = MORA_PCT * (1 - MEJ_MORA);
    console.log(`MORA_PCT_NEW = ${MORA_PCT} × (1 - ${MEJ_MORA}) = ${MORA_PCT_NEW}`);

    const CARTERA_MORA_NEW = CARTERA_ACTIVA * MORA_PCT_NEW;
    console.log(`CARTERA_MORA_NEW = ${CARTERA_ACTIVA} × ${MORA_PCT_NEW} = $${CARTERA_MORA_NEW}`);

    const PERDIDA_MORA_NEW = CARTERA_MORA_NEW * (1 - TASA_REC_NEW);
    console.log(`PERDIDA_MORA_NEW = ${CARTERA_MORA_NEW} × (1 - ${TASA_REC_NEW}) = $${PERDIDA_MORA_NEW}`);

    const COSTO_COB_NEW = COSTO_COB * (1 - MEJ_COB);
    console.log(`COSTO_COB_NEW = ${COSTO_COB} × (1 - ${MEJ_COB}) = $${COSTO_COB_NEW}`);

    const COSTO_ERROR_NEW = COSTO_ERROR_PAG_V * (1 - MEJ_ERR);
    console.log(`COSTO_ERROR_NEW = ${COSTO_ERROR_PAG_V} × (1 - ${MEJ_ERR}) = $${COSTO_ERROR_NEW}`);

    console.log("\n=== ROI RECUPERACIÓN ===");
    const AHORRO_MORA = (PERDIDA_MORA - PERDIDA_MORA_NEW) * 12;
    console.log(`AHORRO_MORA = (${PERDIDA_MORA} - ${PERDIDA_MORA_NEW}) × 12 = $${AHORRO_MORA}`);

    const AHORRO_COB = (COSTO_COB - COSTO_COB_NEW) * 12;
    console.log(`AHORRO_COB = (${COSTO_COB} - ${COSTO_COB_NEW}) × 12 = $${AHORRO_COB}`);

    const AHORRO_ERR = (COSTO_ERROR_PAG_V - COSTO_ERROR_NEW) * 12;
    console.log(`AHORRO_ERR = (${COSTO_ERROR_PAG_V} - ${COSTO_ERROR_NEW}) × 12 = $${AHORRO_ERR}`);

    const ROI_RECUPERACION = AHORRO_MORA + AHORRO_COB + AHORRO_ERR;
    console.log(`ROI_RECUPERACION = $${AHORRO_MORA} + $${AHORRO_COB} + $${AHORRO_ERR} = $${ROI_RECUPERACION}`);

    console.log("\n=== ROI TOTAL ===");
    const ROI_TOTAL = ROI_COLOCACION + ROI_RECUPERACION;
    console.log(`ROI_TOTAL = $${ROI_COLOCACION} + $${ROI_RECUPERACION} = $${ROI_TOTAL}`);

    // Indicadores (caUpdate.html líneas 881-883, 959-961)
    console.log("\n=== INDICADORES (Semáforo) ===");
    const MANUAL_VAL = 0.70;
    const MANUAL_PAG_VAL = 0.70;
    const ef = (REPR > 0.30 || ABAN > 0.25 || T_TOTAL > 10) ? 'Baja' : (REPR > 0.15 || ABAN > 0.15 || T_TOTAL > 5) ? 'Media' : 'Alta';
    const SISTEMAS: number = 2;
    const ri = SISTEMAS === 3 ? 'Alto' : SISTEMAS === 2 ? 'Medio' : 'Bajo';
    const po = (MANUAL_VAL > 0.6) ? 'Alto' : (MANUAL_VAL > 0.3) ? 'Medio' : 'Bajo';
    console.log(`Eficiencia operativa: ${ef}`);
    console.log(`Riesgo operativo: ${ri}`);
    console.log(`Potencial automatización: ${po}`);

    const mora_nivel = MORA_PCT > 0.20 ? 'Alto' : MORA_PCT > 0.10 ? 'Medio' : 'Bajo';
    const cob_nivel = TASA_REC < 0.50 ? 'Baja' : TASA_REC < 0.70 ? 'Media' : 'Alta';
    const pag_nivel = (ERROR_PAG > 0.10 || MANUAL_PAG_VAL > 0.80) ? 'Alto' : (ERROR_PAG > 0.05 || MANUAL_PAG_VAL > 0.50) ? 'Medio' : 'Bajo';
    console.log(`Índice de Morosidad: ${mora_nivel}`);
    console.log(`Eficiencia de Cobranza: ${cob_nivel}`);
    console.log(`Riesgo Registro de Pagos: ${pag_nivel}`);

    // Tarjetas visibles Colocación
    console.log("\n=== TARJETAS COLOCACIÓN ===");
    console.log(`Pérdida por abandonos/mes = $${PERDIDA_ABANDONO}`);
    console.log(`Costo por reprocesos/mes = $${COSTO_REPROCESOS}`);
    console.log(`Créditos adicionales/mes = +${CRED_ADD}`);
    console.log(`Días ahorrados/crédito = ${DIAS_AHORRADOS}`);

    // Tarjetas visibles Recuperación
    console.log("\n=== TARJETAS RECUPERACIÓN ===");
    console.log(`Pérdida mora no recuperada/mes = $${PERDIDA_MORA}`);
    console.log(`Costo cobranza/mes = $${COSTO_COB}`);
    console.log(`Recuperación adicional/mes = $${PERDIDA_MORA - PERDIDA_MORA_NEW}`);
    console.log(`Ahorro cobranza+errores/mes = $${(COSTO_COB - COSTO_COB_NEW) + (COSTO_ERROR_PAG_V - COSTO_ERROR_NEW)}`);

}

validate();
