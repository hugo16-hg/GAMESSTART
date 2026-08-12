const express = require("express");
const router = express.Router();

const CartaoPagamentoController =
    require("../controller/cartao_pagamento_controller.js");

router.post("/", CartaoPagamentoController.cadastrar);
router.get("/", CartaoPagamentoController.listar);

router.get("/ativos", CartaoPagamentoController.listarAtivos);
router.get("/cliente/:idCliente", CartaoPagamentoController.listarPorCliente);

router.get("/:id", CartaoPagamentoController.buscarPorId);
router.put("/:id", CartaoPagamentoController.atualizar);
router.delete("/:id", CartaoPagamentoController.excluir);

module.exports = router;
