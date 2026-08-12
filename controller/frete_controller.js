const freteModel = require("../model/frete_model.js");

function cadastrar(req, res) {

    const frete = req.body;

    if (
        frete.valor === undefined ||
        !frete.tipo ||
        !frete.Pedidos_id_pedidos
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    frete.bairro = frete.bairro || null;
    frete.codigo_rastreio = frete.codigo_rastreio || null;

    if (frete.entrega_full === undefined) {
        frete.entrega_full = false;
    }

    freteModel.cadastrar(frete, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar frete." });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Frete cadastrado com sucesso!",
            idFrete: resultado.insertId
        });
    });
}

function listar(req, res) {
    freteModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar fretes.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    freteModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar frete.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Frete não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorPedido(req, res) {
    freteModel.buscarPorPedido(req.params.idPedido, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar frete.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorCodigoRastreio(req, res) {
    freteModel.buscarPorCodigoRastreio(req.params.codigo, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar rastreio.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarEntregaFull(req, res) {
    freteModel.listarEntregaFull((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar entregas full.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const frete = req.body;

    if (
        frete.valor === undefined ||
        !frete.tipo ||
        !frete.Pedidos_id_pedidos
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha os campos obrigatórios."
        });
    }

    frete.bairro = frete.bairro || null;
    frete.codigo_rastreio = frete.codigo_rastreio || null;

    if (frete.entrega_full === undefined) {
        frete.entrega_full = false;
    }

    freteModel.atualizar(req.params.id, frete, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar frete." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Frete não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Frete atualizado com sucesso." });
    });
}

function excluir(req, res) {
    freteModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir frete." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Frete não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Frete excluído com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorPedido,
    buscarPorCodigoRastreio,
    listarEntregaFull,
    atualizar,
    excluir
};
