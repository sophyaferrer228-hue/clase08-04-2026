
import express from 'express'
import multer from 'multer'
import {nanoid} from 'nanoid'
import mime from 'mime-type'


//path

const PUERTO = 3000

const app = express()

//ejecutamos multer
const almacenamiento = multer.diskStorage({
    //-------------------------------------
    //destino de almacenamiento
  destination: function (req, file, cb) {

    //chequeos
    cb(null, './archivos')
  },
  //-----------------------------------
  //gestio de nombre
  filename: function (req, file, cb) {
    //obtengo la extencion desde el mime type
    //const extension = mime.extension(file.mimetype)
    //creo el nom del archivo con un identificador unico de nanoid()
    const nombreImagen = nanoid() + '.png'  //genera un id unico
    cb(null, nombreImagen)
  }
})

//documentacion --> https:github.com/expressjs/multer
const subirArchivo= multer({
   storage: almacenamiento
})

const gestionArchivos = subirArchivo.single('imagen')//--->devuelve una funcion


// use por defecto utiliza LA RUTA RAIZ/, pero la ultiliza como prefijo
app.use('/admin', express.static('./front-admin'))
//hacemos publica la carpeta de archivos
app.use('/archivos', express.static('./archivos'))

//ruta y metodo
app.post('/subir-archivo', (req, res)=>{
    gestionArchivos(req, res, (error)=>{
        //si no hay error 
        console.log(error)
        if(error) return res.status(500).json({mensaje:'Error en el servidor'})
            //si no hay error
        // req.body <--- app.use(exprtess.jsopn())
        console.log(req.file)
            res.json({mensaje: 'ruta subida de archivos del formulario'})
    })

})

app.listen(PUERTO, ()=>{
console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})