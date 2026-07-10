**Calculadora ROI — B1Lending**

**Fórmulas y Variables de Cálculo v3.0**

Módulo Colocación \+ Módulo Recuperación — Abril 2026

# **1\. Leyenda de tipos de variable**

Cada variable en este documento está clasificada con un código de color. El mismo color aparece en todas las tablas para facilitar la lectura.

| Código | Tipo | Descripción |
| :---- | :---- | :---- |
| **\[C\]** | **Dato del CLIENTE** | Ingresado por el usuario en el wizard |
| **\[B\]** | **BENCHMARK B1Lending** | Extraído de la BD real de clientes (benchmarks validados) |
| **\[F\]** | **Factor FIJO** | Supuesto estándar acordado internamente |
| **\[I\]** | **Variable INTERMEDIA** | Calculada internamente, no se muestra al usuario |
| **\[R\]** | **RESULTADO FINAL** | Indicador visible en la pantalla de resultados |

# **2\. Variables de entrada — Módulo Colocación**

Los valores por defecto están pre-cargados en el HTML y el usuario puede ajustarlos.

**Variables del cliente \[C\] — Colocación**

| Variable | Descripción | Tipo | Bloque | Default en HTML |
| :---- | :---- | :---- | :---- | :---- |
| SOL | Solicitudes de crédito al mes | **\[C\]** | Bloque 1 | 400 |
| CONV | % conversión (sol. → aprobados) | **\[C\]** | Bloque 1 | 40% |
| TICKET | Monto promedio del crédito ($) | **\[C\]** | Bloque 1 | $5,000 |
| T\_APRO | Tiempo de aprobación (días hábiles) | **\[C\]** | Bloque 2 | 5 días |
| T\_DESEM | Tiempo adicional hasta desembolso (días) | **\[C\]** | Bloque 2 | 3 días |
| ANALISTAS | Número de analistas de crédito | **\[C\]** | Bloque 3 | 6 |
| SALARIO | Salario mensual promedio por analista ($) | **\[C\]** | Bloque 3 | $800 |
| HORAS\_MES | Horas laborales al mes por analista | **\[C\]** | Bloque 3 | 160 h |
| ABAN | % de clientes que abandonan el proceso | **\[C\]** | Bloque 4 | 20% |
| REPR | % de solicitudes con errores/reprocesos | **\[C\]** | Bloque 4 | 25% |
| MANUAL | % del proceso que es manual | **\[C\]** | Bloque 5 | 70% |
| SISTEMAS | Número de sistemas/herramientas usados | **\[C\]** | Bloque 5 | 2–3 sistemas |

**Benchmarks B1Lending \[B\] — Colocación**

| Variable | Descripción | Tipo | Valor / Notas |
| :---- | :---- | :---- | :---- |
| BMRK\_TIEMPO | % reducción en tiempo con B1Lending | **\[B\]** | 60% — benchmark BD clientes |
| BMRK\_REPR | % reducción en reprocesos con B1Lending | **\[B\]** | 60% — benchmark BD clientes |
| BMRK\_ABAN | % reducción en abandono con B1Lending | **\[B\]** | 50% — benchmark BD clientes |
| BMRK\_INT | % de ingreso por crédito (interés/comisión) | **\[B\]** | 5% del ticket — dato financiero propio |

**Factores fijos \[F\] — Colocación**

| Variable | Descripción | Tipo | Valor |
| :---- | :---- | :---- | :---- |
| HRS\_ACT\_DIA | Horas activas de analista por crédito/día | **\[F\]** | 0.5 h |
| HRS\_REPR | Horas extra por solicitud con error | **\[F\]** | 2 h |
| MESES\_AÑO | Meses en el año | **\[F\]** | 12 |

# **3\. Variables de entrada — Módulo Recuperación**

Nuevo en v3.0. Capturadas en los Bloques 6, 7 y 8 del wizard.

**Variables del cliente \[C\] — Recuperación**

