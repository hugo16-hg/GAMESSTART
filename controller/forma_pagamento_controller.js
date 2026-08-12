const formaPagamentoModel = require("../model/forma_pagamento_model.js");

function cadastrar(req, res) {

    const formaPagamento = req.body;

    if (!formaPagamento.nome) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o nome da forma de pagamento."
        });
    }

    formaPagamento.link = formaPagamento.link || null;

    if (formaPagamento.ativo === undefined) {
        formaPagamento.ativo = true;
    }

    formaPagamentoModel.cadastrar(formaPagamento, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar forma de pagamento." });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Forma de pagamento cadastrada com sucesso!",
            idFormaPagamento: resultado.insertId
        });
    });
}

function listar(req, res) {
    formaPagamentoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar formas de pagamento.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    formaPagamentoModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar forma de pagamento.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Forma de pagamento não encontrada." });
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorNome(req, res) {
    formaPagamentoModel.buscarPorNome(req.params.nome, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar forma de pagamento.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarAtivas(req, res) {
    formaPagamentoModel.listarAtivas((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar formas ativas.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const formaPagamento = req.body;

    if (!formaPagamento.nome) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o nome da forma de pagamento."
        });
    }

    formaPagamento.link = formaPagamento.link || null;

    if (formaPagamento.ativo === undefined) {
        formaPagamento.ativo = true;
    }

    formaPagamentoModel.atualizar(req.params.id, formaPagamento, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar forma de pagamento." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Forma de pagamento não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Forma de pagamento atualizada com sucesso." });
    });
}

function excluir(req, res) {
    formaPagamentoModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir forma de pagamento." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Forma de pagamento não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Forma de pagamento excluída com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    listarAtivas,
    atualizar,
    excluir
};
