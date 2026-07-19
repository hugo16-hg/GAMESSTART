//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const pedidosModel = require("../model/pedidos_model");


//==========================================
// CADASTRAR PEDIDO
//==========================================

function cadastrar(req, res) {

    const pedido = req.body;

    // Validação dos campos obrigatórios

    if (
        !pedido.data_pedido ||
        !pedido.statutos_entrega ||
        !pedido.statutos_pagamento ||
        !pedido.codigo ||
        !pedido.Cliente_id_cliente ||
        !pedido.Loja_id_loja ||
        !pedido.Endereco_id_endereco ||
        !pedido.Forma_pagamento_id_forma_pagamento
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra o pedido

    pedidosModel.cadastrar(pedido, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar pedido."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Pedido cadastrado com sucesso!",
            idPedido: resultado.insertId

        });

    });

}


//==========================================
// LISTAR PEDIDOS
//==========================================

function listar(req, res) {

    pedidosModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar pedidos."
            });

        }

        // Retorna a lista de pedidos em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR PEDIDO POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    pedidosModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar pedido."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Pedido não encontrado."
            });

        }

        // Retorna o pedido encontrado em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR PEDIDO
//==========================================

function atualizar(req, res) {

    // Obtém o ID do pedido a ser atualizado a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados do pedido a partir do corpo da requisição

    const pedido = req.body;

    pedidosModel.atualizar(id, pedido, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar pedido."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Pedido atualizado com sucesso."
        });

    });

}


//==========================================
// EXCLUIR PEDIDO
//==========================================

function excluir(req, res) {

    // Obtém o ID do pedido a ser excluído a partir dos parâmetros da URL

    const id = req.params.id;

    pedidosModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir pedido."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Pedido excluído com sucesso."
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