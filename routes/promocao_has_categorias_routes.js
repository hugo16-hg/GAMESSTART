// nesse arquivo, definimos as rotas relacionadas às associações entre promoções e categorias e associamos cada rota a uma função do PromocaoHasCategoriasController. As rotas são:
// POST /promocao-has-categorias: para cadastrar uma nova associação entre promoção e categoria.
// GET /promocao-has-categorias: para listar todas as associações entre promoções e categorias.
// GET /promocao-has-categorias/:id: para buscar uma associação específica pelo ID.
// PUT /promocao-has-categorias/:id: para atualizar as informações de uma associação específica pelo ID.
// DELETE /promocao-has-categorias/:id: para excluir uma associação específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre promoções e categorias.
const PromocaoHasCategoriasController = require("../controller/promocao_has_categorias_controller.js");

router.post("/", PromocaoHasCategoriasController.cadastrar);

router.get("/", PromocaoHasCategoriasController.listar);

router.get("/:id", PromocaoHasCategoriasController.buscarPorId);

router.put("/:id", PromocaoHasCategoriasController.atualizar);

router.delete("/:id", PromocaoHasCategoriasController.excluir);

module.exports = router;