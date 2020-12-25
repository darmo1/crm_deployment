const express = require('express')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const cors = require('cors')

//variables de entorno
require('dotenv').config({path:'variables.env'})


//Create Server
const app = express();

//carpeta Publica
app.use(express.static('uploads'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Definir un dominio(s) para recibir las peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //Revisar si la peticion viene de un servidor que esta en la whiteList
        const existe = whiteList.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
app.use(cors(corsOptions));

//Conecte Mongosse
const mongoose = require('mongoose');
const MONGO_URI = process.env.DB_URL
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})

//Routes main app
app.use('/', routes())




const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3001

//Create port
app.listen(port, host, ()=>{
   console.log(`El servidor está funcionando`)
});