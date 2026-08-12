const ProdutoHasCategoriasModel = require("../model/produto_has_categorias_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Produto_id_produto || !dados.Categorias_id_categorias) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe produto e categoria." });
    }
    ProdutoHasCategoriasModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao vincular categoria ao produto." });
        return res.status(201).json({ sucesso: true, mensagem: "Categoria vinculada ao produto com sucesso." });
    });
}

function listar(req, res) {
    ProdutoHasCategoriasModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar vínculos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorProduto(req, res) {
    ProdutoHasCategoriasModel.listarPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar categorias do produto.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorCategoria(req, res) {
    ProdutoHasCategoriasModel.listarPorCategoria(req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar produtos da categoria.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarProdutosPorCategoria(req, res) {
    ProdutoHasCategoriasModel.buscarProdutosPorCategoria(req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar produtos da categoria.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function excluir(req, res) {
    ProdutoHasCategoriasModel.excluir(req.params.idProduto, req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculo." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Vínculo não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Vínculo excluído com sucesso." });
    });
}

function excluirPorProduto(req, res) {
    ProdutoHasCategoriasModel.excluirPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

function excluirPorCategoria(req, res) {
    ProdutoHasCategoriasModel.excluirPorCategoria(req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    listarPorProduto,
    listarPorCategoria,
    buscarProdutosPorCategoria,
    excluir,
    excluirPorProduto,
    excluirPorCategoria
};
