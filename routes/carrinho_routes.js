const express = require("express");
const router = express.Router();

const CarrinhoController = require("../controller/carrinho_controller.js");

router.post("/", CarrinhoController.cadastrar);
router.get("/", CarrinhoController.listar);

router.get("/cliente/:idCliente", CarrinhoController.buscarPorCliente);

router.get("/:id", CarrinhoController.buscarPorId);
router.put("/:id", CarrinhoController.atualizar);
router.delete("/:id", CarrinhoController.excluir);

module.exports = router;
