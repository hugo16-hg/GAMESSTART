// Neste arquivo, definimos as rotas relacionadas às associações entre clientes e endereços
// e associamos cada rota a uma função do ClienteHasEnderecoController. As rotas são:
// POST /clientes_has_endereco: para cadastrar uma nova associação entre um cliente e um endereço.
// GET /clientes_has_endereco: para listar todas as associações entre clientes e endereços.
// GET /clientes_has_endereco/:cliente/:endereco: para buscar uma associação específica pelos IDs do cliente e do endereço.
// PUT /clientes_has_endereco/:cliente/:endereco: para atualizar uma associação específica pelos IDs do cliente e do endereço.
// DELETE /clientes_has_endereco/:cliente/:endereco: para excluir uma associação específica pelos IDs do cliente e do endereço.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.

const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre clientes e endereços.

const ClienteHasEnderecoController = require("../controller/clientes_has_endereco_controller.js");

router.post("/", ClienteHasEnderecoController.cadastrar);

router.get("/", ClienteHasEnderecoController.listar);

router.get("/:cliente/:endereco", ClienteHasEnderecoController.buscarPorId);

router.put("/:cliente/:endereco", ClienteHasEnderecoController.atualizar);

router.delete("/:cliente/:endereco", ClienteHasEnderecoController.excluir);

module.exports = router;