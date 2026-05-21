import * as modelo from "./modelo.productos.mjs"
import * as vista from "./vista.productos.mjs"


export  async function obtenerTodos(req, res){
    //controlador se encarga de orquestar
    const productos = await modelo.obtenerTodos()//--> datos completos
    const respuestaVista = vista.obtenerTodos(productos)// ---> arreglo

    res.status(200).json(respuestaVista)
}


export async function obtenerProducto(req, res){
    const id = Number(req.params.id)

    const datosProducto = await modelo.obtenerUno(id)
    const respuestaVista = vista.obtenerUno(datosProducto)
    if(respuestaVista.length > 0){
        res.status(200).json(respuestaVista)
    }else{
        res.status(404).json({ mensaje: `Producto con id ${id} no encontrado`})
    }
}

export async function eliminarUno(req, res){
    const id = Number(req.params.id)

    const datosProducto = await modelo.eliminarUno(id)
    const respuestaVista = vista.eliminarUno(datosProducto)
    if(respuestaVista.length > 0){
        res.status(200).json(respuestaVista)
    }else{
        res.status(404).json({ mensaje: `Producto con id ${id} no encontrado`})
    }
}
