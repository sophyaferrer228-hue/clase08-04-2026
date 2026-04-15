// modulo http
import http, { get } from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

const app = http.createServer(async(peticion, respuesta)=>{//<---- se va a ejecutar solamente cuando haya una peticion o request
    //console.log('peticion recibida')
    //console.log(peticion.url)


    if (peticion.method === 'GET'){  
   if(peticion.url === '/'){
        respuesta.statusCode = 200
        return respuesta.end('Estas en la raìz')
   } 

   if (peticion.url === '/suma'){
    const resultado = (5 + 3).toString()
    respuesta.statusCode = 200
    return respuesta.end(resultado)
   }



   if(peticion.method === 'POST'){

    //  if(peticion.url === '/proceso-formulario'){}
        // //
        // respuesta.on('data', (datos)=>{
        //     console.log(datos)
        // })
        // return respuesta.end('se hizo una peticion xon verbo POST')
        if (peticion.url === '/guardar-datos'){

            const respuestaApi = await fetch('https://api.escuelajs.co/api/v1/users')
            const datosApi = await respuestaApi.text()
            try{
               await fsp.writeFile(path.joim('./datosApi.txt'), datosApi)
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

   //Fallback
    //respuesta.end('hola bestie') //<-- el end es lo ultimo que tiene que aparecer, porque es lo ultimo que se envia . NO SE EJECUTA DOS VECES

})

app.listen(3000, ()=>{
        console.log('servidor corriendo en http://localhost:3000')
    }
)