// nesse arquivo, definimos as rotas relacionadas aos pedidos e associamos cada rota a uma função do PedidoController. As rotas são:
// POST /pedidos: para cadastrar um novo pedido.
// GET /pedidos: para listar todos os pedidos.
// GET /pedidos/:id: para buscar um pedido específico pelo ID.
// PUT /pedidos/:id: para atualizar as informações de um pedido específico pelo ID.
// DELETE /pedidos/:id: para excluir um pedido específico pelo ID.

const express = require("express");
// Importando o modulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas aos pedidos.
const PedidosController = require("../controller/pedidos_controller.js");

router.post("/", PedidosController.cadastrar);

router.get("/", PedidosController.listar);

router.get("/:id", PedidosController.buscarPorId);

router.put("/:id", PedidosController.atualizar);

router.delete("/:id", PedidosController.excluir);

module.exports = router;