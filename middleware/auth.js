const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    //autorizacion por el header
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //Obtener el token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken; 
    try{
        revisarToken = jwt.verify(token,  'LLAVESECRETA' ) //Aqui debemos poner la llave secreta con la que firmamos el token 

    }catch(error){
        error.statusCode = 500;
        throw error;
    }
   
   // Authorization : Bearer 123423453245 --> Asi viene la lectura del header peticiones 

   //Si es un token valido pero hay algun error
   if(!revisarToken){
       const error = new Error('No autenticado');
       error.statusCode = 401;
       throw error;
   }

   //Si pasa todo
   next();


}