// nesse arquivo, definimos as rotas relacionadas aos endereços e associamos cada rota a uma função do EnderecoController. As rotas são:
// POST /enderecos: para cadastrar um novo endereço.
// GET /enderecos: para listar todos os endereços.
// GET /enderecos/:id: para buscar um endereço específico pelo ID.
// PUT /enderecos/:id: para atualizar as informações de um endereço específico pelo ID.
// DELETE /enderecos/:id: para excluir um endereço específico pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas aos endereços.
const EnderecoController = require("../controller/endereco_controller.js");

router.post("/", EnderecoController.cadastrar);

router.get("/", EnderecoController.listar);

router.get("/:id", EnderecoController.buscarPorId);

router.put("/:id", EnderecoController.atualizar);

router.delete("/:id", EnderecoController.excluir);

module.exports = router;