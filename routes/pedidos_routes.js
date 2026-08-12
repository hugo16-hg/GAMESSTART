const express = require("express");
const router = express.Router();

const PedidosController =
    require("../controller/pedidos_controller.js");

router.post("/", PedidosController.cadastrar);
router.get("/", PedidosController.listar);

// Rotas específicas antes de /:id
router.get("/codigo/:codigo", PedidosController.buscarPorCodigo);
router.get("/cliente/:idCliente", PedidosController.listarPorCliente);
router.get("/loja/:idLoja", PedidosController.listarPorLoja);
router.get("/status-entrega/:status", PedidosController.listarPorStatusEntrega);
router.get("/status-pagamento/:status", PedidosController.listarPorStatusPagamento);

router.get("/:id", PedidosController.buscarPorId);
router.put("/:id", PedidosController.atualizar);
router.delete("/:id", PedidosController.excluir);

module.exports = router;
