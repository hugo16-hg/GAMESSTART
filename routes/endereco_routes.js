const express = require("express");
const router = express.Router();

const EnderecoController =
    require("../controller/endereco_controller.js");

router.post("/", EnderecoController.cadastrar);
router.get("/", EnderecoController.listar);

router.get("/cep/:cep", EnderecoController.buscarPorCEP);

router.get("/:id", EnderecoController.buscarPorId);
router.put("/:id", EnderecoController.atualizar);
router.delete("/:id", EnderecoController.excluir);

module.exports = router;
