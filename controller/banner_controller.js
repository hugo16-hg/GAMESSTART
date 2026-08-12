const bannerModel = require("../model/banner_model.js");

function cadastrar(req, res) {

    const banner = req.body;

    if (
        !banner.imagem ||
        !banner.data_inicio ||
        !banner.Loja_id_loja
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    banner.data_final = banner.data_final || null;

    if (banner.status_visibilidade === undefined) {
        banner.status_visibilidade = true;
    }

    bannerModel.cadastrar(banner, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.sqlMessage || "Erro ao cadastrar banner."
            });
        }

        return res.status(201).json({
            sucesso: true,
            mensagem: "Banner cadastrado com sucesso!",
            idBanner: resultado.insertId
        });
    });
}

function listar(req, res) {
    bannerModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar banners.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    bannerModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar banner.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Banner não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function listarVisiveis(req, res) {
    bannerModel.listarVisiveis((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar banners visíveis.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const banner = req.body;

    if (
        !banner.imagem ||
        !banner.data_inicio ||
        !banner.Loja_id_loja
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    banner.data_final = banner.data_final || null;

    if (banner.status_visibilidade === undefined) {
        banner.status_visibilidade = true;
    }

    bannerModel.atualizar(req.params.id, banner, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar banner." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Banner não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Banner atualizado com sucesso." });
    });
}

function excluir(req, res) {
    bannerModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir banner." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Banner não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Banner excluído com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarVisiveis,
    atualizar,
    excluir
};
