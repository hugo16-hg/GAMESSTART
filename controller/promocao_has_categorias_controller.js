const PromocaoHasCategoriasModel = require("../model/Promocao_has_Categorias_model");

// LISTAR TODOS OS RELACIONAMENTOS
exports.listar = (req, res) => {

    PromocaoHasCategoriasModel.listar((erro, resultado) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        res.status(200).json(resultado);

    });

};

// BUSCAR RELACIONAMENTO
exports.buscarPorId = (req, res) => {

    const { promocao, categoria } = req.params;

    PromocaoHasCategoriasModel.buscarPorId(
        promocao,
        categoria,
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

    PromocaoHasCategoriasModel.cadastrar(dados, (erro, resultado) => {

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

    const { promocao, categoria } = req.params;
    const dados = req.body;

    PromocaoHasCategoriasModel.atualizar(
        promocao,
        categoria,
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

    const { promocao, categoria } = req.params;

    PromocaoHasCategoriasModel.excluir(
        promocao,
        categoria,
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