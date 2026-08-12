const BannerHasProdutoModel = require("../model/banner_has_produto_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Banner_id_banner || !dados.Produto_id_produto) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe banner e produto." });
    }
    BannerHasProdutoModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao vincular produto ao banner." });
        return res.status(201).json({ sucesso: true, mensagem: "Produto vinculado ao banner com sucesso." });
    });
}

function listar(req, res) {
    BannerHasProdutoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar vínculos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorBanner(req, res) {
    BannerHasProdutoModel.listarPorBanner(req.params.idBanner, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar produtos do banner.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorProduto(req, res) {
    BannerHasProdutoModel.listarPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar banners do produto.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarProdutosPorBanner(req, res) {
    BannerHasProdutoModel.buscarProdutosPorBanner(req.params.idBanner, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar produtos do banner.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function excluir(req, res) {
    BannerHasProdutoModel.excluir(req.params.idBanner, req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculo." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Vínculo não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Vínculo excluído com sucesso." });
    });
}

function excluirPorBanner(req, res) {
    BannerHasProdutoModel.excluirPorBanner(req.params.idBanner, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    listarPorBanner,
    listarPorProduto,
    buscarProdutosPorBanner,
    excluir,
    excluirPorBanner
};
