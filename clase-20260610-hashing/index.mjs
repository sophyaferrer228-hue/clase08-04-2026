import express from 'express';
import pool from './conexion.bd.mjs';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';

const PUERTO = 3000;

////////////////

////////////////
const app = express();
app.use(express.json())//----> recibimos datos en fromato json y los convierte en objeto dentro del body
app.use(express.urlencoded({extended:true}))//----> formato urleconded--> convierte en un objeto dentro del body
//exponemos los 2 fronts

//admin CRUD
app.use('/admin', express.static('./fronts/front-admin'))

//login
app.use('/login',express.static('./fronts/front-login'))

app.post('/autenticar',async(req, res)=> {
    //act 5
    //generar el id con nanoid
    
})

//resgitrar
app.post('/registrar',async(req, res)=>{
    //1-capturar los datos
   console.log(req.body) //---> tanto json y urlencoded se guardan ahi
    const {usuario, pass}=req.body
   //2-control
   if(!usuario || !pass){
    return res.status(400).json({
        mensaje:'Datos incompletos'
    })
   }
   res.json({
    mensaje:'Registro'
   })

   //3- Encriptamos la clave
//    try{
    
   const salt = await bcrypt.genSalt(10); //--->previene el ataque arcoiris de fuerza bruta
    const hash = await bcrypt.hash(pass, salt); //---> hashea la clave
    console.log(hash)


//    }catch(error){}

    //4-Guardamos los datos en labase de datos
   const resultado = await pool.query(`
    INSERT INTO usuarios
        (username, password_hash)
    VALUES
        ($1,$2)
    RETURNING
        id, username
    `, //--- > OJO CON LA COMA)
    [
        usuario,
        hash
    ]
)
console.log(resultado)
//5 verificamos si se realizo la inserccion
if(resultado.rowCount > 0){
    return res.json({
        mensaje: `El usuraio ${usuario}se ha registrado con exito`
    })
}

   res.json(500).json({
    mensaje:'El registro no se pudo realizar'
   })
})


app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});