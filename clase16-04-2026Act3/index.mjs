// modulo http
import http, { get } from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'


//Configurar la ruta /usuarios con el verbo GET

const app = http.createServer(async(peticion, respuesta)=>{//<---- se va a ejecutar solamente cuando haya una peticion o request
   
    if (peticion.method === 'GET'){  
        if(peticion.url === '/usuarios'){
                respuesta.statusCode = 200
                return respuesta.end('hola bro')
        } 


// hacer un fetch a la API REST esterna

        if(peticion.method === 'POST'){

                if (peticion.url === '/usuarios'){

                    const respuestaApi = await fetch('https://api.escuelajs.co/api/v1/users')
                    const datosApi = await respuestaApi.json()
                    try{
                        await fsp.writeFile(path.joim('./datosApi.json'), datosApi)
                        respuesta.statusCode = 201
                        respuesta.respuesta.end('Datos guardados')
                    }catch(error){
                        respuesta.statusCode = 500
                        respuesta.respuesta.end('Error en el servidor')
                    }
                

                    return respuesta.end('datos guardados')
                }
        }
    }
   respuesta.statusCode = 404
   respuesta.end('Recurso no encontrado')
})

app.listen(3000, ()=>{
        console.log('servidor corriendo en http://localhost:3000')
    }
)
