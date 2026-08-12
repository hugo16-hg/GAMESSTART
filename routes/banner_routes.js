const express = require("express");
const router = express.Router();

const BannerController = require("../controller/banner_controller.js");

router.post("/", BannerController.cadastrar);
router.get("/", BannerController.listar);

// Rotas específicas antes de /:id
router.get("/visiveis", BannerController.listarVisiveis);

router.get("/:id", BannerController.buscarPorId);
router.put("/:id", BannerController.atualizar);
router.delete("/:id", BannerController.excluir);

module.exports = router;
