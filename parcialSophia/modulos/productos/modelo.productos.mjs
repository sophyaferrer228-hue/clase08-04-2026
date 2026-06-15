import productos from '../../bd/productos.mjs' 

// trae todos los productos
export const traerTodos = async () => {
    return productos.datos
}

// filtra y traer un producto por id
export const traerPorId = async (idBuscado) => {
    const lista = await traerTodos()
    return lista.filter(producto => Number(idBuscado) === Number(producto.id))
}