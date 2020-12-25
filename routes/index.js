const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

// middleware para proteger las rutas

const auth = require("../middleware/auth");

module.exports = function () {
  //Agregar nuevos clientes via POST
  router.post("/clientes", clienteController.nuevoCliente);

  //Obtener Todos los clientes vía GET
  router.get("/clientes", auth, clienteController.mostrarClientes);

  //Muestra un cliente en especifico
  router.get("/clientes/:id", auth, clienteController.mostrarCliente);

  //Actualizar cliente
  router.put("/clientes/:id", auth, clienteController.actualizarCliente);

  //Eliminar Clientes
  router.delete("/clientes/:id", auth, clienteController.eliminarCliente);

  /* PRODUCTOS */
  //Nuevo Productos
  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  //Muestra todos los productos
  router.get("/", auth, productosController.mostrarProductos);

  //Mostrar por params
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );

  //Actualizar Productos
  router.put(
    "/productos/:idProductos",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  //Eliminar producto
  router.delete(
    "productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );

  //Pedidos
  router.post("/pedidos", auth, pedidosController.nuevoPedido);

  //Mostrar todos los pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);

  //Mostrar un pedido por su ID
  router.get("pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  //Actualizar el pedido
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

  //Elimina un pedido

  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  //USUARIOS
  router.post("/crear-cuenta",  usuariosController.registrarUsuario);
  router.post("/iniciar-sesion",  usuariosController.autenticarUsuario);

  return router;
};
