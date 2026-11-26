# SIFCO ROI — infoDev

Documentación técnica y de estado del proyecto para la Calculadora de ROI de SIFCO/B1Lending.

## 1. Estado actual (resumen ejecutivo)

- **Versión:** activa en rama `master` del repositorio `AdanTouchPoint/sifco-calculator`.
- **Último commit relevante:** `integrate MailerLite lead form` (sustituye el formulario React por el embed oficial de MailerLite, account `2500316`, form `JWNBqM`).
- **Stack:** Vite 8 + TypeScript 6 + React 19, estado con Zustand 5, sin Tailwind ni librerías de UI externas.
- **PDF:** generado con `window.print()` (sin librería).
- **Captura de leads:** formulario MailerLite embebido (no backend propio).
- **Cobertura de pruebas:** `test-parity.ts` valida los cálculos contra `caUpdate.html` (12 casos).
- **Pendientes conocidos:** discrepancias entre `guide-calc.md` y `calculations.ts`, `numAnalistas` es campo muerto, comentario del store desactualizado sobre el wizard.

## 2. Estructura del proyecto

```
.
├── index.html                       # Entry HTML (carga main.tsx)
├── package.json                     # Scripts: dev / build / lint / preview
├── src/
│   ├── main.tsx                     # Bootstrap React
│   ├── App.tsx                      # Router por currentStep
│   ├── index.css                    # Estilos globales
│   ├── guide-calc.md                # Especificación funcional (referencia)
│   ├── lib/
│   │   ├── useCalculatorStore.ts    # Store Zustand (estado + navegación)
│   │   ├── calculations.ts          # Función pura calculateROI(state)
│   │   └── generatePDF.ts           # Genera PDF vía window.print()
│   ├── components/
│   │   ├── Welcome.tsx              # Paso 0 (incluye HowItWorks)
│   │   ├── HowItWorks.tsx           # Sección 3 bloques (dentro de Welcome)
│   │   ├── StepOne.tsx .. StepEight.tsx  # Pasos 1–8 del wizard
│   │   ├── LeadForm.tsx             # Paso 9 — MailerLite embed
│   │   ├── Resultados.tsx           # Paso 10 — Dashboard final
│   │   ├── ColocacionScreen.tsx     # Bloque colocación dentro de Resultados
│   │   ├── RecuperacionScreen.tsx   # Bloque recuperación dentro de Resultados
│   │   └── *.css                    # Estilos por componente
│   ├── test-parity.ts               # Pruebas de paridad con caUpdate.html
│   └── validate-calcs.ts            # Validación rápida de cálculos
└── caUpdate.html                    # HTML legacy de referencia (no usado en la app)
```

## 3. Cómo funciona la calculadora

### 3.1 Flujo del usuario (wizard por pasos)

| Paso | Componente          | Bloque lógico                                  |
|------|---------------------|-----------------------------------------------|
| 0    | `Welcome`           | Portada + explicación (incluye `HowItWorks`)  |
| 1    | `LeadForm`          | Formulario de contacto (botón Comenzar, MailerLite) |
| 2    | `StepOne`           | Volumen (solicitudes, aprobación, ticket)     |
| 3    | `StepTwo`           | Tiempos (aprobación, desembolso)              |
| 4    | `StepThree`         | Equipo (analistas, salario, horas)            |
| 5    | `StepFour`          | Ineficiencias (abandono, reprocesos)          |
| 6    | `StepFive`          | Automatización (% manual, sistemas)           |
| 7    | `StepSix`           | Cartera (saldo, mora NPL, días atraso)        |
| 8    | `StepSeven`         | Cobranza (recuperación, costo, % manual)      |
| 9    | `StepEight`         | Pagos (% manual, errores, write-off); "Generar Diagnóstico" envía a n8n |
| 10   | `Resultados`        | Dashboard con Colocación + Recuperación       |

`App.tsx` decide qué componente renderizar leyendo `currentStep` del store; no usa React Router. El ✕ y "cerrar esta ventana" del formulario ejecutan `resetCalculator()`, que limpia todo y regresa a la portada (paso `0`). "Recalcular" hace lo mismo.

### 3.2 Cálculo del ROI

`src/lib/calculations.ts` exporta `calculateROI(state: CalculatorState): CalculationResults`. Es una función pura que devuelve 35 campos (23 numéricos + 6 indicadores semáforo + 6 subresultados).

Constantes benchmark vigentes en el código (`calculations.ts:4-16`):

- Colocación: `BMRK_TIEMPO=0.60`, `BMRK_REPR=0.60`, `BMRK_ABAN=0.35`, `BMRK_INT=0.28`, `HRS_ACT_DIA=0.75`, `HRS_REPR=3.5`, `MESES_ANO=12`.
- Recuperación: `MEJ_REC=0.25`, `MEJ_MORA=0.30`, `MEJ_COB=0.35`, `MEJ_ERR=0.65`, `MEJ_CAST=0.20`.

Fórmulas clave:

