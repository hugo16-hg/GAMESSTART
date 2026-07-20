// nesse arquivo, definimos as rotas relacionadas às promoções e associamos cada rota a uma função do PromocaoController. As rotas são:
// POST /promocoes: para cadastrar uma nova promoção.
// GET /promocoes: para listar todas as promoções.
// GET /promocoes/:id: para buscar uma promoção específica pelo ID.
// PUT /promocoes/:id: para atualizar as informações de uma promoção específica pelo ID.
// DELETE /promocoes/:id: para excluir uma promoção específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às promoções.
const PromocaoController = require("../controller/promocao_controller.js");

router.post("/", PromocaoController.cadastrar);

router.get("/", PromocaoController.listar);

router.get("/:id", PromocaoController.buscarPorId);

router.put("/:id", PromocaoController.atualizar);

router.delete("/:id", PromocaoController.excluir);

module.exports = router;