const Clientes = require('../models/Clientes');

//Agregar nuevo cliente

exports.nuevoCliente = async function(req,res,next){
    //Se va a mapear con el formato de la tabla
    const cliente = new Clientes(req.body);

    try{ //Almacenar el registro
        await cliente.save();
        res.json({mensaje:'Se agregó un nuevo cliente'})

    }catch(err){
        //Si hay error, console.log y luego next()
        res.send(err)
        next()

    }
}

//Muestra todos los clientes

exports.mostrarClientes = async (req, res, next) => {

    try{
        const clientes = await Clientes.find({});
        res.json(clientes);

    }catch(error){
        console.log(error);
        next();
    }
}

//Muestra un cliente por su ID
exports.mostrarCliente = async (req, res, next) => {

    try{
        const cliente = await Clientes.findById(req.params.id);
        res.json(cliente)
    }catch(err){
        
        res.json({mensaje: 'No existe este cliente'})
        next()
    }
}

exports.actualizarCliente = async (req,res,next) => {
    try{
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.id }, req.body ,{new:true});
        res.json(cliente)

    }catch(err){
        res.send(err)
        next()
    }
}

//Eliminar Cliente
exports.eliminarCliente = async (req, res, next) =>{
    try{
        await Clientes.findByIdAndDelete({ _id: req.params.id});
        res.json({mensaje: 'El cliente se ha eliminado'})

    }catch(error){
        console.log(error)
        next()
    }
}