
// Importar lo de los modulos
import { traerUsuarios } from './modulos/peticiones.mjs';
import { guardarJSON, leerJSON } from './modulos/archivos.mjs';

const URL = 'https://api.escuelajs.co/api/v1/users';
const PATH = './api.json';

try {
    const datos = await traerUsuarios(URL);
    
    const filtrados = datos.map(u => ({ id: u.id, email: u.email, name: u.name }));
    
    await guardarJSON(PATH, filtrados);
    
    const final = await leerJSON(PATH);
    console.log("Tarea completada profee:", final);
} catch (error) {
    console.error(error);
}