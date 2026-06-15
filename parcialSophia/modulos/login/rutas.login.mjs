import { Router } from 'express'
import * as controlador from './controlador.login.mjs'

const rutasLogin = Router()

rutasLogin.post('/registrar', controlador.registrar)
rutasLogin.post('/autenticacion', controlador.autenticar)
rutasLogin.get('/cerrar-sesion', controlador.cerrarSesion)
export default rutasLogin