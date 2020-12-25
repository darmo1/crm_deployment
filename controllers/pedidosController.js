const Pedidos = require('../models/Pedidos')
const Clientes = require('../models/Clientes');




exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try{
        await pedido.save()
        res.json({message: 'Se agregó un nuevo Pedido'})
    }catch(error){
        console.log(error)
        next()
    }
}   


exports.mostrarPedidos = async (req, res, next) => {
    try{
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos' //Debemos decirle en que modelo
        }) //Aqui dentro del metodo va el nombre de la referencia de la base de datos en este caso el campo se llama cliente
        res.json(pedidos)
    }catch(error){
        console.log(error)
        next()
    }
}

exports.mostrarPedido = async (req, res, next) => {
    
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos' //Debemos decirle en que modelo
        }) //Aqui dentro del metodo va el nombre de la referencia de la base de datos en este caso el campo se llama cliente;

        if(!pedido){
            res.json({mensaje: "Ese pedido no existe"})
            return next();
        }
    
        //Mostrar el Pedido
        res.json(pedido)
    
}

exports.actualizarPedido = async (req, res, next)=> {
    try{
        let pedido = await Pedidos.findOneAndUpdate(
            { _id : req.params.idPedido},
            req.body,
            {new: true}).populate('cliente').populate({
                path: 'pedido.producto',
                model: 'Productos' //Debemos decirle en que modelo
            }) //Aqui dentro del metodo va el nombre de la referencia de la base de datos en este caso el campo se llama cliente;;
            res.json(pedido)
    }catch(error){
        console.log(error)
        next()
    }
}

exports.eliminarPedido = async (req, res, next) => {
    try{ 
   await Pedidos.findByIdAndDelete({_id: req.params.idPedido});
    res.json({mensaje: 'El pedido ha sido eliminado'})
    }catch(error){
        console.log(error)
        next();
    }
}