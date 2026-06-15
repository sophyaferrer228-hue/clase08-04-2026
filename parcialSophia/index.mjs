import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config' 
import rutasLogin from './modulos/login/rutas.login.mjs'
import rutasProductos from './modulos/productos/rutas.productos.mjs'
import rutasProceso from './modulos/proceso/rutas.proceso.mjs'
import { chequearCookie } from './modulos/middleware/middleware.mjs'

const app = express()
const PUERTO = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SECRET_KEY || 'clavesecreta')) // variable de entorno para la clave

//exponemos los 2 fronts

// admin
app.use('/admin', chequearCookie, express.static('./fronts/front-admin'))

// login
app.use('/login', express.static('./fronts/front-login'))

// apis
app.use('/api/v1/productos', rutasProductos)
app.use('/api/v1/proceso', rutasProceso)
app.use('/', rutasLogin)


app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})