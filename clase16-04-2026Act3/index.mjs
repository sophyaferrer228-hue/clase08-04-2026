// modulo http
import http, { get } from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'


//Configurar la ruta /usuarios con el verbo GET

const app = http.createServer(async (peticion, respuesta) => {//<---- se va a ejecutar solamente cuando haya una peticion o request

    if (peticion.method === 'GET') {
        if (peticion.url === '/usuarios') {
            try {
                respuesta.statusCode = 200

                const respuestaApi = await fetch('https://api.escuelajs.co/api/v1/users')
                const datosApi = await respuestaApi.json()

                await fsp.writeFile(path.join('./datosApi.json'), JSON.stringify(datosApi, null, 8))
                const contenido = await fsp.readFile('./datosApi.json', 'utf-8');
                return respuesta.end(contenido)


            } catch (error) {
                respuesta.statusCode = 500
                return respuesta.end('Error en el servidor')
            }

        }


        if (peticion.url === '/usuarios/filtrados') {
            try {
                respuesta.statusCode = 200
                const contenido = await fsp.readFile('./datosApi.json', 'utf-8');
                const datos = JSON.parse(contenido)
                const datosFiltrados = datos.filter((user) => {
                    return user.id < 10
                })
                respuesta.setHeader('Content-Type', 'application/json; charset=utf-8')
                return respuesta.end(JSON.stringify(datosFiltrados, null, 8))

               
            } catch (error) {
                respuesta.statusCode = 400;
                return respuesta.end('Debe ejecutar primero la ruta /usuarios para generar los datos');
            }
        }

    }


    respuesta.statusCode = 404
    return respuesta.end('Recurso no encontrado')
})


app.listen(3000, () => {
    console.log('servidor corriendo en http://localhost:3000')
}
)
