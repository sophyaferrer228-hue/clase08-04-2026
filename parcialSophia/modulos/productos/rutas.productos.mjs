import { Router } from 'express'
import * as controlador from './controlador.productos.mjs'
import { chequearCookie } from '../middleware/middleware.mjs'

const rutasProductos = Router()

rutasProductos.get('/:id', chequearCookie, controlador.obtenerProducto)
rutasProductos.get('/', chequearCookie, controlador.obtenerTodos)


export default rutasProductos