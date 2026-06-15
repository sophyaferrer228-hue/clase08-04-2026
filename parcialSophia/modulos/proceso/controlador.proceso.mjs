import * as modelo from './modelo.proceso.mjs'

// hace el calculo de ofertas y retorna una respuesta en json
export const aplicarOferta = async (req, res) => {
    try {
        const productosProcesados = modelo.calcularOfertasDior()
        
        if (productosProcesados.length > 0) {
            // si todo sale bien--->respuesta exitosa con los datos procesados
            res.json({
                mensaje: "Se aplicó el descuento a los productos de Dior",
                cantidad: productosProcesados.length,
                resultados: productosProcesados
            })
        } else {
            // si no se encuentran productos que coicidan
            res.status(404).json({ mensaje: "No se encontraron productos de la marca Dior" })
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno al calcular las ofertas" }) // errores en el servidor
    }
}