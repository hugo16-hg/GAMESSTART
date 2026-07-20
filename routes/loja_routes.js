// nesse arquivo, definimos as rotas relacionadas às lojas e associamos cada rota a uma função do LojaController. As rotas são:
// POST /lojas: para cadastrar uma nova loja.
// GET /lojas: para listar todas as lojas.
// GET /lojas/:id: para buscar uma loja específica pelo ID.
// PUT /lojas/:id: para atualizar as informações de uma loja específica pelo ID.
// DELETE /lojas/:id: para excluir uma loja específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às lojas.
const LojaController = require("../controller/loja_controller.js");

router.post("/", LojaController.cadastrar);

router.get("/", LojaController.listar);

router.get("/:id", LojaController.buscarPorId);

router.put("/:id", LojaController.atualizar);

router.delete("/:id", LojaController.excluir);

module.exports = router;