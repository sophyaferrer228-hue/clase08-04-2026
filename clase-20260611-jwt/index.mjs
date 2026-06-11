// Token de acceso TID AW2 p.366

import './iniciar.env.mjs';
import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import pool from './conexion.bd.mjs';

const PUERTO = process.env.PUERTO || 4000;

const app = express();

//middleware que se ejecuta antes de entrar a /admin
function comprobarToken(req, res, next){//--> te da la frima y el token, si coincide te leva a /admin
   //obtenemos el token desde la cookie
   const token = req.signedCookies['token']
    jwt.verify(toek, process.env.FIRMA_JWT, (error, payload)=>{
        //si el token no es valido
        if(error) return res.redirect('/login')
        //si es valido lo dajemos pasar
        console.log(payload)
            next()
    }) 
}
app.use(express.json()); //---->los datos que vienen del body en formato json los convierte en obj java scrip
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.FIRMA_COOKIE)); //---> sgned cookies - cookies

app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/autenticar', (req, res) => {
    const { usuario, pass } = req.body
    //consultar a la bd

    const datosPayLoad = {
        usuario: usuario,
        rol: 0
    }

    if (true) {
        jwt.sign(datosPayLoad, process.env.FIRMA_JWT, { expiresIn: '1h' }, (error, token) => {
            if (error) return res.redirect('/login')

            //ENVIAR TOKEN VIA COOKIE
            //gener las cabeceras y se las manda
            res.cookie('token', token, {
                sameSite: 'lax',
                httpOnly: true,
                secure: true,
                signed: true
            })
            return res.redirect('/admin')

            // console.log(token)
        })
    }
})

//adim 
app.use('/admin', comprobarToken, express.static('./fronts/front-admin'))

//login
app.use('/login', express.static('./fronts/front-login'))



app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
