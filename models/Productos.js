const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productosSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
    },
    precio:{
        type: Number
    },
    imagen : {
        type: String
    }
});

module.exports = mongoose.model('Productos', productosSchema);

//Podemos utilizar shortId que lo debemos descargar desde npm
// npm install --save shortid multer