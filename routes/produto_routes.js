const express = require("express");
const router = express.Router();

const ProdutoController =
    require("../controller/produto_controller.js");

router.post("/", ProdutoController.cadastrar);
router.get("/", ProdutoController.listar);

// Rotas específicas antes de /:id
router.get("/ativos", ProdutoController.listarAtivos);
router.get("/estoque", ProdutoController.listarEmEstoque);
router.get("/nome/:nome", ProdutoController.buscarPorNome);
router.get("/sku/:sku", ProdutoController.buscarPorSku);
router.get("/loja/:idLoja", ProdutoController.listarPorLoja);
router.get("/lojista/:idLojista", ProdutoController.listarPorLojista);

router.get("/:id", ProdutoController.buscarPorId);
router.put("/:id", ProdutoController.atualizar);
router.delete("/:id", ProdutoController.excluir);

module.exports = router;
