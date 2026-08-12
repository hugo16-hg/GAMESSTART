const produtoModel = require("../model/produto_model.js");

function cadastrar(req, res) {

    const produto = req.body;

    if (
        !produto.nome ||
        !produto.descricao ||
        !produto.sku ||
        produto.preco_antigo === undefined ||
        produto.quantidade_estoque === undefined ||
        !produto.Loja_id_loja ||
        !produto.Lojista_id_lojista
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });
    }

    if (produto.preco_promocional === undefined || produto.preco_promocional === "") {
        produto.preco_promocional = null;
    }

    if (produto.ativo === undefined) {
        produto.ativo = true;
    }

    produtoModel.buscarPorSku(produto.sku, (erroSku, resultadoSku) => {

        if (erroSku) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao consultar SKU.",
                erro: erroSku.message
            });
        }

        if (resultadoSku.length > 0) {
            return res.status(409).json({
                sucesso: false,
                mensagem: "Já existe um produto com este SKU."
            });
        }

        produtoModel.cadastrar(produto, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    sucesso: false,
                    mensagem: erro.sqlMessage || "Erro ao cadastrar produto."
                });
            }

            return res.status(201).json({
                sucesso: true,
                mensagem: "Produto cadastrado com sucesso!",
                idProduto: resultado.insertId
            });
        });
    });
}

function listar(req, res) {
    produtoModel.listar((erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar produtos.",
                erro: erro.message
            });
        }
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    produtoModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar produto.",
                erro: erro.message
            });
        }
        if (resultado.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado."
            });
        }
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorNome(req, res) {
    produtoModel.buscarPorNome(req.params.nome, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar produtos.",
                erro: erro.message
            });
        }
        return res.status(200).json(resultado);
    });
}

function buscarPorSku(req, res) {
    produtoModel.buscarPorSku(req.params.sku, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar produto.",
                erro: erro.message
            });
        }
        if (resultado.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado."
            });
        }
        return res.status(200).json(resultado[0]);
    });
}

function listarPorLoja(req, res) {
    produtoModel.listarPorLoja(req.params.idLoja, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar produtos da loja.",
                erro: erro.message
            });
        }
        return res.status(200).json(resultado);
    });
}

function listarPorLojista(req, res) {
    produtoModel.listarPorLojista(req.params.idLojista, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar produtos do lojista.",
                erro: erro.message
            });
        }
        return res.status(200).json(resultado);
    });
}

function listarAtivos(req, res) {
    produtoModel.listarAtivos((erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar produtos ativos.",
                erro: erro.message
            });
        }
        return res.status(200).json(resultado);
    });
}

function listarEmEstoque(req, res) {
    produtoModel.listarEmEstoque((erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar produtos em estoque.",
                erro: erro.message
            });
        }
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const id = req.params.id;
    const produto = req.body;

    if (
        !produto.nome ||
        !produto.descricao ||
        !produto.sku ||
        produto.preco_antigo === undefined ||
        produto.quantidade_estoque === undefined ||
        !produto.Loja_id_loja ||
        !produto.Lojista_id_lojista
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });
    }

    if (produto.preco_promocional === undefined || produto.preco_promocional === "") {
        produto.preco_promocional = null;
    }

    if (produto.ativo === undefined) {
        produto.ativo = true;
    }

    produtoModel.atualizar(id, produto, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.sqlMessage || "Erro ao atualizar produto."
            });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado."
            });
        }
        return res.status(200).json({
            sucesso: true,
            mensagem: "Produto atualizado com sucesso."
        });
    });
}

function excluir(req, res) {
    produtoModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.sqlMessage || "Erro ao excluir produto."
            });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado."
            });
        }
        return res.status(200).json({
            sucesso: true,
            mensagem: "Produto excluído com sucesso."
        });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    buscarPorSku,
    listarPorLoja,
    listarPorLojista,
    listarAtivos,
    listarEmEstoque,
    atualizar,
    excluir
};
