const CupomHasCategoriasModel = require("../model/cupom_has_categorias_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Cupom_id_cupom || !dados.Categorias_id_categorias) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe cupom e categoria." });
    }
    CupomHasCategoriasModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao vincular categoria ao cupom." });
        return res.status(201).json({ sucesso: true, mensagem: "Categoria vinculada ao cupom com sucesso." });
    });
}

function listar(req, res) {
    CupomHasCategoriasModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar vínculos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    CupomHasCategoriasModel.buscarPorId(req.params.idCupom, req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar vínculo.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Vínculo não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function listarPorCupom(req, res) {
    CupomHasCategoriasModel.listarPorCupom(req.params.idCupom, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar categorias do cupom.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function excluir(req, res) {
    CupomHasCategoriasModel.excluir(req.params.idCupom, req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculo." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Vínculo não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Vínculo excluído com sucesso." });
    });
}

function excluirPorCupom(req, res) {
    CupomHasCategoriasModel.excluirPorCupom(req.params.idCupom, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarPorCupom,
    excluir,
    excluirPorCupom
};
