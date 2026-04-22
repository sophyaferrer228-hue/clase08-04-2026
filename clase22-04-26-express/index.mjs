import express from 'express'

const PUERTO = 3500
//instancia servidor express
const app = express()

app.get('/', (req, res) => {

    res.set('content-type', 'text/html')  //->Cabecera
    //mieme types
    res.status(201)
    res.end('<h1>Hola mateo</h1>')  //-> cuerpò->contenido
})

app.get('/materias', (req, res) => {
    res.set('content-type', 'application/json')
    res.status(201)
    res.end(`
         [ 
            {
                "materia": "biologia",
                "profe": "feli",
                 "curso": "ma"
            },
            {
                "materia": "matemàtica",
                "profe": "mateo",
                 "curso": "mb"
            },
            {
                "materia": "arte",
                "profe": "agus",
                 "curso": "mc"
            }
         ]   
            `)
})


app.post('/', (req, res) => { //SE EJECUTA SOLO CUANDO HAYA UNA PETICION CON POST
    res.end('agus enseñame a ser un femboy')
})

app.post('/fefi', (req, res) => { //SE EJECUTA SOLO CUANDO HAYA UNA PETICION CON POST
    res.end('a vos no te extraño')
})

//abrir un puerto
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})