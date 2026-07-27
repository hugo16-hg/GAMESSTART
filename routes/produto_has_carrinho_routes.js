// Neste arquivo, definimos as rotas relacionadas às associações entre produtos e carrinhos
// e associamos cada rota a uma função do ProdutoHasCarrinhoController. As rotas são:
// POST /produto_has_carrinho: para cadastrar uma nova associação entre um produto e um carrinho.
// GET /produto_has_carrinho: para listar todas as associações entre produtos e carrinhos.
// GET /produto_has_carrinho/:produto/:carrinho: para buscar uma associação específica pelos IDs do produto e do carrinho.
// PUT /produto_has_carrinho/:produto/:carrinho: para atualizar uma associação específica pelos IDs do produto e do carrinho.
// DELETE /produto_has_carrinho/:produto/:carrinho: para excluir uma associação específica pelos IDs do produto e do carrinho.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.

const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre produtos e carrinhos.

const ProdutoHasCarrinhoController = require("../controller/produto_has_carrinho.js");

router.post("/", ProdutoHasCarrinhoController.cadastrar);

router.get("/", ProdutoHasCarrinhoController.listar);

router.get("/:produto/:carrinho", ProdutoHasCarrinhoController.buscarPorId);

router.put("/:produto/:carrinho", ProdutoHasCarrinhoController.atualizar);

router.delete("/:produto/:carrinho", ProdutoHasCarrinhoController.excluir);

module.exports = router;