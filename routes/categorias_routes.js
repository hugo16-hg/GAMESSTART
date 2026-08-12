const express = require("express");
const router = express.Router();

const CategoriasController =
    require("../controller/categorias_controller.js");

router.post("/", CategoriasController.cadastrar);
router.get("/", CategoriasController.listar);

router.get("/nome/:nome", CategoriasController.buscarPorNome);

router.get("/:id", CategoriasController.buscarPorId);
router.put("/:id", CategoriasController.atualizar);
router.delete("/:id", CategoriasController.excluir);

module.exports = router;
