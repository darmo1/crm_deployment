const mongoose = require('mongoose');
const {Schema} = mongoose

const clienteSchema = new Schema({
    nombre:{
        type: String,
        trim: true
    },
    apellido :{
        type: String,
        trim: true 
    },
    empresa :{
        type: String,
        trim: true 
    },
    email :{
        type: String,
        trim: true ,
        lowercase: true,
        unique : true
    },
    telefono:{
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('clientes', clienteSchema);