| Variable | Descripción | Tipo | Bloque | Default en HTML |
| :---- | :---- | :---- | :---- | :---- |
| CARTERA\_ACTIVA | Saldo total de cartera vigente ($) | **\[C\]** | Bloque 6 | $500,000 |
| MORA\_PCT | % de cartera en mora (NPL) | **\[C\]** | Bloque 6 | 10% |
| DIAS\_MORA | Días promedio de atraso en cartera mora | **\[C\]** | Bloque 6 | 45 días |
| TASA\_REC | % de recuperación en cartera mora | **\[C\]** | Bloque 7 | 60% |
| COSTO\_COB | Costo mensual del área de cobranza ($) | **\[C\]** | Bloque 7 | $2,000 |
| MANUAL\_COB | % de gestiones de cobranza manuales | **\[C\]** | Bloque 7 | 75% |
| MANUAL\_PAG | % de pagos registrados manualmente | **\[C\]** | Bloque 8 | 70% |
| ERROR\_PAG | % de pagos con error en su aplicación | **\[C\]** | Bloque 8 | 5% |
| PROVISION\_PCT | % de cartera castigada / write-off anual | **\[C\]** | Bloque 8 | 3% |

**Benchmarks B1Lending \[B\] — Recuperación**

| Variable | Descripción | Tipo | Valor / Fuente |
| :---- | :---- | :---- | :---- |
| MEJ\_REC | Mejora en tasa de recuperación con B1Lending | **\[B\]** | \+25% — benchmark cobranza digital |
| MEJ\_MORA | Reducción de cartera en mora (NPL) | **\[B\]** | \-30% — alertas tempranas y gestión preventiva |
| MEJ\_COB | Reducción en costo de cobranza | **\[B\]** | \-45% — automatización de gestiones |
| MEJ\_ERR | Reducción de errores en registro de pagos | **\[B\]** | \-72% — conciliación automática |
| MEJ\_CAST | Reducción en write-off / castigo de cartera | **\[B\]** | \-20% — gestión preventiva de mora |

# **4\. Variables intermedias — Módulo Colocación**

| Variable | Fórmula | Tipo | Descripción |
| :---- | :---- | :---- | :---- |
| CREDITOS\_MES | SOL × CONV | **\[I\]** | Créditos aprobados por mes |
| T\_TOTAL | T\_APRO \+ T\_DESEM | **\[I\]** | Tiempo total end-to-end en días hábiles |
| COSTO\_HORA | SALARIO ÷ HORAS\_MES | **\[I\]** | Costo por hora de un analista ($) |
| HRS\_X\_CREDITO | T\_TOTAL × HRS\_ACT\_DIA | **\[I\]** | Horas invertidas por crédito |
| COSTO\_X\_CREDITO | HRS\_X\_CREDITO × COSTO\_HORA | **\[I\]** | Costo operativo actual por crédito |
| PERDIDA\_ABANDONO | SOL × ABAN × TICKET × BMRK\_INT | **\[I\]** | Ingresos perdidos por clientes que se van |
| COSTO\_REPROCESOS | SOL × REPR × HRS\_REPR × COSTO\_HORA | **\[I\]** | Costo en tiempo de analistas por retrabajos |
| CAP\_NUEVA | CREDITOS\_MES ÷ (1 − BMRK\_TIEMPO) | **\[I\]** | Capacidad posible con B1Lending |
| CRED\_ADD | CAP\_NUEVA − CREDITOS\_MES | **\[I\]** | Créditos adicionales por mes |
| COSTO\_NUEVO | COSTO\_X\_CREDITO × (1 − BMRK\_TIEMPO) | **\[I\]** | Costo operativo con B1Lending |

# **5\. Variables intermedias — Módulo Recuperación**

| Variable | Fórmula | Tipo | Descripción |
| :---- | :---- | :---- | :---- |
| CARTERA\_MORA | CARTERA\_ACTIVA × MORA\_PCT | **\[I\]** | Monto total de cartera en mora ($) |
| PERDIDA\_MORA | CARTERA\_MORA × (1 − TASA\_REC) | **\[I\]** | Pérdida mensual por mora no recuperada ($) |
| COSTO\_ERROR\_PAG | CARTERA\_ACTIVA × ERROR\_PAG × 0.01 | **\[I\]** | Costo mensual por errores en registro de pagos |
| CASTIGO\_MENS | CARTERA\_ACTIVA × PROVISION\_PCT ÷ 12 | **\[I\]** | Castigo / provision mensual estimado |
| TASA\_REC\_NEW | MIN(TASA\_REC × (1 \+ MEJ\_REC), 0.98) | **\[I\]** | Tasa de recuperación con B1Lending |
| MORA\_PCT\_NEW | MORA\_PCT × (1 − MEJ\_MORA) | **\[I\]** | % NPL con B1Lending |
| CARTERA\_MORA\_NEW | CARTERA\_ACTIVA × MORA\_PCT\_NEW | **\[I\]** | Cartera en mora con B1Lending |
| PERDIDA\_MORA\_NEW | CARTERA\_MORA\_NEW × (1 − TASA\_REC\_NEW) | **\[I\]** | Pérdida mora con B1Lending |
| COSTO\_COB\_NEW | COSTO\_COB × (1 − MEJ\_COB) | **\[I\]** | Costo cobranza con B1Lending |
| COSTO\_ERROR\_NEW | COSTO\_ERROR\_PAG × (1 − MEJ\_ERR) | **\[I\]** | Costo errores pagos con B1Lending |

