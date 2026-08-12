const carrinhoModel = require("../model/carrinho_model.js");

function cadastrar(req, res) {

    const carrinho = req.body;

    if (!carrinho.Cliente_id_cliente) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o cliente do carrinho."
        });
    }

    if (carrinho.quantidade_produto === undefined || carrinho.quantidade_produto === "") {
        carrinho.quantidade_produto = 0;
    }

    if (carrinho.preco_total === undefined || carrinho.preco_total === "") {
        carrinho.preco_total = 0;
    }

    carrinhoModel.cadastrar(carrinho, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar carrinho." });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Carrinho cadastrado com sucesso!",
            idCarrinho: resultado.insertId
        });
    });
}

function listar(req, res) {
    carrinhoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar carrinhos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    carrinhoModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar carrinho.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Carrinho não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorCliente(req, res) {
    carrinhoModel.buscarPorCliente(req.params.idCliente, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar carrinho.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Carrinho do cliente não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function atualizar(req, res) {

    const carrinho = req.body;

    if (!carrinho.Cliente_id_cliente) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o cliente do carrinho."
        });
    }

    if (carrinho.quantidade_produto === undefined || carrinho.quantidade_produto === "") {
        carrinho.quantidade_produto = 0;
    }

    if (carrinho.preco_total === undefined || carrinho.preco_total === "") {
        carrinho.preco_total = 0;
    }

    carrinhoModel.atualizar(req.params.id, carrinho, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar carrinho." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Carrinho não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Carrinho atualizado com sucesso." });
    });
}

function excluir(req, res) {
    carrinhoModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir carrinho." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Carrinho não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Carrinho excluído com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorCliente,
    atualizar,
    excluir
};
