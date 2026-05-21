
import express from 'express'
import rutasProductos from './modulos/productos/rutasproductos.mjs'

const PUERTO = 3000

const app = express()

/*



*/

app.use( rutasProductos)

/app.listen(PUERTO, ()=>{
console.log(`Servidor corriendo en http://localhost:${PUERTO}/api/v1/productos`)
})