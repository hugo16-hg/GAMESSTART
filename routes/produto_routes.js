// nesse arquivo, definimos as rotas relacionadas aos produtos e associamos cada rota a uma função do ProdutoController. As rotas são:
// POST /produtos: para cadastrar um novo produto.
// GET /produtos: para listar todos os produtos.
// GET /produtos/:id: para buscar um produto específico pelo ID.
// PUT /produtos/:id: para atualizar as informações de um produto específico pelo ID.
// DELETE /produtos/:id: para excluir um produto específico pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas aos produtos.
const ProdutosController = require("../controller/produtos_controller.js");

router.post("/", ProdutosController.cadastrar);

router.get("/", ProdutosController.listar);

router.get("/:id", ProdutosController.buscarPorId);

router.put("/:id", ProdutosController.atualizar);

router.delete("/:id", ProdutosController.excluir);

module.exports = router;