- `ROI_COLOCACION = ((COSTO_X_CREDITO - COSTO_NUEVO) * CREDITOS_MES + PERDIDA_ABANDONO * BMRK_ABAN + COSTO_REPROCESOS * BMRK_REPR) * 12` (`calculations.ts:123`).
- `ROI_RECUPERACION = AHORRO_MORA + AHORRO_COB + AHORRO_ERR` (cada ahorro ya anualizado) (`calculations.ts:162`).
- `ROI_TOTAL = ROI_COLOCACION + ROI_RECUPERACION` (`calculations.ts:164`).

Indicadores semáforo (alto / medio / bajo) se calculan con umbrales fijos sobre el estado, por ejemplo: `T_TOTAL > 10` o `REPR > 0.30` → eficiencia baja; `MORA_PCT > 0.20` → morosidad alta; `ERROR_PAG > 0.10` → riesgo de pagos alto.

### 3.3 Generación de PDF

`src/lib/generatePDF.ts` cambia temporalmente `document.title` a `<empresa>-reporte-roi` y llama `window.print()`. El navegador usa el nombre para sugerir el archivo al guardar como PDF. No se renderiza DOM oculto adicional; se imprime lo que el usuario ve en la pantalla de Resultados.

### 3.4 Captura de leads con MailerLite

- `LeadForm` (paso 1) se muestra antes de la primera pregunta. Al pulsar **Comenzar**:
  1. Valida el correo con el validador de n8n (`email-phone-validator`).
  2. Envía los datos a MailerLite (`subscribe`, cuenta `2500316`, form `195092090283099181`). Si el correo ya se envió en esta visita (`leadSentEmail`), no se repite.
  3. Guarda los datos en el store (`lead`), crea el `submissionId` si no existe y avanza al paso 2.
- Los datos de contacto no se envían a n8n en este punto. Viajan en el JSON final (`contact`) al pulsar **Generar Diagnóstico** en `StepEight.tsx`, mediante `buildCalculatorSubmissionPayload` y `saveCalculatorSubmission`.
- Si ese envío falla, se registra en consola y se avanza igual a `Resultados`.
- El tracking de MailerLite (`takel`) se dispara al montar el formulario solo si aún no se envió un correo en la visita.
- El botón "Descargar PDF" en `Resultados` ya no tiene bloqueo: el lead se captura antes del diagnóstico.

### 3.5 Tráfico de campañas META (salta el formulario)

- Al cargar, `src/lib/trafficSource.ts` lee `utm_source` de la URL. Si vale `meta`, `facebook`, `instagram`, `fb` o `ig` (sin distinguir mayúsculas), el canal es `meta`; en cualquier otro caso es `directo`. Ejemplo de URL de anuncio: `https://<dominio>/?utm_source=meta&utm_campaign=<campaña>`.
- El canal vive en el store (`channel`) y `resetCalculator` no lo modifica, así que "Recalcular" mantiene el comportamiento META.
- En `useCalculatorStore.ts`, para `meta` no se muestran ni la portada (paso 0) ni el `LeadForm` (paso 1): la app inicia directo en el paso 2 (primera pregunta) y "Recalcular" regresa ahí. Desde el paso 2 no se puede retroceder (`prevStep` no baja del paso inicial) y `StepOne` oculta el botón "Atrás".
- Como no hay formulario, el `submissionId` se crea en `StepEight` al pulsar "Generar Diagnóstico" (una sola vez; regenerar actualiza la misma fila).
- El payload a n8n incluye `channel`. Sin formulario, `contact.email` viaja vacío; el workflow lo acepta solo si `channel === 'meta'`. La hoja de Google Sheets necesita la columna `channel`.
- Los visitantes META no dejan correo en MailerLite ni en n8n.

## 4. Cómo hacer cambios comunes

### 4.1 Cambiar un valor por defecto

1. Abrir `src/lib/useCalculatorStore.ts:55-83`.
2. Modificar el valor dentro de `defaultState` o del objeto que devuelve `resetCalculator` (mantener ambos en sincronía).
3. Verificar con `npm run build` (incluye `tsc -b`) y, si aplica, actualizar los casos de `src/test-parity.ts`.

### 4.2 Ajustar una fórmula de ROI

1. Editar la fórmula en `src/lib/calculations.ts` (mantener la firma de `calculateROI` y la forma de `CalculationResults`).
2. Si cambia el conjunto de campos retornados, actualizar también:
   - Los selectores en `Resultados.tsx`, `ColocacionScreen.tsx`, `RecuperacionScreen.tsx`.
   - El script de paridad `src/test-parity.ts` (especialmente los esperados por caso).
3. Ejecutar `npx tsc -b` y `npx tsx src/test-parity.ts` (o el script de paridad) para confirmar la equivalencia con `caUpdate.html`.

### 4.3 Cambiar el orden, agregar o quitar un paso

1. Crear o mover el componente en `src/components/`.
2. Ajustar la tabla de render condicional en `src/App.tsx` (líneas 21–32) para el nuevo `currentStep`.
3. Actualizar el límite de `nextStep` en `useCalculatorStore.ts:95-97` si la numeración cambia.
4. Verificar que el progreso de la barra (porcentajes en cada `Step*.tsx`) siga sumando 100%.

