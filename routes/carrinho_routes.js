// Neste arquivo, definimos as rotas relacionadas aos carrinhos e associamos cada rota a uma função do CarrinhoController. As rotas são:
// POST /carrinhos: para cadastrar um novo carrinho.
// GET /carrinhos: para listar todos os carrinhos.
// GET /carrinhos/:id: para buscar um carrinho específico pelo ID.
// PUT /carrinhos/:id: para atualizar as informações de um carrinho específico pelo ID.
// DELETE /carrinhos/:id: para excluir um carrinho específico pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.

const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas aos carrinhos.

const CarrinhoController = require("../controller/carrinho_controller.js");

router.post("/", CarrinhoController.cadastrar);

router.get("/", CarrinhoController.listar);

router.get("/:id", CarrinhoController.buscarPorId);

router.put("/:id", CarrinhoController.atualizar);

router.delete("/:id", CarrinhoController.excluir);

module.exports = router;