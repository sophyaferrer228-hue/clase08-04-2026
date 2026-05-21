
import pool from '../conexion.bd.mjs'

export async function obtenerTodos(){
    // Haria una consulta a una bd
    const resultado = await pool.query('SELECT * from productos')
    console.log(resultado.rows)
    return resultado.rows
}

// export function obtenerProducto(id){
//     // Filtro por id
//     const productosFiltrados = productos.datos.filter((prod)=>{
//         return id === Number(prod.id)
//     })
//     ultimo_id = 5,
//     datos = productosFiltrados
//     return prod
// }

export async function obtenerUno(id){
    const resultado = await pool.query('SELECT * FROM  productos WHERE id=$1', [id])
    return resultado.rows
}

export async function eliminarUno(id){
    const resultado = await pool.query('DELETE FROM  productos WHERE id=$1 RETURNING id, producto, precio', [id])
    console.log(resultado)
    return resultado.rows
}