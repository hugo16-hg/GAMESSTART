const ProdutoHasCarrinhoModel = require("../model/produto_has_carrinho_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Produto_id_produto || !dados.Carrinho_id_carrinho) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe produto e carrinho." });
    }
    dados.quantidade = dados.quantidade || 1;
    ProdutoHasCarrinhoModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao adicionar produto ao carrinho." });
        return res.status(201).json({ sucesso: true, mensagem: "Produto adicionado ao carrinho." });
    });
}

function listar(req, res) {
    ProdutoHasCarrinhoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar carrinho.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorCarrinho(req, res) {
    ProdutoHasCarrinhoModel.listarPorCarrinho(req.params.idCarrinho, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar produtos do carrinho.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorProduto(req, res) {
    ProdutoHasCarrinhoModel.listarPorProduto(req.params.idProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar carrinhos do produto.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizarQuantidade(req, res) {
    const quantidade = req.body.quantidade;
    if (!quantidade || quantidade < 1) {
        return res.status(400).json({ sucesso: false, mensagem: "Quantidade inválida." });
    }
    ProdutoHasCarrinhoModel.atualizarQuantidade(
        req.params.idProduto,
        req.params.idCarrinho,
        quantidade,
        (erro, resultado) => {
            if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar quantidade." });
            if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Produto não encontrado no carrinho." });
            return res.status(200).json({ sucesso: true, mensagem: "Quantidade atualizada com sucesso." });
        }
    );
}

function excluir(req, res) {
    ProdutoHasCarrinhoModel.excluir(req.params.idProduto, req.params.idCarrinho, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao remover produto." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

function excluirPorCarrinho(req, res) {
    ProdutoHasCarrinhoModel.excluirPorCarrinho(req.params.idCarrinho, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao limpar carrinho." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    listarPorCarrinho,
    listarPorProduto,
    atualizarQuantidade,
    excluir,
    excluirPorCarrinho
};
