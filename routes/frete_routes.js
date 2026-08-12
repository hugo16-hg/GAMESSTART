const express = require("express");
const router = express.Router();

const FreteController =
    require("../controller/frete_controller.js");

router.post("/", FreteController.cadastrar);
router.get("/", FreteController.listar);

router.get("/pedido/:idPedido", FreteController.buscarPorPedido);
router.get("/rastreio/:codigo", FreteController.buscarPorCodigoRastreio);
router.get("/entrega-full", FreteController.listarEntregaFull);

router.get("/:id", FreteController.buscarPorId);
router.put("/:id", FreteController.atualizar);
router.delete("/:id", FreteController.excluir);

module.exports = router;
