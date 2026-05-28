import * as modelo from './modelo.productos.mjs'

export async function obtenerTodos(req, res){
    //arreglo 
    const productos =  await modelo.obtenerTodos()
    if(productos.length == 0 ){
        return res.status(404).json({mensaje: 'Registros no encontrados'})
    }
    //respuesta la cliente
    res.json(productos)
}


export async function  crearUno(req, res){
    const datosProductos = req.body
    //hay que crae la logica de negocio
    //crear capa servicio, verificar datos que inresan del cliente
    //si es un num/ cadena, si no esta vaio, etc
     const producto = await modelo.crearUno(datosProductos)
    if (producto.length ===0 ){
       return res.status(404).json({mensaje: 'No se puedo dar de alta al registro'})
    }
   res.json({mensaje: 'Producto dado de alta', producto: producto})
}