const cartaoPagamentoModel = require("../model/cartao_pagamento_model.js");

function cadastrar(req, res) {

    const cartao = req.body;

    if (
        !cartao.numero ||
        !cartao.data_vencimento ||
        !cartao.cvc ||
        !cartao.cpf ||
        !cartao.nome_proprietario ||
        !cartao.bandeira ||
        !cartao.tipo ||
        !cartao.Cliente_id_cliente
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    cartao.nome_identificacao = cartao.nome_identificacao || null;

    if (cartao.ativo === undefined) {
        cartao.ativo = true;
    }

    cartaoPagamentoModel.cadastrar(cartao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar cartão." });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Cartão de pagamento cadastrado com sucesso!",
            idCartaoPagamento: resultado.insertId
        });
    });
}

function listar(req, res) {
    cartaoPagamentoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar cartões.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    cartaoPagamentoModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar cartão.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Cartão não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function listarPorCliente(req, res) {
    cartaoPagamentoModel.listarPorCliente(req.params.idCliente, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar cartões.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarAtivos(req, res) {
    cartaoPagamentoModel.listarAtivos((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar cartões ativos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const cartao = req.body;

    if (
        !cartao.numero ||
        !cartao.data_vencimento ||
        !cartao.cvc ||
        !cartao.cpf ||
        !cartao.nome_proprietario ||
        !cartao.bandeira ||
        !cartao.tipo ||
        !cartao.Cliente_id_cliente
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    cartao.nome_identificacao = cartao.nome_identificacao || null;

    if (cartao.ativo === undefined) {
        cartao.ativo = true;
    }

    cartaoPagamentoModel.atualizar(req.params.id, cartao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar cartão." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Cartão não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Cartão atualizado com sucesso." });
    });
}

function excluir(req, res) {
    cartaoPagamentoModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir cartão." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Cartão não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Cartão excluído com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarPorCliente,
    listarAtivos,
    atualizar,
    excluir
};
