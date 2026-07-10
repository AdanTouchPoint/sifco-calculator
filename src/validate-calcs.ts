// Validación de cálculos con valores por defecto del guide-calc.md
// Ejecutar con: node --experimental-strip-types validate-calc.ts

// === DEFAULTS (Sección 2 del guide) ===

const validate = () => {

    const SOL = 400;
    const CONV = 0.40;       // 40%
    const TICKET = 5000;
    const T_APRO = 5;
    const T_DESEM = 3;
    //const ANALISTAS = 6;
    const SALARIO = 800;
    const HORAS_MES = 160;
    const ABAN = 0.20;       // 20%
    const REPR = 0.25;       // 25%
    //const MANUAL = 0.70;     // 70%
    // const SISTEMAS = 3;

    // Benchmarks Colocación (Sección 2)
    const BMRK_TIEMPO = 0.60;
    const BMRK_REPR = 0.60;
    const BMRK_ABAN = 0.50;
    const BMRK_INT = 0.05;

    // Factores Fijos (Sección 2)
    const HRS_ACT_DIA = 0.5;
    const HRS_REPR_F = 2;

    // === DEFAULTS Recuperación (Sección 3) ===
    const CARTERA_ACTIVA = 500000;
    const MORA_PCT = 0.10;   // 10%
    const TASA_REC = 0.60;   // 60%
    const COSTO_COB = 2000;
    // const MANUAL_PAG = 0.70; // 70%
    const ERROR_PAG = 0.05;  // 5%
    // const PROVISION_PCT = 0.03; // 3%

    // Benchmarks Recuperación (Sección 3)
    const MEJ_REC = 0.25;
    const MEJ_MORA = 0.30;
    const MEJ_COB = 0.45;
    const MEJ_ERR = 0.72;
    // const MEJ_CAST = 0.20;

    console.log("=== INTERMEDIAS COLOCACIÓN (Sección 4) ===");
    const CREDITOS_MES = SOL * CONV;
    console.log(`CREDITOS_MES = ${SOL} × ${CONV} = ${CREDITOS_MES}`);

    const T_TOTAL = T_APRO + T_DESEM;
    console.log(`T_TOTAL = ${T_APRO} + ${T_DESEM} = ${T_TOTAL}`);

    const COSTO_HORA = SALARIO / HORAS_MES;
    console.log(`COSTO_HORA = ${SALARIO} / ${HORAS_MES} = $${COSTO_HORA}`);

    const HRS_X_CREDITO = T_TOTAL * HRS_ACT_DIA;
    console.log(`HRS_X_CREDITO = ${T_TOTAL} × ${HRS_ACT_DIA} = ${HRS_X_CREDITO}`);

    const COSTO_X_CREDITO = HRS_X_CREDITO * COSTO_HORA;
    console.log(`COSTO_X_CREDITO = ${HRS_X_CREDITO} × ${COSTO_HORA} = $${COSTO_X_CREDITO}`);

    const PERDIDA_ABANDONO = SOL * ABAN * TICKET * BMRK_INT;
    console.log(`PERDIDA_ABANDONO = ${SOL} × ${ABAN} × ${TICKET} × ${BMRK_INT} = $${PERDIDA_ABANDONO}`);

    const COSTO_REPROCESOS = SOL * REPR * HRS_REPR_F * COSTO_HORA;
    console.log(`COSTO_REPROCESOS = ${SOL} × ${REPR} × ${HRS_REPR_F} × ${COSTO_HORA} = $${COSTO_REPROCESOS}`);

    const CAP_NUEVA = CREDITOS_MES / (1 - BMRK_TIEMPO);
    console.log(`CAP_NUEVA = ${CREDITOS_MES} / (1 - ${BMRK_TIEMPO}) = ${CAP_NUEVA}`);

    const CRED_ADD = CAP_NUEVA - CREDITOS_MES;
    console.log(`CRED_ADD = ${CAP_NUEVA} - ${CREDITOS_MES} = ${CRED_ADD}`);

    const COSTO_NUEVO = COSTO_X_CREDITO * (1 - BMRK_TIEMPO);
    console.log(`COSTO_NUEVO = ${COSTO_X_CREDITO} × (1 - ${BMRK_TIEMPO}) = $${COSTO_NUEVO}`);

    const DIAS_AHORRADOS = T_TOTAL * BMRK_TIEMPO;
    console.log(`DIAS_AHORRADOS = ${T_TOTAL} × ${BMRK_TIEMPO} = ${DIAS_AHORRADOS}`);

    console.log("\n=== ROI COLOCACIÓN (Sección 7) ===");
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
    console.log(`>>> ESPERADO según guide: ~$326,400`);
    console.log(`>>> DIFERENCIA: $${ROI_COLOCACION - 326400}`);

    console.log("\n=== INTERMEDIAS RECUPERACIÓN (Sección 5) ===");
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

    console.log("\n=== ROI RECUPERACIÓN (Sección 8) ===");
    const AHORRO_MORA = (PERDIDA_MORA - PERDIDA_MORA_NEW) * 12;
    console.log(`AHORRO_MORA = (${PERDIDA_MORA} - ${PERDIDA_MORA_NEW}) × 12 = $${AHORRO_MORA}`);

    const AHORRO_COB = (COSTO_COB - COSTO_COB_NEW) * 12;
    console.log(`AHORRO_COB = (${COSTO_COB} - ${COSTO_COB_NEW}) × 12 = $${AHORRO_COB}`);

    const AHORRO_ERR = (COSTO_ERROR_PAG_V - COSTO_ERROR_NEW) * 12;
    console.log(`AHORRO_ERR = (${COSTO_ERROR_PAG_V} - ${COSTO_ERROR_NEW}) × 12 = $${AHORRO_ERR}`);

    const ROI_RECUPERACION = AHORRO_MORA + AHORRO_COB + AHORRO_ERR;
    console.log(`ROI_RECUPERACION = $${AHORRO_MORA} + $${AHORRO_COB} + $${AHORRO_ERR} = $${ROI_RECUPERACION}`);

    console.log("\n=== ROI TOTAL (Sección 9) ===");
    const ROI_TOTAL = ROI_COLOCACION + ROI_RECUPERACION;
    console.log(`ROI_TOTAL = $${ROI_COLOCACION} + $${ROI_RECUPERACION} = $${ROI_TOTAL}`);
    console.log(`>>> ESPERADO: ROI_COLOCACION ~$326,400 + ROI_RECUPERACION`);

    // Tarjetas visibles Colocación (Sección 7)
    console.log("\n=== TARJETAS COLOCACIÓN (Guide Sección 7) ===");
    console.log(`Pérdida por abandonos/mes = $${PERDIDA_ABANDONO} (hardcodeado original: $24,000)`);
    console.log(`Costo por reprocesos/mes = $${COSTO_REPROCESOS} (hardcodeado original: $3,200)`);
    console.log(`Créditos adicionales/mes = +${CRED_ADD} (hardcodeado original: +112)`);
    console.log(`Días ahorrados/crédito = ${DIAS_AHORRADOS} (hardcodeado original: 5)`);

    // Tarjetas visibles Recuperación (Sección 8)
    console.log("\n=== TARJETAS RECUPERACIÓN (Guide Sección 8) ===");
    console.log(`Pérdida mora no recuperada/mes = $${PERDIDA_MORA} (hardcodeado original: $20,000)`);
    console.log(`Costo cobranza/mes = $${COSTO_COB} (hardcodeado original: $2,000)`);
    console.log(`Recuperación adicional/mes = $${PERDIDA_MORA - PERDIDA_MORA_NEW} (hardcodeado: $7,500)`);
    console.log(`Ahorro cobranza+errores/mes = $${(COSTO_COB - COSTO_COB_NEW) + (COSTO_ERROR_PAG_V - COSTO_ERROR_NEW)} (hardcodeado: $1,100)`);

}

validate();
