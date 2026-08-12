const ProdutoHasPedidosModel = require("../model/produto_has_Pedidos_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Produto_id_produto || !dados.Pedidos_id_pedidos || dados.preco_unitario === undefined) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe produto, pedido e preço unitário." });
    }
    dados.quantidade = dados.quantidade || 1;
    ProdutoHasPedidosModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao adicionar produto ao pedido." });
        return res.status(201).json({ sucesso: true, mensagem: "Produto adicionado ao pedido." });
    });
}

function listar(req, res) {
    ProdutoHasPedidosModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar itens dos pedidos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorPedido(req, res) {
    ProdutoHasPedidosModel.listarPorPedido(req.params.idPedido, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar produtos do pedido.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarProdutosDoPedido(req, res) {
    ProdutoHasPedidosModel.buscarProdutosDoPedido(req.params.idPedido, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar itens do pedido.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {
    const dados = req.body;
    if (!dados.quantidade || dados.preco_unitario === undefined) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe quantidade e preço unitário." });
    }
    ProdutoHasPedidosModel.atualizar(
        req.params.idProduto,
        req.params.idPedido,
        dados,
        (erro, resultado) => {
            if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar item do pedido." });
            if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Item não encontrado." });
            return res.status(200).json({ sucesso: true, mensagem: "Item atualizado com sucesso." });
        }
    );
}

function excluir(req, res) {
    ProdutoHasPedidosModel.excluir(req.params.idProduto, req.params.idPedido, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao remover item." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    listarPorPedido,
    buscarProdutosDoPedido,
    atualizar,
    excluir
};
