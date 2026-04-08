//escribir una api
import fsp from 'node:fs/promises'
import path from 'node:path'
try{    //hacer una peticion con fetch con promesa

   const respuesta = await fetch('https://69cbcb780b417a19e07b42c1.mockapi.io/api/v1/Productos')
   
    //extraemos el cuerpo de la peticion de los datos
    const productos = await respuesta.json() // transforma el cuerpo "cadena de texto" a un arreglo/objetos de js
   //creamos la ruta
    const ruta= path.join('./api.json')

    //guardar los datos en un archivo
    const contenido = JSON.stringify(productos, null,4) // pasa de js a fromato js
    await fsp.writeFile(ruta,contenido)
        //van a leer el contenido delarchivo api.jon 
        //imprimir por consola
    //console.log(productos)
}catch(e){
    console.log(e)
}