### 4.4 Modificar el formulario de lead

- Cambiar de embed MailerLite: editar `LeadForm.tsx:22-27` (account y form) o reemplazar la lógica completa.
- Volver a un formulario React propio: eliminar el `useEffect` de MailerLite y el `MutationObserver`, restaurar el `<form>` con `handleSubmit` y los selectores `setEmail`/`setEmpresa` que están comentados en el store.

### 4.5 Cambiar el branding/estilos

- Estilos por componente: archivos `src/components/*.css` (sufijo `sifco-`).
- Estilos globales: `src/index.css` y `src/App.css`.
- Logo, íconos y assets: carpeta `public/`.

### 4.6 Cambiar la cuenta o el form de MailerLite

- En `LeadForm.tsx`, modificar la llamada `window.ml('account', '<ID>')` y el atributo `data-form="<ID>"`.
- Asegurar que el dominio del script siga siendo `https://assets.mailerlite.com/js/universal.js` (es la URL oficial).

## 5. Validaciones y reglas de entrada

No hay validación JavaScript explícita: la app se apoya en atributos HTML5 (`min`, `max`, `type="number"`), `e.preventDefault()` y los valores por defecto del store.

Restricciones por paso (tomadas de los `min`/`max` en los inputs):

| Paso | Campo                          | Rango      |
|------|--------------------------------|------------|
| 1    | `porcentajeAprobado`           | 0–100 %    |
| 2    | `tiempoAprobacion`             | 1–15 días  |
| 2    | `tiempoDesembolso`             | 0–10 días  |
| 3    | `horasLaboralesMes`            | 40–200 h   |
| 5    | `porcentajeManual`             | 0–100 %    |
| 5    | `sistemasActuales`             | ≥ 1        |
| 6    | `porcentajeMoraNPL`            | 0–50 %     |
| 6    | `diasAtrasoPromedio`           | 0–180      |
| 7    | `porcentajeRecuperacion`       | 0–100 %    |
| 7    | `porcentajeGestionesManuales`  | 0–100 %    |
| 8    | `porcentajePagosManuales`      | 0–100 %    |
| 8    | `porcentajeErroresAplicacion`  | 0–30 %     |
| 8    | `porcentajeWriteOffAnual`      | 0–20 %     |

Los botones "Siguiente" siempre navegan; si un valor está fuera de rango, el navegador lo recorta por sí solo.

## 6. Comandos de desarrollo

| Comando            | Descripción                                        |
|--------------------|----------------------------------------------------|
| `npm run dev`      | Servidor Vite con HMR                              |
| `npm run build`    | `tsc -b && vite build` (typecheck + build prod)    |
| `npm run lint`     | ESLint flat config (typescript-eslint + react-hooks + react-refresh) |
| `npm run preview`  | Sirve el build de producción localmente            |
| `npx tsc -b`       | Solo typecheck usando las referencias de `tsconfig.json` |
| `npx tsx src/test-parity.ts` | Ejecuta los 12 casos de paridad contra `caUpdate.html` |

## 7. Pendientes y hallazgos conocidos

1. **Discrepancias `guide-calc.md` vs `calculations.ts`** — los siguientes valores no coinciden con el código vigente (la fuente de verdad es el código, validado por `test-parity.ts`):
   - `BMRK_ABAN` (doc: 50 % / código: 0.35).
   - `HRS_ACT_DIA` (doc: 0.5 h / código: 0.75).
   - `HRS_REPR` (doc: 2 h / código: 3.5).
   - `MEJ_COB` (doc: 45 % / código: 0.35).
   - `MEJ_ERR` (doc: 72 % / código: 0.65).
2. **Comentario desactualizado en el store** — `useCalculatorStore.ts:4-7` menciona un paso "HowItWorks" y "Thank You" que no existen en el router real. `HowItWorks` vive dentro de `Welcome.tsx` y no hay pantalla de Thank You.
3. **`numAnalistas` es campo muerto** — se setea desde `StepThree.tsx:48` pero no se usa en `calculateROI` (línea comentada en `calculations.ts:70`). Considerar eliminar o documentar su uso.
4. **`nextStep` permite llegar a 11** — el límite superior no corresponde con ningún componente renderizado. Se puede reducir a `10` sin afectar el flujo.
5. **Sin validación JS** — depende exclusivamente de HTML5. Si se requiere lógica adicional, añadir validación en cada `Step*.tsx` antes de `nextStep`.
6. **PDF depende del navegador** — `window.print()` se ve afectado por los estilos de impresión. Revisar `print` rules en `Resultados.css` si se quiere ajustar el layout.
7. **MailerLite sin callback oficial** — la detección de éxito se hace observando el DOM (`MutationObserver`), no vía `ml('on', 'form:submitted', ...)`. Si MailerLite cambia su markup, hay que ajustar el selector en `LeadForm.tsx:39`.

## 8. Despliegue

- Salida del build: `dist/` (Vite).
- Configuración de base: usar `--base=/sifco-calculator/` (o el subpath del repo) si se sirve desde GitHub Pages.
- El script de MailerLite requiere HTTPS para funcionar correctamente.
