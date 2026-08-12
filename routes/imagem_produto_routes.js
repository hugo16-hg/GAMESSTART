const express = require("express");
const router = express.Router();

const ImagemProdutoController =
    require("../controller/imagem_produto_controller.js");

router.post("/", ImagemProdutoController.cadastrar);
router.get("/", ImagemProdutoController.listar);

router.get("/produto/:idProduto", ImagemProdutoController.listarPorProduto);
router.delete("/produto/:idProduto", ImagemProdutoController.excluirPorProduto);

router.get("/:id", ImagemProdutoController.buscarPorId);
router.put("/:id", ImagemProdutoController.atualizar);
router.delete("/:id", ImagemProdutoController.excluir);

module.exports = router;
