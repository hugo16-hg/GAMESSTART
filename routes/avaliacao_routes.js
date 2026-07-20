// Nesse arquivo, definimos as rotas relacionadas às avaliações e associamos
// cada rota a uma função do AvaliacaoController.
// As rotas são:
// POST /avaliacoes: para cadastrar uma nova avaliação.
// GET /avaliacoes: para listar todas as avaliações.
// GET /avaliacoes/:id: para buscar uma avaliação específica pelo ID.
// PUT /avaliacoes/:id: para atualizar as informações de uma avaliação específica pelo ID.
// DELETE /avaliacoes/:id: para excluir uma avaliação específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.

const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às avaliações.

const AvaliacaoController = require("../controller/avaliacao_controller.js");

router.post("/", AvaliacaoController.cadastrar);

router.get("/", AvaliacaoController.listar);

router.get("/:id", AvaliacaoController.buscarPorId);

router.put("/:id", AvaliacaoController.atualizar);

router.delete("/:id", AvaliacaoController.excluir);

module.exports = router;