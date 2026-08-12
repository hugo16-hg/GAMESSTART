const express = require("express");
const router = express.Router();

const PromocaoController =
    require("../controller/promocao_controller.js");

router.post("/", PromocaoController.cadastrar);
router.get("/", PromocaoController.listar);

router.get("/ativas", PromocaoController.listarAtivas);

router.get("/:id", PromocaoController.buscarPorId);
router.put("/:id", PromocaoController.atualizar);
router.delete("/:id", PromocaoController.excluir);

module.exports = router;
