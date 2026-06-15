import { Router } from 'express'
import * as controladorProceso from './controlador.proceso.mjs'
import { chequearCookie } from '../middleware/middleware.mjs'

const rutasProceso = Router()
rutasProceso.get('/oferta', chequearCookie, controladorProceso.aplicarOferta)
export default rutasProceso