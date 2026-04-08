// console.log("hola")
// vamos a leer un archivo txt
import { readFile } from 'node:fs'
import fsp from 'node:fs/promises'

try{
   const contenido = await fsp.readFile('./texto.txt','utf-8')
   console.log(contenido.toString())
}catch(e){
    console.log(e)
}
