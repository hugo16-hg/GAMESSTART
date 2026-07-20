// nesse arquivo, definimos as rotas relacionadas aos lojistas e associamos cada rota a uma função do LojistaController. As rotas são:
// POST /lojistas: para cadastrar um novo lojista.
// GET /lojistas: para listar todos os lojistas.
// GET /lojistas/:id: para buscar um lojista específico pelo ID.
// PUT /lojistas/:id: para atualizar as informações de um lojista específico pelo ID.
// DELETE /lojistas/:id: para excluir um lojista específico pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas aos lojistas.
const LojistaController = require("../controller/lojista_controller.js");

router.post("/", LojistaController.cadastrar);

router.get("/", LojistaController.listar);

router.get("/:id", LojistaController.buscarPorId);

router.put("/:id", LojistaController.atualizar);

router.delete("/:id", LojistaController.excluir);

module.exports = router;