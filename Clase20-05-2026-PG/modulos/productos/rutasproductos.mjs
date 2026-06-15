import {Router} from 'express'
import * as controlador from './controlador.productos.mjs'

const rutasProductos = new Router()

rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerProducto)
rutasProductos.get('/v1/productos/ofertas', controlador.aplicarOferta);

export default rutasProductos