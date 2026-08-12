const express = require("express");
const router = express.Router();

const ClienteHasEnderecoController =
    require("../controller/cliente_has_endereco_controller.js");

router.post("/", ClienteHasEnderecoController.cadastrar);
router.get("/", ClienteHasEnderecoController.listar);

router.get("/cliente/:idCliente", ClienteHasEnderecoController.listarPorCliente);
router.get("/endereco/:idEndereco", ClienteHasEnderecoController.listarPorEndereco);

router.delete("/:idCliente/:idEndereco", ClienteHasEnderecoController.excluir);
router.delete("/cliente/:idCliente", ClienteHasEnderecoController.excluirPorCliente);
router.delete("/endereco/:idEndereco", ClienteHasEnderecoController.excluirPorEndereco);

module.exports = router;
