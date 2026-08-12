const express = require("express");

const router = express.Router();

const LojistaController =
    require("../controller/lojista_controller.js");


//=====================================================
// CADASTRAR
//=====================================================

router.post(
    "/",
    LojistaController.cadastrar
);


//=====================================================
// LOGIN
//=====================================================

router.post(
    "/login",
    LojistaController.login
);


//=====================================================
// LISTAR
//=====================================================

router.get(
    "/",
    LojistaController.listar
);


//=====================================================
// BUSCAR POR ID
//=====================================================

router.get(
    "/:id",
    LojistaController.buscarPorId
);


//=====================================================
// ATUALIZAR
//=====================================================

router.put(
    "/:id",
    LojistaController.atualizar
);


//=====================================================
// EXCLUIR
//=====================================================

router.delete(
    "/:id",
    LojistaController.excluir
);


//=====================================================
// EXPORTAR
//=====================================================

module.exports = router;