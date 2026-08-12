const express = require("express");
const router = express.Router();

const PromocaoHasCategoriasController =
    require("../controller/promocao_has_categorias_controller.js");

router.post("/", PromocaoHasCategoriasController.cadastrar);
router.get("/", PromocaoHasCategoriasController.listar);

router.get(
    "/promocao/:idPromocao",
    PromocaoHasCategoriasController.listarPorPromocao
);

router.get(
    "/promocao/:idPromocao/categorias",
    PromocaoHasCategoriasController.buscarCategoriasPorPromocao
);

router.get(
    "/categoria/:idCategoria/promocoes",
    PromocaoHasCategoriasController.buscarPromocoesPorCategoria
);

router.get(
    "/categoria/:idCategoria/ativas",
    PromocaoHasCategoriasController.listarPromocoesAtivasPorCategoria
);

router.delete(
    "/:idPromocao/:idCategoria",
    PromocaoHasCategoriasController.excluir
);

module.exports = router;
