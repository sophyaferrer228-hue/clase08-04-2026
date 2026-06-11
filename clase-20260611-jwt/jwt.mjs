import jwt from 'jsonwebtoken'

//sign --> firmar
//verify --> verificar

const datosPayLoad= {
    usuario: 'sophia', 
    rol: 0
} 
jwt.sign(datosPayLoad, 'frasesupersecreta', {expiresIn: '1h'}, (error, token)=>{
    if(error) return console.log(error)
        console.log(token)
})