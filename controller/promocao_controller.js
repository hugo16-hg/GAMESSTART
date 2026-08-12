const promocaoModel = require("../model/promocao_model.js");

function cadastrar(req, res) {

    const promocao = req.body;

    if (
        !promocao.data_inicio ||
        promocao.valor_promocional === undefined ||
        !promocao.nome
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    promocao.data_final = promocao.data_final || null;
    promocao.Banner_id_banner = promocao.Banner_id_banner || null;

    promocaoModel.cadastrar(promocao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar promoção." });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Promoção cadastrada com sucesso!",
            idPromocao: resultado.insertId
        });
    });
}

function listar(req, res) {
    promocaoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar promoções.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    promocaoModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar promoção.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Promoção não encontrada." });
        return res.status(200).json(resultado[0]);
    });
}

function listarAtivas(req, res) {
    promocaoModel.listarAtivas((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar promoções ativas.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const promocao = req.body;

    if (
        !promocao.data_inicio ||
        promocao.valor_promocional === undefined ||
        !promocao.nome
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    promocao.data_final = promocao.data_final || null;
    promocao.Banner_id_banner = promocao.Banner_id_banner || null;

    promocaoModel.atualizar(req.params.id, promocao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar promoção." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Promoção não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Promoção atualizada com sucesso." });
    });
}

function excluir(req, res) {
    promocaoModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir promoção." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Promoção não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Promoção excluída com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarAtivas,
    atualizar,
    excluir
};
