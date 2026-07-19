//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const freteModel = require("../model/frete_model");


//==========================================
// CADASTRAR FRETE
//==========================================

function cadastrar(req, res) {

    const frete = req.body;

    // Validação dos campos obrigatórios

    if (
        !frete.valor ||
        !frete.tipo ||
        !frete.Pedidos_id_pedidos
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra o frete

    freteModel.cadastrar(frete, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar frete."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Frete cadastrado com sucesso!",
            idFrete: resultado.insertId

        });

    });

}


//==========================================
// LISTAR FRETES
//==========================================

function listar(req, res) {

    freteModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar fretes."
            });

        }

        // Retorna a lista de fretes em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR FRETE POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    freteModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar frete."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Frete não encontrado."
            });

        }

        // Retorna o frete encontrado em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR FRETE
//==========================================

function atualizar(req, res) {

    // Obtém o ID do frete a ser atualizado a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados do frete a partir do corpo da requisição

    const frete = req.body;

    freteModel.atualizar(id, frete, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar frete."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Frete atualizado com sucesso."
        });

    });

}


//==========================================
// EXCLUIR FRETE
//==========================================

function excluir(req, res) {

    // Obtém o ID do frete a ser excluído a partir dos parâmetros da URL

    const id = req.params.id;

    freteModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir frete."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Frete excluído com sucesso."
        });

    });

}


//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {

    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir

};