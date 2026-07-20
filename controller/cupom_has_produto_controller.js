const CupomHasProdutoModel = require("../model/Cupom_has_Produto_model");

// LISTAR TODOS OS RELACIONAMENTOS
exports.listar = (req, res) => {

    CupomHasProdutoModel.listar((erro, resultado) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        res.status(200).json(resultado);

    });

};

// BUSCAR RELACIONAMENTO
exports.buscarPorId = (req, res) => {

    const { cupom, produto } = req.params;

    CupomHasProdutoModel.buscarPorId(
        cupom,
        produto,
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    mensagem: "Relacionamento não encontrado."
                });
            }

            res.status(200).json(resultado[0]);

        }
    );

};

// CADASTRAR RELACIONAMENTO
exports.cadastrar = (req, res) => {

    const dados = req.body;

    CupomHasProdutoModel.cadastrar(dados, (erro, resultado) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        res.status(201).json({
            mensagem: "Relacionamento cadastrado com sucesso!"
        });

    });

};

// ATUALIZAR RELACIONAMENTO
exports.atualizar = (req, res) => {

    const { cupom, produto } = req.params;
    const dados = req.body;

    CupomHasProdutoModel.atualizar(
        cupom,
        produto,
        dados,
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.status(200).json({
                mensagem: "Relacionamento atualizado com sucesso!"
            });

        }
    );

};

// EXCLUIR RELACIONAMENTO
exports.excluir = (req, res) => {

    const { cupom, produto } = req.params;

    CupomHasProdutoModel.excluir(
        cupom,
        produto,
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.status(200).json({
                mensagem: "Relacionamento excluído com sucesso!"
            });

        }
    );

};