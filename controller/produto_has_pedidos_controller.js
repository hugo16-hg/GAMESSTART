const ProdutoHasPedidosModel = require("../model/produto_has_Pedidos_model.js");


// ==========================================
// LISTAR TODAS AS ASSOCIAÇÕES
// ==========================================

exports.listar = (req, res) => {

    ProdutoHasPedidosModel.listar((erro, resultado) => {

        if (erro) {
            console.error("Erro ao listar Produto_has_Pedidos:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar as associações.",
                erro: erro.message
            });
        }

        return res.status(200).json({
            sucesso: true,
            dados: resultado
        });

    });

};


// ==========================================
// LISTAR PRODUTOS DE UM PEDIDO
// ==========================================

exports.listarPorPedido = (req, res) => {

    const idPedido = req.params.idPedido;

    if (!idPedido) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "ID do pedido é obrigatório."
        });
    }

    ProdutoHasPedidosModel.listarPorPedido(
        idPedido,
        (erro, resultado) => {

            if (erro) {
                console.error("Erro ao listar produtos do pedido:", erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao listar os produtos do pedido.",
                    erro: erro.message
                });
            }

            return res.status(200).json({
                sucesso: true,
                dados: resultado
            });

        }
    );

};


// ==========================================
// LISTAR PEDIDOS DE UM PRODUTO
// ==========================================

exports.listarPorProduto = (req, res) => {

    const idProduto = req.params.idProduto;

    if (!idProduto) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "ID do produto é obrigatório."
        });
    }

    ProdutoHasPedidosModel.listarPorProduto(
        idProduto,
        (erro, resultado) => {

            if (erro) {
                console.error("Erro ao listar pedidos do produto:", erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao listar os pedidos do produto.",
                    erro: erro.message
                });
            }

            return res.status(200).json({
                sucesso: true,
                dados: resultado
            });

        }
    );

};


// ==========================================
// BUSCAR PRODUTOS COMPLETOS DE UM PEDIDO
// ==========================================

exports.buscarProdutosDoPedido = (req, res) => {

    const idPedido = req.params.idPedido;

    if (!idPedido) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "ID do pedido é obrigatório."
        });
    }

    ProdutoHasPedidosModel.buscarProdutosDoPedido(
        idPedido,
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro ao buscar produtos completos do pedido:",
                    erro
                );

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao buscar os produtos do pedido.",
                    erro: erro.message
                });
            }

            return res.status(200).json({
                sucesso: true,
                dados: resultado
            });

        }
    );

};


// ==========================================
// CADASTRAR ASSOCIAÇÃO
// ==========================================

exports.cadastrar = (req, res) => {

    const dados = req.body;

    if (
        !dados ||
        !dados.Produto_id_produto ||
        !dados.Pedidos_id_pedidos
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem:
                "Informe Produto_id_produto e Pedidos_id_pedidos."
        });

    }

    ProdutoHasPedidosModel.cadastrar(
        dados,
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro ao cadastrar Produto_has_Pedidos:",
                    erro
                );

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao cadastrar a associação.",
                    erro: erro.message
                });
            }

            return res.status(201).json({
                sucesso: true,
                mensagem: "Produto adicionado ao pedido com sucesso!"
            });

        }
    );

};


// ==========================================
// EXCLUIR UMA ASSOCIAÇÃO
// ==========================================

exports.excluir = (req, res) => {

    const idProduto = req.params.idProduto;
    const idPedido = req.params.idPedido;

    if (!idProduto || !idPedido) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "ID do produto e ID do pedido são obrigatórios."
        });
    }

    ProdutoHasPedidosModel.excluir(
        idProduto,
        idPedido,
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro ao excluir associação:",
                    erro
                );

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao excluir a associação.",
                    erro: erro.message
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Associação não encontrada."
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Produto removido do pedido com sucesso!"
            });

        }
    );

};


// ==========================================
// EXCLUIR TODOS OS PRODUTOS DE UM PEDIDO
// ==========================================

exports.excluirPorPedido = (req, res) => {

    const idPedido = req.params.idPedido;

    if (!idPedido) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "ID do pedido é obrigatório."
        });
    }

    ProdutoHasPedidosModel.excluirPorPedido(
        idPedido,
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro ao excluir produtos do pedido:",
                    erro
                );

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao excluir os produtos do pedido.",
                    erro: erro.message
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Produtos removidos do pedido com sucesso!"
            });

        }
    );

};


// ==========================================
// EXCLUIR PRODUTO DE TODOS OS PEDIDOS
// ==========================================

exports.excluirPorProduto = (req, res) => {

    const idProduto = req.params.idProduto;

    if (!idProduto) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "ID do produto é obrigatório."
        });
    }

    ProdutoHasPedidosModel.excluirPorProduto(
        idProduto,
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro ao excluir produto dos pedidos:",
                    erro
                );

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao excluir o produto dos pedidos.",
                    erro: erro.message
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Produto removido de todos os pedidos com sucesso!"
            });

        }
    );

};