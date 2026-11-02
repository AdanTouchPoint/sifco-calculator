# Guardado de respuestas de ROI con n8n y Google Sheets

Este documento describe cómo recibir desde la calculadora las respuestas, los datos del formulario y los resultados del ROI, y registrar cada envío en una hoja maestra de Google Sheets.

## Qué envía la aplicación

La aplicación llama al webhook únicamente después de que el correo pasa la validación. Si el usuario cierra/omite el formulario, no se guarda ningún registro.

El webhook recibe una petición `POST` con contenido `text/plain;charset=UTF-8`. El cuerpo contiene directamente el JSON con esta estructura, sin una propiedad externa llamada `payload`:

```json
{
  "schemaVersion": 1,
  "submissionId": "identificador-unico-del-envio",
  "submittedAt": "2026-10-29T12:34:56.000Z",
  "source": "sifco-roi-calculator",
  "contact": {
    "firstName": "Nombre",
    "lastName": "Apellido",
    "email": "persona@empresa.com",
    "contactPreference": "Sí, quiero más información sobre las soluciones",
    "areaCode": "🇬🇹 Guatemala (+502)",
    "phone": "55555555",
    "implementationDeadline": "Próximo bimestre: Requerido entre este y el siguiente mes.",
    "marketingConsent": true
  },
  "answers": {
    "solicitudesMes": 150,
    "porcentajeAprobado": 40
  },
  "results": {
    "ROI_COLOCACION": 1000,
    "ROI_RECUPERACION": 2000,
    "ROI_TOTAL": 3000
  }
}
```

`answers` incluye todos los campos numéricos de los ocho pasos y `results` incluye todos los valores calculados, no solo los ejemplos abreviados de arriba. Si la persona no desea ser contactada, los campos de teléfono, código de área y plazo se envían como `null`.

## Usar el workflow exportable

En este repositorio están los archivos:

- `sifco-roi-n8n-workflow.json`: workflow listo para importar. Usa el mismo path de webhook que la app (`fe596c52-1b0c-4c7a-b101-0e9e2ba509be`).
- `sifco-roi-google-sheets-headers.csv`: encabezados que necesita la pestaña.

En n8n, usa **Workflows → Import from File** y selecciona el JSON. Antes de activar el workflow:

1. Crea una hoja de cálculo y una pestaña llamada `Respuestas ROI`.
2. Importa el CSV de encabezados en la primera fila de esa pestaña.
3. En el nodo **Google Sheets - Upsert por submissionId**, selecciona tus credenciales de Google y reemplaza `REEMPLAZAR_CON_ID_DE_GOOGLE_SHEETS` por el ID de la hoja. El ID está en la URL entre `/d/` y `/edit`. El nodo usa `Auto-map input data` y `Column to match on = submissionId`.
4. Si ya existe otro workflow activo con el mismo path, desactívalo antes de activar este para evitar una colisión de webhook.
5. Para pruebas, selecciona **Listen for test event** y usa la Test URL. Para producción, activa/publica este workflow y usa la Production URL.
6. Si ya importaste una versión anterior, desactívala y vuelve a importar este JSON. El nodo **Validar body JSON directo y aplanar** lee el JSON de `body` y no usa el campo `payload`.

No exporté credenciales: n8n las conserva aparte y debes elegirlas después de importar.

El JSON exportable permite cualquier origen (`*`) en CORS para facilitar la prueba inicial. Antes de producción, reemplaza ese valor por el origen exacto de la calculadora en las opciones CORS del nodo Webhook ROI y en los encabezados de ambos nodos Respond. Esto controla qué sitios pueden leer la respuesta desde el navegador; no sustituye validación ni protección contra abuso del webhook.

## Crear el workflow manualmente

### 1. Webhook

- Añade un nodo **Webhook**.
- **HTTP Method:** `POST`.
- **Path:** por ejemplo `sifco-roi-respuestas`.
- **Respond:** `Using Respond to Webhook Node`.
- Usa la **Test URL** mientras el workflow está en modo de prueba y la **Production URL** cuando esté activo.
- El frontend envía el JSON directamente en el cuerpo como `text/plain;charset=UTF-8`. Así evita el preflight `OPTIONS`; el nodo Webhook puede entregar `body` como texto JSON u objeto, según su configuración. El Code node procesa ambas formas directamente.

### 2. Code: validar y aplanar el registro

Conecta un nodo **Code** en modo **Run Once for All Items** después del Webhook. El cuerpo debe ser el objeto JSON directo (o el texto JSON directo), no un objeto con otro campo `payload`. El código convierte la entrada en una fila plana:

