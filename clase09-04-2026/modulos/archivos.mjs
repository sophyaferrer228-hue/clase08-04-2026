import fsp from 'node:fs/promises';

export const guardarJSON = async (ruta, datos) => {
    await fsp.writeFile(ruta, JSON.stringify(datos, null, 4));
};

export const leerJSON = async (ruta) => {
    const contenido = await fsp.readFile(ruta, 'utf-8');
    return JSON.parse(contenido);
};