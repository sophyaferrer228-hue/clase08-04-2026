import * as modelo from './modelo.productos.mjs'

export const obtenerTodos = async (req, res) => { //  petición para tarer todos los productos
    try {
        const productos = await modelo.traerTodos()

        if (!productos) return res.status(404).json({ mensaje: 'No hay productos' })

        res.json(productos)

    } catch (error) {

        console.log("--- ERROR EN TERMINAL ---")
        console.log(error)

        res.status(500).json({ mensaje: "Error interno del servidor" })
    }

}

// petición para traer un solo producto por id
export const obtenerProducto = async (req, res) => {
    
    const productoFiltrado = await modelo.traerPorId(req.params.id)

    if (productoFiltrado.length > 0) {
       
        res.json(productoFiltrado[0])
    } else {
        res.status(404).json({ mensaje: "Producto no encontrado" })
    }
}

