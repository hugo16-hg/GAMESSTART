//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const cartaoPagamentoModel = require("../model/cartao_pagamento_model");


//==========================================
// CADASTRAR CARTÃO DE PAGAMENTO
//==========================================

function cadastrar(req, res) {

    const cartao = req.body;

    // Validação dos campos obrigatórios

    if (
        !cartao.numero ||
        !cartao.data_vencimento ||
        !cartao.cvc ||
        !cartao.cpf ||
        !cartao.nome_proprietario ||
        !cartao.nome_indentificacao ||
        !cartao.bandeira ||
        !cartao.tipo ||
        !cartao.Cliente_id_cliente
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra o cartão de pagamento

    cartaoPagamentoModel.cadastrar(cartao, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar cartão de pagamento."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Cartão de pagamento cadastrado com sucesso!",
            idCartaoPagamento: resultado.insertId

        });

    });

}


//==========================================
// LISTAR CARTÕES DE PAGAMENTO
//==========================================

function listar(req, res) {

    cartaoPagamentoModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar cartões de pagamento."
            });

        }

        // Retorna a lista de cartões em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR CARTÃO DE PAGAMENTO POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    cartaoPagamentoModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar cartão de pagamento."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Cartão de pagamento não encontrado."
            });

        }

        // Retorna o cartão encontrado em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR CARTÃO DE PAGAMENTO
//==========================================

function atualizar(req, res) {

    // Obtém o ID do cartão a ser atualizado a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados do cartão a partir do corpo da requisição

    const cartao = req.body;

    cartaoPagamentoModel.atualizar(id, cartao, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar cartão de pagamento."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Cartão de pagamento atualizado com sucesso."
        });

    });

}


//==========================================
// EXCLUIR CARTÃO DE PAGAMENTO
//==========================================

function excluir(req, res) {

    // Obtém o ID do cartão a ser excluído a partir dos parâmetros da URL

    const id = req.params.id;

    cartaoPagamentoModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir cartão de pagamento."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Cartão de pagamento excluído com sucesso."
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