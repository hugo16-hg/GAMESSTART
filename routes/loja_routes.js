const express = require("express");
const router = express.Router();

const LojaController = require("../controller/loja_controller.js");

router.post("/", LojaController.cadastrar);
router.get("/", LojaController.listar);

router.get("/nome/:nome", LojaController.buscarPorNome);

router.get("/:id", LojaController.buscarPorId);
router.put("/:id", LojaController.atualizar);
router.delete("/:id", LojaController.excluir);

module.exports = router;
