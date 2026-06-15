import productos from '../../bd/productos.mjs'

// filtra productos por marca "Dior" y aplica un descuento del 20%
export const calcularOfertasDior = () => {
    return productos.datos
        .filter(p => p.marca === "Dior")
        .map(p => ({
            ...p,
            nombre: p.nombre + " - PROMO",
            precio: p.precio * 0.80
        }))
}
