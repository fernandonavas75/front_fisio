export function guardarEnLocalStorage(clave, datos) {
    try {
        const serializado = JSON.stringify(datos);
        localStorage.setItem(clave, serializado);
        console.log("Guardado en localStorage:", clave);
    } catch (err) {
        console.error("Error al guardar en localStorage", err);
    }
}