// nesse arquivo, definimos as rotas relacionadas às associações entre categorias e cupons e associamos cada rota a uma função do CategoriaHasCupomController. As rotas são:
// POST /categoria-has-cupom: para cadastrar uma nova associação entre categoria e cupom.
// GET /categoria-has-cupom: para listar todas as associações entre categorias e cupons.
// GET /categoria-has-cupom/:id: para buscar uma associação específica pelo ID.
// PUT /categoria-has-cupom/:id: para atualizar as informações de uma associação específica pelo ID.
// DELETE /categoria-has-cupom/:id: para excluir uma associação específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre categorias e cupons.
const CategoriaHasCupomController = require("../controller/categoria_has_cupom_controller.js");

router.post("/", CategoriaHasCupomController.cadastrar);

router.get("/", CategoriaHasCupomController.listar);

router.get("/:id", CategoriaHasCupomController.buscarPorId);

router.put("/:id", CategoriaHasCupomController.atualizar);

router.delete("/:id", CategoriaHasCupomController.excluir);

module.exports = router;