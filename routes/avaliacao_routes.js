const express = require("express");
const router = express.Router();

const AvaliacaoController = require("../controller/avaliacao_controller.js");

router.post("/", AvaliacaoController.cadastrar);
router.get("/", AvaliacaoController.listar);
router.get("/:id", AvaliacaoController.buscarPorId);
router.put("/:id", AvaliacaoController.atualizar);
router.delete("/:id", AvaliacaoController.excluir);

module.exports = router;
