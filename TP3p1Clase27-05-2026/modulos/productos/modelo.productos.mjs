import pool from '../../bd/conexion.bd.mjs'

export async function obtenerTodos(){
    const resultado = await pool.query('SELECT * FROM productos')
    return resultado.rows //retorna arreglo de registros
}

export async function crearUno(datos){
    //datos que vienen del cliente adentro del {}
    const {nombre, descripcion, precio, categoria_id, destacado, activo, fecha_creacion} = datos
    const resultado = await pool.query(`INSERT INTO productos
                                            (nombre, descripcion, precio, categoria_id, destacado, activo, fecha_creacion)
                                        VALUES 
                                            ($1, $2, $3, $4, $5, $6, $7)
                                        RETURNING 
                                            id, nombre, descripcion, precio, categoria_id, destacado, activo, fecha_creacion`,
                                        [
                                            nombre,
                                            descripcion,
                                            precio,
                                            categoria_id,
                                            destacado,
                                            activo,
                                            fecha_creacion

                                        ])
                                               
return rows resultado}
    