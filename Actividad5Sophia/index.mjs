import 'dotenv/config'
import express from 'express';
import pool from './conexion.bd.mjs';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid'

const PUERTO = 3000;
const app = express();
////////////////

////////////////

app.use(express.json())//----> recibimos datos en fromato json y los convierte en objeto dentro del body
app.use(express.urlencoded({ extended: true }))//----> formato urleconded--> convierte en un objeto dentro del body

app.use(cookieParser('clavesecreta')) //---> activamos las cookies con la clave

const sesionesActivas = {}//---> obj para guaradr las sesiones asosciadas a los nanoid


//middleware para bloquear acceso a /admin si no hay cookie valida
function chequearCookie(req, res, next) {
   
    const sessionId = req.signedCookies['sesionId'] // --->  verifico si la cookie firmada existe

   
    if (sessionId && sesionesActivas[sessionId]) {  // ---> verifico si lo enviado coincide con una sesion en el servidor
        return next() 
    }

    // Si no coincide o no existe lo manda al login
    return res.redirect('/login')
}

// //exponemos los 2 fronts

// admin queda bloqueado por el middleware 
app.use('/admin', chequearCookie, express.static('./fronts/front-admin'))

// login
app.use('/login', express.static('./fronts/front-login'))


// registro
app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body

    if (!usuario || !pass) {
        return res.status(400).json({ mensaje: 'Datos incompletos' })
    }

    try {
        const salt = await bcrypt.genSalt(10)

        
        const hash = await bcrypt.hash(pass, salt) //---> hasheamos la contraseña antes de guardarla en la base por seguridad

        const query = 'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)'
        await pool.query(query, [usuario, hash])

        return res.status(201).json({ mensaje: 'Usuario registrado con éxito' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensaje: 'Error al registrar' })
    }
})


//autenticacion
app.post('/autenticacion', async (req, res) => {
    const { usuario, pass } = req.body

    if (!usuario || !pass) {
        return res.status(400).json({
            mensaje: 'Datos incompletos'
        })
    }

    try {
        
        const resultado = await pool.query(  // ---> consultamos a la BD por el nombre de usuario
            'SELECT * FROM usuarios WHERE username = $1',
             [usuario])
      

        if (resultado.rowCount === 0) {// ---> si no existe, redirige al login
            return res.redirect('/login')
        }

        const usuarioBD = resultado.rows[0]
        //consultamos la base y comparamos el hash con la contraseña enviada con bcrypt.compare
        const coinciden = await bcrypt.compare(pass, usuarioBD.password_hash)

        if (!coinciden) {
            return res.redirect('/login')
        }

        //genera un id unico con nanoid para identificar al usuario --> token
        const idDinamico = nanoid()

        // guardamos sesión en el servidor
        sesionesActivas[idDinamico] = usuario

        // enviamos la cookie firmada
        res.cookie('sesionId', idDinamico, {
            signed: true,
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1000 * 60 * 10 // 10 min
        })

        //redireccionamos al admin de una
        return res.redirect('/admin')

    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensaje: 'El registro no se pudo realizar' })
    }
})



app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});