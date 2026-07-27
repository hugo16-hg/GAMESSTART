// Neste arquivo, definimos as rotas relacionadas às associações entre cupons e categorias
// e associamos cada rota a uma função do CupomHasCategoriasController. As rotas são:
// POST /cupom_has_categorias: para cadastrar uma nova associação entre um cupom e uma categoria.
// GET /cupom_has_categorias: para listar todas as associações entre cupons e categorias.
// GET /cupom_has_categorias/:cupom/:categoria: para buscar uma associação específica pelos IDs do cupom e da categoria.
// PUT /cupom_has_categorias/:cupom/:categoria: para atualizar uma associação específica pelos IDs do cupom e da categoria.
// DELETE /cupom_has_categorias/:cupom/:categoria: para excluir uma associação específica pelos IDs do cupom e da categoria.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.

const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às associações entre cupons e categorias.

const CupomHasCategoriasController = require("../controller/cupom_has_categorias_controller.js");

router.post("/", CupomHasCategoriasController.cadastrar);

router.get("/", CupomHasCategoriasController.listar);

router.get("/:cupom/:categoria", CupomHasCategoriasController.buscarPorId);

router.put("/:cupom/:categoria", CupomHasCategoriasController.atualizar);

router.delete("/:cupom/:categoria", CupomHasCategoriasController.excluir);

module.exports = router;