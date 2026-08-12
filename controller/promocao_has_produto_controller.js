const PromocaoHasProdutoModel = require("../model/promocao_has_produto_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Promocao_id_promocao || !dados.Produto_id_produto) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe promoção e produto." });
    }
    PromocaoHasProdutoModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao vincular promoção ao produto." });
        return res.status(201).json({ sucesso: true, mensagem: "Produto vinculado à promoção com sucesso." });
    });
}

function listar(req, res) {
    PromocaoHasProdutoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar vínculos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorPromocao(req, res) {
    PromocaoHasProdutoModel.listarPorPromocao(req.params.idPromocao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar produtos da promoção.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorProduto(req, res) {
    PromocaoHasProdutoModel.listarPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar promoções do produto.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarProdutosPorPromocao(req, res) {
    PromocaoHasProdutoModel.buscarProdutosPorPromocao(req.params.idPromocao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar produtos da promoção.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPromocoesProduto(req, res) {
    PromocaoHasProdutoModel.buscarPromocoesProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar promoções do produto.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function excluir(req, res) {
    PromocaoHasProdutoModel.excluir(req.params.idPromocao, req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculo." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Vínculo não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Vínculo excluído com sucesso." });
    });
}

function excluirPorPromocao(req, res) {
    PromocaoHasProdutoModel.excluirPorPromocao(req.params.idPromocao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

function excluirPorProduto(req, res) {
    PromocaoHasProdutoModel.excluirPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    listarPorPromocao,
    listarPorProduto,
    buscarProdutosPorPromocao,
    buscarPromocoesProduto,
    excluir,
    excluirPorPromocao,
    excluirPorProduto
};
