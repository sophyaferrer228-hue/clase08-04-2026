// Middleware con función de validación de parametros ---> parcial anterior
// este middleware protege al sistema verificando que los id consultados sean numéricos
// si el middleware se activa porque es letra, ya no entra a obtener productos por id
export function Middleware(req, res, next) {
    const { id } = req.params

    // valida si el id enviado no es un número
    // esto evita que el servidor procese datos cualquiera en rutas dinamicas
    if (id && isNaN(id)) {
        console.log(`--- Intento de consulta inválido: ID "${id}" no es un número ---`)
        return res.status(400).json({ 
            error: "Formato de ID incorrecto", 
            mensaje: "El parametro debe ser un valor numerico" 
        })
    }

    console.log(`--- Consulta validada: Ruta ${req.url} accedida correctamente ---`)
    next()
}

// middleware de autorización----> intercepta peticiones para validar la sesión
// si la cookie firmada no es válida o no existe, interrumpe el flujo y devuelve acceso denegado
export function chequearCookie(req, res, next) {
    if (!req.signedCookies.sesionId) {
        return res.status(403).json({ mensaje: "Acceso denegado: No estás logueado" })
    }
    // sino, deja pasar al usuario al controlador
    next()
}