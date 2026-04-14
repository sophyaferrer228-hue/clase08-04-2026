// Estee solo hace el fetch
export const traerUsuarios = async (url) => {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("Error en la red");
    return await respuesta.json();
};