# **6\. Indicadores de diagnóstico (Semáforo)**

Se muestran como badges de color en la pantalla de resultados.

## **Módulo Colocación**

| Indicador | Lógica | Tipo | Notas |
| :---- | :---- | :---- | :---- |
| Eficiencia operativa | Si T\_TOTAL\>10 o REPR\>30% o ABAN\>25% \-\> BajaSi T\_TOTAL\>5 o REPR\>15% o ABAN\>15% \-\> MediaSi no \-\> Alta | **\[R\]** | Solo usa datos \[C\] |
| Riesgo operativo | Si SISTEMAS=4+ \-\> AltoSi SISTEMAS=2-3 \-\> MedioSi SISTEMAS=1 \-\> Bajo | **\[R\]** | Más sistemas \= más fricción |
| Potencial automatización | Si MANUAL\>60% \-\> AltoSi MANUAL\>30% \-\> MedioSi no \-\> Bajo | **\[R\]** | Mayor manual \= mayor potencial |

## **Módulo Recuperación**

| Indicador | Lógica | Tipo | Notas |
| :---- | :---- | :---- | :---- |
| Índice de Morosidad | Si MORA\_PCT\>20% \-\> AltoSi MORA\_PCT\>10% \-\> MedioSi no \-\> Bajo | **\[R\]** | Rojo si \> 20% NPL |
| Eficiencia de Cobranza | Si TASA\_REC\<50% \-\> BajaSi TASA\_REC\<70% \-\> MediaSi no \-\> Alta | **\[R\]** | Rojo si recupera menos del 50% |
| Riesgo Registro de Pagos | Si ERROR\_PAG\>10% o MANUAL\_PAG\>80% \-\> AltoSi ERROR\_PAG\>5% o MANUAL\_PAG\>50% \-\> MedioSi no \-\> Bajo | **\[R\]** | Combina error y manual |

# **7\. Resultados visibles — Módulo Colocación**

## **Tarjetas de pérdida / oportunidad**

| Indicador \[R\] | Fórmula | Tipo | Descripción |
| :---- | :---- | :---- | :---- |
| Pérdida por abandonos/mes | SOL × ABAN × TICKET × BMRK\_INT | **\[R\]** | Ingresos no generados por clientes que se fueron |
| Costo por reprocesos/mes | SOL × REPR × HRS\_REPR × COSTO\_HORA | **\[R\]** | Costo de retrabajos de analistas |
| Créditos adicionales/mes | CAP\_NUEVA − CREDITOS\_MES | **\[R\]** | Con mismo equipo y proceso optimizado |
| Días ahorrados/crédito | T\_TOTAL × BMRK\_TIEMPO | **\[R\]** | Reducción en tiempo de proceso |

## **Tabla comparativa Colocación**

| Métrica | Hoy | Con B1Lending | Mejora |
| :---- | :---- | :---- | :---- |
| Tiempo de aprobación | T\_APRO | T\_APRO × (1 − BMRK\_TIEMPO) | − BMRK\_TIEMPO% |
| Tiempo total hasta desembolso | T\_TOTAL | T\_TOTAL × (1 − BMRK\_TIEMPO) | − DIAS\_AHORRADOS |
| Créditos procesados/mes | CREDITOS\_MES | CAP\_NUEVA | \+CRED\_ADD |
| Costo operativo/crédito | COSTO\_X\_CREDITO | COSTO\_NUEVO | − BMRK\_TIEMPO% |
| % Reprocesos | REPR | REPR × (1 − BMRK\_REPR) | − BMRK\_REPR% |
| % Abandono | ABAN | ABAN × (1 − BMRK\_ABAN) | − BMRK\_ABAN% |

