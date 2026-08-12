const express = require("express");
const router = express.Router();

const ProdutoHasPedidosController =
    require("../controller/produto_has_pedidos_controller.js");

router.post("/", ProdutoHasPedidosController.cadastrar);
router.get("/", ProdutoHasPedidosController.listar);

router.get("/pedido/:idPedido", ProdutoHasPedidosController.listarPorPedido);
router.get(
    "/pedido/:idPedido/produtos",
    ProdutoHasPedidosController.buscarProdutosDoPedido
);

router.put(
    "/:idProduto/:idPedido",
    ProdutoHasPedidosController.atualizar
);

router.delete(
    "/:idProduto/:idPedido",
    ProdutoHasPedidosController.excluir
);

module.exports = router;
