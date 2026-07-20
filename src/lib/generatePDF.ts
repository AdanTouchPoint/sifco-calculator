export async function generateResultadosPDF(empresa?: string): Promise<void> {
    // El navegador usa el título de la página como nombre por defecto del PDF.
    const originalTitle = document.title;
    
    // Cambiamos temporalmente el título para que el PDF se guarde con un buen nombre
    const slug = empresa ? `_${empresa.replace(/\s+/g, '_')}` : '';
    const date = new Date().toISOString().slice(0, 10);
    document.title = `SIFCO_ROI${slug}_${date}`;

    // Lanzamos el diálogo de impresión (Guardar como PDF)
    window.print();

    // Restauramos el título original
    document.title = originalTitle;
}

