const lojaModel = require("../model/loja_model.js");

function cadastrar(req, res) {

    const loja = req.body;

    if (
        !loja.nome ||
        !loja.whatsapp ||
        !loja.telefone ||
        !loja.email ||
        !loja.Lojista_id_lojista ||
        !loja.Endereco_id_endereco
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });
    }

    loja.instagram = loja.instagram || null;
    loja.facebook = loja.facebook || null;
    loja.linkedin = loja.linkedin || null;

    lojaModel.buscarPorEmail(loja.email, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao consultar o banco de dados.",
                erro: erro.message
            });
        }

        if (resultado.length > 0) {
            return res.status(409).json({
                sucesso: false,
                mensagem: "E-mail já cadastrado."
            });
        }

        lojaModel.cadastrar(loja, (erroCadastro, resultadoCadastro) => {
            if (erroCadastro) return res.status(500).json({ sucesso: false, mensagem: erroCadastro.sqlMessage || "Erro ao cadastrar loja." });
            return res.status(201).json({
                sucesso: true,
                mensagem: "Loja cadastrada com sucesso!",
                idLoja: resultadoCadastro.insertId
            });
        });
    });
}

function listar(req, res) {
    lojaModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar lojas.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    lojaModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar loja.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Loja não encontrada." });
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorNome(req, res) {
    lojaModel.buscarPorNome(req.params.nome, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar loja.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const loja = req.body;

    if (
        !loja.nome ||
        !loja.whatsapp ||
        !loja.telefone ||
        !loja.email ||
        !loja.Lojista_id_lojista ||
        !loja.Endereco_id_endereco
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });
    }

    loja.instagram = loja.instagram || null;
    loja.facebook = loja.facebook || null;
    loja.linkedin = loja.linkedin || null;

    lojaModel.atualizar(req.params.id, loja, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar loja." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Loja não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Loja atualizada com sucesso." });
    });
}

function excluir(req, res) {
    lojaModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir loja." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Loja não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Loja excluída com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    atualizar,
    excluir
};
