// nesse arquivo, definimos as rotas relacionadas às associações entre promoções e produtos e associamos cada rota a uma função do PromocaoHasProdutoController. As rotas são:
// POST /promocao-has-produto: para cadastrar uma nova associação entre promoção e produto.
// GET /promocao-has-produto: para listar todas as associações entre promoções e produtos.
// GET /promocao-has-produto/:id: para buscar uma associação específica pelo ID.
// PUT /promocao-has-produto/:id: para atualizar as informações de uma associação específica pelo ID.
// DELETE /promocao-has-produto/:id: para excluir uma associação específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre promoções e produtos.
const PromocaoHasProdutoController = require("../controller/promocao_has_produto_controller.js");

router.post("/", PromocaoHasProdutoController.cadastrar);

router.get("/", PromocaoHasProdutoController.listar);

router.get("/:id", PromocaoHasProdutoController.buscarPorId);

router.put("/:id", PromocaoHasProdutoController.atualizar);

router.delete("/:id", PromocaoHasProdutoController.excluir);

module.exports = router;
