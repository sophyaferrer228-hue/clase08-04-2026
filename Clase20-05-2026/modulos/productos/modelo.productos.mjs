import productos from "../../productos.mjs"

export function obtenerTodos(){
    // Haria una consulta a una bd
    return productos
}

export function obtenerProducto(id){
    // Filtro por id
    const productosFiltrados = productos.datos.filter((prod)=>{
        return id === Number(prod.id)
    })
    ultimo_id = 5,
    datos = productosFiltrados
    return prod
}