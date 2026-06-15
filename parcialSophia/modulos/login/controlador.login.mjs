import * as modelo from './modelo.login.mjs'
import bcrypt from 'bcryptjs'


export const registrar = async (req, res) => { //----> maneja el registro
    const { usuario, pass } = req.body

    if (!usuario || !pass) {
        return res.status(400).json({ mensaje: 'Datos incompletos' })
    }

    const usuarioExistente = await modelo.buscarUsuario(usuario);
    if (usuarioExistente.rowCount > 0) {
        return res.status(400).json({ mensaje: 'El usuario ya existe, probá con otro' })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(pass, salt)

        await modelo.registrarUsuario(usuario, hash)
        
        return res.redirect('/login')
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al registrar' })
    }
}

export const autenticar = async (req, res) => { // ----> veriica credenciales, crea la cookie y redirige

    const { usuario, pass } = req.body
    const resultado = await modelo.buscarUsuario(usuario)

    if (resultado.rowCount === 0) return res.redirect('/login')

    const coincide = await bcrypt.compare(pass, resultado.rows[0].password_hash)

    if (coincide) {
        res.cookie('sesionId', 'un_id_unico', { signed: true })
        return res.redirect('/admin')
    }
    res.redirect('/login')
}

// elimina la cookie
export const cerrarSesion = (req, res) => {
    res.clearCookie('sesionId')
    res.redirect('/login')
}