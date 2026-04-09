
import fsp from 'node:fs/promises'
import path from 'node:path'
try{ 

   const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
    const datos = await respuesta.json() 
    const ruta= path.join('./api.json')

    const filtar = datos.map((usuario)=>{
        return {
        id: usuario.id,
        email: usuario.email,
        name : usuario.name
     } })
    

    const contenido = JSON.stringify(filtar, null,4) 
    await fsp.writeFile(ruta,contenido)

    const usuariosFiltrados = await fsp.readFile('./api.json','utf-8')
    console.log(usuariosFiltrados.toString())
}catch(e){
    console.log(e)
}


