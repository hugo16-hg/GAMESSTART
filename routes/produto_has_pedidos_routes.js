const ProdutoHasPedidosModel = require("../model/produto_has_Pedidos_model.js");


// ==========================================
// LISTAR TODOS OS RELACIONAMENTOS
// ==========================================

exports.listar = (req, res) => {

    ProdutoHasPedidosModel.listar((erro, resultado) => {

        if (erro) {

            console.error("Erro ao listar relacionamentos:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar relacionamentos.",
                erro: erro.message
            });
        }

        return res.status(200).json(resultado);
    });
};


// ==========================================
// BUSCAR RELACIONAMENTO
// ==========================================

exports.buscarPorId = (req, res) => {

    const { produto, pedidos } = req.params;

    ProdutoHasPedidosModel.buscarPorId(
        produto,
        pedidos,
        (erro, resultado) => {

            if (erro) {

                console.error("Erro ao buscar relacionamento:", erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao buscar relacionamento.",
                    erro: erro.message
                });
            }

            if (resultado.length === 0) {

                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Relacionamento não encontrado."
                });
            }

            return res.status(200).json(resultado[0]);
        }
    );
};


// ==========================================
// CADASTRAR RELACIONAMENTO
// ==========================================

exports.cadastrar = (req, res) => {

    const dados = req.body;

    if (
        !dados.Produto_id_produto ||
        !dados.Pedidos_id_pedidos
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o produto e o pedido."
        });
    }

    ProdutoHasPedidosModel.cadastrar(
        dados,
        (erro, resultado) => {

            if (erro) {

                console.error("Erro ao cadastrar relacionamento:", erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao cadastrar relacionamento.",
                    erro: erro.message
                });
            }

            return res.status(201).json({
                sucesso: true,
                mensagem: "Relacionamento cadastrado com sucesso!"
            });
        }
    );
};


// ==========================================
// ATUALIZAR RELACIONAMENTO
// ==========================================

exports.atualizar = (req, res) => {

    const { produto, pedidos } = req.params;
    const dados = req.body;

    if (
        !dados.Produto_id_produto ||
        !dados.Pedidos_id_pedidos
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o produto e o pedido."
        });
    }

    ProdutoHasPedidosModel.atualizar(
        produto,
        pedidos,
        dados,
        (erro, resultado) => {

            if (erro) {

                console.error("Erro ao atualizar relacionamento:", erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao atualizar relacionamento.",
                    erro: erro.message
                });
            }

            if (resultado.affectedRows === 0) {

                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Relacionamento não encontrado."
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Relacionamento atualizado com sucesso!"
            });
        }
    );
};


// ==========================================
// EXCLUIR RELACIONAMENTO
// ==========================================

exports.excluir = (req, res) => {

    const { produto, pedidos } = req.params;

    ProdutoHasPedidosModel.excluir(
        produto,
        pedidos,
        (erro, resultado) => {

            if (erro) {

                console.error("Erro ao excluir relacionamento:", erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao excluir relacionamento.",
                    erro: erro.message
                });
            }

            if (resultado.affectedRows === 0) {

                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Relacionamento não encontrado."
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Relacionamento excluído com sucesso!"
            });
        }
    );
};