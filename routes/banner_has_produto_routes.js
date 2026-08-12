const express = require("express");
const router = express.Router();

const BannerHasProdutoController =
    require("../controller/banner_has_produto_controller.js");

router.post("/", BannerHasProdutoController.cadastrar);
router.get("/", BannerHasProdutoController.listar);

router.get("/banner/:idBanner", BannerHasProdutoController.listarPorBanner);
router.get("/produto/:idProduto", BannerHasProdutoController.listarPorProduto);
router.get("/banner/:idBanner/produtos", BannerHasProdutoController.buscarProdutosPorBanner);

router.delete("/:idBanner/:idProduto", BannerHasProdutoController.excluir);
router.delete("/banner/:idBanner", BannerHasProdutoController.excluirPorBanner);

module.exports = router;
