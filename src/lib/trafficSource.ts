// Canal de adquisición de la visita. El tráfico de campañas META (utm_source) se salta el
// formulario de contacto; el resto de visitas lo ve normalmente.
export type TrafficChannel = 'meta' | 'directo';

const META_SOURCES = new Set(['meta', 'facebook', 'instagram', 'fb', 'ig']);

// Se evalúa una sola vez al cargar la app: la URL no cambia durante la visita y el valor
// debe sobrevivir a "Recalcular" (resetCalculator).
export function detectTrafficChannel(search: string = globalThis.location?.search ?? ''): TrafficChannel {
    const utmSource = new URLSearchParams(search).get('utm_source')?.trim().toLowerCase() ?? '';
    return META_SOURCES.has(utmSource) ? 'meta' : 'directo';
}
