// nesse arquivo, definimos as rotas relacionadas às associações entre produtos e pedidos e associamos cada rota a uma função do ProdutoHasPedidosController. As rotas são:
// POST /produto-has-pedidos: para cadastrar uma nova associação entre produto e pedido.
// GET /produto-has-pedidos: para listar todas as associações entre produtos e pedidos.
// GET /produto-has-pedidos/:id: para buscar uma associação específica pelo ID.
// PUT /produto-has-pedidos/:id: para atualizar as informações de uma associação específica pelo ID.
// DELETE /produto-has-pedidos/:id: para excluir uma associação específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre produtos e pedidos.
const ProdutoHasPedidosController = require("../controller/produto_has_pedidos_controller.js");

router.post("/", ProdutoHasPedidosController.cadastrar);

router.get("/", ProdutoHasPedidosController.listar);

router.get("/:id", ProdutoHasPedidosController.buscarPorId);

router.put("/:id", ProdutoHasPedidosController.atualizar);

router.delete("/:id", ProdutoHasPedidosController.excluir);

module.exports = router;
