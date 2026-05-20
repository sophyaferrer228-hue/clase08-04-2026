import * as modelo from "./modelo.productos.mjs"
import * as vista from "./vista.productos.mjs"


export function obtenerTodos(req, res){
    //controlador se encarga de orquestar
    const productos = modelo.obtenerTodos()//--> datos completos
    const respuestaVista = vista.obtenerTodos(datosProductos)// ---> arreglo

    res.status(200).json(productos)
}


export function obtenerProducto(req, res){
    const id = Number(req.params.id)

    const producto = modelo.obtenerProducto(id)

    if(producto.length > 0){
        res.status(200).json(producto)
    }else{
        res.status(404).json({ mensaje: `Producto con id ${id} no encontrado`})
    }
}