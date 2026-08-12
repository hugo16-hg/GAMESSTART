const express = require("express");
const router = express.Router();

const PromocaoHasProdutoController =
    require("../controller/promocao_has_produto_controller.js");

router.post("/", PromocaoHasProdutoController.cadastrar);
router.get("/", PromocaoHasProdutoController.listar);

router.get(
    "/promocao/:idPromocao",
    PromocaoHasProdutoController.listarPorPromocao
);

router.get(
    "/produto/:idProduto",
    PromocaoHasProdutoController.listarPorProduto
);

router.get(
    "/promocao/:idPromocao/produtos",
    PromocaoHasProdutoController.buscarProdutosPorPromocao
);

router.get(
    "/produto/:idProduto/promocoes",
    PromocaoHasProdutoController.buscarPromocoesProduto
);

router.delete(
    "/:idPromocao/:idProduto",
    PromocaoHasProdutoController.excluir
);

router.delete(
    "/promocao/:idPromocao",
    PromocaoHasProdutoController.excluirPorPromocao
);

router.delete(
    "/produto/:idProduto",
    PromocaoHasProdutoController.excluirPorProduto
);

module.exports = router;
