const pedidosModel = require("../model/pedidos_model.js");

function cadastrar(req, res) {

    const pedido = req.body;

    if (
        !pedido.data_pedido ||
        !pedido.status_entrega ||
        !pedido.status_pagamento ||
        !pedido.codigo ||
        !pedido.Cliente_id_cliente ||
        !pedido.Loja_id_loja ||
        !pedido.Endereco_id_endereco ||
        !pedido.Forma_Pagamento_id_forma_pagamento
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });
    }

    pedido.data_entrega = pedido.data_entrega || null;
    pedido.nota_fiscal = pedido.nota_fiscal || null;

    pedidosModel.cadastrar(pedido, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.sqlMessage || "Erro ao cadastrar pedido."
            });
        }
        return res.status(201).json({
            sucesso: true,
            mensagem: "Pedido cadastrado com sucesso!",
            idPedido: resultado.insertId
        });
    });
}

function listar(req, res) {
    pedidosModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar pedidos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    pedidosModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar pedido.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Pedido não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorCodigo(req, res) {
    pedidosModel.buscarPorCodigo(req.params.codigo, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar pedido.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Pedido não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function listarPorCliente(req, res) {
    pedidosModel.listarPorCliente(req.params.idCliente, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar pedidos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorLoja(req, res) {
    pedidosModel.listarPorLoja(req.params.idLoja, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar pedidos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorStatusEntrega(req, res) {
    pedidosModel.listarPorStatusEntrega(req.params.status, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar pedidos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorStatusPagamento(req, res) {
    pedidosModel.listarPorStatusPagamento(req.params.status, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar pedidos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const pedido = req.body;

    if (
        !pedido.data_pedido ||
        !pedido.status_entrega ||
        !pedido.status_pagamento ||
        !pedido.codigo ||
        !pedido.Cliente_id_cliente ||
        !pedido.Loja_id_loja ||
        !pedido.Endereco_id_endereco ||
        !pedido.Forma_Pagamento_id_forma_pagamento
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });
    }

    pedido.data_entrega = pedido.data_entrega || null;
    pedido.nota_fiscal = pedido.nota_fiscal || null;

    pedidosModel.atualizar(req.params.id, pedido, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar pedido." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Pedido não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Pedido atualizado com sucesso." });
    });
}

function excluir(req, res) {
    pedidosModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir pedido." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Pedido não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Pedido excluído com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorCodigo,
    listarPorCliente,
    listarPorLoja,
    listarPorStatusEntrega,
    listarPorStatusPagamento,
    atualizar,
    excluir
};
