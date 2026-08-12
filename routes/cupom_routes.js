const express = require("express");
const router = express.Router();

const CupomController = require("../controller/cupom_controller.js");

router.post("/", CupomController.cadastrar);
router.get("/", CupomController.listar);

router.get("/validos", CupomController.listarValidos);

router.get("/:id", CupomController.buscarPorId);
router.put("/:id", CupomController.atualizar);
router.delete("/:id", CupomController.excluir);

module.exports = router;
