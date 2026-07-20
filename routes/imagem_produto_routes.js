// nesse arquivo, definimos as rotas relacionadas às imagens dos produtos e associamos cada rota a uma função do ImagemProdutoController. As rotas são:
// POST /imagens-produtos: para cadastrar uma nova imagem de produto.
// GET /imagens-produtos: para listar todas as imagens de produtos.
// GET /imagens-produtos/:id: para buscar uma imagem de produto específica pelo ID.
// PUT /imagens-produtos/:id: para atualizar as informações de uma imagem de produto específica pelo ID.
// DELETE /imagens-produtos/:id: para excluir uma imagem de produto específica pelo ID.

const express = require("express");
// Importando o módulo express para criar rotas e lidar com requisições HTTP.
const router = express.Router();
// Criando um objeto router para definir as rotas relacionadas às imagens dos produtos.
const ImagemProdutoController = require("../controller/imagem_produto_controller.js");

router.post("/", ImagemProdutoController.cadastrar);

router.get("/", ImagemProdutoController.listar);

router.get("/:id", ImagemProdutoController.buscarPorId);

router.put("/:id", ImagemProdutoController.atualizar);

router.delete("/:id", ImagemProdutoController.excluir);

module.exports = router;