// nesse arquivo, definimos as rotas relacionadas às associações entre produtos e categorias e associamos cada rota a uma função do ProdutoHasCategoriasController. As rotas são:
// POST /produto-has-categorias: para cadastrar uma nova associação entre produto e categoria.
// GET /produto-has-categorias: para listar todas as associações entre produtos e categorias.
// GET /produto-has-categorias/:id: para buscar uma associação específica pelo ID.
// PUT /produto-has-categorias/:id: para atualizar as informações de uma associação específica pelo ID.
// DELETE /produto-has-categorias/:id: para excluir uma associação específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre produtos e categorias.
const ProdutoHasCategoriasController = require("../controller/produto_has_categorias_controller.js");

router.post("/", ProdutoHasCategoriasController.cadastrar);

router.get("/", ProdutoHasCategoriasController.listar);

router.get("/:id", ProdutoHasCategoriasController.buscarPorId);

router.put("/:id", ProdutoHasCategoriasController.atualizar);

router.delete("/:id", ProdutoHasCategoriasController.excluir);

module.exports = router;