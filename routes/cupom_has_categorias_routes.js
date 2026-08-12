const express = require("express");
const router = express.Router();

const CupomHasCategoriasController =
    require("../controller/cupom_has_categorias_controller.js");

router.post("/", CupomHasCategoriasController.cadastrar);
router.get("/", CupomHasCategoriasController.listar);

router.get("/cupom/:idCupom", CupomHasCategoriasController.listarPorCupom);
router.get("/:idCupom/:idCategoria", CupomHasCategoriasController.buscarPorId);

router.delete("/:idCupom/:idCategoria", CupomHasCategoriasController.excluir);
router.delete("/cupom/:idCupom", CupomHasCategoriasController.excluirPorCupom);

module.exports = router;
