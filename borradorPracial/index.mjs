// import express from 'express'
// import cookieParser from 'cookie-parser'
// import bcrypt from 'bcryptjs'
// import pool from './bd/conexion.bd.mjs'
// import { nanoid } from 'nanoid'
// import rutasProductos from './modulos/productos/rutas.productos.mjs' 
// const PUERTO = 3000
// const app = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser('clavesecreta')) 
// const sesionesActivas = {}//---> obj para guaradr las sesiones asosciadas a los nanoid
// app.use('/', rutasProductos)
// // //exponemos los 2 fronts
// // admin
// app.use('/admin', chequearCookie, express.static('./fronts/front-admin'))

// // login
// app.use('/login', express.static('./fronts/front-login'))


// //middleware para bloquear acceso a /admin si no hay cookie valida
// function chequearCookie(req, res, next) {
   
//     const sessionId = req.signedCookies['sesionId'] // --->  verifico si la cookie firmada existe

   
//     if (sessionId && sesionesActivas[sessionId]) {  // ---> verifico si lo enviado coincide con una sesion en el servidor
//         return next() 
//     }

//     return res.redirect('/login')
// }

// // registro
// app.post('/registrar', async (req, res) => {
//     const { usuario, pass } = req.body

//     if (!usuario || !pass) {
//         return res.status(400).json({ mensaje: 'Datos incompletos' })
//     }

//     try {
//         const salt = await bcrypt.genSalt(10)
//         const hash = await bcrypt.hash(pass, salt) //---> hasheamos la contraseña antes de guardarla en la base por seguridad

//         const query = 'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)'
//         await pool.query(query, [usuario, hash])
//         //return res.status(201).json({ mensaje: 'Usuario registrado con éxito' })
//          return res.redirect('/login')
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({ mensaje: 'Error al registrar' })
//     }
// })

// //autenticacion
// app.post('/autenticacion', async (req, res) => {
//     const { usuario, pass } = req.body

//     if (!usuario || !pass) {
//         return res.status(400).json({
//             mensaje: 'Datos incompletos'
//         })
//     }

//     try {
        
//         const resultado = await pool.query(  // ---> preguntamos a la base por el nombre de usuario
//             'SELECT * FROM usuarios WHERE username = $1',
//              [usuario])
      

//         if (resultado.rowCount === 0) {// ---> si no existe, redirige al login
//             return res.redirect('/login')
//         }

//         const usuarioBD = resultado.rows[0]
//         //consultamos la base y comparamos el hash con la contraseña enviada con bcrypt.compare
//         const coinciden = await bcrypt.compare(pass, usuarioBD.password_hash)

//         if (!coinciden) {
//             return res.redirect('/login')
//         }

//         const idDinamico = nanoid() // ----> genera un id unico con nanoid para identificar al usuario --> token

//         // guardamos sesión en el servidor
//         sesionesActivas[idDinamico] = usuario

//         // enviamos la cookie firmada
//         res.cookie('sesionId', idDinamico, {
//             signed: true,
//             httpOnly: true,
//             sameSite: 'lax',
//             secure: false,
//             maxAge: 1000 * 60 * 10 // 10 min
//         })

//         //redireccionamos al admin de una
//         return res.redirect('/admin')

//     } catch (error) {
//         console.error(error)
//     }
// })

// // /cerrar-sesion
// app.get('/cerrar-sesion', (req, res) => {
//     // limpiamos la cookie de la sesión
//     res.clearCookie('sesionId') 
//     res.redirect('/login') 
// })

// app.listen(PUERTO, () => {
//     console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
// })

import express from 'express';
import cookieParser from 'cookie-parser';
import rutasLogin from './modulos/login/rutas.login.mjs';
import productosRoutes from './modulos/productos/rutas.productos.mjs';//cambiar los nombres de los routers
import procesoRoutes from './modulos/proceso/rutas.proceso.mjs';
import { chequearCookie } from './modulos/middleware/middleware.mjs';


const PUERTO = 3000
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('clavesecreta')); // Cambia 'clavesecreta' por una variable de entorno

// Rutas estáticas
app.use('/admin', chequearCookie, express.static('./fronts/front-admin'));
app.use('/login', express.static('./fronts/front-login'));
app.use('/login', rutasLogin);

// Rutas de API (Los módulos)
//app.use('/', loginRoutes);
app.use('/api/v1/productos', productosRoutes);
app.use('/api/v1/procesos', procesoRoutes);


app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})