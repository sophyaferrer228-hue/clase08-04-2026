import pool from '../../bd/conexion.bd.mjs'

// inserta un nuevo usuario con la contraseña hasheada en la BD
export const registrarUsuario = async (usuario, hash) => {
    const query = 'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)'
    return await pool.query(query, [usuario, hash])
}

// busca el usuario por nombre validar existencia o login
export const buscarUsuario = async (usuario) => {
    return await pool.query('SELECT * FROM usuarios WHERE username = $1', [usuario])
}
