const express = require("express");
const router = express.Router();

const ClientesController =
    require("../controller/clientes_controller.js");

router.post("/", ClientesController.cadastrar);
router.post("/login", ClientesController.login);

router.get("/", ClientesController.listar);
router.get("/:id", ClientesController.buscarPorId);

router.put("/:id", ClientesController.atualizar);
router.delete("/:id", ClientesController.excluir);

module.exports = router;
