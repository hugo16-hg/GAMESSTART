// nesse arquivo, definimos as rotas relacionadas às categorias e associamos cada rota a uma função do CategoriaController. As rotas são:
// POST /categorias: para cadastrar uma nova categoria.
// GET /categorias: para listar todas as categorias.
// GET /categorias/:id: para buscar uma categoria específica pelo ID.
// PUT /categorias/:id: para atualizar as informações de uma categoria específica pelo ID.
// DELETE /categorias/:id: para excluir uma categoria específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às categorias.
const CategoriaController = require("../controller/categorias_controller.js");

router.post("/", CategoriaController.cadastrar);

router.get("/", CategoriaController.listar);

router.get("/:id", CategoriaController.buscarPorId);

router.put("/:id", CategoriaController.atualizar);

router.delete("/:id", CategoriaController.excluir);

module.exports = router;
