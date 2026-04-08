//leer una api
try{    //hacer una peticion con fetch con promesa

   const respuesta = await fetch('https://69cbcb780b417a19e07b42c1.mockapi.io/api/v1/Productos')
   
    //extraemos el cuerpo de la peticion de los datos
    const productos = await respuesta.json() // transforma el cuerpo "cadena de texto" a un arreglo/objetos de js
    console.log(productos)
}catch(e){
    console.log(e)
}