const express = require("express");
const router = express.Router();

const CupomHasProdutoController =
    require("../controller/cupom_has_produto_controller.js");

router.post("/", CupomHasProdutoController.cadastrar);
router.get("/", CupomHasProdutoController.listar);

router.get("/cupom/:idCupom", CupomHasProdutoController.listarPorCupom);
router.get("/produto/:idProduto", CupomHasProdutoController.listarPorProduto);
router.get("/cupom/:idCupom/produtos", CupomHasProdutoController.buscarProdutosPorCupom);

router.delete("/:idCupom/:idProduto", CupomHasProdutoController.excluir);
router.delete("/cupom/:idCupom", CupomHasProdutoController.excluirPorCupom);
router.delete("/produto/:idProduto", CupomHasProdutoController.excluirPorProduto);

module.exports = router;
