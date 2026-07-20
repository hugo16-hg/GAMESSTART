// nesse arquivo, definimos as rotas relacionadas aos clientes e associamos cada rota a uma função do ClienteController. As rotas são:
// POST /clientes: para cadastrar um novo cliente.
// GET /clientes: para listar todos os clientes.
// GET /clientes/:id: para buscar um cliente específico pelo ID.
// PUT /clientes/:id: para atualizar as informações de um cliente específico pelo ID.
// DELETE /clientes/:id: para excluir um cliente específico pelo ID.


const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas aos clientes.
const ClienteController = require("../controller/cliente_controller.js");

router.post("/", ClienteController.cadastrar);

router.get("/", ClienteController.listar);

router.get("/:id", ClienteController.buscarPorId);

router.put("/:id", ClienteController.atualizar);

router.delete("/:id", ClienteController.excluir);

module.exports = router;