const CupomHasProdutoModel = require("../model/cupom_has_produto_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Cupom_id_cupom || !dados.Produto_id_produto) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe cupom e produto." });
    }
    CupomHasProdutoModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao vincular cupom ao produto." });
        return res.status(201).json({ sucesso: true, mensagem: "Produto vinculado ao cupom com sucesso." });
    });
}

function listar(req, res) {
    CupomHasProdutoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar vínculos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorCupom(req, res) {
    CupomHasProdutoModel.listarPorCupom(req.params.idCupom, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar produtos do cupom.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorProduto(req, res) {
    CupomHasProdutoModel.listarPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar cupons do produto.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarProdutosPorCupom(req, res) {
    CupomHasProdutoModel.buscarProdutosPorCupom(req.params.idCupom, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar produtos do cupom.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function excluir(req, res) {
    CupomHasProdutoModel.excluir(req.params.idCupom, req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculo." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Vínculo não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Vínculo excluído com sucesso." });
    });
}

function excluirPorCupom(req, res) {
    CupomHasProdutoModel.excluirPorCupom(req.params.idCupom, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

function excluirPorProduto(req, res) {
    CupomHasProdutoModel.excluirPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    listarPorCupom,
    listarPorProduto,
    buscarProdutosPorCupom,
    excluir,
    excluirPorCupom,
    excluirPorProduto
};
