const express = require("express");
const router = express.Router();

const FormaPagamentoController =
    require("../controller/forma_pagamento_controller.js");

router.post("/", FormaPagamentoController.cadastrar);
router.get("/", FormaPagamentoController.listar);

router.get("/ativas", FormaPagamentoController.listarAtivas);
router.get("/nome/:nome", FormaPagamentoController.buscarPorNome);

router.get("/:id", FormaPagamentoController.buscarPorId);
router.put("/:id", FormaPagamentoController.atualizar);
router.delete("/:id", FormaPagamentoController.excluir);

module.exports = router;