```javascript
const request = $input.first().json;
const body = request.body;
const submission = typeof body === 'string' ? JSON.parse(body) : body;

if (
  !submission ||
  typeof submission !== 'object' ||
  submission.schemaVersion !== 1 ||
  typeof submission.submissionId !== 'string' ||
  typeof submission.submittedAt !== 'string' ||
  typeof submission.contact?.email !== 'string' ||
  !submission.answers ||
  !submission.results
) {
  throw new Error('El body no contiene una solicitud SIFCO ROI válida');
}

const row = {
  schemaVersion: submission.schemaVersion,
  submissionId: submission.submissionId,
  submittedAt: submission.submittedAt,
  receivedAt: new Date().toISOString(),
  source: submission.source ?? 'sifco-roi-calculator',
  contact_firstName: submission.contact.firstName ?? '',
  contact_lastName: submission.contact.lastName ?? '',
  contact_email: submission.contact.email,
  contact_contactPreference: submission.contact.contactPreference ?? '',
  contact_areaCode: submission.contact.areaCode ?? '',
  contact_phone: submission.contact.phone ?? '',
  contact_implementationDeadline: submission.contact.implementationDeadline ?? '',
  contact_marketingConsent: submission.contact.marketingConsent === true,
};

for (const [key, value] of Object.entries(submission.answers)) {
  row[`answer_${key}`] = value;
}

for (const [key, value] of Object.entries(submission.results)) {
  row[`result_${key}`] = value;
}

return [{ json: row }];
```

### 3. Google Sheets: guardar una fila por cálculo

- Crea una hoja de cálculo en Drive y una pestaña, por ejemplo `Respuestas ROI`.
- Conecta Google Sheets con las credenciales de Google desde n8n; no pongas credenciales de Drive en el frontend.
- Añade un nodo **Google Sheets** después del Code.
- Elige la hoja y la operación **Append or Update Row** (en algunas versiones aparece traducida como “Append or Update”).
- Configura **Column to match on** como `submissionId` y el mapeo de columnas como **Map Automatically**.
- Crea la fila de encabezados usando las claves de `row` del Code: campos generales y `contact_*`, además de `answer_*` y `result_*`.

El identificador se conserva durante los reintentos de un mismo formulario. Al hacer coincidir por `submissionId`, un reintento actualiza ese envío en lugar de agregar un duplicado; una nueva ejecución de la calculadora recibe un ID diferente y crea otra fila.

El nodo exportado usa Google Sheets `typeVersion: 3`, con `columnToMatchOn: submissionId`; no usa `columns.matchingColumns`.

### 4. Respond to Webhook

Conecta **Respond to Webhook** después de Google Sheets:

- **Respond With:** `JSON`.
- Cuerpo de éxito: `{"success": true}`.
- Estado HTTP: `200`.
- En **Response Headers**, incluye `Content-Type: application/json` y `Access-Control-Allow-Origin` con el origen exacto de la aplicación web. Para desarrollo local, permite también `http://localhost:5173` según la configuración de n8n; no uses `*` en producción si puedes restringirlo al dominio publicado.

La aplicación solo avanza al dashboard si recibe HTTP exitoso y JSON con `success: true`. Si Google Sheets falla, configura una rama/error workflow que responda con estado HTTP `500` y `{"success": false}`; así el usuario podrá reintentar desde el formulario.

## Configurar la aplicación

1. Para desarrollo local, la URL está en `.env.development.local`; reinicia Vite después de cambiarla.
2. La URL activa de producción está en `.env.production`, que Vite incorpora automáticamente al generar el build. También se puede configurar `VITE_N8N_ROI_WEBHOOK_URL` en el hosting para sobrescribirla.
3. Si se configura la URL manualmente, usa la Production URL del Webhook:

   ```dotenv
   VITE_N8N_ROI_WEBHOOK_URL=https://tu-instancia-n8n/webhook/sifco-roi-respuestas
   ```

4. En el hosting, configura la variable antes de compilar/desplegar solo si prefieres administrar la URL desde la plataforma.
5. Vuelve a generar y desplegar el build después de cambiar la URL.

Las variables `VITE_*` quedan visibles en el navegador. La URL del webhook no es una contraseña: valida los datos en n8n y aplica controles contra abuso. Mantén las credenciales de Google únicamente en las credenciales de n8n.

## Prueba de extremo a extremo

1. Activa el workflow y confirma que el nodo Webhook muestra la Production URL.
2. Coloca esa URL en `.env.local` y arranca de nuevo la aplicación.
3. Completa los ocho pasos y el formulario con un correo empresarial válido.
4. Comprueba que aparece una fila en `Respuestas ROI` con contacto, respuestas y ROI.
5. Reintenta un envío fallido y confirma que el mismo `submissionId` no crea una segunda fila.
6. Prueba una nueva ejecución y confirma que sí agrega una nueva fila.
7. Omite el formulario y confirma que no se llama al webhook.

La hoja maestra se puede descargar desde Google Sheets como Excel `.xlsx` o CSV.

## Error “El body no contiene JSON SIFCO válido”

Ese mensaje indica que el Code node no recibió un objeto JSON SIFCO en `body`. Verifica que la solicitud use `Content-Type: text/plain;charset=UTF-8` y que el body sea el JSON serializado directamente (las claves y los valores de texto deben conservar comillas). Desactiva el workflow anterior e importa el JSON actualizado antes de volver a ejecutar el webhook de prueba; cada activación de la Test URL acepta una sola llamada.
