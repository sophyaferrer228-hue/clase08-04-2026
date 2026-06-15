import productos from "./productos.mjs"

//punto 1: Endpoint para consultar todos los datos
export function obtenerProductos(req, res) {
    res.json(productos.datos)
}
// punto 1: consulta por "ruta con parametro", me trae solo el productos del id que le pedi
export function obtenerProductoID(req, res) {
    const idProducto = Number(req.params.id)

    const productoFiltrado = productos.datos.filter((producto) => {
        return idProducto === Number(producto.id)
    })

    //  verificar si hay producto 
    if (productoFiltrado.length > 0) {
        // primer elemento del array 
        res.json(productoFiltrado[0])
    } else {
        res
            .status(404)
            .json({ mensaje: "Producto no encontrado" })
    }
}
// punto 2: Implementación de un procedimiento 
// hace la lógica del descuento sobre el JSON 
export function aplicarOferta(req, res) {
    // .filter() para traer todos los que sean de la marca Dior
    const marcaObjetivo = "Dior"
    
    const productosProcesados = productos.datos
        .filter(p => p.marca === marcaObjetivo) // filtra y genera un nuevo array con los 3 perfumes
        .map(p => {
            // Retornamos un nuevo objeto con el precio modificado
            return { 
                ...p, 
                nombre: p.nombre + " - PROMO", 
                precio: p.precio * 0.80 
            }
        })

    //  devuelve el array completo de resultados 
    res.json({
        mensaje: `Se aplicó el descuento a todos los productos de ${marcaObjetivo}`,
        cantidad: productosProcesados.length,
        resultados: productosProcesados
    })
}