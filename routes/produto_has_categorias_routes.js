const express = require("express");
const router = express.Router();

const ProdutoHasCategoriasController =
    require("../controller/produto_has_categorias_controller.js");

router.post("/", ProdutoHasCategoriasController.cadastrar);
router.get("/", ProdutoHasCategoriasController.listar);

router.get("/produto/:idProduto", ProdutoHasCategoriasController.listarPorProduto);
router.get("/categoria/:idCategoria", ProdutoHasCategoriasController.listarPorCategoria);
router.get(
    "/categoria/:idCategoria/produtos",
    ProdutoHasCategoriasController.buscarProdutosPorCategoria
);

router.delete(
    "/:idProduto/:idCategoria",
    ProdutoHasCategoriasController.excluir
);

router.delete(
    "/produto/:idProduto",
    ProdutoHasCategoriasController.excluirPorProduto
);

router.delete(
    "/categoria/:idCategoria",
    ProdutoHasCategoriasController.excluirPorCategoria
);

module.exports = router;