## **ROI Colocación anual**

| Variable | Fórmula | Tipo | Notas |
| :---- | :---- | :---- | :---- |
| ROI\_COLOCACION | ((COSTO\_X\_CREDITO − COSTO\_NUEVO) × CREDITOS\_MES \+ PERDIDA\_ABANDONO × BMRK\_ABAN \+ COSTO\_REPROCESOS × BMRK\_REPR) × 12 | **\[R\]** | Proyección a 12 meses |

# **8\. Resultados visibles — Módulo Recuperación**

## **Tarjetas de pérdida / oportunidad**

| Indicador \[R\] | Fórmula | Tipo | Descripción |
| :---- | :---- | :---- | :---- |
| Pérdida por mora no recuperada/mes | CARTERA\_MORA × (1 − TASA\_REC) | **\[R\]** | Monto que no se recupera con proceso actual |
| Costo de cobranza/mes | COSTO\_COB | **\[R\]** | Gasto mensual del área de cobranza |
| Recuperación adicional posible/mes | PERDIDA\_MORA − PERDIDA\_MORA\_NEW | **\[R\]** | Mejora en recuperación con B1Lending |
| Ahorro en cobranza y errores/mes | (COSTO\_COB − COSTO\_COB\_NEW) \+ (COSTO\_ERROR\_PAG − COSTO\_ERROR\_NEW) | **\[R\]** | Reducción en costos operativos de recuperación |

## **Tabla comparativa Recuperación**

| Métrica | Hoy | Con B1Lending | Mejora |
| :---- | :---- | :---- | :---- |
| Cartera en mora (NPL) | MORA\_PCT | MORA\_PCT\_NEW | − MEJ\_MORA% |
| Tasa de recuperación | TASA\_REC | TASA\_REC\_NEW | \+MEJ\_REC% |
| Costo de cobranza/mes | COSTO\_COB | COSTO\_COB\_NEW | − MEJ\_COB% |
| Errores en registro pagos | ERROR\_PAG | ERROR\_PAG × (1−MEJ\_ERR) | − MEJ\_ERR% |
| Write-off anual | PROVISION\_PCT | PROVISION\_PCT × (1−MEJ\_CAST) | − MEJ\_CAST% |

## **ROI Recuperación anual**

| Variable | Fórmula | Tipo | Notas |
| :---- | :---- | :---- | :---- |
| AHORRO\_MORA | (PERDIDA\_MORA − PERDIDA\_MORA\_NEW) × 12 | **\[I\]** | Ahorro anual por mejora en recuperación |
| AHORRO\_COB | (COSTO\_COB − COSTO\_COB\_NEW) × 12 | **\[I\]** | Ahorro anual en costos de cobranza |
| AHORRO\_ERR | (COSTO\_ERROR\_PAG − COSTO\_ERROR\_NEW) × 12 | **\[I\]** | Ahorro anual por eliminación de errores |
| ROI\_RECUPERACION | AHORRO\_MORA \+ AHORRO\_COB \+ AHORRO\_ERR | **\[R\]** | ROI total de recuperación (anual) |

# **9\. ROI Total — Combinado**

| Variable | Fórmula | Tipo | Descripción |
| :---- | :---- | :---- | :---- |
| ROI\_COLOCACION | Ver sección 7 | **\[R\]** | Impacto anual del módulo de colocación |
| ROI\_RECUPERACION | Ver sección 8 | **\[R\]** | Impacto anual del módulo de recuperación |
| ROI\_TOTAL | ROI\_COLOCACION \+ ROI\_RECUPERACION | **\[R\]** | Oportunidad de crecimiento anual total estimada |

El ROI\_TOTAL es el número grande que se muestra en el banner final de la calculadora. Representa la suma del ahorro e ingresos adicionales que B1Lending puede generar en los procesos de colocación y recuperación de cartera en 12 meses.

## **Proyección de ejemplo (valores por defecto)**

| Módulo | ROI Anual Estimado | Componentes principales |
| :---- | :---- | :---- |
| Colocación | \~$326,400 USD | Ahorros operativos \+ ingresos recuperados por menor abandono |
| Recuperación | Variable según cartera | Reducción mora \+ ahorro cobranza \+ eliminación errores pagos |
| TOTAL | ROI\_COLOCACION \+ ROI\_RECUPERACION | Banner principal de la calculadora |

