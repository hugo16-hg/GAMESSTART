const express = require("express");
const router = express.Router();

const ProdutoHasCarrinhoController =
    require("../controller/produto_has_carrinho_controller.js");

router.post("/", ProdutoHasCarrinhoController.cadastrar);
router.get("/", ProdutoHasCarrinhoController.listar);

router.get("/carrinho/:idCarrinho", ProdutoHasCarrinhoController.listarPorCarrinho);
router.get("/produto/:idProduto", ProdutoHasCarrinhoController.listarPorProduto);

router.put(
    "/:idProduto/:idCarrinho/quantidade",
    ProdutoHasCarrinhoController.atualizarQuantidade
);

router.delete(
    "/:idProduto/:idCarrinho",
    ProdutoHasCarrinhoController.excluir
);

router.delete(
    "/carrinho/:idCarrinho",
    ProdutoHasCarrinhoController.excluirPorCarrinho
);

module.exports = router;
